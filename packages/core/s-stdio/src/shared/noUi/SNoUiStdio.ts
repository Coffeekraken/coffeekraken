import __inquirer from 'inquirer';
import { ISEventEmitter } from '@coffeekraken/s-event-emitter';
// import __SNotification from '../../notification/SNotification';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SStdio, { ISStdioSettings } from '../SStdio';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import { terminal as __terminalKit } from 'terminal-kit';
import __countLine from '@coffeekraken/sugar/shared/string/countLine';
import __splitEvery from '@coffeekraken/sugar/shared/string/splitEvery';
import __SPromise from '@coffeekraken/s-promise';
import * as __Enquirer from 'enquirer';
import * as __readline from 'readline';
import __blessed from 'blessed';
import __availableColors from '@coffeekraken/sugar/shared/dev/color/availableColors';
import __hotkey from '@coffeekraken/sugar/node/keyboard/hotkey';
import __ora from 'ora';
import __packageJson from '@coffeekraken/sugar/node/package/jsonSync';
import __countLines from '@coffeekraken/sugar/node/terminal/countLines';
import __SLog, { ISLog } from '@coffeekraken/s-log';
import __getColorFor from '@coffeekraken/sugar/shared/dev/color/getColorFor';
import __isChildProcess from '@coffeekraken/sugar/node/is/childProcess';

/**
 * @name            SNoUiStdio
 * @namespace       s-stdio.terminal
 * @type            Class
 *
 * This class represent a "terminal" strandard in out interface.
 *
 * @param         {SEventEmitter[]}            sources           An array of sources to display with this Stdio instance
 * @param         {Object}              [settings={}]     The settings object to configure your SStdio
 *
 * @todo        Integrate notifications
 *
 * @example         js
 * import SNoUiStdio from '@coffeekraken/s-stdio';
 * const terminal = new SNoUiStdio(mySource);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISNoUiStdioCtorSettings {
    noUiStdio?: Partial<ISNoUiStdioSettings>;
}

export interface ISNoUiStdioLogsContainer {}

export interface ISNoUiStdioSettings {}

export interface ISNoUiStdio {}

class SNoUiStdio extends __SStdio implements ISNoUiStdio {
    /**
     * @name      noUiStdioSettings
     * @type      ISNoUiStdioSettings
     * @get
     *
     * Access the stdio settings
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get noUiStdioSettings(): ISNoUiStdioSettings {
        return (<any>this)._settings.noUiStdio;
    }

    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(
        id: string,
        sources: ISEventEmitter | ISEventEmitter[],
        settings?: ISNoUiStdioCtorSettings,
    ) {
        super(
            id,
            sources,
            __deepMerge(
                {
                    noUiStdio: {},
                },
                settings || {},
            ),
        );

        this.display();
    }

    clearLast() {
        // __terminalKit.previousLine();
        // __terminalKit.eraseLine();
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _currentLogId = '';
    _lastLogLinesCount = 0;
    _lastLogObj;
    _loggedGroups: any = {};
    _logsStack: ISNoUiStdioLogsContainer[] = [];
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
            console.log(`<bg${__upperFirst(groupObj.color)}><black> ${logObj.group} </black></bg${__upperFirst(groupObj.color)}><${groupObj.color}>${'-'.repeat(process.stdout.columns - 2 - logObj.group.length)}</${groupObj.color}>`);
            console.log(groupObj.prefix);
        }

        if (logObj.clear && this._lastLogObj?.type !== __SLog.TYPE_WARN && this._lastLogObj?.type !== __SLog.TYPE_ERROR) {
            process.stdout.moveCursor(0, this._lastLogLinesCount * -1) // up one line
            process.stdout.clearLine(1) // from cursor to end
        }

        let logLinesCount = 0;

        if (logObj.margin?.top) {
            for(let i=0; i<logObj.margin.top; i++) {
                console.log(`<${groupObj.color}>█</${groupObj.color}>`);
            }
            logLinesCount += logObj.margin.top;
        }

        const log = `<${groupObj.color}>█</${groupObj.color}> ${__parseHtml(component.render(logObj, this.noUiStdioSettings))}`;
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
        this._lastLogLinesCount = logLinesCount;
        this._lastLogObj = logObj;
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                    prompt = new __Enquirer.default.Select({
                        ...askObj,
                    });
                    res = await prompt.run();
                    break;
                case 'autocomplete':
                    // @ts-ignore
                    prompt = new __Enquirer.default.AutoComplete({
                        ...askObj,
                        prefix: groupObj.prefix,
                        choices: askObj.choices.map(choice => {
                            return `${groupObj.prefix} ${choice}`;
                        })
                    });
                    res = await prompt.run();
                    break;
                case 'confirm':
                    // @ts-ignore
                    prompt = new __Enquirer.default.Confirm({
                        ...askObj,
                    });
                    res = await prompt.run();
                    break;
                case 'form':
                    // @ts-ignore
                    prompt = new __Enquirer.default.Form({
                        ...askObj,
                    });
                    res = await prompt.run();
                    break;
                case 'input':
                    // @ts-ignore
                    prompt = new __Enquirer.default.Input({
                        ...askObj,
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
                    prompt = new __Enquirer.default.Secret({
                        ...askObj,
                    });
                    res = await prompt.run();
                    break;
                case 'list':
                    // @ts-ignore
                    prompt = new __Enquirer.default.List({
                        ...askObj,
                    });
                    res = await prompt.run();
                    break;
                case 'multiselect':
                    // @ts-ignore
                    prompt = new __Enquirer.default.MultiSelect({
                        ...askObj,
                    });
                    res = await prompt.run();
                    break;
                case 'number':
                    // @ts-ignore
                    prompt = new __Enquirer.default.NumberPrompt({
                        ...askObj,
                    });
                    res = await prompt.run();
                    break;
                case 'password':
                    // @ts-ignore
                    prompt = new __Enquirer.default.Password({
                        ...askObj,
                    });
                    res = await prompt.run();
                    break;
                case 'toggle':
                    // @ts-ignore
                    prompt = new __Enquirer.default.Toggle({
                        ...askObj,
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

import __defaultNoUiStdioComponent from './components/defaultNoUiStdioComponent';
import __summaryNoUiStdioComponent from './components/summaryNoUiStdioComponent';
import __errorNoUiStdioComponent from './components/errorNoUiStdioComponent';
import logConfig from '@coffeekraken/s-sugar-config/src/config/log.config';

SNoUiStdio.registerComponent(__defaultNoUiStdioComponent);
SNoUiStdio.registerComponent(__summaryNoUiStdioComponent);
SNoUiStdio.registerComponent(__errorNoUiStdioComponent);

export default SNoUiStdio;
