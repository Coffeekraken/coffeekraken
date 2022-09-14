var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import { __parseHtml } from '@coffeekraken/sugar/console';
import { __clone, __deepMerge } from '@coffeekraken/sugar/object';
import __getColorFor from '@coffeekraken/sugar/shared/dev/color/getColorFor';
import { __stripAnsi, __upperFirst } from '@coffeekraken/sugar/string';
import { __countLines } from '@coffeekraken/sugar/terminal';
import * as __Enquirer from 'enquirer';
import __SStdio from '../../shared/SStdio';
import __defaultBasicStdioComponent from './components/defaultBasicStdioComponent';
import __errorBasicStdioComponent from './components/errorBasicStdioComponent';
class SBasicStdio extends __SStdio {
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
    constructor(id, sources, settings) {
        super(id, sources, __deepMerge({}, settings || {}));
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
        this._currentLogId = '';
        this._lastLogLinesCountStack = [];
        this._loggedGroups = {};
        this._logsStack = [];
        this.display();
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
                color: __getColorFor(group),
            };
            groupObj.prefix = __parseHtml(`<${groupObj.color}>█</${groupObj.color}>`);
            // @ts-ignore
            this._loggedGroups[group] = groupObj;
        }
        return groupObj;
    }
    _log(logObj, component) {
        var _a, _b, _c, _d, _e, _f, _g;
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
            console.log(`<bg${__upperFirst(groupObj.color)}><black> ${logObj.group} </black></bg${__upperFirst(groupObj.color)}><${groupObj.color}>${'-'.repeat((_c = process.stdout.columns - 2 - ((_b = logObj.group) === null || _b === void 0 ? void 0 : _b.length)) !== null && _c !== void 0 ? _c : 0)}</${groupObj.color}>`);
            console.log(groupObj.prefix);
        }
        if (logObj.clear &&
            ((_d = this._lastLogObj) === null || _d === void 0 ? void 0 : _d.type) !== __SLog.TYPE_WARN &&
            ((_e = this._lastLogObj) === null || _e === void 0 ? void 0 : _e.type) !== __SLog.TYPE_ERROR) {
            if (typeof logObj.clear === 'number') {
                // @ts-ignore
                const toClear = this._lastLogLinesCountStack
                    .slice(logObj.clear * -1)
                    .reduce((a, b) => a + b);
                process.stdout.moveCursor(0, toClear * -1); // up one line
                process.stdout.clearScreenDown();
                // for (let i = 0; i < toClear; i++) {
                //     process.stdout.clearLine(1); // clear current line
                // }
            }
            else {
                process.stdout.moveCursor(0, this._lastLogLinesCountStack.slice(-1)[0] * -1); // up one line
                process.stdout.clearLine(1); // from cursor to end
            }
        }
        let logLinesCount = 0;
        if ((_f = logObj.margin) === null || _f === void 0 ? void 0 : _f.top) {
            for (let i = 0; i < logObj.margin.top; i++) {
                console.log(`<${groupObj.color}>█</${groupObj.color}>`);
            }
            logLinesCount += logObj.margin.top;
        }
        const log = `<${groupObj.color}>█</${groupObj.color}>   ${__parseHtml(component.render(logObj, this.settings))}`;
        logLinesCount += __countLines(log);
        console.log(log);
        if ((_g = logObj.margin) === null || _g === void 0 ? void 0 : _g.bottom) {
            for (let i = 0; i < logObj.margin.bottom; i++) {
                console.log(`<${groupObj.color}>█</${groupObj.color}>`);
            }
            // @ts-ignore
            logLinesCount += logObj.margin.top;
        }
        // @ts-ignore)
        this._lastLogLinesCountStack.push(logLinesCount);
        this._lastLogObj = logObj;
    }
    _addPrefix(string) { }
    _removePrefix(string) { }
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
                    this.options.choices = (_a = this.options.choices) === null || _a === void 0 ? void 0 : _a.map((choice) => {
                        var _a, _b;
                        return `${__parseHtml(`<${(_a = this.options.color) !== null && _a !== void 0 ? _a : 'yellow'}>█</${(_b = this.options.color) !== null && _b !== void 0 ? _b : 'yellow'}>`)} ${choice}`;
                    });
                }
                this.symbols = this.symb(__clone(this.symbols, {
                    deep: true,
                }));
            }
            symb(obj) {
                var _a, _b;
                for (let [key, value] of Object.entries(obj)) {
                    if ([
                        'ellipsis',
                        'ellipsisLarge',
                        'ellipsisSmall',
                        'question',
                        'questionFull',
                        'questionSmall',
                        'pointerSmall',
                    ].includes(key))
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
            // transform html in message
            askObj.message = __parseHtml(askObj.message);
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
                            const pattern = Array.isArray(askObj.pattern)
                                ? askObj.pattern
                                : [askObj.pattern];
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
SBasicStdio.registerComponent(__defaultBasicStdioComponent);
SBasicStdio.registerComponent(__errorBasicStdioComponent);
export default SBasicStdio;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixDQUFDO0FBQ3pDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2xFLE9BQU8sYUFBYSxNQUFNLGtEQUFrRCxDQUFDO0FBQzdFLE9BQU8sRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDdkUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzVELE9BQU8sS0FBSyxVQUFVLE1BQU0sVUFBVSxDQUFDO0FBQ3ZDLE9BQU8sUUFBUSxNQUFNLHFCQUFxQixDQUFDO0FBQzNDLE9BQU8sNEJBQTRCLE1BQU0seUNBQXlDLENBQUM7QUFDbkYsT0FBTywwQkFBMEIsTUFBTSx1Q0FBdUMsQ0FBQztBQTRCL0UsTUFBTSxXQUFZLFNBQVEsUUFBUTtJQUM5Qjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNJLEVBQVUsRUFDVixPQUEwQyxFQUMxQyxRQUErQjtRQUUvQixLQUFLLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxXQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBMkJ4RDs7Ozs7Ozs7Ozs7O1dBWUc7UUFDSCxrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUNuQiw0QkFBdUIsR0FBRyxFQUFFLENBQUM7UUFFN0Isa0JBQWEsR0FBUSxFQUFFLENBQUM7UUFDeEIsZUFBVSxHQUFnQyxFQUFFLENBQUM7UUExQ3pDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsS0FBSztRQUNELHlCQUF5QjtR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