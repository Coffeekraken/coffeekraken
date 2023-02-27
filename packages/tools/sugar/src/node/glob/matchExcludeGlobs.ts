// @ts-nocheck

import __minimatch from 'minimatch';

/**
 * @name                    matchExcludeGlobs
 * @namespace            node.glob
 * @type                    Function
 * @platform        node
 * @status          beta
 *
 * This function check if the passed path match one or more exclude globs specified in the config "storage.exclude"
 *
 * @param           {String}            path            The path to check
 * @return          {Boolean}                           true if the path match at least 1 exclude glob, false if not
 *
 * @snippet         __matchExcludedGlobs($1)
 * 
 * @example         js
 * import { __matchExcludeGlobs } from '@coffeekraken/sugar/glob';
 * if (__matchExcludeGlobs('something/cool.js')) {
 *      // ...
 * }
 *
 * @see             https://www.npmjs.com/package/minimatch
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __matchExcludeGlobs(path: string): boolean {
    const excludeGlobs = __excludedGlobs();
    for (let i = 0; i < excludeGlobs.length; i++) {
        if (__minimatch(excludeGlobs[i], path)) return true;
    }
    return false;
}
