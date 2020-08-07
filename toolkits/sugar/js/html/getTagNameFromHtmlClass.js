"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getHtmlhtmlClassFromHtmlClass;

var _upperFirst = _interopRequireDefault(require("../string/upperFirst"));

var _htmlTagToHtmlClassMap = _interopRequireDefault(require("./htmlTagToHtmlClassMap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name            getHtmlhtmlClassFromHtmlClass
 * @namespace       sugar.js.html
 * @type            Function
 *
 * This function simply return the tagname depending on the passed HTML class
 * like HTMLAnchorElement, HTMLLinkElement, etc...
 *
 * @param       {HTMLElement}      htmlClass       The htmlClass to get the tag for
 * @return      {String}               The tagname that correspond to the passed HTMLElement class
 *
 * @example       js
 * import getHtmlhtmlClassFromHtmlClass from '@coffeekraken/sugar/js/html/getHtmlhtmlClassFromHtmlClass';
 * getHtmlhtmlClassFromHtmlClass(HTMLAnchorElement); // => 'a'
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function getHtmlhtmlClassFromHtmlClass(htmlClass) {
  if (!htmlClass) return false;

  for (let key in _htmlTagToHtmlClassMap.default) {
    if (_htmlTagToHtmlClassMap.default[key] === htmlClass) return key;
  }

  return false;
}

module.exports = exports.default;