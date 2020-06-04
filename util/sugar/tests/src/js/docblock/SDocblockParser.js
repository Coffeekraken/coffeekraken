import __deepMerge from '../object/deepMerge';
import __map from '../object/map';
import __isPath from '../is/path';
import __isNode from '../is/node';

import __authorTag from './tags/author';
import __simpleValueTag from './tags/simpleValue';
import __descriptionTag from './tags/description';
import __returnTag from './tags/return';
import __exampleTag from './tags/example';
import __paramTag from './tags/param';
import __snippetTag from './tags/snippet';

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
export default class SDocblockParser {
  /**
   * @name              _settings
   * @type              Object
   * @private
   *
   * Store this instance settings
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */
  _settings = {};

  /**
   * @name            tagsMap
   * @type            Object
   * @static
   *
   * Store the default tags mapping to their parsing functions
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */
  static tagsMap = {
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
  constructor(settings = {}) {
    this._settings = __deepMerge(
      {
        tags: SDocblockParser.tagsMap
      },
      settings
    );
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
  parse(string, settings = {}) {
    // check if the passed string is a file path
    let filepath = null;
    if (__isPath(string, true) && __isNode()) {
      const __fs = require('fs');
      if (__fs.existsSync(string)) {
        filepath = string;
        string = __fs.readFileSync(string).toString();
      }
    }

    // search for the docblock(s) (?:[ \t]*\*[ \t]*)(?:@([a-zA-Z]+)[ \t]*)?(?:([^{\n-]+)[ \t]+)?(?:{([a-z|A-Z]+)}[ \t]*)?(.*)
    // const docblocksRawStrings = string.match(/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+/g).map(s => {
    let docblocksRawStrings = string.match(/\/\*{2}([\s\S]+?)\*\//g);
    if (!docblocksRawStrings) return [];

    docblocksRawStrings = docblocksRawStrings.map((s) => {
      return s;
    });

    // store the docblocks object parsed lines
    let docblocks = [];

    // loop on found docblocks
    docblocksRawStrings.forEach((blockString) => {
      // some variables
      let currentTag = null;
      let currentContent = [];
      let currentObj = {};
      let docblockObj = {};
      let previousWasEmptyLine = false;

      function add() {
        if (currentContent.length) currentObj.content = currentContent;
        if (
          docblockObj.hasOwnProperty(currentTag) &&
          !Array.isArray(docblockObj[currentTag])
        ) {
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
      }

      // split the block by tags
      const lines = blockString.split('\n').map((l) => l.trim());

      lines.forEach((line) => {
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

      // save the raw string
      docblockObj._ = {
        raw: blockString.toString(),
        filepath
      };

      docblocks.push(docblockObj);
    });

    // loop on each docblocks to process the parsed lines
    docblocks = docblocks.map((block) => {
      block = __map(block, (value, prop) => {
        if (prop.slice(0, 1) === '_') return value;
        if (this._settings.tags[prop] && prop !== 'src')
          return this._settings.tags[prop](value);
        return __simpleValueTag(value);
      });

      if (block.src && __isNode()) {
        // get the src file content
        const __fs = require('fs');
        const __path = require('path');
        const srcPath = __path.resolve(block._.filepath, block.src);
        console.log(srcPath);
        // parse the src
        const srcBlocks = this.parse(srcPath, settings);

        // const srcString = __fs
        console.log(srcBlocks);
      }

      // if (block.src) {
      //   if (block.src.slice(0, 1) === '.' && !filepath) {
      //     throw new Error(
      //       `A block contains a "@src" tag that has a relative path "${block.src}". Unfortunally we don't have the exact path of the original parsed file so we cannot resolve this relative path... Please, either pass as first parameter the absolute path of the file to parse, of in the settings by specifying this property "settings.filepath"...`
      //     );
      //   }
      //   let srcPath;
      //   if (block.src.slice(0, 1) === '/') {
      //     srcPath = block.src;
      //   } else if (filepath) {
      //     srcPath = __path.resolve(
      //       filepath.split('/').slice(0, -1).join('/'),
      //       block.src
      //     );
      //   }
      //   if (__isPath(srcPath, true)) {
      //     const srcBlock = this.parse(srcPath, this._settings)[0];
      //     if (srcBlock) {
      //       delete block._.raw;
      //       block = __deepMerge(srcBlock, block);
      //       delete block.src;
      //     }
      //   }
      // }

      return block;
    });

    return docblocks;
  }
}
