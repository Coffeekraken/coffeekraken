// @shared

import __SClass from '../class/SClass';
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

import __fs from 'fs';
import __path from 'path';

import __SDocblock from './SDocblock';

/**
 * @name          SDocblockBlock
 * @namespace           sugar.js.docblock
 * @type          Class
 * @extends     SClass
 *
 * This class represent a docblock object that contains all the "tags" values and some features like:
 * - Converting the block to markdown
 * - More to come...
 *
 * @param         {String}       source      The docblock source.  Has to be a parsable docblock string
 * @param         {Object}      [settings={}]       A settings object to configure your instance
 *
 * @todo        tests
 * @todo        Support "feature" tag
 * @todo        Check the supported tags
 *
 * @example         js
 * import SDocblockBlock from '@coffeekraken/sugar/js/docblock/SDocblockBlock';
 * const myBlock = new SDocblockBlock(myDocblockString);
 * const myBlock.toObject();
 *
 * @since     2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */

export interface ISDocblockBlockTagsMap {
  [key: string]: Function;
}

export interface ISDocblockBlockSettings {
  filepath?: string;
  tags: ISDocblockBlockTagsMap;
}
export interface ISDocblockBlockCtorSettings {
  docblockBlock?: Partial<ISDocblockBlockSettings>;
}

export interface ISDocblockBlock {
  new (source: string, settings: ISDocblockBlockCtorSettings);
  _source: string;
  _blockObj: any;
  toObject(): any;
}

// @ts-ignore
class SDocblockBlock extends __SClass implements ISDocblockBlock {
  /**
   * @name            tagsMap
   * @type            Object
   * @static
   *
   * Store the default tags mapping to their parsing functions
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */
  static tagsMap: ISDocblockBlockTagsMap = {};

  /**
   * @name          _source
   * @type          String
   * @private
   *
   * Store the passed source
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
   */
  _source: string;

  /**
   * @name        _blockObj
   * @type        {Object}
   * @private
   *
   * Store the parsed docblock object
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
   */
  _blockObj: any;

  /**
   * @name          registerTag
   * @type          Function
   * @static
   *
   * This static method allows you to register a new tag that will
   * be recognized by the SDocblockBlock class.
   *
   * @param     {String}      tagName       The tag you want to register without the @
   * @param     {Function}    parser    A function that will be called with the string tag content. You can parse this string and return an object that represent the tag data
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com
   */
  static registerTag(tagName: string, parser: Function): void {
    // check the params
    if (typeof parser !== 'function')
      throw new Error(
        `The "<yellow>parser</yellow>" parameter of the static "<cyan>SDocblockBlock</cyan>" class method needs to be a "<green>Function</green>"`
      );
    // register the tag
    SDocblockBlock.tagsMap[tagName] = parser;
  }

