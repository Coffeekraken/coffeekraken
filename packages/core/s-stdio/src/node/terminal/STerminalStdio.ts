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
import * as __readline from 'readline';
import __blessed from 'blessed';
import __availableColors from '@coffeekraken/sugar/shared/dev/color/availableColors';
import __hotkey from '@coffeekraken/sugar/node/keyboard/hotkey';
import __ora from 'ora';
import __packageJson from '@coffeekraken/sugar/node/package/jsonSync';

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

export interface ISTerminalStdioLogsContainer {
    id: string;
    collapsed: boolean;
    box: any;
    left: any;
    top: any;
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

    _currentLine = 0;

    _screen;

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
        settings?: ISTerminalStdioCtorSettings,
    ) {
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

        const packageJson = __packageJson();

        this._screen = __blessed.screen({
            smartCSR: true,
            autoPadding: true,
            title: `Coffeekraken | ${packageJson.name}`,
        });
        this._screen.enableInput();

        // this._screen.render();

        this.display();

        setTimeout(() => {
            this._log({
                group: 'Global',
                value: '',
            });
        }, 100);
    }

    clearLast() {
        // __terminalKit.previousLine();
        // __terminalKit.eraseLine();
    }

    clear() {
        this._currentLine = 0;
        process.stdout.write('\x1Bc');
    }

    _render() {
        let currentTop = 0,
            collapsedCount = 0,
            boxesCount = Object.keys(this._logsStack).length,
            availableHeight = this._screen.height;
        this._logsStack.forEach((logsStack, i) => {
            if (logsStack.collapsed) {
                collapsedCount++;
                availableHeight--;
            }
        });

        const newHeight = Math.floor(
            availableHeight / (boxesCount - collapsedCount),
        );

        this._logsStack.forEach((logsStack, i) => {
            logsStack.box.height = logsStack.collapsed ? 1 : newHeight;
            logsStack.box.top = currentTop;
            logsStack.left.height = logsStack.box.height;
            logsStack.left.top = currentTop;
            logsStack.top.top = currentTop;
            currentTop += logsStack.box.height;
        });

        // setTimeout(() => {
        this._screen.render();
        // });
    }

    _renderTop(box, title, content) {
        let ora = box._ora ?? __ora('');
        box._ora = ora;

        let statusChar = '';
        if (box._status === 'success') {
            statusChar = '{green-fg}✓{/green-fg}';
        } else if (box._status === 'error') {
            statusChar = '<red>✖</red>';
        } else {
            statusChar = ora.frame().slice(0, -1);
        }
        box.setContent(
            __parseHtml(
                ` {black-bg} ${statusChar} ${title} {/black-bg}{|}${
                    content ? `{black-bg} ${content} {/black-bg}` : ''
                }`,
            ),
        );
        this._render();

        if (box._status === 'running') {
            box._renderTopTimeout = setTimeout(() => {
                this._renderTop(box, title, content);
            }, 1000 / 10);
        } else {
            clearTimeout(box._renderTopTimeout);
        }
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
    _logsStack: ISTerminalStdioLogsContainer[] = [];
    // @ts-ignore
    _log(logObj, component?) {
        if (!component) {
            component =
                this.constructor.registeredComponents[this.constructor.name]
                    .default.component;
        }

        // handle empty logs
        if (!logObj) return;

        if (!logObj.group) {
            if (logObj.metas.id === 'SPromise') {
                logObj.group = 'Global';
            } else {
                logObj.group = logObj.metas.id;
            }
        }

        let logStack = this._logsStack.filter(
            (logStack) => logStack.group === logObj.group,
        )[0];
        if (!logStack) {
            logStack = {
                group: logObj.group,
                collapsed: false,
                box: undefined,
                top: undefined,
                left: undefined,
            };

            const color = __availableColors()[this._logsStack.length];
            logStack.box = __blessed.box({
                content: '',
                left: 1,
                width: '100%',
                height: 1,
                padding: {
                    top: 1,
                    left: 2,
                    right: 2,
                    bottom: 1,
                },
                scrollable: true,
                alwaysScroll: true,
                scrollbar: {
                    ch: '',
                    // inverse: true,
                },
                style: {
                    scrollbar: {
                        // bg: color ?? 'yellow',
                    },
                },
            });
            logStack.left = __blessed.box({
                left: 0,
                width: 1,
                height: 1,
                style: {
                    bg: color ?? 'yellow',
                },
            });
            logStack.top = __blessed.box({
                left: 0,
                width: '100%',
                height: 1,
                tags: true,
                style: {
                    bg: color ?? 'yellow',
                },
            });

            logStack.top._status = 'running';
            this._renderTop(logStack.top, logObj.group, null);

            this._logsStack.splice(this._logsStack.length - 1, 0, logStack);

            logStack.top.on('click', () => {
                logStack.collapsed = !logStack.collapsed;
                this._render();
            });

            this._screen.append(logStack.box);
            this._screen.append(logStack.left);
            this._screen.append(logStack.top);
        }

        if (logObj.type === 'summary') {
            logStack.top._status = logObj.value.status ?? 'success';
            if (logObj.value.collapse) {
                logStack.collapsed = true;
            }
            this._renderTop(logStack.top, logObj.group, logObj.value.value);
            return this._render();
        }

        let renderedStr = component.render(logObj, this._settings);

        // log the string
        logStack.box.insertBottom(__parseHtml(renderedStr));
        // logStack.box.setScrollPerc(100);

        this._render();
    }

    _draw() {}

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
