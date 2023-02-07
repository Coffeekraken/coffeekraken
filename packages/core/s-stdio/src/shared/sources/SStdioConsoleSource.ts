import type { ISLogAsj } from '@coffeekraken/s-log';
import __SLog from '@coffeekraken/s-log';
import type { ISStdioSource, ISStdioSourceSettings } from '../SStdioSource';
import __SStdioSource from '../SStdioSource';

import { __wait } from '@coffeekraken/sugar/datetime';
export interface ISStdioConsoleSource extends ISStdioSource {}

export interface ISStdioConsoleSourceSettings extends ISStdioSourceSettings {}

const _nativeConsole = {};
for (let key of ['log', 'error', 'warn', 'success', 'verbose', 'notify']) {
    _nativeConsole[key] = console[key];
}

export default class SStdioConsoleSource
    extends __SStdioSource
    implements ISStdioConsoleSource
{
    _tmpPrintedLogs = [];

    constructor(settings?: Partial<ISStdioConsoleSourceSettings>) {
        super(settings);

        // overrtide native console
        this._overrideNativeConsole();

        // @ts-ignore
        console.ask = async (askObj: ISLogAsj) => {
            this._restoreNativeConsole();
            await __wait(100);
            const res = await this.ask(askObj);
            this._overrideNativeConsole();
            return res;
        };

        // source ready
        setTimeout(() => {
            this.ready();
        }, 1000);
    }

    /**
     * Restore native console (for ask, etc...)
     */
    _restoreNativeConsole() {
        for (let key of [
            'log',
            'error',
            'warn',
            'success',
            'verbose',
            'notify',
        ]) {
            console[key] = _nativeConsole[key];
        }
    }

    /**
     * Override native console
     */
    _overrideNativeConsole() {
        for (let key of [
            'log',
            'error',
            'warn',
            'success',
            'verbose',
            'notify',
        ]) {
            // _nativeConsole[key] = console[key] ?? _nativeConsole.log;
            console[key] = (...args) => {
                const e = new Error();
                const stack = e.stack
                    .toString()
                    .split('\n')
                    .slice(2)
                    .map((str) => str.trim());
                const callerStr = stack[0] ?? '';
                let group = callerStr
                    .split(' ')
                    [callerStr.match(/^at new/) ? 2 : 1].split('.')[0];

                if (group === 'Timeout') {
                    group = stack[1]
                        .split(' ')
                        [callerStr.match(/^at new/) ? 2 : 1].split('.')[0];
                }

                if (group.match(`^file:\/\/\/`)) {
                    group = group.trim().split('/').pop();
                }

                args = args.map((log) => {
                    if (!log) return;
                    return new __SLog({
                        type: log.type ?? __SLog.TYPE_LOG,
                        value: log.value ?? log,
                        group: log.group ?? group,
                        notify: key === 'notify' || log.notify,
                        verbose: key === 'verbose' || log.verbose,
                        metas: log.metas ?? {},
                        // @ts-ignore
                        logger: _nativeConsole[key],
                    });
                });

                args.forEach((log) => {
                    this.log(log);
                });
            };
        }
    }
}
