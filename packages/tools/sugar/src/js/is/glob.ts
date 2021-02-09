// @ts-nocheck
// @shared

import __isGlob from 'is-glob';

/**
 * @name                                      isGlob
 * @namespace           sugar.js.is
 * @type                                      Function
 * @stable
 *
 * Check if the passed string is a valid glob pattern or not
 *
 * @param                 {String}        $string             The string to check
 * @return                {Boolean}                           true if is a valid glob pattern, false if not
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example               js
 * import isGlob from '@coffeekraken/sugar/js/is/js';
 * isGlob('something/*.js); // => true
 *
 * @see       https://www.npmjs.com/package/is-glob
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default (string) => {
  return __isGlob(string);
};
