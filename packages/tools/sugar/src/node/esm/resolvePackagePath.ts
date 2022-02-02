import __resolvePackagePath from 'resolve-package-path';
import __packageRoot from '../path/packageRoot';

/**
 * @name                resolvePackagePath
 * @namespace           node.esm
 * @type                Function
 * @platform            node
 * @status              beta
 *
 * This function allows you to resolve a passed package name or a folder directory to it's package.json file
 *
 * @param       {String}            package         The package bane you want to get the path for
 * @param       {String}           [baseDir=`${__packageRoot()}/node_modules`]      The directory from which to search for the package
 * @return      {String}                  The absolute path to the requested package
 *
 * @example         js
 * import resolvePackagePath from '@coffeekraken/sugar/node/esm/resolvePackagePath';
 * resolvePackagePath('something');
 *
 * @see             https://www.npmjs.com/package/resolve-package-path
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function resolvePackagePath(pkg: string, baseDir: string = `${__packageRoot()}/node_modules`) {
    return __resolvePackagePath(pkg, baseDir)?.replace(/\/package\.json$/, '');
}
