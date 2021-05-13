// @ts-nocheck
import __parseHtml from '../../shared/console/parseHtml';
import __isChildProcess from '../../node/is/childProcess';
import __toString from '../../shared/string/toString';
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
    if (error.toString().includes(`Cannot read property 'itop' of null`))
        return;
    if (error.instanceId)
        return;
    if (error instanceof Buffer) {
        error = error.toString();
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
export default handleError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlRXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoYW5kbGVFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxXQUFXLE1BQU0sZ0NBQWdDLENBQUM7QUFDekQsT0FBTyxnQkFBZ0IsTUFBTSw0QkFBNEIsQ0FBQztBQUMxRCxPQUFPLFVBQVUsTUFBTSw4QkFBOEIsQ0FBQztBQUV0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsU0FBUyxXQUFXO0lBQ2xCLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTTtRQUFFLE9BQU87SUFDNUMsSUFBSSxnQkFBZ0IsRUFBRSxFQUFFO1FBQ3RCLE9BQU8sQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztRQUM1RCxPQUFPLENBQUMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLDBCQUEwQixDQUFDLENBQUM7S0FDOUQ7U0FBTTtRQUNMLE9BQU8sQ0FBQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUseUJBQXlCLENBQUMsQ0FBQztRQUMzRCxPQUFPLENBQUMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLHlCQUF5QixDQUFDLENBQUM7S0FDN0Q7SUFFRCw2Q0FBNkM7SUFDN0MsdURBQXVEO0lBQ3ZELHFCQUFxQjtJQUNyQixNQUFNO0lBRU4sdURBQXVEO0lBQ3ZELCtFQUErRTtJQUMvRSxxQkFBcUI7SUFDckIsTUFBTTtBQUNSLENBQUM7QUFFRCxTQUFTLDBCQUEwQixDQUFDLEtBQUs7SUFDdkMsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLHFDQUFxQyxDQUFDO1FBQUUsT0FBTztJQUM3RSxJQUFJLEtBQUssQ0FBQyxVQUFVO1FBQUUsT0FBTztJQUM3QixJQUFJLENBQUMsS0FBSztRQUFFLE9BQU87SUFDbkIsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hELENBQUM7QUFFRCxTQUFTLHlCQUF5QixDQUFDLEtBQUs7SUFDdEMsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLHFDQUFxQyxDQUFDO1FBQUUsT0FBTztJQUM3RSxJQUFJLEtBQUssQ0FBQyxVQUFVO1FBQUUsT0FBTztJQUU3QixJQUFJLEtBQUssWUFBWSxNQUFNLEVBQUU7UUFDM0IsS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUMxQjtJQUVELFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ2pDO2FBQU0sSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ25FLE9BQU8sQ0FBQyxHQUFHLENBQ1QsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FDbkUsQ0FBQztTQUNIO2FBQU07WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzdDO1FBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDVCxDQUFDO0FBQ0QsZUFBZSxXQUFXLENBQUMifQ==