import __SLog from '@coffeekraken/s-log';
import type { ISStdioSource, ISStdioSourceSettings } from '../SStdioSource.js';
import __SStdioSource from '../SStdioSource.js';

export interface ISStdioConsoleSource extends ISStdioSource {}

export interface ISStdioConsoleSourceSettings extends ISStdioSourceSettings {}

// save the native console methods in a _console stack
const _console = {};
for (let key of ['log', 'error', 'warn', 'success', 'verbose', 'notify']) {
    _console[key] = console[key];
}
// expose _console globally
try {
    global._console = _console;
} catch (e) {}

// process.on('unhandledRejection', (error) => {
//     throw error;
// });

// process.on('uncaughtException', (error) => {
//     _console.log(error);
// });

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

        setTimeout(() => {
            this.ready();
        });
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
            console[key] = _console[key];
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
            _console[key] = console[key] ?? _console.log;
            console[key] = (...args) => {
                args = args.filter((log) => {
                    // // do not use this in iframe
                    // if (__isInIframe()) {
                    //     return;
                    // }
                    if (log === null || log === undefined) {
                        _console.log(log);
                        return false;
                    }
                    if (log?.toString?.().match(/[a-zA-Z0-9]Error\:/)) {
                        _console.error(log);
                        return false;
                    }
                    return true;
                });

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
                    // if (!log) return;
                    return new __SLog({
                        type: log?.type ?? key ?? __SLog.TYPE_LOG,
                        value: log,
                        group: log?.group ?? group,
                        notify: key === 'notify' || log?.notify,
                        verbose: key === 'verbose' || log?.verbose,
                        metas: log?.metas ?? {},
                        // @ts-ignore
                        logger: _console[key],
                    });
                });

                args.forEach((log) => {
                    this.log(log);
                });
            };
        }
    }
}
