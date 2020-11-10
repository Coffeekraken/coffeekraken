"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseEs6Imports;

var _SEs6Import = _interopRequireDefault(require("./SEs6Import"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name                    parseEs6Imports
 * @namespace               sugar.js.es6
 * @type                    Function
 *
 * This function simply take some code and return back an array of es6 module imports objects
 *
 * @param           {String}            code            The code to parse
 * @return          {Array<Object>}                     An array of objects representing the imports
 *
 * @example             js
 * import parseEs6Imports from '@coffeekraken/sugar/js/es6/parseEs6Imports';
 * parseEs6Imports(`
 *      import hello from 'something/cool';
 *      import { world as coco } from 'other/thing';
 * `);
 * // {
 * //   "defaultImport": 'hello',
 * //   "namedImports": [],
 * //   "starImport": null,
 * //   "fromModule": "something/cool"
 * // },
 * // {
 * //   "defaultImport": 'hello',
 * //   "namedImports": [{
 * //     "name": "world",
 * //     "value": "coco"
 * //   }],
 * //   "starImport": null,
 * //   "fromModule": "other/thing"
 * // }
 *
 * @since           2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function parseEs6Imports(code) {
  // parse the code
  return _SEs6Import.default.parseCode(code);
}

module.exports = exports.default;