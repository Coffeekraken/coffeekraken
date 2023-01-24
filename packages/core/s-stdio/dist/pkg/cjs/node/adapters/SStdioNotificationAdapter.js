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
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("@coffeekraken/sugar/fs");
const html_1 = require("@coffeekraken/sugar/html");
const object_1 = require("@coffeekraken/sugar/object");
const node_notifier_1 = __importDefault(require("node-notifier"));
const path_1 = __importDefault(require("path"));
const SStdioAdapter_1 = __importDefault(require("../../shared/SStdioAdapter"));
const _nativeLog = console.log;
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
            log: path_1.default.resolve(`${(0, fs_1.__dirname)()}/../../../../../src/node/adapters/icons/icon-log.jpg`),
            info: path_1.default.resolve(`${(0, fs_1.__dirname)()}/../../../../../src/node/adapters/icons/icon-info.jpg`),
            warn: path_1.default.resolve(`${(0, fs_1.__dirname)()}/../../../../../src/node/adapters/icons/icon-warn.jpg`),
            error: path_1.default.resolve(`${(0, fs_1.__dirname)()}/../../../../../src/node/adapters/icons/icon-error.jpg`),
            success: path_1.default.resolve(`${(0, fs_1.__dirname)()}/../../../../../src/node/adapters/icons/icon-success.jpg`),
        };
        node_notifier_1.default.notify(Object.assign({ title: (0, html_1.__stripTags)((_a = logObj.group) !== null && _a !== void 0 ? _a : 'Sugar ♥'), message: (0, html_1.__stripTags)((_b = logObj.value) !== null && _b !== void 0 ? _b : '...'), icon: false, timeout: 10, contentImage: (_c = icons[logObj.type]) !== null && _c !== void 0 ? _c : icons.log }, ((_d = logObj.metas) !== null && _d !== void 0 ? _d : {})));
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
            node_notifier_1.default.notify(Object.assign(Object.assign({ title: (0, html_1.__stripTags)((_a = askObj.group) !== null && _a !== void 0 ? _a : 'Sugar ♥'), message: (0, html_1.__stripTags)((_b = askObj.value) !== null && _b !== void 0 ? _b : '...'), icon: false, contentImage: (_c = icons[logObj.type]) !== null && _c !== void 0 ? _c : icons.log }, ((_d = logObj.metas) !== null && _d !== void 0 ? _d : {})), { reply: true }), function (error, response, metadata) {
                _nativeLog(response, metadata);
                resolve(response);
            });
        }));
    }
}
exports.default = SStdioBasicAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsK0NBQW1EO0FBQ25ELG1EQUF1RDtBQUN2RCx1REFBeUQ7QUFDekQsa0VBQXVDO0FBQ3ZDLGdEQUEwQjtBQUMxQiwrRUFBeUQ7QUE0QnpELE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFFL0IsTUFBcUIsa0JBQ2pCLFNBQVEsdUJBQWU7SUFHdkI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUE2QztRQUNyRCxLQUFLLENBQUMsSUFBQSxvQkFBVyxFQUFDLEVBQUUsRUFBRSxRQUFRLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsS0FBSyxLQUFJLENBQUM7SUFFVjs7Ozs7Ozs7Ozs7T0FXRztJQUNILEdBQUcsQ0FBQyxNQUFhOztRQUNiLElBQUksQ0FBQyxNQUFNO1lBQUUsT0FBTztRQUVwQix3Q0FBd0M7UUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDaEIsT0FBTztTQUNWO1FBRUQsTUFBTSxLQUFLLEdBQUc7WUFDVixHQUFHLEVBQUUsY0FBTSxDQUFDLE9BQU8sQ0FDZixHQUFHLElBQUEsY0FBUyxHQUFFLHNEQUFzRCxDQUN2RTtZQUNELElBQUksRUFBRSxjQUFNLENBQUMsT0FBTyxDQUNoQixHQUFHLElBQUEsY0FBUyxHQUFFLHVEQUF1RCxDQUN4RTtZQUNELElBQUksRUFBRSxjQUFNLENBQUMsT0FBTyxDQUNoQixHQUFHLElBQUEsY0FBUyxHQUFFLHVEQUF1RCxDQUN4RTtZQUNELEtBQUssRUFBRSxjQUFNLENBQUMsT0FBTyxDQUNqQixHQUFHLElBQUEsY0FBUyxHQUFFLHdEQUF3RCxDQUN6RTtZQUNELE9BQU8sRUFBRSxjQUFNLENBQUMsT0FBTyxDQUNuQixHQUFHLElBQUEsY0FBUyxHQUFFLDBEQUEwRCxDQUMzRTtTQUNKLENBQUM7UUFFRix1QkFBVSxDQUFDLE1BQU0saUJBQ2IsS0FBSyxFQUFFLElBQUEsa0JBQVcsRUFBQyxNQUFBLE1BQU0sQ0FBQyxLQUFLLG1DQUFJLFNBQVMsQ0FBQyxFQUM3QyxPQUFPLEVBQUUsSUFBQSxrQkFBVyxFQUFDLE1BQUEsTUFBTSxDQUFDLEtBQUssbUNBQUksS0FBSyxDQUFDLEVBQzNDLElBQUksRUFBRSxLQUFLLEVBQ1gsT0FBTyxFQUFFLEVBQUUsRUFDWCxZQUFZLEVBQUUsTUFBQSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQ0FBSSxLQUFLLENBQUMsR0FBRyxJQUMxQyxDQUFDLE1BQUEsTUFBTSxDQUFDLEtBQUssbUNBQUksRUFBRSxDQUFDLEVBQ3pCLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxHQUFHLENBQUMsTUFBZ0I7UUFDaEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFOztZQUNqQyxJQUFJLEdBQUcsQ0FBQztZQUVSLHVCQUFVLENBQUMsTUFBTSwrQkFFVCxLQUFLLEVBQUUsSUFBQSxrQkFBVyxFQUFDLE1BQUEsTUFBTSxDQUFDLEtBQUssbUNBQUksU0FBUyxDQUFDLEVBQzdDLE9BQU8sRUFBRSxJQUFBLGtCQUFXLEVBQUMsTUFBQSxNQUFNLENBQUMsS0FBSyxtQ0FBSSxLQUFLLENBQUMsRUFDM0MsSUFBSSxFQUFFLEtBQUssRUFDWCxZQUFZLEVBQUUsTUFBQSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQ0FBSSxLQUFLLENBQUMsR0FBRyxJQUMxQyxDQUFDLE1BQUEsTUFBTSxDQUFDLEtBQUssbUNBQUksRUFBRSxDQUFDLEtBQ3ZCLEtBQUssRUFBRSxJQUFJLEtBRWYsVUFBVSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVE7Z0JBQy9CLFVBQVUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQy9CLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0QixDQUFDLENBQ0osQ0FBQztRQUNOLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUFwR0QscUNBb0dDIn0=