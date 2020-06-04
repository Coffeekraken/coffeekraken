"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deepMerge = _interopRequireDefault(require("../object/deepMerge"));

var _map = _interopRequireDefault(require("../object/map"));

var _path = _interopRequireDefault(require("../is/path"));

var _node = _interopRequireDefault(require("../is/node"));

var _author = _interopRequireDefault(require("./tags/author"));

var _simpleValue = _interopRequireDefault(require("./tags/simpleValue"));

var _description = _interopRequireDefault(require("./tags/description"));

var _return = _interopRequireDefault(require("./tags/return"));

var _example = _interopRequireDefault(require("./tags/example"));

var _param = _interopRequireDefault(require("./tags/param"));

var _snippet = _interopRequireDefault(require("./tags/snippet"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @name                  DockblockParser
 * @namespace             sugar.js.docblock
 * @type                  Class
 *
 * This is the main class that expose the methods like "parse", etc...
 * You have to instanciate it by passing a settings object. Here's the available options:
 *
 * @example         js
 * import SDocblockParser from '@coffeekraken/sugar/js/docblock/SSDocblockParser';
 * new SDocblockParser({
 *    // override some settings here...
 * }).parse(myString);
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
let SDocblockParser = /*#__PURE__*/function () {
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
   * @name            tagsMap
   * @type            Object
   * @static
   *
   * Store the default tags mapping to their parsing functions
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */

  /**
   * @name            constructor
   * @type            Function
   *
   * Constructor
   *
   * @param       {Object}      [settings={}]       An object of settings to configure the SDocblockParser instance:
   * - tags ({}) {Object}: An object representing the functions used to parse each tags. The object format is ```{ tagName: parseFn }```
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */
  function SDocblockParser(settings = {}) {
    _classCallCheck(this, SDocblockParser);

    _defineProperty(this, "_settings", {});

    this._settings = (0, _deepMerge.default)({
      tags: SDocblockParser.tagsMap
    }, settings);
  }
  /**
   * @name          parse
   * @type          Function
   *
   * This method is the principal one. Use it to parse a string
   * and get back the object version of it
   *
   * @param       {String}        string        The string to parse
   * @param       {Object}        [settings={}]   Override some settings if wanted for this particular parse process. See the settings of the constructor for more info...
   * @return      {Object}                      The object version of the docblock(s) finded
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */


  _createClass(SDocblockParser, [{
    key: "parse",
    value: function parse(string, settings = {}) {
      // check if the passed string is a file path
      let filepath = null;

      if ((0, _path.default)(string, true) && (0, _node.default)()) {
        const __fs = require('fs');

        if (__fs.existsSync(string)) {
          filepath = string;
          string = __fs.readFileSync(string).toString();
        }
      } // search for the docblock(s) (?:[ \t]*\*[ \t]*)(?:@([a-zA-Z]+)[ \t]*)?(?:([^{\n-]+)[ \t]+)?(?:{([a-z|A-Z]+)}[ \t]*)?(.*)
      // const docblocksRawStrings = string.match(/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+/g).map(s => {


      let docblocksRawStrings = string.match(/\/\*{2}([\s\S]+?)\*\//g);
      if (!docblocksRawStrings) return [];
      docblocksRawStrings = docblocksRawStrings.map(s => {
        return s;
      }); // store the docblocks object parsed lines

      let docblocks = []; // loop on found docblocks

      docblocksRawStrings.forEach(blockString => {
        // some variables
        let currentTag = null;
        let currentContent = [];
        let currentObj = {};
        let docblockObj = {};
        let previousWasEmptyLine = false;

        function add() {
          if (currentContent.length) currentObj.content = currentContent;

          if (docblockObj.hasOwnProperty(currentTag) && !Array.isArray(docblockObj[currentTag])) {
            const currentValue = docblockObj[currentTag];
            docblockObj[currentTag] = [currentValue];
          }

          if (!currentObj.value) currentObj.value = true;

          if (Array.isArray(docblockObj[currentTag])) {
            docblockObj[currentTag].push(currentObj);
          } else {
            docblockObj[currentTag] = currentObj;
          }

          currentObj = {};
          currentContent = [];
          currentTag = null;
        } // split the block by tags


        const lines = blockString.split('\n').map(l => l.trim());
        lines.forEach(line => {
          // get the tag name
          const tagNameReg = /\*[\s]?@([a-zA-Z0-9]+)/;
          const tagNameMatch = line.match(tagNameReg);

          if (line.replace('*', '').trim() === '') {
            if (currentContent.length > 0) {
              currentContent.push('');
            } else {
              if (currentTag && currentObj.value) {
                add();
              }

              previousWasEmptyLine = true;
            }
          } else if (tagNameMatch) {
            if (currentTag) {
              add();
            }

            currentTag = tagNameMatch[1];
            line = line.replace(tagNameMatch[0], '').trim();

            if (line.length > 0) {
              currentObj.value = line;
            } else {
              currentObj.value = true;
            }

            previousWasEmptyLine = false;
          } else if (previousWasEmptyLine) {
            currentTag = 'description';
            currentContent = [line.replace('*', '')];
            currentObj = {};
            previousWasEmptyLine = false;
          } else {
            line = line.replace('/**', '');
            line = line.replace('*/', '');
            line = line.replace('*', '');

            if (line.trim().length) {
              currentContent.push(line);
            }
          }
        });
        add(); // save the raw string

        docblockObj._ = {
          raw: blockString.toString(),
          filepath
        };
        docblocks.push(docblockObj);
      }); // loop on each docblocks to process the parsed lines

      docblocks = docblocks.map(block => {
        block = (0, _map.default)(block, (value, prop) => {
          if (prop.slice(0, 1) === '_') return value;
          if (this._settings.tags[prop] && prop !== 'src') return this._settings.tags[prop](value);
          return (0, _simpleValue.default)(value);
        });
        return block;
      });
      let firstBlock = docblocks[0];

      if (firstBlock && firstBlock.src && (0, _node.default)()) {
        // get the src file content
        const __fs = require('fs');

        const __path = require('path');

        const srcPath = __path.resolve(firstBlock._.filepath, firstBlock.src); // parse the src


        const srcBlocks = this.parse(srcPath, settings);
        delete firstBlock.src;

        if (srcBlocks && srcBlocks[0]) {
          firstBlock = (0, _deepMerge.default)(srcBlocks[0], firstBlock);
          docblocks[0] = firstBlock;
          srcBlocks.shift();
          docblocks = [...docblocks, ...srcBlocks];
        }
      }

      return docblocks;
    }
  }]);

  return SDocblockParser;
}();

exports.default = SDocblockParser;

_defineProperty(SDocblockParser, "tagsMap", {
  author: _author.default,
  abstract: _simpleValue.default,
  final: _simpleValue.default,
  async: _simpleValue.default,
  generator: _simpleValue.default,
  global: _simpleValue.default,
  constructor: _simpleValue.default,
  hideconstructor: _simpleValue.default,
  ignore: _simpleValue.default,
  inheritdoc: _simpleValue.default,
  inner: _simpleValue.default,
  instance: _simpleValue.default,
  mixin: _simpleValue.default,
  override: _simpleValue.default,
  access: _simpleValue.default,
  category: _simpleValue.default,
  copyright: _simpleValue.default,
  deprecated: _simpleValue.default,
  alias: _simpleValue.default,
  augments: _simpleValue.default,
  callback: _simpleValue.default,
  class: _simpleValue.default,
  classdesc: _simpleValue.default,
  constant: _simpleValue.default,
  constructs: _simpleValue.default,
  copyright: _simpleValue.default,
  default: _simpleValue.default,
  deprecated: _simpleValue.default,
  exports: _simpleValue.default,
  external: _simpleValue.default,
  host: _simpleValue.default,
  file: _simpleValue.default,
  function: _simpleValue.default,
  func: _simpleValue.default,
  method: _simpleValue.default,
  implements: _simpleValue.default,
  interface: _simpleValue.default,
  kind: _simpleValue.default,
  lends: _simpleValue.default,
  license: _simpleValue.default,
  memberof: _simpleValue.default,
  'memberof!': _simpleValue.default,
  mixes: _simpleValue.default,
  module: _simpleValue.default,
  name: _simpleValue.default,
  namespace: _simpleValue.default,
  package: _simpleValue.default,
  private: _simpleValue.default,
  protected: _simpleValue.default,
  public: _simpleValue.default,
  readonly: _simpleValue.default,
  requires: _simpleValue.default,
  see: _simpleValue.default,
  since: _simpleValue.default,
  static: _simpleValue.default,
  summary: _simpleValue.default,
  this: _simpleValue.default,
  todo: _simpleValue.default,
  tutorial: _simpleValue.default,
  type: _simpleValue.default,
  variation: _simpleValue.default,
  version: _simpleValue.default,
  enum: _simpleValue.default,
  src: _simpleValue.default,
  description: _description.default,
  desc: _description.default,
  // yields: __yieldsTag,
  // typedef: __typedefTag,
  // throws: __throwsTag,
  return: _return.default,
  param: _param.default,
  property: _param.default,
  prop: _param.default,
  // listens: __listensTag,
  // member: __memberTag,
  // var: __memberTag,
  // event: __eventTag,
  // borrows: __borrowsTag,
  snippet: _snippet.default,
  example: _example.default
});

module.exports = exports.default;