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
        super(id, sources, __deepMerge({
            basicStdio: {},
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
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._currentLogId = '';
        this._lastLogLinesCountStack = [];
        this._loggedGroups = {};
        this._logsStack = [];
        this.display();
    }
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
    get basicStdioSettings() {
        return this._settings.basicStdio;
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
        if (logObj.clear && ((_d = this._lastLogObj) === null || _d === void 0 ? void 0 : _d.type) !== __SLog.TYPE_WARN && ((_e = this._lastLogObj) === null || _e === void 0 ? void 0 : _e.type) !== __SLog.TYPE_ERROR) {
            if (typeof logObj.clear === 'number') {
                // @ts-ignore
                const toClear = this._lastLogLinesCountStack.slice(logObj.clear * -1).reduce((a, b) => a + b);
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
        const log = `<${groupObj.color}>█</${groupObj.color}>   ${__parseHtml(component.render(logObj, this.basicStdioSettings))}`;
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
SBasicStdio.registerComponent(__defaultBasicStdioComponent);
SBasicStdio.registerComponent(__errorBasicStdioComponent);
export default SBasicStdio;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Jhc2ljU3RkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQmFzaWNTdGRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFFQSxPQUFPLE1BQWlCLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxZQUFZLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxXQUFXLE1BQU0sOENBQThDLENBQUM7QUFDdkUsT0FBTyxhQUFhLE1BQU0sa0RBQWtELENBQUM7QUFDN0UsT0FBTyxPQUFPLE1BQU0seUNBQXlDLENBQUM7QUFDOUQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxZQUFZLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxLQUFLLFVBQVUsTUFBTSxVQUFVLENBQUM7QUFDdkMsT0FBTyxRQUFRLE1BQU0scUJBQXFCLENBQUM7QUFDM0MsT0FBTyw0QkFBNEIsTUFBTSx5Q0FBeUMsQ0FBQztBQUNuRixPQUFPLDBCQUEwQixNQUFNLHVDQUF1QyxDQUFDO0FBZ0MvRSxNQUFNLFdBQVksU0FBUSxRQUFRO0lBZTlCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0ksRUFBVSxFQUNWLE9BQTBDLEVBQzFDLFFBQW1DO1FBRW5DLEtBQUssQ0FDRCxFQUFFLEVBQ0YsT0FBTyxFQUNQLFdBQVcsQ0FDUDtZQUNJLFVBQVUsRUFBRSxFQUFFO1NBQ2pCLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBMEJOOzs7Ozs7Ozs7Ozs7V0FZRztRQUNILGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ25CLDRCQUF1QixHQUFHLEVBQUUsQ0FBQztRQUU3QixrQkFBYSxHQUFRLEVBQUUsQ0FBQztRQUN4QixlQUFVLEdBQWdDLEVBQUUsQ0FBQztRQXpDekMsSUFBSSxDQUFDLE9BQU8sRUFBRSxD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