var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import __SNotification from '../../notification/SNotification';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SStdio from '../../shared/SStdio';
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __SPromise from '@coffeekraken/s-promise';
import * as __Enquirer from 'enquirer';
import __blessed from 'blessed';
import __availableColors from '@coffeekraken/sugar/shared/dev/color/availableColors';
import __ora from 'ora';
import __packageJson from '@coffeekraken/sugar/node/package/jsonSync';
class STerminalStdio extends __SStdio {
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
    constructor(id, sources, settings) {
        super(id, sources, __deepMerge({
            terminalStdio: {
                icons: true,
            },
        }, settings || {}));
        this._currentLine = 0;
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
        this._currentLogId = '';
        this._logsStack = [];
        const packageJson = __packageJson();
        this._screen = __blessed.screen({
            smartCSR: true,
            autoPadding: true,
            title: `Coffeekraken | ${packageJson.name}`
        });
        this._screen.enableInput();
        this._screen.render();
        this._log({
            metas: {
                id: 'Global'
            },
            value: 'Init...'
        });
        this.display();
    }
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
    get terminalStdioSettings() {
        return this._settings.terminalStdio;
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
        let currentTop = 0, collapsedCount = 0, boxesCount = Object.keys(this._logsStack).length, availableHeight = this._screen.height;
        this._logsStack.forEach((logsStack, i) => {
            if (logsStack.collapsed) {
                collapsedCount++;
                availableHeight--;
            }
        });
        const newHeight = Math.floor(availableHeight / (boxesCount - collapsedCount));
        this._logsStack.forEach((logsStack, i) => {
            logsStack.box.height = logsStack.collapsed ? 1 : newHeight;
            logsStack.box.top = currentTop;
            logsStack.borderLeft.height = logsStack.box.height;
            logsStack.borderLeft.top = currentTop;
            logsStack.borderTop.top = currentTop;
            currentTop += logsStack.box.height;
        });
        this._screen.render();
    }
    _renderTop(box, title, content) {
        var _a;
        let ora = (_a = box._ora) !== null && _a !== void 0 ? _a : __ora('');
        box._ora = ora;
        let statusChar = '';
        if (box._status === 'success') {
            statusChar = '{green-fg}✓{/green-fg}';
        }
        else if (box._status === 'error') {
            statusChar = '<red>✖</red>';
        }
        else {
            statusChar = ora.frame().slice(0, -1);
        }
        box.setContent(__parseHtml(` {black-bg} ${statusChar} ${title} {/black-bg}{|}${content ? `{black-bg} ${content} {/black-bg}` : ''}`));
        this._render();
        if (box._status === 'running') {
            box._renderTopTimeout = setTimeout(() => {
                this._renderTop(box, title, content);
            }, 1000 / 10);
        }
        else {
            clearTimeout(box._renderTopTimeout);
        }
    }
    _log(logObj, component) {
        var _a;
        // handle empty logs
        if (!logObj)
            return;
        if (logObj.metas.id === 'SPromise') {
            logObj.metas.id = 'Global';
        }
        let logStack = this._logsStack.filter(logStack => logStack.id === logObj.metas.id)[0];
        if (!logStack) {
            logStack = {
                id: logObj.metas.id,
                collapse: false,
                box: undefined,
                borderTop: undefined,
                borderLeft: undefined
            };
            const color = __availableColors()[this._logsStack.length];
            logStack.box = __blessed.box({
                // top: 0,
                content: '',
                left: 1,
                width: '100%',
                height: 1,
                padding: {
                    top: 1,
                    left: 2,
                    right: 2,
                    bottom: 1
                },
                scrollable: true,
                alwaysScroll: true,
                scrollbar: {
                    ch: '',
                    // inverse: true,
                },
                style: {
                    scrollbar: {
                        bg: color !== null && color !== void 0 ? color : 'yellow',
                    },
                },
            });
            logStack.borderLeft = __blessed.box({
                left: 0,
                width: 1,
                height: 1,
                style: {
                    bg: color !== null && color !== void 0 ? color : 'yellow',
                },
            });
            logStack.borderTop = __blessed.box({
                // content: ` ${__ora('').frame()}  {black-bg} ${logObj.metas.id} {/black-bg}`,
                left: 0,
                width: '100%',
                height: 1,
                tags: true,
                style: {
                    bg: color !== null && color !== void 0 ? color : 'yellow',
                },
            });
            logStack.borderTop._status = 'running';
            this._renderTop(logStack.borderTop, logObj.metas.id, null);
            this._logsStack.push(logStack);
            // this._logsStack[logObj.metas.id] = {
            //     box,
            //     borderLeft,
            //     borderTop,
            //     collapsed: false,
            // };
            logStack.borderTop.on('click', () => {
                logStack.collapsed =
                    !logStack.collapsed;
                this._render();
            });
            this._screen.append(logStack.box);
            this._screen.append(logStack.borderLeft);
            this._screen.append(logStack.borderTop);
        }
        // if (this._logsStack[logObj.metas.id]) {
        //     box = this._logsStack[logObj.metas.id].box;
        //     borderLeft = this._logsStack[logObj.metas.id].borderLeft;
        //     borderTop = this._logsStack[logObj.metas.id].borderTop;
        // } else {
        // }
        if (logObj.type === 'summary') {
            logStack.borderTop._status = (_a = logObj.value.status) !== null && _a !== void 0 ? _a : 'success';
            if (logObj.value.collapse) {
                logStack.collapsed = true;
            }
            this._renderTop(logStack.borderTop, logObj.metas.id, logObj.value.value);
            return this._render();
        }
        let renderedStr = component.render(logObj, this._settings);
        // log the string
        logStack.box.insertBottom(__parseHtml(renderedStr));
        logStack.box.setScrollPerc(100);
        this._render();
    }
    _draw() { }
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
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            let prompt, res;
            switch (askObj.type) {
                case 'select':
                    // @ts-ignore
                    prompt = new __Enquirer.default.Select(Object.assign({}, askObj));
                    res = yield prompt.run();
                    break;
                case 'autocomplete':
                    // @ts-ignore
                    prompt = new __Enquirer.default.AutoComplete(Object.assign({}, askObj));
                    res = yield prompt.run();
                    break;
                case 'confirm':
                    // @ts-ignore
                    prompt = new __Enquirer.default.Confirm(Object.assign({}, askObj));
                    res = yield prompt.run();
                    break;
                case 'form':
                    // @ts-ignore
                    prompt = new __Enquirer.default.Form(Object.assign({}, askObj));
                    res = yield prompt.run();
                    break;
                case 'input':
                    // @ts-ignore
                    prompt = new __Enquirer.default.Input(Object.assign({}, askObj));
                    res = yield prompt.run();
                    break;
                case 'secret':
                    // @ts-ignore
                    prompt = new __Enquirer.default.Secret(Object.assign({}, askObj));
                    res = yield prompt.run();
                    break;
                case 'list':
                    // @ts-ignore
                    prompt = new __Enquirer.default.List(Object.assign({}, askObj));
                    res = yield prompt.run();
                    break;
                case 'multiselect':
                    // @ts-ignore
                    prompt = new __Enquirer.default.MultiSelect(Object.assign({}, askObj));
                    res = yield prompt.run();
                    break;
                case 'number':
                    // @ts-ignore
                    prompt = new __Enquirer.default.NumberPrompt(Object.assign({}, askObj));
                    res = yield prompt.run();
                    break;
                case 'password':
                    // @ts-ignore
                    prompt = new __Enquirer.default.Password(Object.assign({}, askObj));
                    res = yield prompt.run();
                    break;
                case 'toggle':
                    // @ts-ignore
                    prompt = new __Enquirer.default.Toggle(Object.assign({}, askObj));
                    res = yield prompt.run();
                    break;
            }
            resolve(res);
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Rlcm1pbmFsU3RkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVGVybWluYWxTdGRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFFQSxrRUFBa0U7QUFDbEUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxRQUE2QixNQUFNLHFCQUFxQixDQUFDO0FBRWhFLE9BQU8sV0FBVyxNQUFNLDhDQUE4QyxDQUFDO0FBSXZFLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sS0FBSyxVQUFVLE1BQU0sVUFBVSxDQUFDO0FBRXZDLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLGlCQUFpQixNQUFNLHNEQUFzRCxDQUFDO0FBRXJGLE9BQU8sS0FBSyxNQUFNLEtBQUssQ0FBQztBQUN4QixPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQThCdEUsTUFBTSxjQUFlLFNBQVEsUUFBUTtJQW1CakM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDSSxFQUFVLEVBQ1YsT0FBMEMsRUFDMUMsUUFBc0M7UUFFdEMsS0FBSyxDQUNELEVBQUUsRUFDRixPQUFPLEVBQ1AsV0FBVyxDQUNQO1lBQ0ksYUFBYSxFQUFFO2dCQUNYLEtBQUssRUFBRSxJQUFJO2FBQ2Q7U0FDSixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQTlCTixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQStHakI7Ozs7Ozs7Ozs7OztXQVlHO1FBQ0gsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFDbkIsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQTdGWixNQUFNLFdBQVcsR0FBRyxhQUFhLEVBQUUsQ0FBQztRQUVwQyxJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUM7WUFDNUIsUUFBUSxFQUFFLElBQUk7WUFDZCxXQUFXLEVBQUUsSUFBSTtZQUNqQixLQUFLLEVBQUUsa0JBQWtCLFdBQVcsQ0FB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