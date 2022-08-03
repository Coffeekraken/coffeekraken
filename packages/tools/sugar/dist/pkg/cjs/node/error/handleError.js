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
 * @example           js
 * import handleError from '@coffeekraken/sugar/node/error/handleError';
 * process.on('uncaughtException', handleError);
 * process.on('unhandledRejection', handleError);
 *
 * @since         2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function handleError() {
    if (process.env.NODE_ENV === 'test')
        return;
    if ((0, childProcess_1.default)()) {
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
    if (error.toString().includes(`Cannot read property 'itop' of null`))
        return;
    if (error.instanceId)
        return;
    if (error instanceof Buffer) {
        error = error.toString();
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
exports.default = handleError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLCtFQUF5RDtBQUN6RCw4RUFBMEQ7QUFDMUQsNEVBQXNEO0FBRXREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsU0FBUyxXQUFXO0lBQ2hCLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFDNUMsSUFBSSxJQUFBLHNCQUFnQixHQUFFLEVBQUU7UUFDcEIsT0FBTyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO1FBQzVELE9BQU8sQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztLQUNoRTtTQUFNO1FBQ0gsT0FBTyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO1FBQzNELE9BQU8sQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUseUJBQXlCLENBQUMsQ0FBQztLQUMvRDtJQUVELDZDQUE2QztJQUM3Qyx1REFBdUQ7SUFDdkQscUJBQXFCO0lBQ3JCLE1BQU07SUFFTix1REFBdUQ7SUFDdkQsK0VBQStFO0lBQy9FLHFCQUFxQjtJQUNyQixNQUFNO0FBQ1YsQ0FBQztBQUVELFNBQVMsMEJBQTBCLENBQUMsS0FBSztJQUNyQyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMscUNBQXFDLENBQUM7UUFDaEUsT0FBTztJQUNYLElBQUksS0FBSyxDQUFDLFVBQVU7UUFBRSxPQUFPO0lBQzdCLElBQUksQ0FBQyxLQUFLO1FBQUUsT0FBTztJQUNuQixNQUFNLGdCQUFnQixHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBQSxtQkFBVyxFQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUQsQ0FBQztBQUVELFNBQVMseUJBQXlCLENBQUMsS0FBSztJQUNwQyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMscUNBQXFDLENBQUM7UUFDaEUsT0FBTztJQUNYLElBQUksS0FBSyxDQUFDLFVBQVU7UUFBRSxPQUFPO0lBRTdCLElBQUksS0FBSyxZQUFZLE1BQU0sRUFBRTtRQUN6QixLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzVCO0lBRUQsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNaLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBQSxtQkFBVyxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDbkM7YUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDakUsT0FBTyxDQUFDLEdBQUcsQ0FDUCxJQUFBLG1CQUFXLEVBQ1AsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FDeEQsQ0FDSixDQUFDO1NBQ0w7YUFBTTtZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBQSxtQkFBVyxFQUFDLElBQUEsa0JBQVUsRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDL0M7UUFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNYLENBQUM7QUFDRCxrQkFBZSxXQUFXLENBQUMifQ==