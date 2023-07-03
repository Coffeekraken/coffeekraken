// @ts-nocheck
import __handleErrors from '../error/handleErrors';
import __exitCleanup from './exitCleanup';
import __onProcessExit from './onProcessExit';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGNBQWMsTUFBTSx1QkFBdUIsQ0FBQztBQUNuRCxPQUFPLGFBQWEsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxlQUFlLE1BQU0saUJBQWlCLENBQUM7QUFFOUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxjQUFjO0lBQ2xDLG9CQUFvQjtJQUNwQixjQUFjLEVBQUUsQ0FBQztJQUVqQixlQUFlO0lBQ2YsZUFBZSxDQUFDLEdBQUcsRUFBRTtRQUNqQixPQUFPLGFBQWEsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMifQ==