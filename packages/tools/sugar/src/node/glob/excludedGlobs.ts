// @ts-nocheck

import __SugarConfig from '@coffeekraken/s-sugar-config';

/**
 * @name                            excludedGlobs
 * @namespace            node.glob
 * @type                            Function
 * @platform        node
 * @status          beta
 *
 * Return the array of exclude globs
 *
 * @return                {Array<String>}         The array of globs to exclude from the overall project
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __excludedGlobs()
 * 
 * @example             js
 * import { __excludedGlobs } from '@coffeekraken/sugar/glob';
 * __excludedGlobs();
 *
 * @since         2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function __excludedGlobs(): string[] {
    if (__SugarConfig.isLoaded()) {
        return __SugarConfig.get('storage.exclude');
    }
    return [];
}
