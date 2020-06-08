import __deepMerge from '../object/deepMerge';
import __SDocblockBlock from './SDocblockBlock';
import __handlebars from 'handlebars';
import __markdown from './markdown/index';

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
        filepath: null,
        to: {
          markdown: __markdown
        }
      },
      settings
    );
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
   * @return      {Array}                     An array of SDockblock instances representing each extracted docblocks
   *
   * @author 	Olivier Bossel <olivier.bossel@gmail.com>
   */
  parse(string = this._source) {
    // extract each docblocks
    const reg = /\/\*{2}([\s\S]+?)\*\//g;
    // extracting blocks
    const blocksArray = string
      .match(reg)
      .map((t) => t.trim())
      .map((block) => {
        return new __SDocblockBlock(block, {
          filepath: this._settings.filepath
        });
      });
    // save the blocks
    this._blocks = blocksArray;
    // return the array of docblock blocks
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
  toMarkdown() {
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
  to(format) {
    const includedTypes = [];
    __handlebars.registerHelper('include', (type) => {
      // filter blocks
      const blocks = this.blocks
        .filter((block) => {
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
    // loop on each blocks to convert them to a markdown string
    // const renderedBlocks = blocksArray.map((block) => {
    //   return block.to(format);
    // });
    // check the first docblock
    const firstBlock = blocksArray[0];
    // get the block type
    const type = firstBlock.object.type.toLowerCase();
    // render the good template depending on the first block type
    const template = this._settings.to[format].templates[type];
    if (!template)
      throw new Error(
        `You try to convert your docblocks into "${format}" format but the needed "${type}" template is not available for this particular format. Here's the available templates: ${Object.keys(
          this._settings.to[format].templates
        ).join(',')}...`
      );
    // save the format in which converting the docblocks
    this._to = format;
    // render the template
    const compiledTemplateFn = __handlebars.compile(
      this._settings.to[format].templates[type],
      { noEscape: true }
    );
    const renderedTemplate = compiledTemplateFn();
    // return the rendered template
    return renderedTemplate;
  }
}
