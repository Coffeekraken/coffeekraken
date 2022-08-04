// @ts-nocheck
import __handleError from './error/handleError';
import __exitCleanup from './process/exitCleanup';
import __onProcessExit from './process/onProcessExit';
// import __registerSFileClasses from './fs/registerSFileClasses';
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
__handleError();
// exit cleanup
__onProcessExit(() => {
    return __exitCleanup;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGFBQWEsTUFBTSxxQkFBcUIsQ0FBQztBQUNoRCxPQUFPLGFBQWEsTUFBTSx1QkFBdUIsQ0FBQztBQUNsRCxPQUFPLGVBQWUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxrRUFBa0U7QUFFbEU7Ozs7Ozs7Ozs7R0FVRztBQUVILG9CQUFvQjtBQUNwQixhQUFhLEVBQUUsQ0FBQztBQUVoQixlQUFlO0FBQ2YsZUFBZSxDQUFDLEdBQUcsRUFBRTtJQUNqQixPQUFPLGFBQWEsQ0FBQztBQUN6QixDQUFDLENBQUMsQ0FBQyJ9