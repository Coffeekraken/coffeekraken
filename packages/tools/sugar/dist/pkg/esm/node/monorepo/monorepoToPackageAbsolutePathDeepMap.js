import { __monorepoToPackageAbsolutePath } from '@coffeekraken/sugar/monorepo';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __deepMap from '../../shared/object/deepMap';
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
export default function __monorepoToPackageAbsolutePathDeepMap(obj, packageRootPath = __packageRootDir()) {
    return __deepMap(obj, ({ object, path, value, prop }) => {
        if (typeof value === 'string') {
            value = __monorepoToPackageAbsolutePath(value, packageRootPath);
        }
        return value;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQy9FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sU0FBUyxNQUFNLDZCQUE2QixDQUFDO0FBRXBEOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsc0NBQXNDLENBQzFELEdBQVEsRUFDUixrQkFBMEIsZ0JBQWdCLEVBQUU7SUFFNUMsT0FBTyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ3BELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzNCLEtBQUssR0FBRywrQkFBK0IsQ0FBQyxLQUFLLEVBQUUsZUFBZSxDQUFDLENBQUM7U0FDbkU7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMifQ==