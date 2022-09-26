import { aui } from '../helper/vite.setup';
import { Xnapper } from '../../applicationObject/xnapper';
import { describe, it, beforeAll } from 'vitest';

let xnapper: Xnapper;

describe('Xnapper', () => {
    beforeAll(() => {
        xnapper = new Xnapper(aui);
    });
    it.skip('should take a screenshot using the "Take Screenshot Now" CTA', async () => {
        // Unable to hold and drag the slider
        await aui.click().button().withText('Take Screenshot Now').exec();
        await aui.moveMouse(200, 200).exec();
        await aui.mouseToggleDown().exec();
        await aui.moveMouse(616, 870).exec();
        await aui.mouseToggleUp().exec();
    });
});