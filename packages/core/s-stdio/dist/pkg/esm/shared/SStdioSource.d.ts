import __SClass from '@coffeekraken/s-class';
import type { ISLog, ISLogAsk } from '@coffeekraken/s-log';
export interface ISStdioSourceOnLogCallback {
    (logObj: ISLog): void;
}
export interface ISStdioSource {
    on(event: string, callback: ISStdioSourceOnLogCallback): void;
}
export interface ISStdioSourceSettings {
}
export default class SStdioSource extends __SClass implements ISStdioSource {
    private _callbacks;
    constructor(settings?: ISStdioSourceSettings);
    log(logObj: ISLog): void;
    ask(askObj: ISLogAsk): any;
    ready(): void;
    on(event: string, callback: ISStdioSourceOnLogCallback): void;
    off(event: string, callback: ISStdioSourceOnLogCallback): void;
}
