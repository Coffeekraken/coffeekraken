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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._currentLogId = '';
        this._lastLogLinesCount = 0;
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
        const log = `<${groupObj.color}>█</${groupObj.color}>   ${__parseHtml(component.render(logObj, this.basicStdioSettings))}`;
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
SBasicStdio.registerComponent(__defaultBasicStdioComponent);
SBasicStdio.registerComponent(__errorBasicStdioComponent);
export default SBasicStdio;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Jhc2ljU3RkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQmFzaWNTdGRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFFQSxPQUFPLE1BQWlCLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxZQUFZLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxXQUFXLE1BQU0sOENBQThDLENBQUM7QUFDdkUsT0FBTyxhQUFhLE1BQU0sa0RBQWtELENBQUM7QUFDN0UsT0FBTyxPQUFPLE1BQU0seUNBQXlDLENBQUM7QUFDOUQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxZQUFZLE1BQU0sOENBQThDLENBQUM7QUFDeEUsT0FBTyxLQUFLLFVBQVUsTUFBTSxVQUFVLENBQUM7QUFDdkMsT0FBTyxRQUFRLE1BQU0scUJBQXFCLENBQUM7QUFDM0MsT0FBTyw0QkFBNEIsTUFBTSx5Q0FBeUMsQ0FBQztBQUNuRixPQUFPLDBCQUEwQixNQUFNLHVDQUF1QyxDQUFDO0FBZ0MvRSxNQUFNLFdBQVksU0FBUSxRQUFRO0lBZTlCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0ksRUFBVSxFQUNWLE9BQTBDLEVBQzFDLFFBQW1DO1FBRW5DLEtBQUssQ0FDRCxFQUFFLEVBQ0YsT0FBTyxFQUNQLFdBQVcsQ0FDUDtZQUNJLFVBQVUsRUFBRSxFQUFFO1NBQ2pCLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBMEJOOzs7Ozs7Ozs7Ozs7V0FZRztRQUNILGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ25CLHVCQUFrQixHQUFHLENBQUMsQ0FBQztRQUV2QixrQkFBYSxHQUFRLEVBQUUsQ0FBQztRQUN4QixlQUFVLEdBQWdDLEVBQUUsQ0FBQztRQXpDekMsSUFBSSxDQUFDLE9BQU8sRUFBRSxD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