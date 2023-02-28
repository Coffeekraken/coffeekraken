var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { __dirname } from '@coffeekraken/sugar/fs';
import { __stripTags } from '@coffeekraken/sugar/html';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __notifier from 'node-notifier';
import __path from 'path';
import __SStdioAdapter from '../../shared/SStdioAdapter';
const _nativeLog = console.log;
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
    }
    clear() { }
    /**
     * @name          _log
     * @type          Function
     * @private
     *
     * Method that actually log the passed log object with the passed component
     *
     * @param         {ILog}        logObj            The log object to log
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    log(logObj) {
        var _a, _b, _c, _d;
        if (!logObj)
            return;
        // only the marked "notify" notification
        if (!logObj.notify) {
            return;
        }
        const icons = {
            log: __path.resolve(`${__dirname()}/../../../../../src/node/adapters/icons/icon-log.jpg`),
            info: __path.resolve(`${__dirname()}/../../../../../src/node/adapters/icons/icon-info.jpg`),
            warn: __path.resolve(`${__dirname()}/../../../../../src/node/adapters/icons/icon-warn.jpg`),
            error: __path.resolve(`${__dirname()}/../../../../../src/node/adapters/icons/icon-error.jpg`),
            success: __path.resolve(`${__dirname()}/../../../../../src/node/adapters/icons/icon-success.jpg`),
        };
        __notifier.notify(Object.assign({ title: __stripTags((_a = logObj.group) !== null && _a !== void 0 ? _a : 'Sugar ♥'), message: __stripTags((_b = logObj.value) !== null && _b !== void 0 ? _b : '...'), icon: false, timeout: 10, contentImage: (_c = icons[logObj.type]) !== null && _c !== void 0 ? _c : icons.log }, ((_d = logObj.metas) !== null && _d !== void 0 ? _d : {})));
    }
    /**
     * @name          _ask
     * @type          Function
     * @private
     *
     * Method that actually log the passed log object with the passed component
     *
     * @param         {ILogAsk}        askObj            The ask object to ask to the user
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    ask(askObj) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            let res;
            __notifier.notify(Object.assign(Object.assign({ title: __stripTags((_a = askObj.group) !== null && _a !== void 0 ? _a : 'Sugar ♥'), message: __stripTags((_b = askObj.value) !== null && _b !== void 0 ? _b : '...'), icon: false, contentImage: (_c = icons[logObj.type]) !== null && _c !== void 0 ? _c : icons.log }, ((_d = logObj.metas) !== null && _d !== void 0 ? _d : {})), { reply: true }), function (error, response, metadata) {
                _nativeLog(response, metadata);
                resolve(response);
            });
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sVUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxlQUFlLE1BQU0sNEJBQTRCLENBQUM7QUErQnpELE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFFL0IsTUFBTSxDQUFDLE9BQU8sT0FBTyxrQkFDakIsU0FBUSxlQUFlO0lBR3ZCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBNkM7UUFDckQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELEtBQUssS0FBSSxDQUFDO0lBRVY7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxHQUFHLENBQUMsTUFBYTs7UUFDYixJQUFJLENBQUMsTUFBTTtZQUFFLE9BQU87UUFFcEIsd0NBQXdDO1FBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE9BQU87U0FDVjtRQUVELE1BQU0sS0FBSyxHQUFHO1lBQ1YsR0FBRyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQ2YsR0FBRyxTQUFTLEVBQUUsc0RBQXNELENBQ3ZFO1lBQ0QsSUFBSSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQ2hCLEdBQUcsU0FBUyxFQUFFLHVEQUF1RCxDQUN4RTtZQUNELElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUNoQixHQUFHLFNBQVMsRUFBRSx1REFBdUQsQ0FDeEU7WUFDRCxLQUFLLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FDakIsR0FBRyxTQUFTLEVBQUUsd0RBQXdELENBQ3pFO1lBQ0QsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQ25CLEdBQUcsU0FBUyxFQUFFLDBEQUEwRCxDQUMzRTtTQUNKLENBQUM7UUFFRixVQUFVLENBQUMsTUFBTSxpQkFDYixLQUFLLEVBQUUsV0FBVyxDQUFDLE1BQUEsTUFBTSxDQUFDLEtBQUssbUNBQUksU0FBUyxDQUFDLEVBQzdDLE9BQU8sRUFBRSxXQUFXLENBQUMsTUFBQSxNQUFNLENBQUMsS0FBSyxtQ0FBSSxLQUFLLENBQUMsRUFDM0MsSUFBSSxFQUFFLEtBQUssRUFDWCxPQUFPLEVBQUUsRUFBRSxFQUNYLFlBQVksRUFBRSxNQUFBLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1DQUFJLEtBQUssQ0FBQyxHQUFHLElBQzFDLENBQUMsTUFBQSxNQUFNLENBQUMsS0FBSyxtQ0FBSSxFQUFFLENBQUMsRUFDekIsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILEdBQUcsQ0FBQyxNQUFnQjtRQUNoQixPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7O1lBQ2pDLElBQUksR0FBRyxDQUFDO1lBRVIsVUFBVSxDQUFDLE1BQU0sK0JBRVQsS0FBSyxFQUFFLFdBQVcsQ0FBQyxNQUFBLE1BQU0sQ0FBQyxLQUFLLG1DQUFJLFNBQVMsQ0FBQyxFQUM3QyxPQUFPLEVBQUUsV0FBVyxDQUFDLE1BQUEsTUFBTSxDQUFDLEtBQUssbUNBQUksS0FBSyxDQUFDLEVBQzNDLElBQUksRUFBRSxLQUFLLEVBQ1gsWUFBWSxFQUFFLE1BQUEsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUNBQUksS0FBSyxDQUFDLEdBQUcsSUFDMUMsQ0FBQyxNQUFBLE1BQU0sQ0FBQyxLQUFLLG1DQUFJLEVBQUUsQ0FBQyxLQUN2QixLQUFLLEVBQUUsSUFBSSxLQUVmLFVBQVUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRO2dCQUMvQixVQUFVLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUMvQixPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEIsQ0FBQyxDQUNKLENBQUM7UUFDTixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKIn0=