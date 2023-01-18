import __SClass from '@coffeekraken/s-class';
import type { ISLog } from '@coffeekraken/s-log';

export interface ISStdioSourceOnLogCallback {
    (logObj: ISLog): void
}

export interface ISStdioSource {
    on(event: string, callback: ISStdioSourceOnLogCallback): void;
}

export interface ISStdioSourceSettings {}

export default class SStdioSource extends __SClass implements ISStdioSource {

    private _callbacks: Record<string, Function[]> = {};

    constructor(settings?: ISStdioSourceSettings) {
        super(settings);
    }

    log(logObj: ISLog) {

        this._callbacks.log?.forEach(callback => {
            callback(logObj);
        });
    }

    ready(): void {
        this._callbacks.ready?.forEach(callback => {
            callback();
        });
    }

    on(event: string, callback: ISStdioSourceOnLogCallback) {
        if (!this._callbacks[event]) {
            this._callbacks[event] = [];
        }
        if (this._callbacks[event].includes(callback)) {
            return;
        }
        this._callbacks[event].push(callback);
    }

    off(event: string, callback: ISStdioSourceOnLogCallback) {
        if (!this._callbacks[event]) {
            return;
        }
        if (!this._callbacks[event].includes(callback)) {
            return;
        }
        this._callbacks[event].splice(this._callbacks[event].indexOf(callback, 1));
    }

}