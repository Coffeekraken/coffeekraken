"use strict";
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
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const console_1 = require("@coffeekraken/sugar/console");
const dev_1 = require("@coffeekraken/sugar/dev");
const object_1 = require("@coffeekraken/sugar/object");
const string_1 = require("@coffeekraken/sugar/string");
const SStdioAdapter_1 = __importDefault(require("../../shared/SStdioAdapter"));
const _nativeConsole = {};
for (let key of ['log', 'error', 'warn', 'verbose']) {
    _nativeConsole[key] = (_a = console[key]) !== null && _a !== void 0 ? _a : console.log;
}
class SStdioBasicAdapter extends SStdioAdapter_1.default {
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
        this._lastLogLinesCountStack = [];
        this._loggedGroups = {};
        this._logsStack = [];
    }
    clear() {
        console.clear();
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const logger = (_a = logObj === null || logObj === void 0 ? void 0 : logObj.logger) !== null && _a !== void 0 ? _a : _nativeConsole.log;
        // handle special types like HTMLElement
        if (logObj.value instanceof HTMLElement) {
            return logger(logObj.value);
        }
        // handle empty logs
        if (!logObj) {
            return logger(logObj);
        }
        const groupObj = this._getGroupObj(logObj.group);
        if (logObj.group !== ((_b = this._lastLogObj) === null || _b === void 0 ? void 0 : _b.group)) {
            logger(groupObj.prefix);
            // @ts-ignore
            logger((0, console_1.__parseHtml)(`<bg${(0, string_1.__upperFirst)(groupObj.color)}><black> ${logObj.group} </black></bg${(0, string_1.__upperFirst)(groupObj.color)}><${groupObj.color}>${'-'.repeat(50)}</${groupObj.color}>`));
            logger(groupObj.prefix);
        }
        if (logObj.clear &&
            ((_c = this._lastLogObj) === null || _c === void 0 ? void 0 : _c.type) !== s_log_1.default.TYPE_WARN &&
            ((_d = this._lastLogObj) === null || _d === void 0 ? void 0 : _d.type) !== s_log_1.default.TYPE_ERROR) {
            console.clear();
        }
        let logLinesCount = 0;
        if ((_e = logObj.margin) === null || _e === void 0 ? void 0 : _e.top) {
            for (let i = 0; i < logObj.margin.top; i++) {
                logger((0, console_1.__parseHtml)(`<${groupObj.color}>█</${groupObj.color}>`));
            }
            logLinesCount += logObj.margin.top;
        }
        let logValue = (_h = (_g = (_f = logObj.value) === null || _f === void 0 ? void 0 : _f.value) !== null && _g !== void 0 ? _g : logObj.value) !== null && _h !== void 0 ? _h : logObj;
        let log = logValue;
        if (typeof logValue === 'string') {
            log = (0, console_1.__parseHtml)(`<${groupObj.color}>█</${groupObj.color}> ${logValue}`);
        }
        logLinesCount += 1;
        logger(log);
        if ((_j = logObj.margin) === null || _j === void 0 ? void 0 : _j.bottom) {
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
        return new s_promise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            throw new Error(`<red>[SStdioBasicAdapter]</red> The "ask" feature has not been implemented yet in the browser environment...`);
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
            askObj.message = (0, console_1.__parseHtml)(askObj.message);
            const groupObj = this._getGroupObj(askObj.group);
            resolve(res);
        }));
    }
}
exports.default = SStdioBasicAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFDakQseURBQTBEO0FBQzFELGlEQUF3RDtBQUN4RCx1REFBeUQ7QUFDekQsdURBQTBEO0FBQzFELCtFQUF5RDtBQStCekQsTUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDO0FBQzFCLEtBQUssSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsRUFBRTtJQUNqRCxjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBQSxPQUFPLENBQUMsR0FBRyxDQUFDLG1DQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUM7Q0FDckQ7QUFFRCxNQUFxQixrQkFDakIsU0FBUSx1QkFBZTtJQUd2Qjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQXNDO1FBQzlDLEtBQUssQ0FBQyxJQUFBLG9CQUFXLEVBQUMsRUFBRSxFQUFFLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBd0IzQzs7Ozs7Ozs7Ozs7O1dBWUc7UUFDSCw0QkFBdUIsR0FBRyxFQUFFLENBQUM7UUFFN0Isa0JBQWEsR0FBUSxFQUFFLENBQUM7UUFDeEIsZUFBVSxHQUF1QyxFQUFFLENBQUM7SUF2Q3BELENBQUM7SUFFRCxLQUFLO1FBQ0QsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxZQUFZLENBQUMsS0FBSyxFQUFFLEdBQUcsR0FBRyxJQUFJOztRQUMxQixhQUFhO1FBQ2IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUEsTUFBQSxJQUFJLENBQUMsV0FBVywwQ0FBRSxLQUFLLE1BQUssS0FBSyxFQUFFO1lBQ2hELGFBQWE7WUFDYixR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