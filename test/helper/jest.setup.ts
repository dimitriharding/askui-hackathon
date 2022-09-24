import { UiControlClient, UiController } from 'askui';
import path from 'path';
const notifier = require('node-notifier');
import dotenv from 'dotenv';


dotenv.config();

// Server for controlling the operating system
let uiController: UiController;

// Client is necessary to use the askui API
// eslint-disable-next-line import/no-mutable-exports
let aui: UiControlClient;

jest.setTimeout(60 * 1000 * 60);

beforeAll(async () => {
  uiController = new UiController({
    /**
     * Select the display you want to run your tests on, display 0 is your main display;
     * ignore if you have only one display
     */
    display: 0,
  });

  // await uiController.start();

  aui = await UiControlClient.build({
    credentials: {
      workspaceId: process.env.ASKUI_WORKSPACE_ID,
      token: process.env.ASKUI_TOKEN,
    }
  });

  await aui.connect();
  notifier.notify({
    title: 'AskUI',
    message: 'Tests started',
    icon: path.join(__dirname, 'askui-icon.jpg'),
  });
});

afterAll(async () => {
  // await uiController.stop();

  aui.close();
  notifier.notify({
    title: 'AskUI',
    message: 'Tests are done',
    icon: path.join(__dirname, 'askui-icon.jpg'),
  });
});

export { aui };
