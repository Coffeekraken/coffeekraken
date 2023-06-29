import __SEnv from '@coffeekraken/s-env';
import type { ISLog, ISLogAsk } from '@coffeekraken/s-log';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import { __parseHtml } from '@coffeekraken/sugar/console';
import { __wait } from '@coffeekraken/sugar/datetime';
import { __getColorFor } from '@coffeekraken/sugar/dev';
import { __clone, __deepMerge } from '@coffeekraken/sugar/object';
import { __stripAnsi, __upperFirst } from '@coffeekraken/sugar/string';
import { __countLines, __termSize } from '@coffeekraken/sugar/terminal';
import * as __Enquirer from 'enquirer';
import __SStdioAdapter from '../../shared/SStdioAdapter';

/**
 * @name            SStdioBasicAdapter
 * @namespace       node.basic
 * @type            Class
 * @platform        node
 * @status          beta
 * @private
 *
 * This class represent a "basic" terminal strandard in out interface.
 *
 * @param         {SEventEmitter[]}            sources           An array of sources to display with this Stdio instance
 * @param         {Object}              [settings={}]     The settings object to configure your SStdio
 *
 * @todo        Integrate notifications
 *
 * @example         js
 * import { __SStdioBasicAdapter } from '@coffeekraken/s-stdio';
 * const terminal = new __SStdioBasicAdapter();
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISStdioBasicAdapterLogsContainer {}

export interface ISStdioBasicAdapterSettings {}

export interface ISBasicStdioAdapter {}

const _nativeConsole = {};
for (let key of ['log', 'error', 'warn', 'verbose']) {
    _nativeConsole[key] = console[key] ?? console.log;
}

export default class SStdioBasicAdapter
    extends __SStdioAdapter
    implements ISBasicStdioAdapter
{
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings?: ISStdioBasicAdapterSettings) {
        super(__deepMerge({}, settings || {}));
    }

    clear() {
        // this._currentLine = 0;
        // process.stdout.write('\x1Bc');
    }

    _getGroupObj(group, log = true) {
        // @ts-ignore
        let groupObj = this._loggedGroups[group];
        if (!groupObj || this._lastLogObj?.group !== group) {
            // @ts-ignore
            groupObj = {
                color: __getColorFor(group),
            };
            groupObj.prefix = __parseHtml(
                `<${groupObj.color}>█</${groupObj.color}>`,
            );
            // @ts-ignore
            this._loggedGroups[group] = groupObj;
        }
        return groupObj;
    }

    /**
     * @name          log
     * @type          Function
     * @private
     *
     * Method that actually log the passed log object with the passed component
     *
     * @param         {ILog}        logObj            The log object to log
     * @param         {ISStdioComponent}      component       The component to use for logging
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _currentLogId = '';
    _lastLogLinesCountStack = [];
    _lastLogObj;
    _loggedGroups: any = {};
    _logsStack: ISStdioBasicAdapterLogsContainer[] = [];
    log(logObj: ISLog) {
        const logger = logObj.logger ?? process.stdout.write;

        // handle empty logs
        if (!logObj) {
            return logger(logObj);
        }

        // filter out the verbose logs
        if (logObj.verbose && !__SEnv.is('verbose')) {
            return;
        }

        const groupObj = this._getGroupObj(logObj.group);

        const termSize = __termSize();

        if (logObj.group !== this._lastLogObj?.group) {
            logger(groupObj.prefix);
            // @ts-ignore

            let repeat = termSize.columns - 2 - (logObj.group?.length ?? 0);
            if (repeat < 0) {
                repeat = 0;
            }

            logger(
                __parseHtml(
                    `<bg${__upperFirst(groupObj.color)}><black> ${
                        logObj.group
                    } </black></bg${__upperFirst(groupObj.color)}><${
                        groupObj.color
                    }>${'-'.repeat(repeat)}</${groupObj.color}>`,
                ),
            );
            logger(groupObj.prefix);
        }

        if (
            logObj.value.clear &&
            this._lastLogObj?.type !== __SLog.TYPE_WARN &&
            this._lastLogObj?.type !== __SLog.TYPE_ERROR
        ) {
            if (typeof logObj.value.clear === 'number') {
                // @ts-ignore
                const toClear = this._lastLogLinesCountStack
                    .slice(logObj.value.clear * -1)
                    .reduce((a, b) => a + b);
                process.stdout.moveCursor(0, toClear * -1); // up one line
                process.stdout.clearScreenDown();
            } else {
                process.stdout.moveCursor(
                    0,
                    this._lastLogLinesCountStack.slice(-1)[0] * -1,
                ); // up one line
                process.stdout.clearLine(1); // from cursor to end
            }
        }

        let logLinesCount = 0;

        if (logObj.margin?.top) {
            for (let i = 0; i < logObj.margin.top; i++) {
                logger(__parseHtml(`<${groupObj.color}>█</${groupObj.color}>`));
            }
            logLinesCount += logObj.margin.top;
        }

        let toLog = logObj.value?.value ?? logObj.value ?? logObj;

        if (typeof toLog === 'string') {
            toLog = __parseHtml(
                `<${groupObj.color}>█</${groupObj.color}>   ${toLog}`,
            );
            logLinesCount += __countLines(toLog);
        }

        logger(toLog);

        if (logObj.margin?.bottom) {
            for (let i = 0; i < logObj.margin.bottom; i++) {
                logger(__parseHtml(`<${groupObj.color}>█</${groupObj.color}>`));
            }
            // @ts-ignore
            logLinesCount += logObj.margin.top;
        }

        // @ts-ignore)
        this._lastLogLinesCountStack.push(logLinesCount);
        this._lastLogObj = logObj;
    }

    _getPromptClass(BasePromptClass: any): any {
        return class MyPrompt extends BasePromptClass {
            constructor(options) {
                super({
                    ...options,
                    format(str) {
                        if (typeof str !== 'string') return str;
                        return str.replace(
                            `${__parseHtml(
                                `<${this.options.color ?? 'yellow'}>█</${
                                    this.options.color ?? 'yellow'
                                }>`,
                            )}`,
                            '',
                        );
                    },
                });

                if (this.options.choices) {
                    this.options.choices = this.options.choices?.map(
                        (choice) => {
                            return `${__parseHtml(
                                `<${this.options.color ?? 'yellow'}>█</${
                                    this.options.color ?? 'yellow'
                                }>`,
                            )} ${choice}`;
                        },
                    );
                }

                this.symbols = this.symb(
                    __clone(this.symbols, {
                        deep: true,
                    }),
                );
            }
            symb(obj) {
                for (let [key, value] of Object.entries(obj)) {
                    if (
                        [
                            'ellipsis',
                            'ellipsisLarge',
                            'ellipsisSmall',
                            'question',
                            'questionFull',
                            'questionSmall',
                            'pointerSmall',
                        ].includes(key)
                    )
                        continue;
                    if (value === '›') continue;
                    if (value === '%') continue;
                    if (typeof value !== 'string') {
                        obj[key] = this.symb(value);
                        continue;
                    }
                    if (obj[key].includes('█')) {
                        obj[key] = __stripAnsi(obj[key]);
                        obj[key] = obj[key].replace(/█\s?/, '');
                    }
                    obj[key] = `${__parseHtml(
                        `<${this.options.color ?? 'yellow'}>█</${
                            this.options.color ?? 'yellow'
                        }>`,
                    )} ${value}`;
                }
                return obj;
            }
        };
    }

    /**
     * @name          _ask
     * @type          Function
     * @private
     *
     * Method that actually log the passed log object with the passed component
     *
     * @param         {ILogAsk}        askObj            The ask object to ask to the user
     * @param         {ISStdioComponent}      component       The component to use for logging
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    ask(askObj: ISLogAsk) {
        return new __SPromise(async ({ resolve, reject, emit }) => {
            let prompt, res;

            await __wait(1000);

            // transform html in message
            askObj.message = __parseHtml(askObj.message);

            const groupObj = this._getGroupObj(askObj.group);

            switch (askObj.type) {
                case 'select':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(
                        __Enquirer.default.Select,
                    ))({
                        ...askObj,
                        color: groupObj.color,
                    });
                    res = await prompt.run();
                    break;
                case 'autocomplete':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(
                        __Enquirer.default.AutoComplete,
                    ))({
                        ...askObj,
                        color: groupObj.color,
                        choices: askObj.choices,
                    });
                    res = await prompt.run();
                    break;
                case 'confirm':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(
                        __Enquirer.default.Confirm,
                    ))({
                        ...askObj,
                        color: groupObj.color,
                    });
                    res = await prompt.run();
                    break;
                case 'form':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(
                        __Enquirer.default.Form,
                    ))({
                        ...askObj,
                        color: groupObj.color,
                    });
                    res = await prompt.run();
                    break;
                case 'input':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(
                        __Enquirer.default.Input,
                    ))({
                        ...askObj,
                        color: groupObj.color,
                        validate(value) {
                            if (!askObj.pattern) return true;
                            const pattern = Array.isArray(askObj.pattern)
                                ? askObj.pattern
                                : [askObj.pattern];
                            const reg = new RegExp(pattern[0], pattern[1]);
                            return reg.test(value);
                        },
                    });
                    res = await prompt.run();
                    break;
                case 'secret':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(
                        __Enquirer.default.Secret,
                    ))({
                        ...askObj,
                        color: groupObj.color,
                    });
                    res = await prompt.run();
                    break;
                case 'list':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(
                        __Enquirer.default.List,
                    ))({
                        ...askObj,
                        color: groupObj.color,
                    });
                    res = await prompt.run();
                    break;
                case 'multiselect':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(
                        __Enquirer.default.MultiSelect,
                    ))({
                        ...askObj,
                        color: groupObj.color,
                    });
                    res = await prompt.run();
                    break;
                case 'number':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(
                        __Enquirer.default.NumberPrompt,
                    ))({
                        ...askObj,
                        color: groupObj.color,
                    });
                    res = await prompt.run();
                    break;
                case 'password':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(
                        __Enquirer.default.Password,
                    ))({
                        ...askObj,
                        color: groupObj.color,
                    });
                    res = await prompt.run();
                    break;
                case 'toggle':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(
                        __Enquirer.default.Toggle,
                    ))({
                        ...askObj,
                        color: groupObj.color,
                    });
                    res = await prompt.run();
                    break;
                default:
                    throw new Error(`Unknown ask type ${askObj.type}`);
                    break;
            }
            if (typeof res === 'string') {
                res = res.replace(groupObj.prefix, '').trim();
            }
            resolve(res);
        });
    }
}
