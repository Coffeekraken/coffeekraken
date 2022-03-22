// import __inquirer from 'inquirer';
import { ISEventEmitter } from '@coffeekraken/s-event-emitter';
import __SLog, { ISLog } from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __countLines from '@coffeekraken/sugar/node/terminal/countLines';
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __getColorFor from '@coffeekraken/sugar/shared/dev/color/getColorFor';
import __clone from '@coffeekraken/sugar/shared/object/clone';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __stripAnsi from '@coffeekraken/sugar/shared/string/stripAnsi';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
import * as __Enquirer from 'enquirer';
import __SStdio from '../../shared/SStdio';
import __defaultBasicStdioComponent from './components/defaultBasicStdioComponent';
import __errorBasicStdioComponent from './components/errorBasicStdioComponent';

/**
 * @name            SBasicStdio
 * @namespace       node.basic
 * @type            Class
 *
 * This class represent a "basic" terminal strandard in out interface.
 *
 * @param         {SEventEmitter[]}            sources           An array of sources to display with this Stdio instance
 * @param         {Object}              [settings={}]     The settings object to configure your SStdio
 *
 * @todo        Integrate notifications
 *
 * @example         js
 * import SBasicStdio from '@coffeekraken/s-stdio';
 * const terminal = new SBasicStdio(mySource);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISBasicStdioCtorSettings {
    basicStdio?: Partial<ISBasicStdioSettings>;
}

export interface ISBasicStdioLogsContainer {}

export interface ISBasicStdioSettings {}

export interface ISBasicStdio {}

class SBasicStdio extends __SStdio implements ISBasicStdio {
    /**
     * @name      basicStdioSettings
     * @type      ISBasicStdioSettings
     * @get
     *
     * Access the stdio settings
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get basicStdioSettings(): ISBasicStdioSettings {
        return (<any>this)._settings.basicStdio;
    }

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
    constructor(
        id: string,
        sources: ISEventEmitter | ISEventEmitter[],
        settings?: ISBasicStdioCtorSettings,
    ) {
        super(
            id,
            sources,
            __deepMerge(
                {
                    basicStdio: {},
                },
                settings || {},
            ),
        );

        this.display();
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
                color: __getColorFor(group)
            };
            groupObj.prefix = __parseHtml(`<${groupObj.color}>█</${groupObj.color}>`);
            // @ts-ignore
            this._loggedGroups[group] = groupObj;
        }
        return groupObj;

    }

    /**
     * @name          _log
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
    _logsStack: ISBasicStdioLogsContainer[] = [];
    _log(logObj: ISLog, component) {
        // handle empty logs
        if (!logObj) return;

        if (!logObj.group) {
            // @ts-ignore
            if (logObj.metas.id === 'SPromise') {
                logObj.group = 'Global';
            } else {
                // @ts-ignore
                logObj.group = logObj.metas.id;
            }
        }

        const groupObj = this._getGroupObj(logObj.group);

        if (logObj.group !== this._lastLogObj?.group) {
            console.log(groupObj.prefix);
            // @ts-ignore
            console.log(`<bg${__upperFirst(groupObj.color)}><black> ${logObj.group} </black></bg${__upperFirst(groupObj.color)}><${groupObj.color}>${'-'.repeat(process.stdout.columns - 2 - logObj.group?.length ?? 0)}</${groupObj.color}>`);
            console.log(groupObj.prefix);
        }

        if (logObj.clear && this._lastLogObj?.type !== __SLog.TYPE_WARN && this._lastLogObj?.type !== __SLog.TYPE_ERROR) {
            if (typeof logObj.clear === 'number') {
                // @ts-ignore
                const toClear = this._lastLogLinesCountStack.slice(logObj.clear * -1).reduce((a, b) => a + b);
                process.stdout.moveCursor(0, toClear * -1) // up one line
                process.stdout.clearScreenDown();
                // for (let i = 0; i < toClear; i++) {
                //     process.stdout.clearLine(1); // clear current line
                // }
            } else {
                process.stdout.moveCursor(0, this._lastLogLinesCountStack.slice(-1)[0] * -1) // up one line
                process.stdout.clearLine(1) // from cursor to end
            }
        }

        let logLinesCount = 0;

        if (logObj.margin?.top) {
            for(let i=0; i<logObj.margin.top; i++) {
                console.log(`<${groupObj.color}>█</${groupObj.color}>`);
            }
            logLinesCount += logObj.margin.top;
        }

        const log = `<${groupObj.color}>█</${groupObj.color}>   ${__parseHtml(component.render(logObj, this.basicStdioSettings))}`;
        logLinesCount += __countLines(log);
        console.log(log);

        if (logObj.margin?.bottom) {
            for(let i=0; i<logObj.margin.bottom; i++) {
                console.log(`<${groupObj.color}>█</${groupObj.color}>`);
            }
            // @ts-ignore
            logLinesCount += logObj.margin.top;
        }

        // @ts-ignore)
        this._lastLogLinesCountStack.push(logLinesCount);
        this._lastLogObj = logObj;
    }

    _addPrefix(string: string): string {

    }
    _removePrefix(string: string): string {

    }

    _getPromptClass(BasePromptClass: any): any {
        return class MyPrompt extends BasePromptClass {
            constructor(options) {
                super({
                    ...options,
                    format(str) {
                        if (typeof str !== 'string') return str;
                        return str.replace(`${__parseHtml(`<${this.options.color ?? 'yellow'}>█</${this.options.color ?? 'yellow'}>`)}`, '');
                    }
                });

                if (this.options.choices) {
                    this.options.choices = this.options.choices?.map(choice => {
                        return `${__parseHtml(`<${this.options.color ?? 'yellow'}>█</${this.options.color ?? 'yellow'}>`)} ${choice}`;
                    });
                }


                this.symbols = this.symb(__clone(this.symbols, {
                    deep: true
                }));
            }
            symb(obj) {
                for (let [key, value] of Object.entries(obj)) {
                    if (['ellipsis','ellipsisLarge','ellipsisSmall','question','questionFull','questionSmall','pointerSmall'].includes(key)) continue;
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
                    obj[key] = `${__parseHtml(`<${this.options.color ?? 'yellow'}>█</${this.options.color ?? 'yellow'}>`)} ${value}`;
                }
                return obj;
            }
        }
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
    _ask(askObj) {
        return new __SPromise(async ({ resolve, reject, emit }) => {
            let prompt, res;

            if (!askObj.group) {
                // @ts-ignore
                if (askObj.metas.id === 'SPromise') {
                    askObj.group = 'Global';
                } else {
                    // @ts-ignore
                    askObj.group = askObj.metas.id;
                }
            }

            const groupObj = this._getGroupObj(askObj.group);

            switch (askObj.type) {
                case 'select':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(__Enquirer.default.Select))({
                        ...askObj,
                        color: groupObj.color,
                    });
                    res = await prompt.run();
                    break;
                case 'autocomplete':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(__Enquirer.default.AutoComplete))({
                        ...askObj,
                        color: groupObj.color,
                        choices: askObj.choices,
                    });
                    res = await prompt.run();
                    break;
                case 'confirm':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(__Enquirer.default.Confirm))({
                        ...askObj,
                        color: groupObj.color,
                    });
                    res = await prompt.run();
                    break;
                case 'form':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(__Enquirer.default.Form))({
                        ...askObj,
                        color: groupObj.color,
                    });
                    res = await prompt.run();
                    break;
                case 'input':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(__Enquirer.default.Input))({
                        ...askObj,
                        color: groupObj.color,
                        validate(value) {
                            if (!askObj.pattern) return true;
                            const pattern = Array.isArray(askObj.pattern) ? askObj.pattern : [askObj.pattern];
                            const reg = new RegExp(pattern[0], pattern[1]);
                            return reg.test(value);
                        }
                    });
                    res = await prompt.run();
                    break;
                case 'secret':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(__Enquirer.default.Secret))({
                        ...askObj,
                        color: groupObj.color,
                    });
                    res = await prompt.run();
                    break;
                case 'list':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(__Enquirer.default.List))({
                        ...askObj,
                        color: groupObj.color,
                    });
                    res = await prompt.run();
                    break;
                case 'multiselect':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(__Enquirer.default.MultiSelect))({
                        ...askObj,
                        color: groupObj.color,
                    });
                    res = await prompt.run();
                    break;
                case 'number':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(__Enquirer.default.NumberPrompt))({
                        ...askObj,
                        color: groupObj.color,
                    });
                    res = await prompt.run();
                    break;
                case 'password':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(__Enquirer.default.Password))({
                        ...askObj,
                        color: groupObj.color,
                    });
                    res = await prompt.run();
                    break;
                case 'toggle':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(__Enquirer.default.Toggle))({
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


SBasicStdio.registerComponent(__defaultBasicStdioComponent);
SBasicStdio.registerComponent(__errorBasicStdioComponent);

export default SBasicStdio;
