// @ts-nocheck
import __parseHtml from '../../shared/console/parseHtml';
import __isChildProcess from '../../node/is/childProcess';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlRXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoYW5kbGVFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxXQUFXLE1BQU0sZ0NBQWdDLENBQUM7QUFDekQsT0FBTyxnQkFBZ0IsTUFBTSw0QkFBNEIsQ0FBQztBQUMxRCxPQUFPLFVBQVUsTUFBTSw4QkFBOEIsQ0FBQztBQUV0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILFNBQVMsV0FBVztJQUNoQixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBQzVDLElBQUksZ0JBQWdCLEVBQUUsRUFBRTtRQUNwQixPQUFPLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLDBCQUEwQixDQUFDLENBQUM7UUFDNUQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO0tBQ2hFO1NBQU07UUFDSCxPQUFPLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLHlCQUF5QixDQUFDLENBQUM7UUFDM0QsT0FBTyxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO0tBQy9EO0lBRUQsNkNBQTZDO0lBQzdDLHVEQUF1RDtJQUN2RCxxQkFBcUI7SUFDckIsTUFBTTtJQUVOLHVEQUF1RDtJQUN2RCwrRUFBK0U7SUFDL0UscUJBQXFCO0lBQ3JCLE1BQU07QUFDVixDQUFDO0FBRUQsU0FBUywwQkFBMEIsQ0FBQyxLQUFLO0lBQ3JDLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxxQ0FBcUMsQ0FBQztRQUNoRSxPQUFPO0lBQ1gsSUFBSSxLQUFLLENBQUMsVUFBVTtRQUFFLE9BQU87SUFDN0IsSUFBSSxDQUFDLEtBQUs7UUFBRSxPQUFPO0lBQ25CLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxRCxDQUFDO0FBRUQsU0FBUyx5QkFBeUIsQ0FBQyxLQUFLO0lBQ3BDLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxxQ0FBcUMsQ0FBQztRQUNoRSxPQUFPO0lBQ1gsSUFBSSxLQUFLLENBQUMsVUFBVTtRQUFFLE9BQU87SUFFN0IsSUFBSSxLQUFLLFlBQVksTUFBTSxFQUFFO1FBQ3pCLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDNUI7SUFFRCxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ1osSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNuQzthQUFNLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUNqRSxPQUFPLENBQUMsR0FBRyxDQUNQLFdBQVcsQ0FDUCxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUN4RCxDQUNKLENBQUM7U0FDTDthQUFNO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMvQztRQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ1gsQ0FBQztBQUNELGVBQWUsV0FBVyxDQUFDIn0=