"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _SDocblockBlock = _interopRequireDefault(require("./SDocblockBlock"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _index = _interopRequireDefault(require("./markdown/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name                  Dockblock
 * @namespace           js.docblock
 * @type                  Class
 *
 * This is the main class that expose the methods like "parse", etc...
 * You have to instanciate it by passing a settings object. Here's the available options:
 *
 * @param       {String|Object}     source        The docblock source. Can be either a string, a filepath or an array of docblock objects
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
        var res = 0; // if (.object.namespace && !a.object.namespace) res -= 1;

        if (b.object.namespace) res += 1;
        if (b.object.type && b.object.type.toLowerCase() === 'class') res += 1;
        if (b.object.constructor) res += 1;
        if (b.object.private) res += 1;
        if (b.object.type && b.object.type.toLowerCase() === 'function') res += 1;
        if (a.object.name && b.object.name && b.object.name.length > a.object.name.length) res += 1;
        return res;
      },
      filepath: null,
      to: {
        markdown: _index.default
      }
    }, settings);
    this._source = source; // parsing the source

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
    /**
     * @name          toMarkdown
     * @type          Function
     *
     * This method convert the parsed docblocks to a markdown string
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */

  }, {
    key: "toMarkdown",
    value: function toMarkdown() {
      return this.to('markdown');
    }
    /**
     * @name              to
     * @type              Function
     *
     * This method allows you to convert the parsed docblocks to a format like "markdown" and more to come...
     *
     * @param       {String}          format          The format in which you want to convert your docblocks.
     * @return      {String}                          The converted docblocks
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */

  }, {
    key: "to",
    value: function to(format) {
      var includedTypes = [];

      _handlebars.default.registerHelper('include', type => {
        if (!this.blocks || !this.blocks.length) return ''; // filter blocks

        var blocks = this.blocks.filter(block => {
          if (!block.object.type) return false;
          return type === '...' && includedTypes.indexOf(block.object.type.toLowerCase()) === -1 || block.object.type.toLowerCase() === type && includedTypes.indexOf(block.object.type.toLowerCase()) === -1;
        }).map(block => {
          return block.to(format);
        }); // save this included type

        includedTypes.push(type);
        return blocks.join('\n\n');
      }); // get the blocks


      var blocksArray = this.blocks;
      if (!blocksArray || !blocksArray.length) return ''; // check the first docblock

      var firstBlock = blocksArray[0]; // get the block type

      var type = firstBlock.object.type ? firstBlock.object.type.toLowerCase() : 'default'; // render the good template depending on the first block type

      var template = this._settings.to[format].templates[type] || this._settings.to[format].templates.default;
      if (!template) throw new Error("You try to convert your docblocks into \"".concat(format, "\" format but the needed \"").concat(type, "\" template is not available for this particular format. Here's the available templates: ").concat(Object.keys(this._settings.to[format].templates).join(','), "...")); // save the format in which converting the docblocks

      this._to = format; // render the template

      var compiledTemplateFn = _handlebars.default.compile(template, {
        noEscape: true
      });

      var renderedTemplate = compiledTemplateFn(); // return the rendered template

      return renderedTemplate;
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