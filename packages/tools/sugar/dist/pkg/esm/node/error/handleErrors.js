// @ts-nocheck
import { __isChildProcess } from '@coffeekraken/sugar/is';
import __parseHtml from '../../shared/console/parseHtml';
import __toString from '../../shared/string/toString';
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
 * import { __handleError } from '@coffeekraken/sugar/error';
 * __handleError
 *
 * @since         2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __handleError() {
    if (process.env.NODE_ENV === 'test')
        return;
    if (__isChildProcess()) {
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
    console.log(__parseHtml(errorStringArray.join('\n')));
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
            console.log(__parseHtml(error));
        }
        else if (typeof error === 'object' && error.name && error.message) {
            console.log(__parseHtml([error.name, error.message, error.stack].join('\n\n')));
        }
        else {
            console.log(__parseHtml(__toString(error)));
        }
        process.exit(1);
    }, 50);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLFdBQVcsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN6RCxPQUFPLFVBQVUsTUFBTSw4QkFBOEIsQ0FBQztBQUV0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxhQUFhO0lBQ2pDLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFDNUMsSUFBSSxnQkFBZ0IsRUFBRSxFQUFFO1FBQ3BCLE9BQU8sQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztRQUM1RCxPQUFPLENBQUMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLDBCQUEwQixDQUFDLENBQUM7S0FDaEU7U0FBTTtRQUNILE9BQU8sQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUseUJBQXlCLENBQUMsQ0FBQztRQUMzRCxPQUFPLENBQUMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLHlCQUF5QixDQUFDLENBQUM7S0FDL0Q7SUFFRCw2Q0FBNkM7SUFDN0MsdURBQXVEO0lBQ3ZELHFCQUFxQjtJQUNyQixNQUFNO0lBRU4sdURBQXVEO0lBQ3ZELCtFQUErRTtJQUMvRSxxQkFBcUI7SUFDckIsTUFBTTtBQUNWLENBQUM7QUFFRCxTQUFTLDBCQUEwQixDQUFDLEtBQUs7SUFDckMsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLHFDQUFxQyxDQUFDO1FBQ2hFLE9BQU87SUFDWCxJQUFJLEtBQUssQ0FBQyxVQUFVO1FBQUUsT0FBTztJQUM3QixJQUFJLENBQUMsS0FBSztRQUFFLE9BQU87SUFDbkIsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFELENBQUM7QUFFRCxTQUFTLHlCQUF5QixDQUFDLEtBQUs7O0lBQ3BDLElBQUksTUFBQSxLQUFLLENBQUMsUUFBUSxzREFBSyxRQUFRLENBQUMscUNBQXFDLENBQUM7UUFDbEUsT0FBTztJQUNYLElBQUksS0FBSyxDQUFDLFVBQVU7UUFBRSxPQUFPO0lBRTdCLElBQUksS0FBSyxZQUFZLE1BQU0sRUFBRTtRQUN6QixLQUFLLEdBQUcsTUFBQSxLQUFLLENBQUMsUUFBUSxxREFBSSxDQUFDO0tBQzlCO0lBRUQsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNaLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDbkM7YUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDakUsT0FBTyxDQUFDLEdBQUcsQ0FDUCxXQUFXLENBQ1AsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FDeEQsQ0FDSixDQUFDO1NBQ0w7YUFBTTtZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDL0M7UUFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNYLENBQUMifQ==