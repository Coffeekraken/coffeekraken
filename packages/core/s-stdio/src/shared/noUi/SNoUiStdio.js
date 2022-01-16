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
import __SStdio from '../SStdio';
import __upperFirst from '@coffeekraken/sugar/shared/string/upperFirst';
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __SPromise from '@coffeekraken/s-promise';
import * as __Enquirer from 'enquirer';
import __clone from '@coffeekraken/sugar/shared/object/clone';
import __stripAnsi from '@coffeekraken/sugar/shared/string/stripAnsi';
import __countLines from '@coffeekraken/sugar/node/terminal/countLines';
import __SLog from '@coffeekraken/s-log';
import __getColorFor from '@coffeekraken/sugar/shared/dev/color/getColorFor';
class SNoUiStdio extends __SStdio {
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
            noUiStdio: {},
        }, settings || {}));
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
        this._lastLogLinesCount = 0;
        this._loggedGroups = {};
        this._logsStack = [];
        this.display();
    }
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
    get noUiStdioSettings() {
        return this._settings.noUiStdio;
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
        var _a;
        // @ts-ignore
        let groupObj = this._loggedGroups[group];
        if (!groupObj || ((_a = this._lastLogObj) === null || _a === void 0 ? void 0 : _a.group) !== group) {
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
    _log(logObj, component) {
        var _a, _b, _c, _d, _e;
        // handle empty logs
        if (!logObj)
            return;
        if (!logObj.group) {
            // @ts-ignore
            if (logObj.metas.id === 'SPromise') {
                logObj.group = 'Global';
            }
            else {
                // @ts-ignore
                logObj.group = logObj.metas.id;
            }
        }
        const groupObj = this._getGroupObj(logObj.group);
        if (logObj.group !== ((_a = this._lastLogObj) === null || _a === void 0 ? void 0 : _a.group)) {
            console.log(groupObj.prefix);
            // @ts-ignore
            console.log(`<bg${__upperFirst(groupObj.color)}><black> ${logObj.group} </black></bg${__upperFirst(groupObj.color)}><${groupObj.color}>${'-'.repeat(process.stdout.columns - 2 - logObj.group.length)}</${groupObj.color}>`);
            console.log(groupObj.prefix);
        }
        if (logObj.clear && ((_b = this._lastLogObj) === null || _b === void 0 ? void 0 : _b.type) !== __SLog.TYPE_WARN && ((_c = this._lastLogObj) === null || _c === void 0 ? void 0 : _c.type) !== __SLog.TYPE_ERROR) {
            process.stdout.moveCursor(0, this._lastLogLinesCount * -1); // up one line
            process.stdout.clearLine(1); // from cursor to end
        }
        let logLinesCount = 0;
        if ((_d = logObj.margin) === null || _d === void 0 ? void 0 : _d.top) {
            for (let i = 0; i < logObj.margin.top; i++) {
                console.log(`<${groupObj.color}>█</${groupObj.color}>`);
            }
            logLinesCount += logObj.margin.top;
        }
        const log = `<${groupObj.color}>█</${groupObj.color}> ${__parseHtml(component.render(logObj, this.noUiStdioSettings))}`;
        logLinesCount += __countLines(log);
        console.log(log);
        if ((_e = logObj.margin) === null || _e === void 0 ? void 0 : _e.bottom) {
            for (let i = 0; i < logObj.margin.bottom; i++) {
                console.log(`<${groupObj.color}>█</${groupObj.color}>`);
            }
            // @ts-ignore
            logLinesCount += logObj.margin.top;
        }
        // @ts-ignore)
        this._lastLogLinesCount = logLinesCount;
        this._lastLogObj = logObj;
    }
    _addPrefix(string) {
    }
    _removePrefix(string) {
    }
    _getPromptClass(BasePromptClass) {
        return class MyPrompt extends BasePromptClass {
            constructor(options) {
                var _a;
                super(Object.assign(Object.assign({}, options), { format(str) {
                        var _a, _b;
                        if (typeof str !== 'string')
                            return str;
                        return str.replace(`${__parseHtml(`<${(_a = this.options.color) !== null && _a !== void 0 ? _a : 'yellow'}>█</${(_b = this.options.color) !== null && _b !== void 0 ? _b : 'yellow'}>`)}`, '');
                    } }));
                if (this.options.choices) {
                    this.options.choices = (_a = this.options.choices) === null || _a === void 0 ? void 0 : _a.map(choice => {
                        var _a, _b;
                        return `${__parseHtml(`<${(_a = this.options.color) !== null && _a !== void 0 ? _a : 'yellow'}>█</${(_b = this.options.color) !== null && _b !== void 0 ? _b : 'yellow'}>`)} ${choice}`;
                    });
                }
                this.symbols = this.symb(__clone(this.symbols, {
                    deep: true
                }));
            }
            symb(obj) {
                var _a, _b;
                for (let [key, value] of Object.entries(obj)) {
                    if (['ellipsis', 'ellipsisLarge', 'ellipsisSmall', 'question', 'questionFull', 'questionSmall', 'pointerSmall'].includes(key))
                        continue;
                    if (value === '›')
                        continue;
                    if (value === '%')
                        continue;
                    if (typeof value !== 'string') {
                        obj[key] = this.symb(value);
                        continue;
                    }
                    if (obj[key].includes('█')) {
                        obj[key] = __stripAnsi(obj[key]);
                        obj[key] = obj[key].replace(/█\s?/, '');
                    }
                    obj[key] = `${__parseHtml(`<${(_a = this.options.color) !== null && _a !== void 0 ? _a : 'yellow'}>█</${(_b = this.options.color) !== null && _b !== void 0 ? _b : 'yellow'}>`)} ${value}`;
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _ask(askObj) {
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            let prompt, res;
            if (!askObj.group) {
                // @ts-ignore
                if (askObj.metas.id === 'SPromise') {
                    askObj.group = 'Global';
                }
                else {
                    // @ts-ignore
                    askObj.group = askObj.metas.id;
                }
            }
            const groupObj = this._getGroupObj(askObj.group);
            switch (askObj.type) {
                case 'select':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(__Enquirer.default.Select))(Object.assign(Object.assign({}, askObj), { color: groupObj.color }));
                    res = yield prompt.run();
                    break;
                case 'autocomplete':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(__Enquirer.default.AutoComplete))(Object.assign(Object.assign({}, askObj), { color: groupObj.color, choices: askObj.choices }));
                    res = yield prompt.run();
                    break;
                case 'confirm':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(__Enquirer.default.Confirm))(Object.assign(Object.assign({}, askObj), { color: groupObj.color }));
                    res = yield prompt.run();
                    break;
                case 'form':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(__Enquirer.default.Form))(Object.assign(Object.assign({}, askObj), { color: groupObj.color }));
                    res = yield prompt.run();
                    break;
                case 'input':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(__Enquirer.default.Input))(Object.assign(Object.assign({}, askObj), { color: groupObj.color, validate(value) {
                            if (!askObj.pattern)
                                return true;
                            const pattern = Array.isArray(askObj.pattern) ? askObj.pattern : [askObj.pattern];
                            const reg = new RegExp(pattern[0], pattern[1]);
                            return reg.test(value);
                        } }));
                    res = yield prompt.run();
                    break;
                case 'secret':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(__Enquirer.default.Secret))(Object.assign(Object.assign({}, askObj), { color: groupObj.color }));
                    res = yield prompt.run();
                    break;
                case 'list':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(__Enquirer.default.List))(Object.assign(Object.assign({}, askObj), { color: groupObj.color }));
                    res = yield prompt.run();
                    break;
                case 'multiselect':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(__Enquirer.default.MultiSelect))(Object.assign(Object.assign({}, askObj), { color: groupObj.color }));
                    res = yield prompt.run();
                    break;
                case 'number':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(__Enquirer.default.NumberPrompt))(Object.assign(Object.assign({}, askObj), { color: groupObj.color }));
                    res = yield prompt.run();
                    break;
                case 'password':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(__Enquirer.default.Password))(Object.assign(Object.assign({}, askObj), { color: groupObj.color }));
                    res = yield prompt.run();
                    break;
                case 'toggle':
                    // @ts-ignore
                    prompt = new (this._getPromptClass(__Enquirer.default.Toggle))(Object.assign(Object.assign({}, askObj), { color: groupObj.color }));
                    res = yield prompt.run();
                    break;
                default:
                    throw new Error(`Unknown ask type ${askObj.type}`);
                    break;
            }
            if (typeof res === 'string') {
                res = res.replace(groupObj.prefix, '').trim();
            }
            resolve(res);
        }));
    }
}
import __defaultNoUiStdioComponent from './components/defaultNoUiStdioComponent';
import __summaryNoUiStdioComponent from './components/summaryNoUiStdioComponent';
import __errorNoUiStdioComponent from './components/errorNoUiStdioComponent';
SNoUiStdio.registerComponent(__defaultNoUiStdioComponent);
SNoUiStdio.registerComponent(__summaryNoUiStdioComponent);
SNoUiStdio.registerComponent(__errorNoUiStdioComponent);
export default SNoUiStdio;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU05vVWlTdGRpby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNOb1VpU3RkaW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBRUEsa0VBQWtFO0FBQ2xFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sUUFBNkIsTUFBTSxXQUFXLENBQUM7QUFDdEQsT0FBTyxZQUFZLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxXQUFXLE1BQU0sOENBQThDLENBQUM7QUFJdkUsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxLQUFLLFVBQVUsTUFBTSxVQUFVLENBQUM7QUFHdkMsT0FBTyxPQUFPLE1BQU0seUNBQXlDLENBQUM7QUFDOUQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFLdEUsT0FBTyxZQUFZLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxNQUFpQixNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sYUFBYSxNQUFNLGtEQUFrRCxDQUFDO0FBaUM3RSxNQUFNLFVBQVcsU0FBUSxRQUFRO0lBZTdCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0ksRUFBVSxFQUNWLE9BQTBDLEVBQzFDLFFBQWtDO1FBRWxDLEtBQUssQ0FDRCxFQUFFLEVBQ0YsT0FBTyxFQUNQLFdBQVcsQ0FDUDtZQUNJLFNBQVMsRUFBRSxFQUFFO1NBQ2hCLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBK0JOOzs7Ozs7Ozs7Ozs7V0FZRztRQUNILGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ25CLHVCQUFrQixHQUFHLENBQUMsQ0FBQztRQUV2QixrQkFBYSxHQUFRLEVBQUUsQ0FBQztRQUN4QixlQUFVLEdBQStCLEVBQUUsQ0FBQztRQTlDeEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUF6Q0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxpQkFBaUI7UUFDakIsT0FB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