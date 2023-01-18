import __SClass from '@coffeekraken/s-class';

export interface ISStdioAdapter {
    log(...logObj: ISLog[]): void;
    ask(askObj: any): Promise<any>;
}

export interface ISStdioAdapterSettings {}

export default class SStdioAdapter extends __SClass implements ISStdioAdapter {

    constructor(settings?: ISStdioAdapterSettings) {
        super(settings);
    }
}