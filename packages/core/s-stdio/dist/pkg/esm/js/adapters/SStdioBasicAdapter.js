var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import { __parseHtml } from '@coffeekraken/sugar/console';
import { __getColorFor } from '@coffeekraken/sugar/dev';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __upperFirst } from '@coffeekraken/sugar/string';
import __SStdioAdapter from '../../shared/SStdioAdapter.js';
const _nativeConsole = {};
for (let key of ['log', 'error', 'warn', 'verbose']) {
    _nativeConsole[key] = (_a = console[key]) !== null && _a !== void 0 ? _a : console.log;
}
export default class SStdioBasicAdapter extends __SStdioAdapter {
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
        super(__deepMerge({}, settings || {}));
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
                color: __getColorFor(group),
            };
            groupObj.prefix = __parseHtml(`<${groupObj.color}>█</${groupObj.color}>`);
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
            logger(__parseHtml(`<bg${__upperFirst(groupObj.color)}><black> ${logObj.group} </black></bg${__upperFirst(groupObj.color)}><${groupObj.color}>${'-'.repeat(50)}</${groupObj.color}>`));
            logger(groupObj.prefix);
        }
        if (logObj.clear &&
            ((_c = this._lastLogObj) === null || _c === void 0 ? void 0 : _c.type) !== __SLog.TYPE_WARN &&
            ((_d = this._lastLogObj) === null || _d === void 0 ? void 0 : _d.type) !== __SLog.TYPE_ERROR) {
            console.clear();
        }
        let logLinesCount = 0;
        if ((_e = logObj.margin) === null || _e === void 0 ? void 0 : _e.top) {
            for (let i = 0; i < logObj.margin.top; i++) {
                logger(__parseHtml(`<${groupObj.color}>█</${groupObj.color}>`));
            }
            logLinesCount += logObj.margin.top;
        }
        let logValue = (_h = (_g = (_f = logObj.value) === null || _f === void 0 ? void 0 : _f.value) !== null && _g !== void 0 ? _g : logObj.value) !== null && _h !== void 0 ? _h : logObj;
        let log = logValue;
        if (typeof logValue === 'string') {
            log = __parseHtml(`<${groupObj.color}>█</${groupObj.color}> ${logValue}`);
        }
        logLinesCount += 1;
        logger(log);
        if ((_j = logObj.margin) === null || _j === void 0 ? void 0 : _j.bottom) {
            for (let i = 0; i < logObj.margin.bottom; i++) {
                logger(__parseHtml(`<${groupObj.color}>█</${groupObj.color}>`));
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
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
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
            askObj.message = __parseHtml(askObj.message);
            const groupObj = this._getGroupObj(askObj.group);
            resolve(res);
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDMUQsT0FBTyxlQUFlLE1BQU0sK0JBQStCLENBQUM7QUErQjVELE1BQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQztBQUMxQixLQUFLLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLEVBQUU7SUFDakQsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBSSxPQUFPLENBQUMsR0FBRyxDQUFDO0NBQ3JEO0FBRUQsTUFBTSxDQUFDLE9BQU8sT0FBTyxrQkFDakIsU0FBUSxlQUFlO0lBR3ZCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBc0M7UUFDOUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUF3QjNDOzs7Ozs7Ozs7Ozs7V0FZRztRQUNILDRCQUF1QixHQUFHLEVBQUUsQ0FBQztRQUU3QixrQkFBYSxHQUFRLEVBQUUsQ0FBQztRQUN4QixlQUFVLEdBQXVDLEVBQUUsQ0FBQztJQXZDcEQsQ0FBQztJQUVELEtBQUs7UUFDRCxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELFlBQVksQ0FBQyxLQUFLLEVBQUUsR0FBRyxHQUFHLElBQUk7O1FBQzFCLGFBQWE7UUFDYixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQSxNQUFBLElBQUksQ0FBQyxXQUFXLDBDQUFFLEtBQUssTUFBSyxLQUFLLEVBQUU7WUFDaEQsYUFBYTtZQUNiLFFBQVEsR0FBRztnQkFDUCxLQUFLLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQzthQUM5QixDQUFDO1lBQ0YsUUFBUSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQ3pCLElBQUksUUFBUSxDQUFDLEtBQUssT0FBTyxRQUFRLENBQUMsS0FBSyxHQUFHLENBQzdDLENBQUM7WUFDRixhQUFhO1lBQ2IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxRQUFRLENBQUM7U0FDeEM7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBbUJELEdBQUcsQ0FBQyxNQUFhOztRQUNiLE1BQU0sTUFBTSxHQUFHLE1BQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLE1BQU0sbUNBQUksY0FBYyxDQUFDLEdBQUcsQ0FBQztRQUVwRCx3Q0FBd0M7UUFDeEMsSUFBSSxNQUFNLENBQUMsS0FBSyxZQUFZLFdBQVcsRUFBRTtZQUNyQyxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0I7UUFFRCxvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3pCO1FBRUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFakQsSUFBSSxNQUFNLENBQUMsS0FBSyxNQUFLLE1BQUEsSUFBSSxDQUFDLFdBQVcsMENBQUUsS0FBSyxDQUFBLEVBQUU7WUFDMUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4QixhQUFhO1lBQ2IsTUFBTSxDQUNGLFdBQVcsQ0FDUCxNQUFNLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFlBQzlCLE1BQU0sQ0FBQyxLQUNYLGdCQUFnQixZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUN4QyxRQUFRLENBQUMsS0FDYixJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssUUFBUSxDQUFDLEtBQUssR0FBRyxDQUMzQyxDQUNKLENBQUM7WUFDRixNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzNCO1FBRUQsSUFDSSxNQUFNLENBQUMsS0FBSztZQUNaLENBQUEsTUFBQSxJQUFJLENBQUMsV0FBVywwQ0FBRSxJQUFJLE1BQUssTUFBTSxDQUFDLFNBQVM7WUFDM0MsQ0FBQSxNQUFBLElBQUksQ0FBQyxXQUFXLDBDQUFFLElBQUksTUFBSyxNQUFNLENBQUMsVUFBVSxFQUM5QztZQUNFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNuQjtRQUVELElBQUksYUFBYSxHQUFHLENBQUMsQ0FBQztRQUV0QixJQUFJLE1BQUEsTUFBTSxDQUFDLE1BQU0sMENBQUUsR0FBRyxFQUFFO1lBQ3BCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDeEMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLE9BQU8sUUFBUSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNuRTtZQUNELGFBQWEsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUN0QztRQUVELElBQUksUUFBUSxHQUFHLE1BQUEsTUFBQSxNQUFBLE1BQU0sQ0FBQyxLQUFLLDBDQUFFLEtBQUssbUNBQUksTUFBTSxDQUFDLEtBQUssbUNBQUksTUFBTSxDQUFDO1FBRTdELElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQztRQUNuQixJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUM5QixHQUFHLEdBQUcsV0FBVyxDQUNiLElBQUksUUFBUSxDQUFDLEtBQUssT0FBTyxRQUFRLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRSxDQUN6RCxDQUFDO1NBQ0w7UUFFRCxhQUFhLElBQUksQ0FBQyxDQUFDO1FBQ25CLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVaLElBQUksTUFBQSxNQUFNLENBQUMsTUFBTSwwQ0FBRSxNQUFNLEVBQUU7WUFDdkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUMzQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksUUFBUSxDQUFDLEtBQUssT0FBTyxRQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ25FO1lBQ0QsYUFBYTtZQUNiLGFBQWEsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUN0QztRQUVELGNBQWM7UUFDZCxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO0lBQzlCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxJQUFJLENBQUMsTUFBTTtRQUNQLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUN0RCxNQUFNLElBQUksS0FBSyxDQUNYLDhHQUE4RyxDQUNqSCxDQUFDO1lBRUYsSUFBSSxNQUFNLEVBQUUsR0FBRyxDQUFDO1lBRWhCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO2dCQUNmLGFBQWE7Z0JBQ2IsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxVQUFVLEVBQUU7b0JBQ2hDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO2lCQUMzQjtxQkFBTTtvQkFDSCxhQUFhO29CQUNiLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7aUJBQ2xDO2FBQ0o7WUFFRCw0QkFBNEI7WUFDNUIsTUFBTSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRTdDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRWpELE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKIn0=