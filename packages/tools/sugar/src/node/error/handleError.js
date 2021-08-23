// @ts-nocheck
import __parseHtml from '../../shared/console/parseHtml';
import __isChildProcess from '../../node/is/childProcess';
import __toString from '../../shared/string/toString';
/**
 * @name                    handleError
 * @namespace            node.error
 * @type                    Function
 * @platform        ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlRXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoYW5kbGVFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxXQUFXLE1BQU0sZ0NBQWdDLENBQUM7QUFDekQsT0FBTyxnQkFBZ0IsTUFBTSw0QkFBNEIsQ0FBQztBQUMxRCxPQUFPLFVBQVUsTUFBTSw4QkFBOEIsQ0FBQztBQUV0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxTQUFTLFdBQVc7SUFDaEIsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUM1QyxJQUFJLGdCQUFnQixFQUFFLEVBQUU7UUFDcEIsT0FBTyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO1FBQzVELE9BQU8sQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztLQUNoRTtTQUFNO1FBQ0gsT0FBTyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO1FBQzNELE9BQU8sQ0FBQyxFQUFFLENBQUMsb0JBQW9CLEVBQUUseUJBQXlCLENBQUMsQ0FBQztLQUMvRDtJQUVELDZDQUE2QztJQUM3Qyx1REFBdUQ7SUFDdkQscUJBQXFCO0lBQ3JCLE1BQU07SUFFTix1REFBdUQ7SUFDdkQsK0VBQStFO0lBQy9FLHFCQUFxQjtJQUNyQixNQUFNO0FBQ1YsQ0FBQztBQUVELFNBQVMsMEJBQTBCLENBQUMsS0FBSztJQUNyQyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMscUNBQXFDLENBQUM7UUFBRSxPQUFPO0lBQzdFLElBQUksS0FBSyxDQUFDLFVBQVU7UUFBRSxPQUFPO0lBQzdCLElBQUksQ0FBQyxLQUFLO1FBQUUsT0FBTztJQUNuQixNQUFNLGdCQUFnQixHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUQsQ0FBQztBQUVELFNBQVMseUJBQXlCLENBQUMsS0FBSztJQUNwQyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMscUNBQXFDLENBQUM7UUFBRSxPQUFPO0lBQzdFLElBQUksS0FBSyxDQUFDLFVBQVU7UUFBRSxPQUFPO0lBRTdCLElBQUksS0FBSyxZQUFZLE1BQU0sRUFBRTtRQUN6QixLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzVCO0lBRUQsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNaLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDbkM7YUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDakUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbkY7YUFBTTtZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDL0M7UUFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNYLENBQUM7QUFDRCxlQUFlLFdBQVcsQ0FBQyJ9