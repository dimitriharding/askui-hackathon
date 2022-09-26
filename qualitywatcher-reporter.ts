import type { Reporter } from 'vitest';
import axios from 'axios';
import qwConfig from './qualitywatcher.config';

enum TestStatus {
    skip = 'skipped',
    pass = 'passed',
    fail = 'failed',
    disabled = 'failed',
    pending = 'blocked',
    todo = 'blocked',
}

class QualityWatcherReporter implements Reporter {
    start: string;
    end: string;

    async onFinished(files) {
        this.end = new Date().toISOString();

        const allTasks = [];

        files.forEach((file) => {
            const tasks = QualityWatcherReporter.getTasks(file);
            allTasks.push(...tasks);
        });

        const results = allTasks.map((task) => this.formatResult(task));

        await this.publishResults(results);
    }

    static getTasks(suite) {
        if (suite?.tasks?.length > 0) {
            const tasks = QualityWatcherReporter.getTasks(suite.tasks[0]);
            if (tasks) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                return tasks;
            } else {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                return suite.tasks;
            }
        }
        return null;
    }

    formatResult(task) {
        const status = task?.result ? task.result.state : task.mode
        return {
            case: {
                suiteTitle: task?.suite?.name,
                testCaseTitle: task?.name,
                steps: ''
            },
            status: TestStatus[status],
            time: task?.result?.duration || 0,
            comment: task?.result?.error?.message || '',
        }
    }

    onInit(ctx: t): void {
        this.start = new Date().toISOString();
    }

    async publishResults(results) {
        const data = JSON.stringify({
            projectId: qwConfig.projectId,
            include_all_cases: qwConfig.include_all_cases,
            testRunName: `${qwConfig?.testRunName} automated test run - ${new Date()}`,
            description: `Vitest + AskUI automated tests\nStarted: ${this.start}\nEnded: ${this.end}`,
            suites: [],
            results
        });
        const config = {
            method: 'post',
            url: import.meta.env.VITE_QUALITYWATCHER_URL,
            headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_QUALITYWATCHER_TOKEN}`,
                'Content-Type': 'application/json'
            },
            data,
        };

        try {
            const response = await axios(config);
            console.log(response.data);
        } catch (error) {
            console.log(error?.message);
        }
    }
}

module.exports = QualityWatcherReporter;