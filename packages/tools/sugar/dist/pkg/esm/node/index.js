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
 * - Logging: Get the powerfull options of the SLog class without any change in your codebase
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
// handle the errors
__handleErrors();
// exit cleanup
__onProcessExit(() => {
    return __exitCleanup;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUU5RDs7Ozs7Ozs7OztHQVVHO0FBRUgsb0JBQW9CO0FBQ3BCLGNBQWMsRUFBRSxDQUFDO0FBRWpCLGVBQWU7QUFDZixlQUFlLENBQUMsR0FBRyxFQUFFO0lBQ2pCLE9BQU8sYUFBYSxDQUFDO0FBQ3pCLENBQUMsQ0FBQyxDQUFDIn0=