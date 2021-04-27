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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2FnZVJvb3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy90b29scy9zdWdhci9zcmMvc2hhcmVkL3BhdGgvcGFja2FnZVJvb3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sS0FBSyxNQUFNLGFBQWEsQ0FBQztBQUNoQyxPQUFPLFFBQVEsTUFBTSxZQUFZLENBQUM7QUFFbEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUNILFNBQVMsV0FBVyxDQUFDLEdBQUcsSUFBSTtJQUMxQixJQUFJLFFBQVEsRUFBRSxFQUFFO1FBQ2QsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsc0JBQXNCO1FBQzVGLE9BQU8sYUFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7S0FDL0I7U0FBTTtRQUNMLE1BQU0sV0FBVyxHQUNmLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVELElBQUksV0FBVyxLQUFLLGFBQWEsSUFBSSxXQUFXLEtBQUssTUFBTTtZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ3ZFLE9BQU8sS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNwQztBQUNILENBQUM7QUFDRCxlQUFlLFdBQVcsQ0FBQyJ9