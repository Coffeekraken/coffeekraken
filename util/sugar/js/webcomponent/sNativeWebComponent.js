"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sNativeWebComponent;

var _mixClasses = require("mix-classes");

// import 'document-register-element';
// import '@ungap/custom-elements-builtin';
// import { mix } from '../vendor/mixwith';
// import SWebComponentMixin from './SWebComponentMixin';
// import __multiple from '../class/multipleExtends';

/**
 * @name    sNativeWebComponent
 * @namespace           js.core
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

function sNativeWebComponent(HTMLElementToExtend, SWebComponent) {
  // HTMLElementToExtend = (function (OriginalHTMLElement) {
  //   if (!window[OriginalHTMLElement.name]) return OriginalHTMLElement;
  //   if (extendsStack[OriginalHTMLElement.name])
  //     return extendsStack[OriginalHTMLElement.name];
  //   function BabelHTMLElement() {
  //     const newTarget = this.__proto__.constructor;
  //     return Reflect.construct(OriginalHTMLElement, [], newTarget);
  //   }
  //   Object.setPrototypeOf(BabelHTMLElement, OriginalHTMLElement);
  //   Object.setPrototypeOf(
  //     BabelHTMLElement.prototype,
  //     OriginalHTMLElement.prototype
  //   );
  //   extendsStack[HTMLElementToExtend.name] = BabelHTMLElement;
  //   return BabelHTMLElement;
  // })(HTMLElementToExtend);
  return SWebComponent;
  return (0, _mixClasses.Mix)(HTMLElementToExtend, SWebComponent); // return __multiple(HTMLElementToExtend, SWebComponent);
  // return mixins.Mixed(HTMLElementToExtend, SWebComponent);
  // return mix(HTMLElementToExtend).with(SWebComponent);
}

module.exports = exports.default;