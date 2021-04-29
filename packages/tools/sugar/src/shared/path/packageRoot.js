// @ts-nocheck
import __env from '../core/env';
import __isNode from '../is/node';
/**
 * @name                  packageRoot
 * @namespace            js.path
 * @type                  Function
 * @env                   development
 * @status              beta
 *
 * This function return the path where stands the package in the filesystem.
 * !!! This function works only in development mode cause it will be dangerous to
 * expose this kind on information on a website...
 * If the environment is not the good one, this function will simply return an empty string
 *
 * @return        {String}                Either the package root path if available, or an empty string if not...
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example     js
 * import packageRoot from '@coffeekraken/sugar/js/path/packageRoot';
 * packageRoot(); // => /Users/something/hello/world
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
 */
function packageRoot(...args) {
    if (__isNode()) {
        const packageRootFn = require('../../node/path/packageRoot').default; // eslint-disable-line
        return packageRootFn(...args);
    }
    else {
        const environment = __env('node_env') || __env('environment') || __env('env');
        if (environment !== 'development' && environment !== 'test')
            return '';
        return __env('package_root') || '';
    }
}
export default packageRoot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZVJvb3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYWNrYWdlUm9vdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxLQUFLLE1BQU0sYUFBYSxDQUFDO0FBQ2hDLE9BQU8sUUFBUSxNQUFNLFlBQVksQ0FBQztBQUVsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsU0FBUyxXQUFXLENBQUMsR0FBRyxJQUFJO0lBQzFCLElBQUksUUFBUSxFQUFFLEVBQUU7UUFDZCxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxzQkFBc0I7UUFDNUYsT0FBTyxhQUFhLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUMvQjtTQUFNO1FBQ0wsTUFBTSxXQUFXLEdBQ2YsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUQsSUFBSSxXQUFXLEtBQUssYUFBYSxJQUFJLFdBQVcsS0FBSyxNQUFNO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDdkUsT0FBTyxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQztBQUNELGVBQWUsV0FBVyxDQUFDIn0=