import { aui } from '../helper/jest.setup';

describe('Xnapper', () => {
    it('should detect and hide email with redact option', async () => {
        // move mouse to top of the screen to show the toolbar
        await aui.moveMouse(100, 0).exec();
        await aui.waitFor(500).exec();
        // click text with App
        await aui.click().withText('App').exec();
        await aui.click().withText('Open from File...').exec();
        // click file to open
        await aui.click().withText('email-screenshot').exec();
        await aui.click().withText('Open').exec();

        // wait for the screenshot to load
        await aui.waitFor(500).exec();

        // verify that email is hidden
        await aui.expect().text().withExactText('test-email@gmail.com').notExists().exec();
        await aui.expect().text().withExactText('Redact email addresses (found 1)').exists().exec();

        //toggle redact option
        await aui.click().withText('Redact email addresses (found 1)').exec();
    });

    it.skip('should reveal email on react toggle', async () => {
        // looks like I need to re-open the file in the show email mode
        //toggle redact option
        await aui.click().withText('Redact email addresses (found 1)').exec();

        await aui.waitFor(500).exec();

        // verify that email is visible
        await aui.expect().text().withExactText('test-email@gmail.com').exists().exec();

        // reset redact option
        await aui.click().withText('Redact email addresses (found 1)').exec();
    });

    it.skip('should be able to switch between presets', async () => {
        await aui.click().textfield().withText('Your Preset').exec();
        await aui.click().withText('Default Preset').exec();

        // confirm that default preset is selected
        await aui.expect().text().withExactText('Screenshot by Xnapper.com').exists().exec();
        await aui.expect().text().withExactText('Default Preset').exists().exec();
        await aui.expect().text().withExactText('Your Preset').notExists().exec();

        // switch to another preset
        await aui.click().textfield().withText('Default Preset').exec();
        await aui.click().withText('Your Preset').exec();

        await aui.annotate();

        // confirm that your preset is selected
        await aui.expect().text().withExactText('Your Preset').exists().exec();
        await aui.expect().text().withExactText('Default Preset').notExists().exec();
        await aui.expect().text().withExactText('Screenshot by Xnapper.com').notExists().exec();
    });

    it.skip('should be able to change padding on screenshot', async () => {
        await saveScreenshot(aui, 'padding-1');
        await aui.moveMouseTo().withText('Padding').exec();
        await aui.moveMouseRelatively(100, 52).exec();
        await aui.mouseLeftClick().exec();
        await saveScreenshot(aui, 'padding-2');
        // cleanup - reset padding
    });

    it.skip('should be able to verify text in screenshot', async () => {
        await aui.expect().text().withExactText('Humanizing UI Automation').exists().exec();
    });
});

const saveScreenshot = async (page: typeof aui, name: string) => {
    await page.click().withText('Save As...').exec();
    await page.type(name).exec();
};