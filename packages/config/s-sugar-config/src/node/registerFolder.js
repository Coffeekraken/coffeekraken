/**
 * @name            registerFolder
 * @namespace       shared
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
export default function registerFolder(path, scope, packageName) {
    // @ts-ignore
    (global !== null && global !== void 0 ? global : window)._registeredConfigFolderPaths.push({
        path,
        scope: scope !== null && scope !== void 0 ? scope : 'default',
        packageName
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXJGb2xkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpc3RlckZvbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsY0FBYyxDQUNwQyxJQUFZLEVBQ1osS0FBc0UsRUFDdEUsV0FBb0I7SUFFcEIsYUFBYTtJQUNiLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksTUFBTSxDQUFDLENBQUMsNEJBQTRCLENBQUMsSUFBSSxDQUFDO1FBQ25ELElBQUk7UUFDSixLQUFLLEVBQUUsS0FBSyxhQUFMLEtBQUssY0FBTCxLQUFLLEdBQUksU0FBUztRQUN6QixXQUFXO0tBQ1osQ0FBQyxDQUFDO0FBQ0wsQ0FBQyJ9