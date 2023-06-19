// @ts-nocheck
import __parseHtml from '../../shared/console/parseHtml';
import __isChildProcess from '../../shared/is/isChildProcess';
import __toString from '../../shared/string/toString';
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
export default function __handleErrors() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxnQ0FBZ0MsQ0FBQztBQUN6RCxPQUFPLGdCQUFnQixNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sVUFBVSxNQUFNLDhCQUE4QixDQUFDO0FBRXREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsY0FBYztJQUNsQyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBQzVDLElBQUksZ0JBQWdCLEVBQUUsRUFBRTtRQUNwQixPQUFPLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLDBCQUEwQixDQUFDLENBQUM7UUFDNUQsT0FBTyxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO0tBQ2hFO1NBQU07UUFDSCxPQUFPLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLHlCQUF5QixDQUFDLENBQUM7UUFDM0QsT0FBTyxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO0tBQy9EO0lBRUQsNkNBQTZDO0lBQzdDLHVEQUF1RDtJQUN2RCxxQkFBcUI7SUFDckIsTUFBTTtJQUVOLHVEQUF1RDtJQUN2RCwrRUFBK0U7SUFDL0UscUJBQXFCO0lBQ3JCLE1BQU07QUFDVixDQUFDO0FBRUQsU0FBUywwQkFBMEIsQ0FBQyxLQUFLO0lBQ3JDLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxxQ0FBcUMsQ0FBQztRQUNoRSxPQUFPO0lBQ1gsSUFBSSxLQUFLLENBQUMsVUFBVTtRQUFFLE9BQU87SUFDN0IsSUFBSSxDQUFDLEtBQUs7UUFBRSxPQUFPO0lBQ25CLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxRCxDQUFDO0FBRUQsU0FBUyx5QkFBeUIsQ0FBQyxLQUFLOztJQUNwQyxJQUFJLE1BQUEsS0FBSyxDQUFDLFFBQVEsc0RBQUssUUFBUSxDQUFDLHFDQUFxQyxDQUFDO1FBQ2xFLE9BQU87SUFDWCxJQUFJLEtBQUssQ0FBQyxVQUFVO1FBQUUsT0FBTztJQUU3QixJQUFJLEtBQUssWUFBWSxNQUFNLEVBQUU7UUFDekIsS0FBSyxHQUFHLE1BQUEsS0FBSyxDQUFDLFFBQVEscURBQUksQ0FBQztLQUM5QjtJQUVELFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDWixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ25DO2FBQU0sSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ2pFLE9BQU8sQ0FBQyxHQUFHLENBQ1AsV0FBVyxDQUNQLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQ3hELENBQ0osQ0FBQztTQUNMO2FBQU07WUFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQy9DO1FBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDWCxDQUFDIn0=