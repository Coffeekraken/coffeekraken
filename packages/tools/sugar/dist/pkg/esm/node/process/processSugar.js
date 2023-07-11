// @ts-nocheck
import __handleErrors from '../error/handleErrors.js';
import __exitCleanup from './exitCleanup.js';
import __onProcessExit from './onProcessExit.js';
/**
 * @name                    index
 * @namespace           node
 *
 * This file is the "initialisation" one for the sugar node toolkit.
 * It's optional to include it but if you do, you will get these features "for free":
 * - Display errors
 * - Process exit cleanup
 *
 * @snippet         __processSugar()
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGNBQWMsTUFBTSwwQkFBMEIsQ0FBQztBQUN0RCxPQUFPLGFBQWEsTUFBTSxrQkFBa0IsQ0FBQztBQUM3QyxPQUFPLGVBQWUsTUFBTSxvQkFBb0IsQ0FBQztBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGNBQWM7SUFDbEMsb0JBQW9CO0lBQ3BCLGNBQWMsRUFBRSxDQUFDO0lBRWpCLGVBQWU7SUFDZixlQUFlLENBQUMsR0FBRyxFQUFFO1FBQ2pCLE9BQU8sYUFBYSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyJ9