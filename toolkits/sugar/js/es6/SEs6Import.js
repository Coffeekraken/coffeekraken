"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _micromatch = require("micromatch");

var _parseEs6Imports = _interopRequireDefault(require("parse-es6-imports"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name            SEs6Import
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
 * import SEs6Import from '@coffeekraken/sugar/js/es6/SEs6Import';
 * const import = new SEs6Import('import coco from "something";');
 *
 * @since           2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
var SEs6Import = /*#__PURE__*/function () {
  _createClass(SEs6Import, null, [{
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
     * @return      {Array<SEs6Import}                  An array of all the founded es6 imports
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    value: function parseCode(code) {
      // search for statements
      var reg = /^[\s]{0,999999}import\s[^\r\n;].*/gm;
      var matches = code.match(reg);

      if (!matches) {
        return [];
      }

      matches = matches.map(statement => {
        return new SEs6Import(statement.trim());
      });
      return matches;
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
  function SEs6Import(statement) {
    _classCallCheck(this, SEs6Import);

    _defineProperty(this, "raw", null);

    _defineProperty(this, "path", null);

    _defineProperty(this, "default", null);

    _defineProperty(this, "star", null);

    _defineProperty(this, "named", []);

    var parsedStatement = (0, _parseEs6Imports.default)(statement)[0];

    if (parsedStatement) {
      this.raw = statement;
      this.path = parsedStatement.fromModule;
      this.default = parsedStatement.defaultImport;
      this.star = parsedStatement.starImport;
      this.named = parsedStatement.namedImports.map(n => {
        return {
          name: n.name,
          as: n.value
        };
      });
    }
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


  _createClass(SEs6Import, [{
    key: "toString",
    value: function toString() {
      var string = 'import ';

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

  return SEs6Import;
}();

exports.default = SEs6Import;
module.exports = exports.default;