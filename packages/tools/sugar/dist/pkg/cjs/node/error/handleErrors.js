"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseHtml_1 = __importDefault(require("../../shared/console/parseHtml"));
const isChildProcess_1 = __importDefault(require("../../shared/is/isChildProcess"));
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
    if ((0, isChildProcess_1.default)()) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLCtFQUF5RDtBQUN6RCxvRkFBOEQ7QUFDOUQsNEVBQXNEO0FBRXREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILFNBQXdCLGNBQWM7SUFDbEMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUM1QyxJQUFJLElBQUEsd0JBQWdCLEdBQUUsRUFBRTtRQUNwQixPQUFPLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLDBCQUEwQixDQUFDLENBQUM7UUFDNUQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO0tBQ2hFO1NBQU07UUFDSCxPQUFPLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLHlCQUF5QixDQUFDLENBQUM7UUFDM0QsT0FBTyxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO0tBQy9EO0lBRUQsNkNBQTZDO0lBQzdDLHVEQUF1RDtJQUN2RCxxQkFBcUI7SUFDckIsTUFBTTtJQUVOLHVEQUF1RDtJQUN2RCwrRUFBK0U7SUFDL0UscUJBQXFCO0lBQ3JCLE1BQU07QUFDVixDQUFDO0FBbkJELGlDQW1CQztBQUVELFNBQVMsMEJBQTBCLENBQUMsS0FBSztJQUNyQyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMscUNBQXFDLENBQUM7UUFDaEUsT0FBTztJQUNYLElBQUksS0FBSyxDQUFDLFVBQVU7UUFBRSxPQUFPO0lBQzdCLElBQUksQ0FBQyxLQUFLO1FBQUUsT0FBTztJQUNuQixNQUFNLGdCQUFnQixHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBQSxtQkFBVyxFQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUQsQ0FBQztBQUVELFNBQVMseUJBQXlCLENBQUMsS0FBSzs7SUFDcEMsSUFBSSxNQUFBLEtBQUssQ0FBQyxRQUFRLHNEQUFLLFFBQVEsQ0FBQyxxQ0FBcUMsQ0FBQztRQUNsRSxPQUFPO0lBQ1gsSUFBSSxLQUFLLENBQUMsVUFBVTtRQUFFLE9BQU87SUFFN0IsSUFBSSxLQUFLLFlBQVksTUFBTSxFQUFFO1FBQ3pCLEtBQUssR0FBRyxNQUFBLEtBQUssQ0FBQyxRQUFRLHFEQUFJLENBQUM7S0FDOUI7SUFFRCxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ1osSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFBLG1CQUFXLEVBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNuQzthQUFNLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUNqRSxPQUFPLENBQUMsR0FBRyxDQUNQLElBQUEsbUJBQVcsRUFDUCxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUN4RCxDQUNKLENBQUM7U0FDTDthQUFNO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFBLG1CQUFXLEVBQUMsSUFBQSxrQkFBVSxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMvQztRQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ1gsQ0FBQyJ9