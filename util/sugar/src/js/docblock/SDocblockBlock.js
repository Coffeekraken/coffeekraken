import __deepMege from '../object/deepMerge';
import __map from '../object/map';
import __handlebars from 'handlebars';
import __isNode from '../is/node';

import __authorTag from './tags/author';
import __simpleValueTag from './tags/simpleValue';
import __descriptionTag from './tags/description';
import __returnTag from './tags/return';
import __exampleTag from './tags/example';
import __paramTag from './tags/param';
import __snippetTag from './tags/snippet';

import __markdownTemplate from './markdown/templates';
import __markdownBlocks from './markdown/blocks';

import __SDocblock from './SDocblock';

// TODO: tests

/**
 * @name          SDocblockBlock
 * @namespace     sugar.js.docblock
 * @type          Class
 *
 * This class represent a docblock object that contains all the "tags" values and some features like:
 * - Converting the block to markdown
 * - More to come...
 *
 * @param         {String}       source      The docblock source.  Has to be a parsable docblock string
 * @param         {Object}      [settings={}]       A settings object to configure your instance
 *
 * @example         js
 * import SDocblockBlock from '@coffeekraken/sugar/js/docblock/SDocblockBlock';
 * const myBlock = new SDocblockBlock(myDocblockString);
 * const myBlock.toMarkdown();
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
export default class SDocblockBlock {
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
   * @name          templates
   * @type          Object
   * @static
   *
   * Store the available templates like "js", "node", "scss", etc...
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
   */
  static templates = {};

  /**
   * @name          _source
   * @type          String
   * @private
   *
   * Store the passed source
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
   */
  _source = null;

  /**
   * @name          _settings
   * @type          Object
   * @private
   *
   * Store this instance settings
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
   */
  _settings = {};

  /**
   * @name        _blockObj
   * @type        {Object}
   * @private
   *
   * Store the parsed docblock object
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
   */
  _blockObj = {};

  /**
   * @name          constructor
   * @type          Function
   * @contructor
   *
   * Constructor
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(source, settings = {}) {
    this._source = source.trim();
    this._settings = __deepMege(
      {
        filepath: null,
        to: {
          markdown: {
            blocks: __markdownBlocks,
            template: __markdownTemplate
          }
        },
        parse: {
          tags: SDocblockBlock.tagsMap
        }
      },
      settings
    );
    // parse the docblock string
    this._blockObj = this.parse();
  }

  /**
   * @name          object
   * @type          Object
   * @get
   *
   * Access the parsed block object
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get object() {
    return this.toObject();
  }

  /**
   * @name          string
   * @type          String
   * @get
   *
   * Access docblock string version
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get string() {
    return this.toString();
  }

  /**
   * @name          toString
   * @type          Function
   *
   * This method return the passed source string
   *
   * @return      {String}              The passed docblock string
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  toString() {
    return this._source.trim();
  }

  /**
   * @name          toObject
   * @type          Function
   *
   * This method return the parsed docblock object
   *
   * @return      {Object}              The parsed dobclock object
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  toObject() {
    return this._blockObj;
  }

  /**
   * @name          toMarkdown
   * @type          Function
   *
   * This method can be used to convert the docblock object to a markdown string
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  toMarkdown() {
    return this.to('markdown');
  }

  /**
   * @name          to
   * @type          Function
   *
   * This method can be used to convert the docblock to one of the supported output
   * format like "markdown" and more to come...
   *
   * @param         {String}          format        The format wanted as output. Can be actually "markdown" and more to come...
   * @return        {String}                        The converted docblocks
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  to(format) {
    // try to get the needed settings for the conversion
    const convertionSettings = this._settings.to[format];

    if (!convertionSettings)
      throw new Error(
        `You try to convert the docblock literals to "${format}" format but this format is not available. Here's the list of available format: ${Object.keys(
          this._settings.to
        ).join(',')}...`
      );

    const blockTemplate =
      this._settings.to[format].blocks[this.object.type.toLowerCase()] ||
      this._settings.to[format].blocks['default'];
    if (!blockTemplate) {
      throw new Error(
        `You try to convert a docblock of type "${
          this.object.type
        }" into "${format}" format but this block type is not supported. Here's the list of blocks supported in "${format}" format: ${Object.keys(
          convertionSettings.blocks
        ).join(',')}...`
      );
    }
    const compiledTemplate = __handlebars.compile(blockTemplate, {
      noEscape: true
    });
    return compiledTemplate(this.object);
  }

  /**
   * @name          parse
   * @type          Function
   * @private
   *
   * This method take a docblick string and parse it to a javascript object
   *
   * @return      {Object}          The object version of the source string
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  parse() {
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
    const lines = this._source
      .trim()
      .split('\n')
      .map((l) => l.trim());

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
        line = line.replace('* ', '');
        line = line.replace('*', '');
        if (line.trim().length) {
          currentContent.push(line);
        }
      }
    });

    add();

    docblockObj = __map(docblockObj, (value, prop) => {
      if (prop.slice(0, 1) === '_') return value;
      if (this._settings.parse.tags[prop] && prop !== 'src')
        return this._settings.parse.tags[prop](value);
      return __simpleValueTag(value);
    });

    if (docblockObj['src'] && __isNode() && this._settings.filepath) {
      const __fs = require('fs');
      const __path = require('path');

      const absoluteFilepath = __path.resolve(
        this._settings.filepath,
        docblockObj['src']
      );

      const srcValue = __fs.readFileSync(absoluteFilepath, 'utf8');
      const srcDocblockInstance = new __SDocblock(srcValue);
      const srcBlocks = srcDocblockInstance.parse();
      if (srcBlocks.length) {
        const tags = srcBlocks[0].parse();
        docblockObj = __deepMege(docblockObj, tags);
      }
    }

    // save the raw string
    docblockObj.raw = this._source.toString();

    // return the parsed docblock object
    return docblockObj;
  }
}
