"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEdge;

/**
 * @name        isEdge
 * @namespace           js.is
 * @type      Function
 *
 * Detect if is edge
 *
 * @param       {String}        [ua=navigator.userAgent]         The user agent on which to make the test
 *
 * @example 	js
 * import isEdge from '@coffeekraken/sugar/js/is/edge'
 * if (isEdge()) {
 *   // do something cool
 * }
 *
 * @return    {Boolean}    true if is edge, false if not
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function isEdge(ua = navigator.userAgent) {
  return ua.indexOf('Edg/') > -1;
}

module.exports = exports.default;