  /**
   * @name        docblockBlockSettings
   * @type        ISDocblockBlockSettings
   * @get
   *
   * Access the docblockBlock settings
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get docblockBlockSettings(): ISDocblockBlockSettings {
    return (<any>this._settings).docblockBlock;
  }

  /**
   * @name          constructor
   * @type          Function
   * @contructor
   *
   * Constructor
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(source, settings = {}) {
    super(
      __deepMege(
        {
          docblockBlock: {
            filepath: null,
            tags: SDocblockBlock.tagsMap
          }
        },
        settings
      )
    );

    this._source = source.trim();
    // parse the docblock string
    this._blockObj = this.parse();
  }

  /**
   * @name          toString
   * @type          Function
   *
   * This method return the passed source string
   *
   * @return      {String}              The passed docblock string
   *
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  toObject() {
    return this._blockObj;
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
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  parse() {
    // some variables
    let currentTag: string;
    let currentContent: string[] = [];
    let currentObj: any = {};
    let docblockObj: any = {};
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
      // @ts-ignore
      currentTag = undefined;
    }

    // split the block by tags
    let lines = this._source.trim().split('\n');
    if (!lines || !lines.length) return null;
    lines = lines.map((l) => l.trim());

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
      if (!prop || prop.length <= 1 || prop.slice(0, 1) === '_') return value;
      if (this.docblockBlockSettings.tags[prop] && prop !== 'src')
        return this.docblockBlockSettings.tags[prop](value);
      return __simpleValueTag(value);
    });

    if (
      docblockObj['src'] &&
      __isNode() &&
      this.docblockBlockSettings.filepath
    ) {
      const absoluteFilepath = __path.resolve(
        this.docblockBlockSettings.filepath,
        docblockObj['src']
      );

      const srcValue = __fs.readFileSync(absoluteFilepath, 'utf8');
      const srcDocblockInstance = new __SDocblock(srcValue);
      const srcBlocks: any[] = srcDocblockInstance.parse();
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

SDocblockBlock.registerTag('author', __authorTag);
SDocblockBlock.registerTag('abstract', __simpleValueTag);
SDocblockBlock.registerTag('final', __simpleValueTag);
SDocblockBlock.registerTag('async', __simpleValueTag);
SDocblockBlock.registerTag('generator', __simpleValueTag);
SDocblockBlock.registerTag('global', __simpleValueTag);
SDocblockBlock.registerTag('constructor', __simpleValueTag);
SDocblockBlock.registerTag('hideconstructor', __simpleValueTag);
SDocblockBlock.registerTag('ignore', __simpleValueTag);
SDocblockBlock.registerTag('inheritdoc', __simpleValueTag);
SDocblockBlock.registerTag('inner', __simpleValueTag);
SDocblockBlock.registerTag('instance', __simpleValueTag);
SDocblockBlock.registerTag('mixin', __simpleValueTag);
SDocblockBlock.registerTag('override', __simpleValueTag);
SDocblockBlock.registerTag('access', __simpleValueTag);
SDocblockBlock.registerTag('category', __simpleValueTag);
SDocblockBlock.registerTag('copyright', __simpleValueTag);
SDocblockBlock.registerTag('deprecated', __simpleValueTag);
SDocblockBlock.registerTag('alias', __simpleValueTag);
SDocblockBlock.registerTag('augments', __simpleValueTag);
SDocblockBlock.registerTag('callback', __simpleValueTag);
SDocblockBlock.registerTag('class', __simpleValueTag);
SDocblockBlock.registerTag('classdesc', __simpleValueTag);
SDocblockBlock.registerTag('constant', __simpleValueTag);
SDocblockBlock.registerTag('constructs', __simpleValueTag);
SDocblockBlock.registerTag('copyright', __simpleValueTag);
SDocblockBlock.registerTag('default', __simpleValueTag);
SDocblockBlock.registerTag('deprecated', __simpleValueTag);
SDocblockBlock.registerTag('exports', __simpleValueTag);
SDocblockBlock.registerTag('external', __simpleValueTag);
SDocblockBlock.registerTag('host', __simpleValueTag);
SDocblockBlock.registerTag('file', __simpleValueTag);
SDocblockBlock.registerTag('function', __simpleValueTag);
SDocblockBlock.registerTag('func', __simpleValueTag);
SDocblockBlock.registerTag('method', __simpleValueTag);
SDocblockBlock.registerTag('implements', __simpleValueTag);
SDocblockBlock.registerTag('interface', __simpleValueTag);
SDocblockBlock.registerTag('kind', __simpleValueTag);
SDocblockBlock.registerTag('lends', __simpleValueTag);
SDocblockBlock.registerTag('license', __simpleValueTag);
SDocblockBlock.registerTag('memberof', __simpleValueTag);
SDocblockBlock.registerTag('memberof', __simpleValueTag);
SDocblockBlock.registerTag('mixes', __simpleValueTag);
SDocblockBlock.registerTag('module', __simpleValueTag);
SDocblockBlock.registerTag('name', __simpleValueTag);
SDocblockBlock.registerTag('namespace', __simpleValueTag);
SDocblockBlock.registerTag('package', __simpleValueTag);
SDocblockBlock.registerTag('private', __simpleValueTag);
SDocblockBlock.registerTag('protected', __simpleValueTag);
SDocblockBlock.registerTag('public', __simpleValueTag);
SDocblockBlock.registerTag('readonly', __simpleValueTag);
SDocblockBlock.registerTag('requires', __simpleValueTag);
SDocblockBlock.registerTag('see', __simpleValueTag);
SDocblockBlock.registerTag('since', __simpleValueTag);
SDocblockBlock.registerTag('static', __simpleValueTag);
SDocblockBlock.registerTag('summary', __simpleValueTag);
SDocblockBlock.registerTag('this', __simpleValueTag);
SDocblockBlock.registerTag('todo', __simpleValueTag);
SDocblockBlock.registerTag('tutorial', __simpleValueTag);
SDocblockBlock.registerTag('type', __simpleValueTag);
SDocblockBlock.registerTag('variation', __simpleValueTag);
SDocblockBlock.registerTag('version', __simpleValueTag);
SDocblockBlock.registerTag('enum', __simpleValueTag);
SDocblockBlock.registerTag('src', __simpleValueTag);
SDocblockBlock.registerTag('description', __descriptionTag);
SDocblockBlock.registerTag('desc', __descriptionTag);
// SDocblockBlock.registerTag('yields', __yieldsTag);
// SDocblockBlock.registerTag('typedef', __typedefTag);
// SDocblockBlock.registerTag('throws', __throwsTag);
SDocblockBlock.registerTag('return', __returnTag);
SDocblockBlock.registerTag('param', __paramTag);
SDocblockBlock.registerTag('property', __paramTag);
SDocblockBlock.registerTag('prop', __paramTag);
// SDocblockBlock.registerTag('listens', __listensTag);
// SDocblockBlock.registerTag('member', __memberTag);
// SDocblockBlock.registerTag('var', __memberTag);
// SDocblockBlock.registerTag('event', __eventTag);
// SDocblockBlock.registerTag('borrows', __borrowsTag);
SDocblockBlock.registerTag('snippet', __snippetTag);
SDocblockBlock.registerTag('example', __exampleTag);

export default SDocblockBlock;
