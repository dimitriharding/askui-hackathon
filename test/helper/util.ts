const notifier = require('node-notifier');
import path from 'path';

export const notification = (message: string) => {
    notifier.notify({
        title: 'AskUI',
        message,
        icon: path.resolve(__dirname, '../../', 'askui-icon.svg'),
        sound: true
    });
}