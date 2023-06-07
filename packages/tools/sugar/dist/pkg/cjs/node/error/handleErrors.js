"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = require("@coffeekraken/sugar/is");
const parseHtml_1 = __importDefault(require("../../shared/console/parseHtml"));
const toString_1 = __importDefault(require("../../shared/string/toString"));
/**
 * @name                    handleErrors
 * @namespace            node.error
 * @type                    Function
 * @platform        node
 * @status          wip
 *
 * This function take a thrown error and try to display it the best way possible.
 * Simply add the "uncaughtException" and the "unhandledRejection" listeners on the process object,
 * pass this function as the handler one and that's it...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __handleErrors()
 *
 * @example           js
 * import { __handleErrors } from '@coffeekraken/sugar/error';
 * __handleErrors();
 *
 * @since         2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __handleErrors() {
    if (process.env.NODE_ENV === 'test')
        return;
    if ((0, is_1.__isChildProcess)()) {
        process.on('uncaughtException', __handleChildProcessErrors);
        process.on('unhandledRejection', __handleChildProcessErrors);
    }
    else {
        process.on('uncaughtException', __handleMainProcessErrors);
        process.on('unhandledRejection', __handleMainProcessErrors);
    }
    // process.on('uncaughtException', (err) => {
    //   console.log(`Uncaught Exception: ${err.message}`);
    //   process.exit(1);
    // });
    // process.on('unhandledRejection', (err, promise) => {
    //   console.log('Unhandled rejection at ', promise, `reason: ${err.message}`);
    //   process.exit(1);
    // });
}
exports.default = __handleErrors;
function __handleChildProcessErrors(error) {
    if (!error)
        return;
    if (error.toString().includes(`Cannot read property 'itop' of null`))
        return;
    if (error.instanceId)
        return;
    if (!error)
        return;
    const errorStringArray = [error.stack];
    console.log((0, parseHtml_1.default)(errorStringArray.join('\n')));
}
function __handleMainProcessErrors(error) {
    var _a, _b;
    if (!error)
        return;
    if ((_a = error.toString) === null || _a === void 0 ? void 0 : _a.call(error).includes(`Cannot read property 'itop' of null`))
        return;
    if (error.instanceId)
        return;
    if (error instanceof Buffer) {
        error = (_b = error.toString) === null || _b === void 0 ? void 0 : _b.call(error);
    }
    setTimeout(() => {
        if (typeof error === 'string') {
            console.log((0, parseHtml_1.default)(error));
        }
        else if (typeof error === 'object' && error.name && error.message) {
            console.log((0, parseHtml_1.default)([error.name, error.message, error.stack].join('\n\n')));
        }
        else {
            console.log((0, parseHtml_1.default)((0, toString_1.default)(error)));
        }
        process.exit(1);
    }, 50);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLCtDQUEwRDtBQUMxRCwrRUFBeUQ7QUFDekQsNEVBQXNEO0FBRXREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQXdCLGNBQWM7SUFDbEMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUM1QyxJQUFJLElBQUEscUJBQWdCLEdBQUUsRUFBRTtRQUNwQixPQUFPLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLDBCQUEwQixDQUFDLENBQUM7UUFDNUQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO0tBQ2hFO1NBQU07UUFDSCxPQUFPLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLHlCQUF5QixDQUFDLENBQUM7UUFDM0QsT0FBTyxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO0tBQy9EO0lBRUQsNkNBQTZDO0lBQzdDLHVEQUF1RDtJQUN2RCxxQkFBcUI7SUFDckIsTUFBTTtJQUVOLHVEQUF1RDtJQUN2RCwrRUFBK0U7SUFDL0UscUJBQXFCO0lBQ3JCLE1BQU07QUFDVixDQUFDO0FBbkJELGlDQW1CQztBQUVELFNBQVMsMEJBQTBCLENBQUMsS0FBSztJQUNyQyxJQUFJLENBQUMsS0FBSztRQUFFLE9BQU87SUFDbkIsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLHFDQUFxQyxDQUFDO1FBQ2hFLE9BQU87SUFDWCxJQUFJLEtBQUssQ0FBQyxVQUFVO1FBQUUsT0FBTztJQUM3QixJQUFJLENBQUMsS0FBSztRQUFFLE9BQU87SUFDbkIsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUEsbUJBQVcsRUFBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFELENBQUM7QUFFRCxTQUFTLHlCQUF5QixDQUFDLEtBQUs7O0lBQ3BDLElBQUksQ0FBQyxLQUFLO1FBQUUsT0FBTztJQUNuQixJQUFJLE1BQUEsS0FBSyxDQUFDLFFBQVEsc0RBQUssUUFBUSxDQUFDLHFDQUFxQyxDQUFDO1FBQ2xFLE9BQU87SUFDWCxJQUFJLEtBQUssQ0FBQyxVQUFVO1FBQUUsT0FBTztJQUU3QixJQUFJLEtBQUssWUFBWSxNQUFNLEVBQUU7UUFDekIsS0FBSyxHQUFHLE1BQUEsS0FBSyxDQUFDLFFBQVEscURBQUksQ0FBQztLQUM5QjtJQUVELFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDWixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUEsbUJBQVcsRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ25DO2FBQU0sSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ2pFLE9BQU8sQ0FBQyxHQUFHLENBQ1AsSUFBQSxtQkFBVyxFQUNQLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQ3hELENBQ0osQ0FBQztTQUNMO2FBQU07WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUEsbUJBQVcsRUFBQyxJQUFBLGtCQUFVLEVBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQy9DO1FBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDWCxDQUFDIn0=