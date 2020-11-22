import __env from '../core/env';
/**
 * @name                  packageRoot
 * @namespace             sugar.js.path
 * @type                  Function
 * @env                   development
 *
 * This function return the path where stands the package in the filesystem.
 * !!! This function works only in development mode cause it will be dangerous to
 * expose this kind on information on a website...
 * If the environment is not the good one, this function will simply return an empty string
 *
 * @return        {String}                Either the package root path if available, or an empty string if not...
 *
 * @example     js
 * import packageRoot from '@coffeekraken/sugar/js/path/packageRoot';
 * packageRoot(); // => /Users/something/hello/world
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
 */
export default function packageRoot() {
    const environment = __env('node_env') || __env('environment') || __env('env');
    if (environment !== 'development' && environment !== 'test')
        return '';
    return __env('package_root') || '';
}
