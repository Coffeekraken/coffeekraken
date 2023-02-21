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
// import { __countLines } from '@coffeekraken/sugar/terminal';
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
        // handle empty logs
        if (!logObj)
            return;
        const logger = (_a = logObj.logger) !== null && _a !== void 0 ? _a : _nativeConsole.log;
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
        const logValue = (_h = (_g = (_f = logObj.value) === null || _f === void 0 ? void 0 : _f.value) !== null && _g !== void 0 ? _g : logObj.value) !== null && _h !== void 0 ? _h : logObj;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFDakQseURBQTBEO0FBQzFELGlEQUF3RDtBQUN4RCx1REFBeUQ7QUFDekQsdURBQTBEO0FBQzFELCtEQUErRDtBQUMvRCwrRUFBeUQ7QUE4QnpELE1BQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQztBQUMxQixLQUFLLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLEVBQUU7SUFDakQsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBSSxPQUFPLENBQUMsR0FBRyxDQUFDO0NBQ3JEO0FBRUQsTUFBcUIsa0JBQ2pCLFNBQVEsdUJBQWU7SUFHdkI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFzQztRQUM5QyxLQUFLLENBQUMsSUFBQSxvQkFBVyxFQUFDLEVBQUUsRUFBRSxRQUFRLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztRQXdCM0M7Ozs7Ozs7Ozs7OztXQVlHO1FBQ0gsNEJBQXVCLEdBQUcsRUFBRSxDQUFDO1FBRTdCLGtCQUFhLEdBQVEsRUFBRSxDQUFDO1FBQ3hCLGVBQVUsR0FBdUMsRUFBRSxDQUFDO0lBdkNwRCxDQUFDO0lBRUQsS0FBSztRQUNELE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQUssRUFBRSxHQUFHLEdBQUcsSUFBSTs7UUFDMUIsYUFBYTtRQUNiLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFBLE1BQUEsSUFBSSxDQUFDLFdBQVcsMENBQUUsS0FBSyxNQUFLLEtBQUssRUFBRTtZQUNo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