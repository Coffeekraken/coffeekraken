"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseHtml_1 = __importDefault(require("../../shared/console/parseHtml"));
const childProcess_1 = __importDefault(require("../../node/is/childProcess"));
const toString_1 = __importDefault(require("../../shared/string/toString"));
/**
 * @name                    handleError
 * @namespace            node.error
 * @type                    Function
 * @status              wip
 *
 * This function take a thrown error and try to display it the best way possible.
 * Simply add the "uncaughtException" and the "unhandledRejection" listeners on the process object,
 * pass this function as the handler one and that's it...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example           js
 * import handleError from '@coffeekraken/sugar/node/error/handleError';
 * process.on('uncaughtException', handleError);
 * process.on('unhandledRejection', handleError);
 *
 * @since         2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function handleError() {
    if (process.env.NODE_ENV === 'test')
        return;
    if (childProcess_1.default()) {
        process.on('uncaughtException', __handleChildProcessErrors);
        process.on('unhandledRejection', __handleChildProcessErrors);
    }
    else {
        process.on('uncaughtException', __handleMainProcessErrors);
        process.on('unhandledRejection', __handleMainProcessErrors);
    }
}
function __handleChildProcessErrors(error) {
    if (error.toString().includes(`Cannot read property 'itop' of null`))
        return;
    if (error.instanceId)
        return;
    if (!error)
        return;
    const errorStringArray = [error.stack];
    console.log(parseHtml_1.default(errorStringArray.join('\n')));
}
function __handleMainProcessErrors(error) {
    if (error.toString().includes(`Cannot read property 'itop' of null`))
        return;
    if (error.instanceId)
        return;
    if (error instanceof Buffer) {
        error = error.toString();
    }
    setTimeout(() => {
        if (typeof error === 'string') {
            console.log(parseHtml_1.default(error));
        }
        else if (typeof error === 'object' && error.name && error.message) {
            console.log(parseHtml_1.default([error.name, error.message, error.stack].join('\n\n')));
        }
        else {
            console.log(parseHtml_1.default(toString_1.default(error)));
        }
        process.exit(1);
    }, 50);
}
exports.default = handleError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlRXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoYW5kbGVFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCwrRUFBeUQ7QUFDekQsOEVBQTBEO0FBQzFELDRFQUFzRDtBQUV0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsU0FBUyxXQUFXO0lBQ2xCLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFDNUMsSUFBSSxzQkFBZ0IsRUFBRSxFQUFFO1FBQ3RCLE9BQU8sQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztRQUM1RCxPQUFPLENBQUMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLDBCQUEwQixDQUFDLENBQUM7S0FDOUQ7U0FBTTtRQUNMLE9BQU8sQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUseUJBQXlCLENBQUMsQ0FBQztRQUMzRCxPQUFPLENBQUMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLHlCQUF5QixDQUFDLENBQUM7S0FDN0Q7QUFDSCxDQUFDO0FBRUQsU0FBUywwQkFBMEIsQ0FBQyxLQUFLO0lBQ3ZDLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxxQ0FBcUMsQ0FBQztRQUFFLE9BQU87SUFDN0UsSUFBSSxLQUFLLENBQUMsVUFBVTtRQUFFLE9BQU87SUFDN0IsSUFBSSxDQUFDLEtBQUs7UUFBRSxPQUFPO0lBQ25CLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBVyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEQsQ0FBQztBQUVELFNBQVMseUJBQXlCLENBQUMsS0FBSztJQUN0QyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMscUNBQXFDLENBQUM7UUFBRSxPQUFPO0lBQzdFLElBQUksS0FBSyxDQUFDLFVBQVU7UUFBRSxPQUFPO0lBRTdCLElBQUksS0FBSyxZQUFZLE1BQU0sRUFBRTtRQUMzQixLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzFCO0lBRUQsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ2pDO2FBQU0sSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ25FLE9BQU8sQ0FBQyxHQUFHLENBQ1QsbUJBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQ25FLENBQUM7U0FDSDthQUFNO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBVyxDQUFDLGtCQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzdDO1FBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDVCxDQUFDO0FBQ0Qsa0JBQWUsV0FBVyxDQUFDIn0=