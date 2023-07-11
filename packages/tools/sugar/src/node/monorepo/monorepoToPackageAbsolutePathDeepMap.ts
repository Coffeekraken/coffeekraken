import { __monorepoToPackageAbsolutePath } from '@coffeekraken/sugar/monorepo';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __deepMap from '../../shared/object/deepMap.js';

/**
 * @name            monorepoToPackageAbsolutePathDeepMap
 * @type            Function
 * @private
 *
 * This method allows you to make the passed path absolute to the package root passed.
 * This uses the `monorepoToPackageAbsolutePath` method to make all the paths in the passed object
 * absolute to the package root path.
 *
 * @param      {Object}           obj      The object in which to make all the paths absolute to the current package root path
 * @param       {String}           [packageRootPath=__packageRootDir()]  The package root path
 * @return     {Object}}       The absolute path object to the passed package root path
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __monorepoToPackageAbsolutePathDeepMap(
    obj: any,
    packageRootPath: string = __packageRootDir(),
): string {
    return __deepMap(obj, ({ object, path, value, prop }) => {
        if (typeof value === 'string') {
            value = __monorepoToPackageAbsolutePath(value, packageRootPath);
        }
        return value;
    });
}
