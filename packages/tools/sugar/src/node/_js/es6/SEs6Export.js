"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var __babelParser = _interopRequireWildcard(require("@babel/parser"));

var _generator = _interopRequireDefault(require("@babel/generator"));

var _parseEs6Imports = _interopRequireDefault(require("parse-es6-imports"));

var _traverse = _interopRequireDefault(require("@babel/traverse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var code = "\n    export let name1, name2; // also var, const\n    export let name1 = 'plop', name2 = coco, nameN; // also var, const\n    export function functionName(arg, arg2 = 'adf'){ const hello = arg2; }\n    export class ClassName {}\n    export let name1; // also var, const\n    \n    // Export list\n    export { name1, name2, nameN };\n    \n    // Renaming exports\n    export { variable1 as name1, variable2 as name2, nameN };\n    \n    // Exporting destructured assignments with renaming\n    export const { name1, name2: bar } = o;\n    \n    // Default exports\n    export default expression;\n    export default function () {} // also class, function*\n    export default function name1() {} // also class, function*\n    export { name1 as default };\n    \n    // Aggregating modules\n    export * from 'something'; // does not set the default export\n    export * as name1 from 'something'; // Draft ECMAScript\xAE 2O21\n    export { name1, name2, nameN } from 'something';\n    export { import1 as name1, import2 as name2, nameN } from 'something';\n    export { default } from 'something';\n    \n    if (process.env.NODE_ENV === 'production') {\n      // eslint-disable-next-line global-require\n      export { default } from './dist/hotkeys.common.min.js';\n    } else {\n      // eslint-disable-next-line global-require\n      export { default } from './dist/hotkeys.common.js';\n    }\n    ";
/**
 * @name            SEs6Export
 * @namespace       sugar.js.es6
 * @type            Class
 *
 * This class represent an es6 import statement with properties like:
 * - path {String}: The import path
 * - default {String}: The default import name
 * - star {String}: The start import name "import * as something from ..."
 * - named {Array<Object>}: THe named imports
 * - raw {String}: The raw import statement
 *
 * @param           {String}        statement           The import statement
 *
 * @example             js
 * import SEs6Export from '@coffeekraken/sugar/js/es6/SEs6Export';
 * const exp = new SEs6Export('export { coco } from "something";');
 *
 * @since           2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */

var SEs6Export = /*#__PURE__*/function () {
  _createClass(SEs6Export, null, [{
    key: "parseCode",

    /**
     * @name            parseCode
     * @type            Function
     * @static
     *
     * This function simply parse the passed code and return an array of all the
     * founded es6 imports
     *
     * @param       {String}            code            The code to parse
     * @return      {Array<SEs6Export}                  An array of all the founded es6 imports
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    value: function parseCode(code) {
      // search for statements
      var parts = code.split();

      var ast = __babelParser.parse(code, {
        allowImportExportEverywhere: true,
        allowUndeclaredExports: true,
        sourceType: 'script',
        strictMode: false
      });

      (0, _traverse.default)(ast, {
        ExportNamedDeclaration: function ExportNamedDeclaration(path) {
          console.log('path');
        }
      });
    }
    /**
     * @name      raw
     * @type      String
     *
     * Store the raw statement string
     *
     * @since         2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */

  }]);

  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @since           2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */
  function SEs6Export(statement) {
    _classCallCheck(this, SEs6Export);

    _defineProperty(this, "raw", null);

    _defineProperty(this, "path", null);

    _defineProperty(this, "default", null);

    _defineProperty(this, "star", null);

    _defineProperty(this, "named", []);

    console.log(statement);
    var line = statement;

    var parsed = __babelParser.parse(line, {
      allowImportExportEverywhere: true
    }).program.body[0];

    var exportObj = {
      named: []
    };
    console.log(parsed);

    switch (parsed.type) {
      case 'ExportNamedDeclaration':
        if (parsed.declaration && parsed.declaration.type) {
          switch (parsed.declaration.type) {
            case 'VariableDeclaration':
              var declarations = parsed.declaration && parsed.declaration.declarations ? parsed.declaration.declarations : parsed.declarations ? parsed.declarations : [];
              declarations.forEach(declaration => {
                if (declaration.id && declaration.id.properties) {
                  declaration.id.properties.forEach(prop => {
                    var parts = (0, _generator.default)(prop).code.split(':');
                    var value = null;

                    if (parts.length > 1) {
                      value = __unquote(parts.pop().trim());
                    }

                    exportObj.named.push({
                      name: prop.value.name,
                      value
                    });
                  });
                  return;
                }

                var parts = line.slice(declaration.start, declaration.end).split('=');
                var value = null;

                if (parts.length > 1) {
                  value = __unquote(parts.pop().trim());
                }

                exportObj.named.push({
                  name: declaration.id.name,
                  value
                });
              });
              break;

            case 'ClassDeclaration':
            case 'FunctionDeclaration':
              var codeAst = parsed.declaration;
              var value = (0, _generator.default)(codeAst).code;
              exportObj.named.push({
                name: parsed.declaration.id.name,
                value
              });
              break;
          }

          break;
        } else if (parsed.specifiers) {
          var parts = (0, _generator.default)(parsed).code.split('=');
          var _value = null;

          if (parts.length > 1) {
            _value = __unquote(parts.pop().trim());
          }

          parsed.specifiers.forEach(specifier => {
            console.log(specifier.exported);
            exportObj.named.push({
              name: specifier.local.name,
              as: specifier.exported.name !== specifier.local.name ? specifier.exported.name : null,
              value: _value
            });
          });
        }

    }

    console.log(exportObj);
  }
  /**
   * @name          toString
   * @type          Function
   *
   * Return the builded version of the import
   *
   * @return        {String}        The build version of the statement
   *
   * @since         2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */


  _createClass(SEs6Export, [{
    key: "toString",
    value: function toString() {
      var string = 'export ';

      if (this.star) {
        string += "* as ".concat(this.star, " ");
      }

      if (this.default) {
        string += "".concat(this.default);

        if (this.named && this.named.length) {
          string += ', ';
        } else {
          string += ' ';
        }
      }

      if (this.named && this.named.length) {
        string += '{ ';
        string += this.named.map(n => {
          if (n.as) {
            return "".concat(n.name, " as ").concat(n.as);
          } else {
            return n.name;
          }
        }).join(', ');
        string += ' } ';
      }

      string += "from \"".concat(this.path, "\";");
      return string;
    }
  }]);

  return SEs6Export;
}();

exports.default = SEs6Export;
module.exports = exports.default;