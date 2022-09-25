import { UiControlClient } from 'askui';
import { readFileSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

enum ToolBarMenuItem {
    Xnapper = 'Xnapper',
    App = 'App',
    File = 'File',
    Edit = 'Edit',
    View = 'View',
    Window = 'Window',
    Help = 'Help',
}

export class Xnapper {

    client: UiControlClient;

    constructor(client: UiControlClient) {
        this.client = client;
    }

    clickToolBarOption = async (menuItem: ToolBarMenuItem) => {
        // move mouse to top of the screen to show the toolbar
        await this.client.moveMouse(400, 0).exec();
        // click text with the name of the menu item
        await this.client.click().withText(menuItem).exec();
    }

    openFile = async (fileName) => {
        await this.clickToolBarOption(ToolBarMenuItem.App);
        await this.client.click().withText('Open from File...').exec();
        // click file to open
        await this.client.click().withText(fileName).exec();
        await this.client.click().withText('Open').exec();
        // wait for the screenshot to load
        await this.client.waitFor(500).exec();
    }

    saveScreenshot = async (name: string) => {
        await this.client.click().withText('Save As...').exec();
        await this.client.type(name).exec();
        await this.client.click().button().withText('Save').exec();
        await this.client.waitFor(500).exec();
    };

    /**
     * Uses the home directory to find the image on the system
     * @param args string[] - Array of strings to find the image
     * @returns  - image as a buffer
     * @example
     * const image = await getImageOnSystem(['Desktop', 'padding-2.png']);
     */
    getImageOnSystem = async (args: string[]) => {
        const path = join(`${homedir}`, ...args);
        const image = readFileSync(path);
        return image;
    };
}