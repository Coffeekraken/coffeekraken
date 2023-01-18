import type { ISLog } from '@coffeekraken/s-log';
import __SLog from '@coffeekraken/s-log';
import type { ISStdioSource, ISStdioSourceSettings } from "../SStdioSource";
import __SStdioSource from '../SStdioSource';

export interface ISStdioEventEmitterSource extends ISStdioSource {

}

export interface ISStdioEventEmitterSourceSettings extends ISStdioSourceSettings {}

export default class SStdioEventEmitterSource extends __SStdioSource implements ISStdioEventEmitterSource {

    _emitter;

    _tmpPrintedLogs = [];

    constructor(eventEmitter: __SEventEmitter, settings?: Partial<ISStdioEventEmitterSourceSettings>) {
        super(settings);

        // save the emitter
        this._emitter = eventEmitter;

        // listen for logs
        this._emitter.on('log', (logObj: ISLog, metas: any) => {

            // @TODO        find why some logs are printed x times... It seems that it's linked to number of actions theirs in a recipe in the SKitchen class...
            if (this._tmpPrintedLogs.includes(logObj.value)) {
                return;
            }

            this._tmpPrintedLogs.push(logObj.value);
            setTimeout(() => {
                this._tmpPrintedLogs.splice(
                    this._tmpPrintedLogs.indexOf(logObj.value),
                    1,
                );
            }, 100);

            if (logObj === undefined || logObj === null) return;

            // save metas into logObj
            logObj.metas = metas;

            if (!logObj.group) {
                // @ts-ignore
                if (logObj.metas?.id === 'SPromise') {
                    logObj.group = 'Global';
                } else {
                    // @ts-ignore
                    logObj.group = logObj.metas.id ?? '';
                }
            }

            this.log(new __SLog(logObj));
        });

        // source ready
        setTimeout(() => {
            this.ready();
        }, 1000);
    }

}