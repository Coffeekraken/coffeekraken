// @ts-nocheck

import __minimatch from 'minimatch';
import __excludeGlobs from './excludeGlobs';

/**
 * @name                    matchExcludeGlobs
 * @namespace            node.path
 * @type                    Function
 * @platform        node
 * @status          beta
 *
 * This function check if the passed path match one or more exclude globs specified in the config "storage.exclude"
 *
 * @param           {String}            path            The path to check
 * @return          {Boolean}                           true if the path match at least 1 exclude glob, false if not
 *
 * @example         js
 * import matchExcludeGlobs from '@coffeekraken/sugar/node/path/matchExcludeGlobs';
 * if (matchExcludeGlobs('something/cool.js')) {
 *      // ...
 * }
 *
 * @see             https://www.npmjs.com/package/minimatch
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function matchExcludeGlobs(path: string): boolean {
    const excludeGlobs = __excludeGlobs();
    for (let i = 0; i < excludeGlobs.length; i++) {
        if (__minimatch(excludeGlobs[i], path)) return true;
    }
    return false;
}
