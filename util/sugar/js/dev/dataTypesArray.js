"use strict";

var _node = _interopRequireDefault(require("../is/node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                    dataTypesArray
 * @namespace               sugar.js.dev
 * @type                    Array
 * 
 * This is just a list of data types available in the
 * current language (node/js)
 * 
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
if ((0, _node.default)()) {
  module.exports = ['Number', 'String', 'Symbol', 'Boolean', 'Null', 'Undefined', 'Object', 'Array', 'JSON', 'Function'];
} else {
  module.exports = ['Number', 'String', 'Symbol', 'Boolean', 'Null', 'Undefined', 'Object', 'Array', 'JSON', 'Function'];
}