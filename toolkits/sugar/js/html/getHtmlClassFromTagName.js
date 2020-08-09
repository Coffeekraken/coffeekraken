"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getHtmlClassFromTagName;

var _upperFirst = _interopRequireDefault(require("../string/upperFirst"));

var _htmlTagToHtmlClassMap = _interopRequireDefault(require("./htmlTagToHtmlClassMap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name            getHtmlClassFromTagName
 * @namespace       sugar.js.html
 * @type            Function
 *
 * This function simply return the HTML{name}Element class depending on the passed
 * tag name like "p", "input", "textarea", etc...
 *
 * @param       {String}      tagName       The tagName to get the class for
 * @return      {HTMLElement}               The HTMLElement class that correspond to the requested tag name
 *
 * @example       js
 * import getHtmlClassFromTagName from '@coffeekraken/sugar/js/html/getHtmlClassFromTagName';
 * getHtmlClassFromTagName('a'); // => HTMLAnchorElement
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function getHtmlClassFromTagName(tagName) {
  if (!tagName) return HTMLElement;
  var tagNameUpperFirst = (0, _upperFirst.default)(tagName);
  if (window["HTML".concat(tagNameUpperFirst, "Element")]) return window["HTML".concat(tagNameUpperFirst, "Element")];
  if (_htmlTagToHtmlClassMap.default[tagName]) return _htmlTagToHtmlClassMap.default[tagName];
  return HTMLElement;
}

module.exports = exports.default;