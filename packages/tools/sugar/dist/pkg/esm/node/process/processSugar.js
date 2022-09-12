// @ts-nocheck
import { __handleErrors } from '@coffeekraken/sugar/error';
import { __exitCleanup } from '@coffeekraken/sugar/process';
import { __onProcessExit } from '@coffeekraken/sugar/process';
/**
 * @name                    index
 * @namespace           node
 *
 * This file is the "initialisation" one for the sugar node toolkit.
 * It's optional to include it but if you do, you will get these features "for free":
 * - Display errors
 * - Process exit cleanup
 *
 * @example         js
 * import { __processSugar } from '@coffeekraken/sugar/process';
 * __processSugar();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __processSugar() {
    // handle the errors
    __handleErrors();
    // exit cleanup
    __onProcessExit(() => {
        return __exitCleanup;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU5RDs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGNBQWM7SUFDbEMsb0JBQW9CO0lBQ3BCLGNBQWMsRUFBRSxDQUFDO0lBRWpCLGVBQWU7SUFDZixlQUFlLENBQUMsR0FBRyxFQUFFO1FBQ2pCLE9BQU8sYUFBYSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9