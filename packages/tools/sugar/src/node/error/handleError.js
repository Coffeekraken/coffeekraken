"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const childProcess_1 = __importDefault(require("../is/childProcess"));
const SError_1 = __importDefault(require("../error/SError"));
const toString_1 = __importDefault(require("../string/toString"));
/**
 * @name                    handleError
 * @namespace               sugar.node.error
 * @type                    Function
 * @wip
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
    console.log(errorStringArray.join('\n'));
}
function __handleMainProcessErrors(error) {
    if (error.toString().includes(`Cannot read property 'itop' of null`))
        return;
    if (error.instanceId)
        return;
    if (error instanceof Buffer) {
        error = error.toString();
    }
    if (!(error instanceof SError_1.default)) {
        error = new SError_1.default(error);
    }
    setTimeout(() => {
        if (typeof error === 'string') {
            const stringErrorReg = /\s?message:\s?((.|\n)*)\s?name:\s/gm;
            const stringErrorMatches = error.match(stringErrorReg);
            console.log(error);
            return;
        }
        else if (typeof error === 'object' && error.name && error.message) {
            console.log([error.name, error.message, error.stack].join('\n\n'));
            return;
        }
        else {
            console.log(toString_1.default(error));
            return;
        }
    }, 50);
}
module.exports = handleError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlRXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoYW5kbGVFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7OztBQUdkLHNFQUFrRDtBQUVsRCw2REFBdUM7QUFJdkMsa0VBQTRDO0FBTTVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxTQUFTLFdBQVc7SUFDbEIsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUM1QyxJQUFJLHNCQUFnQixFQUFFLEVBQUU7UUFDdEIsT0FBTyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO1FBQzVELE9BQU8sQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztLQUM5RDtTQUFNO1FBQ0wsT0FBTyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO1FBQzNELE9BQU8sQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUseUJBQXlCLENBQUMsQ0FBQztLQUM3RDtBQUNILENBQUM7QUFFRCxTQUFTLDBCQUEwQixDQUFDLEtBQUs7SUFDdkMsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLHFDQUFxQyxDQUFDO1FBQUUsT0FBTztJQUM3RSxJQUFJLEtBQUssQ0FBQyxVQUFVO1FBQUUsT0FBTztJQUM3QixJQUFJLENBQUMsS0FBSztRQUFFLE9BQU87SUFDbkIsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFFRCxTQUFTLHlCQUF5QixDQUFDLEtBQUs7SUFDdEMsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLHFDQUFxQyxDQUFDO1FBQUUsT0FBTztJQUM3RSxJQUFJLEtBQUssQ0FBQyxVQUFVO1FBQUUsT0FBTztJQUU3QixJQUFJLEtBQUssWUFBWSxNQUFNLEVBQUU7UUFDM0IsS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUMxQjtJQUVELElBQUksQ0FBQyxDQUFDLEtBQUssWUFBWSxnQkFBUSxDQUFDLEVBQUU7UUFDaEMsS0FBSyxHQUFHLElBQUksZ0JBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM3QjtJQUVELFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUM3QixNQUFNLGNBQWMsR0FBRyxxQ0FBcUMsQ0FBQztZQUM3RCxNQUFNLGtCQUFrQixHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQixPQUFPO1NBQ1I7YUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDbkUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbkUsT0FBTztTQUNSO2FBQU07WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMvQixPQUFPO1NBQ1I7SUFDSCxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDVCxDQUFDO0FBQ0QsaUJBQVMsV0FBVyxDQUFDIn0=