"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = osx;

// TODO tests

/**
 * @name                            osx
 * @namespace           js.is
 * @type                            Function
 *
 * Check if the app run on mac OS X or not
 *
 * @return        {Boolean}                             true if mac OS X, false if not
 *
 * @example       js
 * import isOsx from '@coffeekraken/sugar/js/is/osx';
 * isOsx(); // => true
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function osx() {
  if (process && process.platform) {
    return process.platform === 'darwin';
  }

  return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
}

module.exports = exports.default;