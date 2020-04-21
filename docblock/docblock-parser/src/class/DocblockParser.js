// const _merge = require("lodash/merge");
// const __config = require("../core/config");
const __deepMerge = require('@coffeekraken/sugar/js/object/deepMerge');
const __map = require('@coffeekraken/sugar/js/object/map');

const __authorTag = require('../tags/author');

const tagsMap = {
  author: __authorTag
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
module.exports = class DocblockParser {

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
    this._settings = __deepMerge({

    }, settings);
    // // bind all methods in settings with the good context
    // for (let key in this._settings.tags) {
    //   this._settings.tags[key] = this._settings.tags[key].bind(this);
    // }
    // for (let key in this._settings.nextLineAnalyzer) {
    //   this._settings.nextLineAnalyzer[key] = this._settings.nextLineAnalyzer[
    //     key
    //   ].bind(this);
    // }
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
    });

    // store the docblocks object parsed lines
    const docblocks = [];

    // loop on found docblocks
    docblocksRawStrings.forEach(block => {

      // some variables
      let currentTag = null;
      let currentContent = [];
      let currentObj = {};
      let docblockObj = {};

      // split the block by tags
      const lines = block.split('\n').map(l => l.trim());

      lines.forEach(line => {

        // get the tag name
        const tagNameReg = /\*[\s]?@([a-zA-Z0-9]+)/;
        const tagNameMatch = line.match(tagNameReg);
        if (tagNameMatch) {
          if (currentTag) {
            if (currentContent.length) currentObj.content = currentContent;
            if (docblockObj[currentTag] && !Array.isArray(docblockObj[currentTag])) {
              const currentValue = docblockObj[currentTag];
              docblockObj[currentTag] = [currentValue];
            }
            if (Array.isArray(docblockObj[currentTag])) {
              docblockObj[currentTag].push(currentObj);
            } else {
              docblockObj[currentTag] = currentObj;
            }
            currentObj = {};
            currentContent = [];
          }
          currentTag = tagNameMatch[1];
          line = line.replace(tagNameMatch[0], '').trim();
          if (line.length > 0) {
            currentObj.value = line;
          }
        } else {
          line = line.replace('/**', '');
          line = line.replace('*/', '');
          line = line.replace('*', '');
          if (line.trim().length) {
            currentContent.push(line);
          }
        }

      });

      if (currentContent.length) currentObj.content = currentContent;
      if (docblockObj[currentTag] && !Array.isArray(docblockObj[currentTag])) {
        const currentValue = docblockObj[currentTag];
        docblockObj[currentTag] = [currentValue];
      }
      if (Array.isArray(docblockObj[currentTag])) {
        docblockObj[currentTag].push(currentObj);
      } else {
        docblockObj[currentTag] = currentObj;
      }
      currentObj = {};
      currentContent = [];

      docblocks.push(docblockObj);

    });

    // loop on each docblocks to process the parsed lines
    docblocks.forEach(block => {

      block = __map(block, (value, prop) => {
        if (tagsMap[prop]) return tagsMap[prop](value);
        return value;
      });

      // console.log(block);

    });

    // console.log(docblocks);

    // console.log(docblocks);

    return docblocks;

  }

}
