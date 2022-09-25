import { Reporter } from 'vitest';
class CustomReporter implements Reporter {
    onFinished(files, errors) {
        console.log('onFinished', files, errors);
    }
}

module.exports = CustomReporter;