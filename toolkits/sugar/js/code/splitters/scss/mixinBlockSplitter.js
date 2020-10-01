"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @name                mixinBlockSplitter
 * @namespace           sugar.js.code.splitters.scss
 * @type                Object
 *
 * This represent the SCSS mixin splitter.
 * It will match all the mixin blocks like "@mixin something(...) { ... }", etc...
 * and split the code accordingly
 *
 * @since           2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
var _default = {
  type: 'mixin.block',
  prefix: /@mixin\s[a-zA-Z0-9-_\.]+\([^{]*\)/,
  open: '{',
  close: '}'
};
exports.default = _default;
module.exports = exports.default;