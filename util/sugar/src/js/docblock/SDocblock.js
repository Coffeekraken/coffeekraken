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
export default class SDocblock {
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
   * @name            _source
   * @type            String|Array<Object>
   * @private
   *
   * Store the passed source
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */
  _source = null;

  /**
   * @name            _blocks
   * @type            Array<Object>
   * @private
   *
   * Store the parsed array of docblock objects
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */
  _blocks = [];

  /**
   * @name            constructor
   * @type            Function
   *
   * Constructor
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */
  constructor(source, settings = {}) {
    this._settings = __deepMerge(
      {
        tags: SDocblock.tagsMap
      },
      settings
    );
    this._source = source;

    // check the source type
    if (Array.isArray(source)) {
    }
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
      return block;
    });

    let firstBlock = docblocks[0];
    if (firstBlock && firstBlock.src && __isNode()) {
      // get the src file content
      const __fs = require('fs');
      const __path = require('path');
      const srcPath = __path.resolve(firstBlock._.filepath, firstBlock.src);
      // parse the src
      const srcBlocks = this.parse(srcPath, settings);
      delete firstBlock.src;
      if (srcBlocks && srcBlocks[0]) {
        firstBlock = __deepMerge(srcBlocks[0], firstBlock);
        docblocks[0] = firstBlock;
        srcBlocks.shift();
        docblocks = [...docblocks, ...srcBlocks];
      }
    }

    return docblocks;
  }
}
