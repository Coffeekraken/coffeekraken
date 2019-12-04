"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sNativeWebComponent;

require("document-register-element");

require("@ungap/custom-elements-builtin");

var _mixwith = require("../vendor/mixwith");

var _SWebComponentMixin = _interopRequireDefault(require("./SWebComponentMixin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name    sNativeWebComponent
 * @namespace     sugar.js.core
 * @type      Function
 *
 * Extend a native web element to create a new web component
 *
 * @param       {HTMLElement}       HTMLElementToExtend         The HTML element to use as web component base
 * @return      {Class}                                         The extended base class to create the new web component with
 *
 * @example     js
 * import native from "@coffeekraken/sugar/js/core/sNativeWebComponent";
 * export default class MyCoolComponent extends native(HTMLVideoElement) {
 *    // your component integration...
 * }
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const extendsStack = {};

function sNativeWebComponent(HTMLElementToExtend) {
  HTMLElementToExtend = function (OriginalHTMLElement) {
    if (!window[OriginalHTMLElement.name]) return OriginalHTMLElement;
    if (extendsStack[OriginalHTMLElement.name]) return extendsStack[OriginalHTMLElement.name];

    function BabelHTMLElement() {
      const newTarget = this.__proto__.constructor;
      return Reflect.construct(OriginalHTMLElement, [], newTarget);
    }

    Object.setPrototypeOf(BabelHTMLElement, OriginalHTMLElement);
    Object.setPrototypeOf(BabelHTMLElement.prototype, OriginalHTMLElement.prototype);
    extendsStack[HTMLElementToExtend.name] = BabelHTMLElement;
    return BabelHTMLElement;
  }(HTMLElementToExtend);

  return (0, _mixwith.mix)(HTMLElementToExtend).with(_SWebComponentMixin.default);
}

module.exports = exports.default;