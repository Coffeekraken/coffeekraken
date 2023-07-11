"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const s_env_1 = __importDefault(require("@coffeekraken/s-env"));
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const console_1 = require("@coffeekraken/sugar/console");
const datetime_1 = require("@coffeekraken/sugar/datetime");
const dev_1 = require("@coffeekraken/sugar/dev");
const object_1 = require("@coffeekraken/sugar/object");
const string_1 = require("@coffeekraken/sugar/string");
const terminal_1 = require("@coffeekraken/sugar/terminal");
const __Enquirer = __importStar(require("enquirer"));
const SStdioAdapter_js_1 = __importDefault(require("../../shared/SStdioAdapter.js"));
const _nativeConsole = {};
for (let key of ['log', 'error', 'warn', 'verbose']) {
    _nativeConsole[key] = (_a = console[key]) !== null && _a !== void 0 ? _a : console.log;
}
class SStdioBasicAdapter extends SStdioAdapter_js_1.default {
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
    constructor(settings) {
        super((0, object_1.__deepMerge)({}, settings || {}));
        /**
         * @name          log
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
                color: (0, dev_1.__getColorFor)(group),
            };
            groupObj.prefix = (0, console_1.__parseHtml)(`<${groupObj.color}>█</${groupObj.color}>`);
            // @ts-ignore
            this._loggedGroups[group] = groupObj;
        }
        return groupObj;
    }
    log(logObj) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        const logger = (_a = logObj.logger) !== null && _a !== void 0 ? _a : process.stdout.write;
        // handle empty logs
        if (!logObj) {
            return logger(logObj);
        }
        // filter out the verbose logs
        if (logObj.verbose && !s_env_1.default.is('verbose')) {
            return;
        }
        const groupObj = this._getGroupObj(logObj.group);
        const termSize = (0, terminal_1.__termSize)();
        if (logObj.group !== ((_b = this._lastLogObj) === null || _b === void 0 ? void 0 : _b.group)) {
            logger(groupObj.prefix);
            // @ts-ignore
            let repeat = termSize.columns - 2 - ((_d = (_c = logObj.group) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0);
            if (repeat < 0) {
                repeat = 0;
            }
            logger((0, console_1.__parseHtml)(`<bg${(0, string_1.__upperFirst)(groupObj.color)}><black> ${logObj.group} </black></bg${(0, string_1.__upperFirst)(groupObj.color)}><${groupObj.color}>${'-'.repeat(repeat)}</${groupObj.color}>`));
            logger(groupObj.prefix);
        }
        if (logObj.value.clear &&
            ((_e = this._lastLogObj) === null || _e === void 0 ? void 0 : _e.type) !== s_log_1.default.TYPE_WARN &&
            ((_f = this._lastLogObj) === null || _f === void 0 ? void 0 : _f.type) !== s_log_1.default.TYPE_ERROR) {
            if (typeof logObj.value.clear === 'number') {
                // @ts-ignore
                const toClear = this._lastLogLinesCountStack
                    .slice(logObj.value.clear * -1)
                    .reduce((a, b) => a + b);
                process.stdout.moveCursor(0, toClear * -1); // up one line
                process.stdout.clearScreenDown();
            }
            else {
                process.stdout.moveCursor(0, this._lastLogLinesCountStack.slice(-1)[0] * -1); // up one line
                process.stdout.clearLine(1); // from cursor to end
            }
        }
        let logLinesCount = 0;
        if ((_g = logObj.margin) === null || _g === void 0 ? void 0 : _g.top) {
            for (let i = 0; i < logObj.margin.top; i++) {
                logger((0, console_1.__parseHtml)(`<${groupObj.color}>█</${groupObj.color}>`));
            }
            logLinesCount += logObj.margin.top;
        }
        let toLog = (_k = (_j = (_h = logObj.value) === null || _h === void 0 ? void 0 : _h.value) !== null && _j !== void 0 ? _j : logObj.value) !== null && _k !== void 0 ? _k : logObj;
        if (typeof toLog === 'string') {
            toLog = (0, console_1.__parseHtml)(`<${groupObj.color}>█</${groupObj.color}>   ${toLog}`);
            logLinesCount += (0, terminal_1.__countLines)(toLog);
        }
        logger(toLog);
        if ((_l = logObj.margin) === null || _l === void 0 ? void 0 : _l.bottom) {
            for (let i = 0; i < logObj.margin.bottom; i++) {
                logger((0, console_1.__parseHtml)(`<${groupObj.color}>█</${groupObj.color}>`));
            }
            // @ts-ignore
            logLinesCount += logObj.margin.top;
        }
        // @ts-ignore)
        this._lastLogLinesCountStack.push(logLinesCount);
        this._lastLogObj = logObj;
    }
    _getPromptClass(BasePromptClass) {
        return class MyPrompt extends BasePromptClass {
            constructor(options) {
                var _a;
                super(Object.assign(Object.assign({}, options), { format(str) {
                        var _a, _b;
                        if (typeof str !== 'string')
                            return str;
                        return str.replace(`${(0, console_1.__parseHtml)(`<${(_a = this.options.color) !== null && _a !== void 0 ? _a : 'yellow'}>█</${(_b = this.options.color) !== null && _b !== void 0 ? _b : 'yellow'}>`)}`, '');
                    } }));
                if (this.options.choices) {
                    this.options.choices = (_a = this.options.choices) === null || _a === void 0 ? void 0 : _a.map((choice) => {
                        var _a, _b;
                        return `${(0, console_1.__parseHtml)(`<${(_a = this.options.color) !== null && _a !== void 0 ? _a : 'yellow'}>█</${(_b = this.options.color) !== null && _b !== void 0 ? _b : 'yellow'}>`)} ${choice}`;
                    });
                }
                this.symbols = this.symb((0, object_1.__clone)(this.symbols, {
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
                        obj[key] = (0, string_1.__stripAnsi)(obj[key]);
                        obj[key] = obj[key].replace(/█\s?/, '');
                    }
                    obj[key] = `${(0, console_1.__parseHtml)(`<${(_a = this.options.color) !== null && _a !== void 0 ? _a : 'yellow'}>█</${(_b = this.options.color) !== null && _b !== void 0 ? _b : 'yellow'}>`)} ${value}`;
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
    ask(askObj) {
        return new s_promise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            let prompt, res;
            yield (0, datetime_1.__wait)(1000);
            // transform html in message
            askObj.message = (0, console_1.__parseHtml)(askObj.message);
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
exports.default = SStdioBasicAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQXlDO0FBRXpDLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFDakQseURBQTBEO0FBQzFELDJEQUFzRDtBQUN0RCxpREFBd0Q7QUFDeEQsdURBQWtFO0FBQ2xFLHVEQUF1RTtBQUN2RSwyREFBd0U7QUFDeEUscURBQXVDO0FBQ3ZDLHFGQUE0RDtBQStCNUQsTUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDO0FBQzFCLEtBQUssSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsRUFBRTtJQUNqRCxjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBQSxPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUM7Q0FDckQ7QUFFRCxNQUFxQixrQkFDakIsU0FBUSwwQkFBZTtJQUd2Qjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQXNDO1FBQzlDLEtBQUssQ0FBQyxJQUFBLG9CQUFXLEVBQUMsRUFBRSxFQUFFLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBeUIzQzs7Ozs7Ozs7Ozs7O1dBWUc7UUFDSCxrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQUNuQiw0QkFBdUIsR0FBRyxFQUFFLENBQUM7UUFFN0Isa0JBQWEsR0FBUSxFQUFFLENBQUM7UUFDeEIsZUFBVSxHQUF1QyxFQUFFLENBQUM7SUF6Q3BELENBQUM7SUFFRCxLQUFLO1FBQ0QseUJBQXlCO1FBQ3pCLGlDQUFpQztJQUNyQyxDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQUssRUFBRSxHQUFHLEdBQUcsSUFBSTs7UUFDMUIsYUFBYTtRQUNiLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENB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