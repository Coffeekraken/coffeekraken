import __SClass from '@coffeekraken/s-class';
import type { ISLog, ISLogAsk } from '@coffeekraken/s-log';

export interface ISStdioAdapter {
    log(...logObj: ISLog[]): void;
    ask(askObj: ISLogAsk): Promise<any>;
}

export interface ISStdioAdapterSettings {}

export default class SStdioAdapter extends __SClass implements ISStdioAdapter {
    constructor(settings?: ISStdioAdapterSettings) {
        super(settings);
    }
}
