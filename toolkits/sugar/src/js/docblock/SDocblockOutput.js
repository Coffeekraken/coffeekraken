import __deepMerge from '../object/deepMerge';
import __SPromise from '../promise/SPromise';
import __handlebars from 'handlebars';

/**
 * @name            SDocblockOutput
 * @namespace       sugar.js.docblock
 * @type            Class
 *
 * This class represent an SDocblock output like "markdown", "html", etc...
 *
 * @param       {SDocblock}         docblockInstance        The docblock instance you want to output using this class
 * @param       {Object}            [settings={}]           Some settings to configure your output class:
 * - ...
 *
 * @example         js
 * import SDocblock from '@coffeekraken/sugar/js/docblock/SDocblock';
 * import SDocblockOutput from '@coffeekraken/sugar/js/docblock/SDocblockOutput';
 * class MyCoolOutput extends SDocblockOutput {
 *    constructor(docblockInstance, settings = {}) {
 *      super(docblockInstance, settings);
 *    }
 * }
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SDocblockOutput {
  /**
   * @name      _settings
   * @type      Object
   * @private
   *
   * Store the settings
   *
   * @since     2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = {};

  /**
   * @name      _docblockInstance
   * @type      SDocblock
   * @private
   *
   * Store the SDocblock instance to render
   *
   * @since     2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _docblockInstance = null;

  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @since     2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(docblockInstance, settings = {}) {
    // save the settings
    this._settings = __deepMerge(
      {
        templates: {}
      },
      settings
    );
    // save the docblock instance
    this._docblockInstance = docblockInstance;
    // init the handlebars helpers
    this._registerHandlerbarsHelpers();
  }

  /**
   * @name          _registerHandlerbarsHelpers
   * @type          Function
   * @private
   *
   * This method init the handlebar instance that will be used during the rendering process
   *
   * @since       2.0.0
   *
   */
  _registerHandlerbarsHelpers() {
    const includedTypes = [];
    __handlebars.registerHelper('include', (type) => {
      if (
        !this._docblockInstance.blocks ||
        !this._docblockInstance.blocks.length
      )
        return '';
      // filter blocks
      const blocks = this._docblockInstance.blocks
        .filter((block) => {
          if (!block.toObject().type) return false;
          return (
            (type === '...' &&
              includedTypes.indexOf(block.toObject().type.toLowerCase()) ===
                -1) ||
            (block.toObject().type.toLowerCase() === type &&
              includedTypes.indexOf(block.toObject().type.toLowerCase()) === -1)
          );
        })
        .map((block) => {
          return this.renderBlock(block.toObject());
        });
      // save this included type
      includedTypes.push(type);

      return blocks.join('\n\n');
    });
  }

  /**
   * @name          renderBlock
   * @type          Function
   * @async
   *
   * This method is the one take will render a block using the correct block template
   * and the passed block object data
   *
   * @param       {Object}          blockObj          The object representing the block to render
   * @param       {Object}        [settings={}]       An object of settings to override the one passed in the constructor
   * @return      {String}                            The rendered block
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  renderBlock(blockObj, settings = {}) {
    if (blockObj.toObject && typeof blockObj.toObject === 'function')
      blockObj = blockObj.toObject();
    let type =
      typeof blockObj.type === 'string'
        ? blockObj.type.toLowerCase()
        : 'default';
    const template =
      this._settings.blocks[type] || this._settings.blocks.default;
    let compiledTemplateFn;
    try {
      compiledTemplateFn = __handlebars.compile(template, {
        noEscape: true
      });
    } catch (e) {
      console.log('BLOC ERROR', e);
    }
    const renderedTemplate = compiledTemplateFn(blockObj);
    return renderedTemplate;
  }

  /**
   * @name          render
   * @type          Function
   * @async
   *
   * This method is the main one that will take each blocks in the docblock instance
   * and render them by passing each tags to the ```renderTag``` method.
   *
   * @param       {Object}        [settings={}]       An object of settings to override the one passed in the constructor
   * @return      {SPromise}                          An SPromise instance that will be resolved with the rendered string once it has been fully rendered
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  render(settings = {}) {
    return new __SPromise(async (resolve, reject, trigger, cancel) => {
      // get the block in object format
      const blocksArray = this._docblockInstance.toObject();
      // get the first block
      const firstBlock = blocksArray[0];
      // get the template to render
      let type =
        typeof firstBlock.type === 'string'
          ? firstBlock.type.toLowerCase
          : 'default';
      const template =
        this._settings.templates[type] || this._settings.templates.default;
      // render the template
      let compiledTemplateFn;
      try {
        compiledTemplateFn = __handlebars.compile(template, {
          noEscape: true
        });
      } catch (e) {
        console.log('E>RROR', e);
      }
      const renderedTemplate = compiledTemplateFn();
      // resolve the rendering process with the rendered stack
      resolve(renderedTemplate);
    });
  }
};
