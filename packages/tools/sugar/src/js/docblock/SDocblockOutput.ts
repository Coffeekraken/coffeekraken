import __SError from '../error/SError';
import __deepMerge from '../object/deepMerge';
import __SPromise from '../promise/SPromise';
import __handlebars from 'handlebars';
import __SCache from '../cache/SCache';
import __isNode from '../is/node';
import __promisedHandlebars from 'promised-handlebars';

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
 * @todo      Javascript support
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
export default class SDocblockOutput {
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
        templates: {},
        blocks: {},
        partials: {}
      },
      settings
    );
    // save the docblock instance
    this._docblockInstance = docblockInstance;
    // init the handlebars helpers
    this._registerHandlerbarsHelpers();

    this._cache = new __SCache('SDocblockOutput');
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
    this._handlebars = __promisedHandlebars(__handlebars, {
      promise: Promise
    });

    this._handlebars.registerHelper('include', (type) => {
      return new Promise(async (resolve, reject) => {
        if (
          !this._docblockInstance.blocks ||
          !this._docblockInstance.blocks.length
        )
          return '';

        // filter blocks
        const blocks = this._docblockInstance.blocks.filter((block) => {
          if (!block.toObject().type) return false;
          const rendered = block._rendered;
          block._rendered = true;
          return rendered !== true;
        });

        const renderedBlocks = [];
        for (let i = 0; i < blocks.length; i++) {
          const block = blocks[i];
          const result = await this.renderBlock(block.toObject());
          renderedBlocks.push(result);
        }

        resolve(renderedBlocks.join('\n\n'));
      });
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
  async renderBlock(blockObj, settings = {}) {
    if (blockObj.toObject && typeof blockObj.toObject === 'function')
      blockObj = blockObj.toObject();
    let type =
      typeof blockObj.type === 'string'
        ? blockObj.type.toLowerCase()
        : 'default';

    const template =
      this._settings.blocks[type] || this._settings.blocks.default;
    let compiledTemplateFn;

    let templateObj = {};
    if (__isNode()) {
      // get template object
      templateObj = this.getTemplateObj(template);

      const cacheObj = {
        partialsTemplateObj: this._partialsTemplateObj,
        template: templateObj,
        data: blockObj
      };

      // check the cache
      const cachedValue = await this._cache.get(cacheObj);
      // console.log('SE', Object.keys(cachedValue));
      if (!cachedValue) {
        compiledTemplateFn = this._handlebars.compile(templateObj.content, {
          noEscape: true
        });
        const renderedTemplate = await compiledTemplateFn(blockObj);
        // save in chache
        this._cache.set(cacheObj, renderedTemplate);
        // return the rendered template
        return renderedTemplate;
      } else {
        return cachedValue;
      }
    } else {
      // return rendered template
      return 'Support for javascript is not available yet...';
    }
  }

  /**
   * @name          getPartialsTemplateObj
   * @type        Function
   * @async
   *
   * This method loop on all the partials and read them with their stats if we are in node context
   *
   * @return      {Object}          The template object of all the partials
   *
   * @since       2.0.0
   *  @author 	        Olivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)
   */
  getPartialsTemplateObj() {
    const partialsTemplateObj = {};
    Object.keys(this._settings.partials).forEach((partialName) => {
      const partialPath = this._settings.partials[partialName];
      partialsTemplateObj[partialName] = this.getTemplateObj(partialPath);
      // register partials
      this._handlebars.unregisterPartial(partialName);
      this._handlebars.registerPartial(
        partialName,
        partialsTemplateObj[partialName].content
      );
    });
    return partialsTemplateObj;
  }

  /**
   * @name          getTemplateObj
   * @type          Function
   * @async
   *
   * This method take the template url setted in the settings object and
   * resolve it to get back a full template object with the path and the stats is we are in node context
   *
   * @param         {String}        template        The template path to get
   * @return      {Object}                          The template object with the path and the stats if we are in node context
   *
   * @since       2.0.0
   * @author 	        Olivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)
   */
  getTemplateObj(template) {
    let templateObj = {};
    if (__isNode()) {
      const __packageRoot = require('../../node/path/packageRoot');
      const __packageJson = require('../../node/package/json');
      const __fs = require('fs');
      const json = __packageJson();
      let stats, templatePath;
      if (__fs.existsSync(template)) {
        templatePath = template;
      } else if (
        __fs.existsSync(`${__packageRoot()}/node_modules/${template}`)
      ) {
        templatePath = `${__packageRoot()}/node_modules/${template}`;
      } else {
        throw new __SError(
          `Sorry but the passed template url "<yellow>${template}</yellow>" does not exists...`
        );
      }
      stats = __fs.statSync(templatePath);
      delete require.cache[require.resolve(templatePath)];

      const content = require(templatePath);
      templateObj = {
        path: templatePath,
        content: content,
        mtime: stats.mtime
      };
    }
    return templateObj;
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
    this._partialsTemplateObj = this.getPartialsTemplateObj();

    return new __SPromise(
      async (resolve, reject, trigger, cancel) => {
        // get the block in object format
        const blocksArray = this._docblockInstance.toObject();
        // reset all blocks rendered state
        blocksArray.forEach((block) => {
          block._rendered = false;
        });
        // get the first block
        const firstBlock = blocksArray[0];
        // get the template to render
        let type =
          typeof firstBlock.type === 'string'
            ? firstBlock.type.toLowerCase()
            : 'default';
        const template =
          this._settings.templates[type] || this._settings.templates.default;

        const templateObj = this.getTemplateObj(template);

        // render the template
        let compiledTemplateFn;
        compiledTemplateFn = this._handlebars.compile(templateObj.content, {
          noEscape: true
        });
        const renderedTemplate = await compiledTemplateFn();
        // resolve the rendering process with the rendered stack
        resolve(renderedTemplate);
      },
      {
        id: 'SDocblockOutputRender'
      }
    );
  }
};
