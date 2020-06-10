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

// TODO: tests

/**
 * @name                  Dockblock
 * @namespace             sugar.js.docblock
 * @type                  Class
 *
 * This is the main class that expose the methods like "parse", etc...
 * You have to instanciate it by passing a settings object. Here's the available options:
 *
 * @param       {String|Object}     source        The docblock source. Can be either a string, a filepath or an array of docblock objects
 * @param       {Object}      [settings={}]       An object of settings to configure the SDocblock instance:
 * - tags ({}) {Object}: An object representing the functions used to parse each tags. The object format is ```{ tagName: parseFn }```
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
let SDocblock = /*#__PURE__*/function () {
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
  function SDocblock(source, settings = {}) {
    _classCallCheck(this, SDocblock);

    _defineProperty(this, "_settings", {});

    _defineProperty(this, "_source", null);

    _defineProperty(this, "_blocks", null);

    _defineProperty(this, "_to", null);

    this._settings = (0, _deepMerge.default)({
      filepath: null,
      to: {
        markdown: _index.default
      }
    }, settings);
    this._source = source;
  }
  /**
   * @name        blocks
   * @type        Array
   *
   * Access the parsed blocks array
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */


  _createClass(SDocblock, [{
    key: "parse",

    /**
     * @name          parse
     * @type          Function
     *
     * This method is the principal one. Use it to parse a string
     * and get back the object version of it
     *
     * @param       {String}        [string=this._source]        The string to parse
     * @return      {Array}                     An array of SDockblock instances representing each extracted docblocks
     *
     * @author 	Olivier Bossel <olivier.bossel@gmail.com>
     */
    value: function parse(string = this._source) {
      // extract each docblocks
      const reg = /\/\*{2}([\s\S]+?)\*\//g; // extracting blocks

      let blocksArray = string.match(reg);

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


      this._blocks = blocksArray; // return the array of docblock blocks

      return blocksArray;
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
      const includedTypes = [];

      _handlebars.default.registerHelper('include', type => {
        if (!this.blocks || !this.blocks.length) return ''; // filter blocks

        const blocks = this.blocks.filter(block => {
          if (!block.object.type) return false;
          return type === '...' && includedTypes.indexOf(block.object.type.toLowerCase()) === -1 || block.object.type.toLowerCase() === type && includedTypes.indexOf(block.object.type.toLowerCase()) === -1;
        }).map(block => {
          return block.to(format);
        }); // save this included type

        includedTypes.push(type);
        return blocks.join('\n\n');
      }); // get the blocks


      const blocksArray = this.blocks;
      if (!blocksArray || !blocksArray.length) return ''; // check the first docblock

      const firstBlock = blocksArray[0]; // get the block type

      const type = firstBlock.object.type ? firstBlock.object.type.toLowerCase() : 'default'; // render the good template depending on the first block type

      const template = this._settings.to[format].templates[type] || this._settings.to[format].templates.default;
      if (!template) throw new Error(`You try to convert your docblocks into "${format}" format but the needed "${type}" template is not available for this particular format. Here's the available templates: ${Object.keys(this._settings.to[format].templates).join(',')}...`); // save the format in which converting the docblocks

      this._to = format; // render the template

      const compiledTemplateFn = _handlebars.default.compile(template, {
        noEscape: true
      });

      const renderedTemplate = compiledTemplateFn(); // return the rendered template

      return renderedTemplate;
    }
  }, {
    key: "blocks",
    get: function () {
      if (!this._blocks) this.parse();
      return this._blocks;
    }
  }]);

  return SDocblock;
}();

exports.default = SDocblock;
module.exports = exports.default;