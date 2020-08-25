import __deepMerge from '../object/deepMerge';
import __SDocblockBlock from './SDocblockBlock';
import __handlebars from 'handlebars';
import __markdown from './markdown/index';
import __markdownToHtml from '../convert/html/htmlFromMarkdown';

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
  _blocks = null;

  /**
   * @name          _to
   * @type          String
   * @private
   *
   * Store the format in which the docblocks have to be converted
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */
  _to = null;

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
        sortFunction: (a, b) => {
          let res = 0;
          // if (.object.namespace && !a.object.namespace) res -= 1;
          if (b.object.namespace) res += 1;
          if (b.object.type && b.object.type.toLowerCase() === 'class')
            res += 1;
          if (b.object.constructor) res += 1;
          if (b.object.private) res += 1;
          if (b.object.type && b.object.type.toLowerCase() === 'function')
            res += 1;
          if (
            a.object.name &&
            b.object.name &&
            b.object.name.length > a.object.name.length
          )
            res += 1;
          return res;
        },
        filepath: null,
        to: {
          markdown: __markdown
        }
      },
      settings
    );
    this._source = source;
    // parsing the source
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
  sort(sortFunction = null) {
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
  get blocks() {
    if (!this._blocks) this.parse();
    return this._blocks;
  }

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
  parse(string = this._source) {
    // extract each docblocks
    const reg = /(<!--|\/\*{2})([\s\S]+?)(\*\/|-->)/g;
    // extracting blocks
    let blocksArray = string.match(reg);

    if (!Array.isArray(blocksArray)) {
      blocksArray = [];
    } else if (Array.isArray(blocksArray) && blocksArray.length) {
      blocksArray = blocksArray.map((t) => t.trim());
      if (!blocksArray || !blocksArray.length) return [];
      blocksArray = blocksArray.map((block) => {
        return new __SDocblockBlock(block || ' ', {
          filepath: this._settings.filepath || ''
        });
      });
    }
    // save the blocks
    this._blocks = blocksArray;

    // sort the blocks
    this.sort();

    // return the class instance itself
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
  toObject() {
    return this.blocks.map((block) => {
      return block.toObject();
    });
  }

  /**
   * @name          toMarkdown
   * @type          Function
   *
   * This method convert the parsed docblocks to a markdown string
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */
  toMarkdown() {
    return this.to('markdown');
  }

  /**
   * @name          toHtml
   * @type          Function
   *
   * This method convert the parsed docblocks to an HTML string
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */
  toHtml(settings = {}) {
    const markdown = this.toMarkdown();
    return __markdownToHtml(markdown, settings);
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
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */
  to(format) {
    const includedTypes = [];
    __handlebars.registerHelper('include', (type) => {
      if (!this.blocks || !this.blocks.length) return '';
      // filter blocks
      const blocks = this.blocks
        .filter((block) => {
          if (!block.object.type) return false;
          return (
            (type === '...' &&
              includedTypes.indexOf(block.object.type.toLowerCase()) === -1) ||
            (block.object.type.toLowerCase() === type &&
              includedTypes.indexOf(block.object.type.toLowerCase()) === -1)
          );
        })
        .map((block) => {
          return block.to(format);
        });
      // save this included type
      includedTypes.push(type);

      return blocks.join('\n\n');
    });

    // get the blocks
    const blocksArray = this.blocks;

    if (!blocksArray || !blocksArray.length) return '';

    // check the first docblock
    const firstBlock = blocksArray[0];
    // get the block type
    const type = firstBlock.object.type
      ? firstBlock.object.type.toLowerCase()
      : 'default';
    // render the good template depending on the first block type
    const template =
      this._settings.to[format].templates[type] ||
      this._settings.to[format].templates.default;
    if (!template)
      throw new Error(
        `You try to convert your docblocks into "${format}" format but the needed "${type}" template is not available for this particular format. Here's the available templates: ${Object.keys(
          this._settings.to[format].templates
        ).join(',')}...`
      );
    // save the format in which converting the docblocks
    this._to = format;
    // render the template
    const compiledTemplateFn = __handlebars.compile(template, {
      noEscape: true
    });
    const renderedTemplate = compiledTemplateFn();
    // return the rendered template
    return renderedTemplate;
  }
}
