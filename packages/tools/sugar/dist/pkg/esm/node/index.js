// @ts-nocheck
import { __handleErrors } from '@coffeekraken/sugar/error';
import __exitCleanup from './process/exitCleanup';
import __onProcessExit from './process/onProcessExit';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxhQUFhLE1BQU0sdUJBQXVCLENBQUM7QUFDbEQsT0FBTyxlQUFlLE1BQU0seUJBQXlCLENBQUM7QUFFdEQ7Ozs7Ozs7Ozs7R0FVRztBQUVILG9CQUFvQjtBQUNwQixjQUFjLEVBQUUsQ0FBQztBQUVqQixlQUFlO0FBQ2YsZUFBZSxDQUFDLEdBQUcsRUFBRTtJQUNqQixPQUFPLGFBQWEsQ0FBQztBQUN6QixDQUFDLENBQUMsQ0FBQyJ9