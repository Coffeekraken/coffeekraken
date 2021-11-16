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
    // @ts-ignore
    _log(logObj, component) {
        var _a;
        if (!component) {
            component =
                this.constructor.registeredComponents[this.constructor.name]
                    .default.component;
        }
        // handle empty logs
        if (!logObj)
            return;
        if (!logObj.group) {
            if (logObj.metas.id === 'SPromise') {
                logObj.group = 'Global';
            }
            else {
                logObj.group = logObj.metas.id;
            }
        }
        let logStack = this._logsStack.filter((logStack) => logStack.group === logObj.group)[0];
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
                    bg: color !== null && color !== void 0 ? color : 'yellow',
                },
            });
            logStack.top = __blessed.box({
                left: 0,
                width: '100%',
                height: 1,
                tags: true,
                style: {
                    bg: color !== null && color !== void 0 ? color : 'yellow',
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
            logStack.top._status = (_a = logObj.value.status) !== null && _a !== void 0 ? _a : 'success';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1Rlcm1pbmFsU3RkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTVGVybWluYWxTdGRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFFQSxrRUFBa0U7QUFDbEUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxRQUE2QixNQUFNLHFCQUFxQixDQUFDO0FBRWhFLE9BQU8sV0FBVyxNQUFNLDhDQUE4QyxDQUFDO0FBSXZFLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sS0FBSyxVQUFVLE1BQU0sVUFBVSxDQUFDO0FBRXZDLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLGlCQUFpQixNQUFNLHNEQUFzRCxDQUFDO0FBRXJGLE9BQU8sS0FBSyxNQUFNLEtBQUssQ0FBQztBQUN4QixPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQXNDdEUsTUFBTSxjQUFlLFNBQVEsUUFBUTtJQW1CakM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDSSxFQUFVLEVBQ1YsT0FBMEMsRUFDMUMsUUFBc0M7UUFFdEMsS0FBSyxDQUNELEVBQUUsRUFDRixPQUFPLEVBQ1AsV0FBVyxDQUNQO1lBQ0ksYUFBYSxFQUFFO2dCQUNYLEtBQUssRUFBRSxJQUFJO2FBQ2Q7U0FDSixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQTlCTixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQTJIakI7Ozs7Ozs7Ozs7OztXQVlHO1FBQ0gsa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFDbkIsZUFBVSxHQUFtQyxFQUFFLENBQUM7UUF6RzVDLE1BQU0sV0FBVyxHQUFHLGFBQWEsRUFBRSxDQUFDO1FBRXBDLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztZQUM1QixRQUFRLEVBQUUsSUFBSTtZQUNkLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLEtBQUssRUFBRSxrQkFBa0IsV0FBVyxD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