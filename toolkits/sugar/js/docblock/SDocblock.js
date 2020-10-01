"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SError = _interopRequireDefault(require("../error/SError"));

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _SDocblockBlock = _interopRequireDefault(require("./SDocblockBlock"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _index = _interopRequireDefault(require("./markdown/index"));

var _htmlFromMarkdown = _interopRequireDefault(require("../convert/html/htmlFromMarkdown"));

var _node = _interopRequireDefault(require("../is/node"));

var _path = _interopRequireDefault(require("../is/path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name                  Dockblock
 * @namespace           sugar.js.docblock
 * @type                  Class
 *
 * This is the main class that expose the methods like "parse", etc...
 * You have to instanciate it by passing a settings object. Here's the available options:
 *
 * @param       {String|Object}     source        The docblock source. Can be either a string to parse or a filepath
 * @param       {Object}      [settings={}]       An object of settings to configure the SDocblock instance:
 * - tags ({}) {Object}: An object representing the functions used to parse each tags. The object format is ```{ tagName: parseFn }```
 *
 * @todo        tests
 *
 * @example         js
 * import SDocblock from '@coffeekraken/sugar/js/docblock/SSDocblock';
 * new SDocblock(source, {
 *    // override some settings here...
 * });
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
var SDocblock = /*#__PURE__*/function () {
  /**
   * @name              _settings
   * @type              Object
   * @private
   *
   * Store this instance settings
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */

  /**
   * @name            _source
   * @type            String|Array<Object>
   * @private
   *
   * Store the passed source
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */

  /**
   * @name            _blocks
   * @type            Array<Object>
   * @private
   *
   * Store the parsed array of docblock objects
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */

  /**
   * @name          _to
   * @type          String
   * @private
   *
   * Store the format in which the docblocks have to be converted
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */

  /**
   * @name            constructor
   * @type            Function
   *
   * Constructor
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */
  function SDocblock(source, settings) {
    if (settings === void 0) {
      settings = {};
    }

    _classCallCheck(this, SDocblock);

    _defineProperty(this, "_settings", {});

    _defineProperty(this, "_source", null);

    _defineProperty(this, "_blocks", null);

    _defineProperty(this, "_to", null);

    this._settings = (0, _deepMerge.default)({
      sortFunction: (a, b) => {
        var res = 0;
        if (!b || !a) return res;
        var aObj = a.toObject(),
            bObj = b.toObject(); // if (.object.namespace && !aObj.namespace) res -= 1;

        if (bObj.namespace) res += 1;
        if (bObj.type && bObj.type.toLowerCase() === 'class') res += 1;
        if (bObj.constructor) res += 1;
        if (bObj.private) res += 1;
        if (bObj.type && bObj.type.toLowerCase() === 'function') res += 1;
        if (aObj.name && bObj.name && bObj.name.length > aObj.name.length) res += 1;
        return res;
      },
      filepath: null,
      to: {
        markdown: _index.default
      }
    }, settings); // check if the source is path

    if ((0, _path.default)(source)) {
      if (!(0, _node.default)()) throw new _SError.default("Sorry but in a none node environement the SDocblock class can take only a String to parse and not a file path like \"<yellow>".concat(source, "</yellow>\"..."));

      var __fs = require('fs');

      if (!__fs.existsSync(source)) throw new _SError.default("Sorry but the passed source path \"<yellow>".concat(source, "</yellow>\" does not exists on the filesystem..."));
      this._source = __fs.readFileSync(source, 'utf8');
    } else {
      this._source = source;
    } // parsing the source


    this.parse();
  }
  /**
   * @name        sort
   * @type        Function
   *
   * This method allows you to set the order in which you want to get the
   * blocks back when using the methods like get blocks, etc...
   *
   * @param       {Function}      [sortFunction=null]       Specify a custom sort function you want to use. If not set, use the ```sortFunction``` setting.
   * @return      {SDocblock}                                   The class instance itself to maintain chainability
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */


  _createClass(SDocblock, [{
    key: "sort",
    value: function sort(sortFunction) {
      if (sortFunction === void 0) {
        sortFunction = null;
      }

      if (!sortFunction) sortFunction = this._settings.sortFunction;
      this._blocks = this._blocks.sort(sortFunction);
      return this;
    }
    /**
     * @name        blocks
     * @type        Array
     *
     * Access the parsed blocks array
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */

  }, {
    key: "parse",

    /**
     * @name          parse
     * @type          Function
     *
     * This method is the principal one. Use it to parse a string
     * and get back the object version of it
     *
     * @param       {String}        [string=this._source]        The string to parse
     * @return      {SDocblock}                     The class instance itself to maintain chainability
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    value: function parse(string) {
      if (string === void 0) {
        string = this._source;
      }

      // extract each docblocks
      var reg = /(<!--|\/\*{2})([\s\S]+?)(\*\/|-->)/g; // extracting blocks

      var blocksArray = string.match(reg);

      if (!Array.isArray(blocksArray)) {
        blocksArray = [];
      } else if (Array.isArray(blocksArray) && blocksArray.length) {
        blocksArray = blocksArray.map(t => t.trim());
        if (!blocksArray || !blocksArray.length) return [];
        blocksArray = blocksArray.map(block => {
          return new _SDocblockBlock.default(block || ' ', {
            filepath: this._settings.filepath || ''
          });
        });
      } // save the blocks


      this._blocks = blocksArray; // sort the blocks

      this.sort(); // return the class instance itself

      return this;
    }
    /**
     * @name          toObject
     * @type          Function
     *
     * This method convert the parsed docblocks to a simple object
     *
     * @since       2.0.0
     * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */

  }, {
    key: "toObject",
    value: function toObject() {
      return this.blocks.map(block => {
        return block.toObject();
      });
    }
  }, {
    key: "blocks",
    get: function get() {
      if (!this._blocks) this.parse();
      return this._blocks;
    }
  }]);

  return SDocblock;
}();

exports.default = SDocblock;
module.exports = exports.default;