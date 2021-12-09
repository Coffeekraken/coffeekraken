// @ts-nocheck

import __isValidPath from 'is-valid-path';
import __fs from 'fs';

/**
 * @name                            isPath
 * @namespace            node.fs
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Check if the passed string is a valid path or not
 *
 * @param         {String}            path              The path to check
 * @param         {Boolean}           [checkExistence=false]      Specify if you want to check that the passed path actually exist
 * @return        {Boolean}                             true if the path is valide, false if not
 *
 * @example       js
 * import isPath from '@coffeekraken/sugar/node/fs/isPath';
 * isPath('hello/world'); // => true
 *
 * @see       https://www.npmjs.com/package/is-valid-path
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isPath(path, checkExistence = false) {
    if (typeof path !== 'string') return false;

    // empty string
    if (path.trim() === '') return false;

    // multiple lines content
    if (path.split('\n').length > 1) return false;

    // check if we have some /
    if (!path.includes('/')) {
        if (!path.includes('.')) return false;
    }

    // check if the path is valid or not
    if (!__isValidPath(path)) return false;

    // if we have to check the path existence
    if (checkExistence) {
        if (!__fs.existsSync(path)) return false;
    }

    // otherwise, all is ok
    return true;
}
export default isPath;
