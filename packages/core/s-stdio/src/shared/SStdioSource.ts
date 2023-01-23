import __SClass from '@coffeekraken/s-class';
import type { ISLog, ISLogAsk } from '@coffeekraken/s-log';

export interface ISStdioSourceOnLogCallback {
    (logObj: ISLog): void;
}

export interface ISStdioSource {
    on(event: string, callback: ISStdioSourceOnLogCallback): void;
}

export interface ISStdioSourceSettings {}

const _nativeLog = console.log;

export default class SStdioSource extends __SClass implements ISStdioSource {
    private _callbacks: Record<string, Function[]> = {};

    constructor(settings?: ISStdioSourceSettings) {
        super(settings);
    }

    log(logObj: ISLog) {
        this._callbacks.log?.forEach((callback) => {
            callback(logObj);
        });
    }

    ask(askObj: ISLogAsk) {
        return new Promise(async (resolve, reject) => {
            let answer;
            for (let [key, fn] of this._callbacks.ask.entries()) {
                answer = await fn(askObj);
            }
            resolve(answer);
        });
    }

    ready(): void {
        this._callbacks.ready?.forEach((callback) => {
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
        this._callbacks[event].splice(
            this._callbacks[event].indexOf(callback, 1),
        );
    }
}
