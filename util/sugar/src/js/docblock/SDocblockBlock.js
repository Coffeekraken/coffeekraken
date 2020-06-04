import __deepMege from '../object/deepMerge';
import __map from '../object/map';

import __authorTag from './tags/author';
import __simpleValueTag from './tags/simpleValue';
import __descriptionTag from './tags/description';
import __returnTag from './tags/return';
import __exampleTag from './tags/example';
import __paramTag from './tags/param';
import __snippetTag from './tags/snippet';

import __jsTemplate from './templates/js';

import __markdownRenderTags from './markdown/tags';

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
  static templates = {
    js: __jsTemplate
  };

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
        tags: SDocblockBlock.tagsMap,
        renderTags: __markdownRenderTags
      },
      settings
    );
    // parse the docblock string
    this._blockObj = this._parse();
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
   * @param       {String}          [template=null]           The template you want to use. Can be:
   * - A simple word that specify a registered template registered using the "registerTemplate" static method of this class
   * - A template string that will be used as the template directly
   * - One of the premade templates like: "js", "node", "scss", and more to come...
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  toMarkdown(template = 'js') {
    let templateString = template;
    if (template.split(' ').length === 1) {
      // template name
      templateString = SDocblockBlock.templates[template];
    }

    const linesArray = templateString.split('\n');

    linesArray.forEach((line, i) => {
      // get all the @something in the line
      const tagNameReg = /[\s]?@([a-zA-Z0-9]+)/gm;
      const tagNameMatch = line.match(tagNameReg);

      if (!tagNameMatch) return;

      let currentLineValue = line;
      tagNameMatch.forEach((tagName) => {
        tagName = tagName.trim().replace('@', '');

        // render the tag
        const renderedTag = this._renderTag(tagName, this.object[tagName]);
        if (
          typeof renderedTag === 'string' ||
          typeof renderedTag === 'number'
        ) {
          // replace the tag in the line
          currentLineValue = currentLineValue.replace(
            `@${tagName}`,
            renderedTag
          );
        }
      });

      // save the new line
      linesArray[i] = currentLineValue;
    });

    // return the rendered block
    return linesArray.join('\n');
  }

  /**
   * @name          _renderTag
   * @type          Function
   * @private
   *
   * This method takes a tag name to render with his data and render it
   *
   * @param       {String}        tagName         The tag name to render
   * @param       {Mixed}         data            The tag datas
   * @return      {String}                        The rendered tag
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _renderTag(tagName, data) {
    // check if we have a special render tags
    let renderTagFn = this._settings.renderTags.default;
    if (this._settings.renderTags[tagName])
      renderTagFn = this._settings.renderTags[tagName];
    // render the tag
    const renderedTag = renderTagFn(tagName, data);
    // return the rendered tag
    return renderedTag;
  }

  /**
   * @name          _parse
   * @type          Function
   * @private
   *
   * This method take a docblick string and parse it to a javascript object
   *
   * @return      {Object}          The object version of the source string
   *
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _parse() {
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
      if (this._settings.tags[prop] && prop !== 'src')
        return this._settings.tags[prop](value);
      return __simpleValueTag(value);
    });

    // save the raw string
    docblockObj.raw = this._source.toString();

    // return the parsed docblock object
    return docblockObj;
  }
}
