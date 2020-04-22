"use strict";

var _temp;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const __deepMerge = require('@coffeekraken/sugar/js/object/deepMerge');

const __map = require('@coffeekraken/sugar/js/object/map');

const __defaultConfig = require('../docblock-parser.config'); // TODO tag function implementation for: listens, member, var, event, borrows, yields, typedef and throws


const __authorTag = require('../tags/author');

const __simpleValueTag = require('../tags/simpleValue');

const __descriptionTag = require('../tags/description');

const __returnTag = require('../tags/return');

const __exampleTag = require('../tags/example');

const __paramTag = require('../tags/param');

const __snippetTag = require('../tags/snippet');

const tagsMap = {
  author: __authorTag,
  abstract: __simpleValueTag,
  final: __simpleValueTag,
  async: __simpleValueTag,
  generator: __simpleValueTag,
  global: __simpleValueTag,
  constructor: __simpleValueTag,
  hideconstructor: __simpleValueTag,
  ignore: __simpleValueTag,
  inheritdoc: __simpleValueTag,
  inner: __simpleValueTag,
  instance: __simpleValueTag,
  mixin: __simpleValueTag,
  override: __simpleValueTag,
  access: __simpleValueTag,
  category: __simpleValueTag,
  copyright: __simpleValueTag,
  deprecated: __simpleValueTag,
  alias: __simpleValueTag,
  augments: __simpleValueTag,
  callback: __simpleValueTag,
  class: __simpleValueTag,
  classdesc: __simpleValueTag,
  constant: __simpleValueTag,
  constructs: __simpleValueTag,
  copyright: __simpleValueTag,
  default: __simpleValueTag,
  deprecated: __simpleValueTag,
  exports: __simpleValueTag,
  external: __simpleValueTag,
  host: __simpleValueTag,
  file: __simpleValueTag,
  function: __simpleValueTag,
  func: __simpleValueTag,
  method: __simpleValueTag,
  implements: __simpleValueTag,
  interface: __simpleValueTag,
  kind: __simpleValueTag,
  lends: __simpleValueTag,
  license: __simpleValueTag,
  memberof: __simpleValueTag,
  'memberof!': __simpleValueTag,
  mixes: __simpleValueTag,
  module: __simpleValueTag,
  name: __simpleValueTag,
  namespace: __simpleValueTag,
  package: __simpleValueTag,
  private: __simpleValueTag,
  protected: __simpleValueTag,
  public: __simpleValueTag,
  readonly: __simpleValueTag,
  requires: __simpleValueTag,
  see: __simpleValueTag,
  since: __simpleValueTag,
  static: __simpleValueTag,
  summary: __simpleValueTag,
  this: __simpleValueTag,
  todo: __simpleValueTag,
  tutorial: __simpleValueTag,
  type: __simpleValueTag,
  variation: __simpleValueTag,
  version: __simpleValueTag,
  enum: __simpleValueTag,
  src: __simpleValueTag,
  description: __descriptionTag,
  desc: __descriptionTag,
  // yields: __yieldsTag,
  // typedef: __typedefTag,
  // throws: __throwsTag,
  return: __returnTag,
  param: __paramTag,
  property: __paramTag,
  prop: __paramTag,
  // listens: __listensTag,
  // member: __memberTag,
  // var: __memberTag,
  // event: __eventTag,
  // borrows: __borrowsTag,
  snippet: __snippetTag,
  example: __exampleTag
};
/**
 * @name                  DockblockParser
 * @namespace             src.class
 * @type                  Class
 * 
 * This is the main class that expose the methods like "parse", etc...
 * You have to instanciate it by passing a settings object. Here's the available options:
 * 
 * @example         js
 * import DocblockParser from '@coffeekraken/docblock-parser';
 * new DocblockParser({
 *    // override some settings here...
 * }).parse(myString);
 * 
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */

module.exports = (_temp = class DocblockParser {
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
   * @name            constructor
   * @type            Function
   * 
   * Constructor
   * 
   * @param       {Object}      [settings={}]       An object of settings to configure the DocblockParser instance.
   * 
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */
  constructor(settings = {}) {
    _defineProperty(this, "_settings", {});

    this._settings = __deepMerge(__defaultConfig, {
      tags: tagsMap
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
   * @param       {Object}        [settings={}]   Override some settings if wanted for this particular parse process
   * @return      {Object}                      The object version of the docblock(s) finded
   * 
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */


  parse(string, settings = {}) {
    // search for the docblock(s) (?:[ \t]*\*[ \t]*)(?:@([a-zA-Z]+)[ \t]*)?(?:([^{\n-]+)[ \t]+)?(?:{([a-z|A-Z]+)}[ \t]*)?(.*)
    const docblocksRawStrings = string.match(/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+/g).map(s => {
      return `/${s}/`;
    }); // store the docblocks object parsed lines

    const docblocks = []; // loop on found docblocks

    docblocksRawStrings.forEach(block => {
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


      const lines = block.split('\n').map(l => l.trim());
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
      add();
      docblocks.push(docblockObj);
    }); // loop on each docblocks to process the parsed lines

    docblocks.forEach(block => {
      block = __map(block, (value, prop) => {
        if (this._settings.tags[prop]) return this._settings.tags[prop](value);
        return __simpleValueTag(value);
      });
    });
    return docblocks;
  }

}, _temp);