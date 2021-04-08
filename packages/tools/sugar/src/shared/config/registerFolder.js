"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name            registerFolder
 * @namespace       sugar.shared.config
 * @type            Function
 *
 * This function allows you to register some folders to be taken in consideration
 * when accessing the config using the ```sugar``` function
 *
 * @param       {String}        folderPath          The folder path in which to check for .config.js files
 *
 * @example         js
 * import registerFolder from '@coffeekraken/sugar/shared/config/registerFolder';
 * registerFolder('/something/cool');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function registerFolder(path, level = 'default') {
    // @ts-ignore
    (global !== null && global !== void 0 ? global : window)._registeredConfigFolderPaths.push({
        path,
        level
    });
}
exports.default = registerFolder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXJGb2xkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpc3RlckZvbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsU0FBd0IsY0FBYyxDQUNwQyxJQUFZLEVBQ1osUUFBb0MsU0FBUztJQUU3QyxhQUFhO0lBQ2IsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxNQUFNLENBQUMsQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUM7UUFDbkQsSUFBSTtRQUNKLEtBQUs7S0FDTixDQUFDLENBQUM7QUFDTCxDQUFDO0FBVEQsaUNBU0MifQ==