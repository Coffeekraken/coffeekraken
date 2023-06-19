
import __resolvePackagePath from 'resolve-package-path';

import __packageRootDir from '../path/packageRootDir';

/**
 * @name                resolvePackagePath
 * @namespace           node.module
 * @type                Function
 * @platform            node
 * @status              beta
 *
 * This function allows you to resolve a passed package name or a folder directory to it's package.json file
 *
 * @param       {String}            package         The package bane you want to get the path for
 * @param       {String}           [baseDir=`${__packageRootDir()}/node_modules`]      The directory from which to search for the package
 * @return      {String}                  The absolute path to the requested package
 *
 * @snippet         __resolvePackagePath($1)
 * 
 * @example         js
 * import { __resolvePackagePath } from '@coffeekraken/sugar/module';
 * __resolvePackagePath('something');
 *
 * @see             https://www.npmjs.com/package/resolve-package-path
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IResolvePackagePathSettings {
    nodeModulesDir: string;
}

export default function resolvePackagePath(
    pkg: string,
    settings?: Partial<IResolvePackagePathSettings>
) {
    const finalSettings: IResolvePackagePathSettings = {
        nodeModulesDir: `${__packageRootDir()}/node_modules`,
        ...settings ?? {}
    }
    return __resolvePackagePath(pkg, finalSettings.nodeModulesDir)?.replace(/\/package\.json$/, '');
}
