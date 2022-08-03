"use strict";
/**
 * @name            globalNodeModulesPath
 * @namespace       node.npm
 * @type            Function
 * @async
 * @platform        node
 * @status          beta
 *
 * This function allows you to install the node packages using npm or yarn depending
 * on your settings.
 *
 * @param       {INpmInstallSettings}           [settings={}]           Some settings to configure your installation
 * @return      {Promise}               A promise resolved or rejected depending on the install command status...
 *
 * @setting         {String}        [cwd=process.cwd()]         The directory where you want to execute the install
 * @setting         {Boolean}        [yarn=true]                Use yarn in priority over npm. Fallback to npm if not available
 * @setting         {Boolean}           [silent=true]           Specify if you want the process to be silent
 * @setting         {Any}           [args={}]                   An object of arguments passed directly to the yarn or npm install command
 *
 * @example         js
 * import install from '@coffeekraken/sugar/node/npm/install';
 * await install();
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
// get global node modules directory path
const globalNodeModulesPath = __childProcess
    .execSync(`npm root -g`)
    .toString()
    .trim();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUVILHlDQUF5QztBQUN6QyxNQUFNLHFCQUFxQixHQUFHLGNBQWM7S0FDdkMsUUFBUSxDQUFDLGFBQWEsQ0FBQztLQUN2QixRQUFRLEVBQUU7S0FDVixJQUFJLEVBQUUsQ0FBQyJ9