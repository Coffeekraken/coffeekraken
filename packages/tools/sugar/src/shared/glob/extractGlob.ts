// @ts-nocheck

import __globParent from 'glob-parent';

/**
 * @name                extractGlob
 * @namespace            shared.glob
 * @type                Function
 * @platform          js
 * @platform          node
 * @status          beta
 *
 * This function simply return you the glob part of a passed string
 *
 * @param       {String}            string          The string from which to extract the glob part
 * @return      {String}                            The glob part of the passed string
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __extractGlob($1)
 * 
 * @example         js
 * import { __extractGlob } from '@coffeekraken/sugar/glob';
 * __extractGlob('/coco/hello/*.js'); // => '*.js'
 *
 * @see             https://www.npmjs.com/package/glob-parent
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default function __extractGlob(string) {
    const parent = __globParent(string);
    let final = string.replace(parent, '');
    if (final.slice(0, 1) === '/') final = final.slice(1);
    return final;
}
