import __deepMap from '../../shared/object/deepMap';
import __packageRoot from '../path/packageRoot';
import __monorepoToPackageAbsolutePath from './monorepoToPackageAbsolutePath';
/**
 * @name            monorepoToPackageAbsolutePathDeepMap
 * @type            Function
 * @static
 *
 * This method allows you to make the passed path absolute to the package root passed.
 * This uses the `monorepoToPackageAbsolutePath` method to make all the paths in the passed object
 * absolute to the package root path.
 *
 * @param      {Object}           obj      The object in which to make all the paths absolute to the current package root path
 * @param       {String}           [packageRootPath=__packageRoot()]  The package root path
 * @return     {Object}}       The absolute path object to the passed package root path
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function monorepoToPackageAbsolutePathDeepMap(obj, packageRootPath = __packageRoot()) {
    return __deepMap(obj, ({ object, path, value, prop }) => {
        if (typeof value === 'string') {
            value = __monorepoToPackageAbsolutePath(value, packageRootPath);
        }
        return value;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sU0FBUyxNQUFNLDZCQUE2QixDQUFDO0FBQ3BELE9BQU8sYUFBYSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sK0JBQStCLE1BQU0saUNBQWlDLENBQUM7QUFFOUU7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxvQ0FBb0MsQ0FDeEQsR0FBUSxFQUNSLGtCQUEwQixhQUFhLEVBQUU7SUFFekMsT0FBTyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1FBQ3BELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzNCLEtBQUssR0FBRywrQkFBK0IsQ0FBQyxLQUFLLEVBQUUsZUFBZSxDQUFDLENBQUM7U0FDbkU7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMifQ==