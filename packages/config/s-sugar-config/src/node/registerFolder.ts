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
export default function registerFolder(
  path: string,
  scope?: 'default' | 'module' | 'extends' | 'repo' | 'package' | 'user',
  packageName?: string
): void {
  // @ts-ignore
  (global ?? window)._registeredConfigFolderPaths.push({
    path,
    scope: scope ?? 'default',
    packageName
  });
}
