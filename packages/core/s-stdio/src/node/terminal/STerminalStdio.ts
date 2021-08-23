import __inquirer from 'inquirer';
import { ISEventEmitter } from '@coffeekraken/s-event-emitter';
// import __SNotification from '../../notification/SNotification';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SStdio, { ISStdioSettings } from '../../shared/SStdio';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import { terminal as __terminalKit } from 'terminal-kit';
import __countLine from '@coffeekraken/sugar/shared/string/countLine';
import __splitEvery from '@coffeekraken/sugar/shared/string/splitEvery';
import __SPromise from '@coffeekraken/s-promise';
import * as __Enquirer from 'enquirer';

/**
 * @name            STerminalStdio
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
 * import STerminalStdio from '@coffeekraken/s-stdio';
 * const terminal = new STerminalStdio(mySource);
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISTerminalStdioCtorSettings {
    terminalStdio?: Partial<ISTerminalStdioSettings>;
}

export interface ISTerminalStdioSettings {}

export interface ISTerminalStdio {}

class STerminalStdio extends __SStdio implements ISTerminalStdio {
    /**
     * @name      terminalStdioSettings
     * @type      ISTerminalStdioSettings
     * @get
     *
     * Access the stdio settings
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get terminalStdioSettings(): ISTerminalStdioSettings {
        return (<any>this)._settings.terminalStdio;
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
    constructor(id: string, sources: ISEventEmitter | ISEventEmitter[], settings?: ISTerminalStdioCtorSettings) {
        super(
            id,
            sources,
            __deepMerge(
                {
                    terminalStdio: {
                        icons: true,
                    },
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
        process.stdout.write('\x1Bc');
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
    _log(logObj, component) {
        // handle empty logs
        if (!logObj) return;

        if (!logObj.decorators) {
            console.log(__parseHtml(logObj.value));
            return;
        }

        let needId = false;
        if (logObj.metas?.emitter?.metas?.id && this._currentLogId !== logObj.metas?.emitter?.metas?.id) {
            needId = true;
            this._currentLogId = logObj.metas.emitter.metas.id;
        }

        let lineStart = '',
            idStr = '',
            idSeparator = '';

        // render the component
        let renderedStr = component.render(logObj, this._settings);
        // handle metas if needed
        if (!logObj.nude) {
            if (logObj.metas?.emitter) {
                lineStart = `<bg${__upperFirst(logObj.metas.emitter.metas.color || 'yellow')}> </bg${__upperFirst(
                    logObj.metas.emitter.metas.color || 'yellow',
                )}>`;
                idStr = `<${logObj.metas.emitter.metas.color || 'yellow'}> ${logObj.metas.emitter.metas.id}</${
                    logObj.metas.emitter.metas.color || 'yellow'
                }>`;
                idSeparator = `<${logObj.metas.emitter.metas.color || 'yellow'}> │ </${
                    logObj.metas.emitter.metas.color || 'yellow'
                }>`;
            }
        }
        if (logObj.marginTop && typeof logObj.marginTop === 'number') {
            renderedStr = '\n'.repeat(logObj.marginTop) + renderedStr;
        }
        if (logObj.marginBottom && typeof logObj.marginBottom === 'number') {
            renderedStr = renderedStr + '\n'.repeat(logObj.marginBottom);
        }

        if (needId) {
            console.log(__parseHtml(lineStart));
        }

        let lines = renderedStr.split('\n');
        const idLength = __countLine(__parseHtml(idStr)),
            idSeparatorLength = __countLine(__parseHtml(idSeparator)),
            lineStartLength = __countLine(__parseHtml(lineStart));
        const maxLineLenght = process.stdout.columns - idLength - idSeparatorLength - lineStartLength;

        let finalLines: string[] = [];

        lines.forEach((line, i) => {
            if (line.includes('-%-')) {
                finalLines.push(line.replace('-%-', '-'.repeat(maxLineLenght)));
            } else if (__countLine(line) > maxLineLenght) {
                __splitEvery(line, maxLineLenght).forEach((l, j) => {
                    finalLines.push(l.trim());
                });
            } else {
                finalLines.push(line.trim());
            }
        });

        finalLines = finalLines.map((line) => {
            if (needId) {
                needId = false;
                return `${lineStart}${idStr}${idSeparator}${line.trim()}`;
            } else {
                return `${lineStart}${' '.repeat(idLength)}${idSeparator}${line.trim()}`;
            }
        });

        // log the string
        try {
            console.log(__parseHtml(finalLines.join('\n')));
        } catch (e) {}
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
            }
            resolve(res);
        });
    }
}

import __defaultTerminalStdioComponent from './components/defaultTerminalStdioComponent';
import __errorTerminalStdioComponent from './components/errorTerminalStdioComponent';
import __fileTerminalStdioComponent from './components/fileTerminalStdioComponent';
import __headingTerminalStdioComponent from './components/headingTerminalStdioComponent';
import __separatorTerminalStdioComponent from './components/separatorTerminalStdioComponent';
import __timeTerminalStdioComponent from './components/timeTerminalStdioComponent';
import __warningTerminalStdioComponent from './components/warningTerminalStdioComponent';

STerminalStdio.registerComponent(__defaultTerminalStdioComponent);
STerminalStdio.registerComponent(__separatorTerminalStdioComponent);
STerminalStdio.registerComponent(__headingTerminalStdioComponent);
STerminalStdio.registerComponent(__errorTerminalStdioComponent);
STerminalStdio.registerComponent(__fileTerminalStdioComponent);
STerminalStdio.registerComponent(__warningTerminalStdioComponent);
STerminalStdio.registerComponent(__timeTerminalStdioComponent);

export default STerminalStdio;
