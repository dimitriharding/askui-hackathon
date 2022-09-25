import { UiControlClient } from 'askui';
import { Xnapper } from './applicationObject/xnapper';

declare module 'vitest' {
    export interface TestContext {
        xnapper?: Xnapper
        aui?: UiControlClient
    }

    export interface Matchers<R> {
        toMatchImageSnapshot(): R
    }
}