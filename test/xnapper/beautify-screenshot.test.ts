import { describe, test, expect } from 'vitest';

describe('Xnapper', () => {
    test('should detect and hide email with redact option', async ({ xnapper, aui }) => {
        // open file by using the App menu in the toolbar
        await xnapper.openFile('email-screenshot');

        // verify that email is hidden
        await aui.expect().text().withExactText('test-email@gmail.com').notExists().exec();
        await aui.expect().text().withExactText('Redact email addresses (found 1)').exists().exec();
    });

    test('should reveal email on react toggle', async ({ aui }) => {
        // looks like I need to re-open the file in the show email mode
        //toggle redact option
        await aui.click().withText('Redact email addresses (found 1)').exec();

        await aui.waitFor(500).exec();

        // verify that email is visible
        await aui.expect().text().withExactText('test-email@gmail.com').exists().exec();

        // reset redact option
        await aui.click().withText('Redact email addresses (found 1)').exec();
    });

    test('should be able to switch between presets', async ({ aui }) => {
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

    test('should be able to change padding on screenshot', async ({ aui, xnapper }) => {
        await xnapper.saveScreenshot('padding-1');
        await aui.moveMouseTo().withText('Padding').exec();
        await aui.moveMouseRelatively(100, 52).exec();
        await aui.mouseLeftClick().exec();
        await xnapper.saveScreenshot('padding-2');

        const image = await xnapper.getImageOnSystem(['Desktop', 'padding-2.png']);
        expect(image).toMatchImageSnapshot();
    });

    test('should be able to verify text in screenshot', async ({ aui }) => {
        await aui.expect().text().withExactText('Humanizing UI Automation').exists().exec();
    });
});