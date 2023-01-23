import type { ISLogAsj } from '@coffeekraken/s-log';
import __SLog from '@coffeekraken/s-log';
import type { ISStdioSource, ISStdioSourceSettings } from '../SStdioSource';
import __SStdioSource from '../SStdioSource';

export interface ISStdioConsoleSource extends ISStdioSource {}

export interface ISStdioConsoleSourceSettings extends ISStdioSourceSettings {}

const _nativeLog = console.log;

export default class SStdioConsoleSource
    extends __SStdioSource
    implements ISStdioConsoleSource
{
    _tmpPrintedLogs = [];

    constructor(settings?: Partial<ISStdioConsoleSourceSettings>) {
        super(settings);

        const nativeConsole = {};
        for (let key of ['log', 'error', 'warn', 'verbose']) {
            nativeConsole[key] = console[key] ?? nativeConsole.log;
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
                        type: __SLog[`TYPE_${key.toUpperCase()}`],
                        value: log.value ?? log,
                        group: log.group ?? group,
                        // @ts-ignore
                        logger: nativeConsole[key],
                    });
                });

                args.forEach((log) => {
                    this.log(log);
                });
            };
        }

        // @ts-ignore
        console.ask = async (askObj: ISLogAsj) => {
            return await this.ask(askObj);
        };

        // source ready
        setTimeout(() => {
            this.ready();
        }, 1000);
    }
}
