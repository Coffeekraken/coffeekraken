// @shared

import __SClass from '../../class/SClass';
import __deepMerge from '../../object/deepMerge';
import __SPromise from '../../promise/SPromise';
import __handlebars from 'handlebars';
import __SCache from '../../cache/SCache';
import __isNode from '../../is/node';
import __promisedHandlebars from 'promised-handlebars';
import __packageRoot from '../../../node/path/packageRoot';
import __packageJson from '../../../node/package/json';
import __fs from 'fs';

import { ISDocblock } from '../SDocblock';
import { ISDocblockBlock } from '../SDocblockBlock';

/**
 * @name            SDocblockRenderer
 * @namespace       sugar.js.docblock.renderers
 * @type            Class
 * @extents         SClass
 * @status              wip
 *
 * This class represent an SDocblock output like "markdown", "html", etc...
 *
 * @param       {SDocblock}         docblockInstance        The docblock instance you want to output using this class
 * @param       {Object}            [settings={}]           Some settings to configure your output class:
 * - ...
 *
 * @todo        interface
 * @todo        doc
 * @todo      Javascript support
 *
 * @example         js
 * import SDocblock from '@coffeekraken/sugar/js/docblock/SDocblock';
 * import SDocblockRenderer from '@coffeekraken/sugar/js/docblock/SDocblockRenderer';
 * class MyCoolRenderer extends SDocblockRenderer {
 *    constructor(docblockInstance, settings = {}) {
 *      super(docblockInstance, settings);
 *    }
 * }
 *
 * @since       2.0.0
 * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISDocblockRenderedOptionalettings {}
export interface ISDocblockRenderedSettings {}
export interface ISDocblockRendererCtorSettings {
  docblockRenderer?: ISDocblockRenderedOptionalettings;
}

export interface ISDocblockRendererRegisteredEntries {
  [key: string]: string;
}
export interface ISDocblockRendererRegisteredStacks {
  templates: ISDocblockRendererRegisteredEntries;
  blocks: ISDocblockRendererRegisteredEntries;
  partials: ISDocblockRendererRegisteredEntries;
}

export interface ISDocblockRendererPartialsTemplateObj {
  [key: string]: ISDocblockRendererTemplateObj;
}
export interface ISDocblockRendererTemplateObj {
  path: string;
  content: string;
  stats: any;
}

export interface ISDocblockRenderer {
  _docblockInstance: ISDocblock;
  _cache: __SCache;
}

// @ts-ignore
class SDocblockRenderer extends __SClass implements ISDocblockRenderer {
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
  _docblockInstance: ISDocblock;

  /**
   * @name        _cache
   * @type        __SCache
   * @private
   *
   * Store the SCache instance used to help rendering beeing quicker
   *
   * @since     2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _cache: __SCache;

  /**
   * @name        _handlebars
   * @type        any
   * @private
   *
   * Store the handlebar instance used to render most of the templates
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _handlebars: any;

  /**
   * @name        _partialsTemplateObj
   * @type        ISDocblockRendererPartialsTemplateObj
   * @private
   *
   * Store the partials template objects
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _partialsTemplateObj: ISDocblockRendererPartialsTemplateObj = {};

  /**
   * @name        _registered
   * @type        ISDocblockRendererRegisteredStacks
   * @private
   *
   * Store the registered templates, blocks and partials
   *
   * @since       2.0.0
   */
  _registered: ISDocblockRendererRegisteredStacks = {
    templates: {},
    blocks: {},
    partials: {}
  };

  /**
   * @name          _renderedBlocks
   * @type          Array<SDocblockBlock>
   * @private
   *
   * Store the rendered blocks to avoid rendering them twice
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  private _renderedBlocks: ISDocblockBlock[] = [];

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
  constructor(
    docblockInstance: ISDocblock,
    settings?: ISDocblockRendererCtorSettings
  ) {
    // save the settings
    super(
      __deepMerge(
        {
          docblockRenderer: {
            templates: {},
            blocks: {},
            partials: {}
          }
        },
        settings
      )
    );
    // save the docblock instance
    this._docblockInstance = docblockInstance;
    // init the handlebars helpers
    this._registerHandlerbarsHelpers();

    this._cache = new __SCache('SDocblockRenderer');
  }

  /**
   * @name        registerTemplate
   * @type        Function
   *
   * Allows you to register a new template for this particular renderer instance
   *
   * @param     {String}      name        The name of this template
   * @param     {String}    path          The path to the template file
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  registerTemplate(name: string, path: string): void {
    if (__isNode()) {
      const template = require(path);
      if (!template || !template.default) {
        throw new Error(
          `You try to register the template named "<yellow>${name}</yellow>" with the path "<cyan>${path}</cyan>" but it seems that this template is either inexistant, or invalid...`
        );
      }
    }
    this._registered.templates[name] = path;
  }

  /**
   * @name        registerBlock
   * @type        Function
   *
   * Allows you to register a new block for this particular renderer instance
   *
   * @param     {String}      name        The name of this template
   * @param     {String}    path          The path to the template file
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  registerBlock(name: string, path: string): void {
    if (__isNode()) {
      const block = require(path);
      if (!block || !block.default) {
        throw new Error(
          `You try to register the block named "<yellow>${name}</yellow>" with the path "<cyan>${path}</cyan>" but it seems that this block is either inexistant, or invalid...`
        );
      }
    }
    this._registered.blocks[name] = path;
  }

  /**
   * @name        registerPartial
   * @type        Function
   *
   * Allows you to register a new template for this particular renderer instance
   *
   * @param     {String}      name        The name of this template
   * @param     {String}    path          The path to the template file
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  registerPartial(name: string, path: string): void {
    if (__isNode()) {
      const partial = require(path);
      if (!partial || !partial.default) {
        throw new Error(
          `You try to register the partial named "<yellow>${name}</yellow>" with the path "<cyan>${path}</cyan>" but it seems that this partial is either inexistant, or invalid...`
        );
      }
    }
    this._registered.partials[name] = path;
  }

  /**
   * @name          _registerHandlerbarsHelpers
   * @type          Function
   * @private
   *
   * This method init the handlebar instance that will be used during the rendering process
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
          const rendered = this._renderedBlocks.indexOf(block) !== -1;
          this._renderedBlocks.push(block);
          return rendered !== true;
        });

        const renderedBlocks: string[] = [];
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
    const type =
      typeof blockObj.type === 'string'
        ? blockObj.type.toLowerCase()
        : 'default';

    const template =
      this._settings.blocks[type] || this._settings.blocks.default;
    let compiledTemplateFn;

    if (__isNode()) {
      // get template object
      let templateObj: any = await this.getTemplateObj(template);

      const cacheObj = {
        partialsTemplateObj: this._partialsTemplateObj,
        template: templateObj,
        data: blockObj
      };

      // check the cache
      const cachedValue = await this._cache.get(cacheObj);

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
  getPartialsTemplateObj(): ISDocblockRendererPartialsTemplateObj {
    const partialsTemplateObj: ISDocblockRendererPartialsTemplateObj = {};
    Object.keys(this._settings.partials).forEach(async (partialName) => {
      const partialPath = this._settings.partials[partialName];
      partialsTemplateObj[partialName] = await this.getTemplateObj(partialPath);
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
   * resolve it to get back a full template object with the path and the stats if we are in node context
   *
   * @param         {String}        templatePath        The template path to get
   * @return      {ISDocblockRendererTemplateObj}                          The template object with the path and the stats if we are in node context
   *
   * @since       2.0.0
   * @author 	        Olivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)
   */
  async getTemplateObj(
    templatePath: string
  ): Promise<ISDocblockRendererTemplateObj> {
    let stats;

    if (__isNode()) {
      if (__fs.existsSync(templatePath)) {
      } else if (
        __fs.existsSync(`${__packageRoot()}/node_modules/${templatePath}`)
      ) {
        templatePath = `${__packageRoot()}/node_modules/${templatePath}`;
      } else {
        throw new Error(
          `Sorry but the passed template url "<yellow>${templatePath}</yellow>" does not exists...`
        );
      }
      stats = __fs.statSync(templatePath);
      delete require.cache[require.resolve(templatePath)];
    }

    const content = await import(templatePath);
    const templateObj: ISDocblockRendererTemplateObj = {
      path: templatePath,
      content,
      stats
    };
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
      async ({ resolve, reject }) => {
        // get the block in object format
        const blocksArray = this._docblockInstance.toObject();
        // reset all blocks rendered state
        blocksArray.forEach((block) => {
          block._rendered = false;
        });
        // get the first block
        const firstBlock = blocksArray[0];
        // get the template to render
        const type =
          typeof firstBlock.type === 'string'
            ? firstBlock.type.toLowerCase()
            : 'default';
        const template =
          this._settings.templates[type] || this._settings.templates.default;

        const templateObj = await this.getTemplateObj(template);

        if (!templateObj || !templateObj.content) {
          return reject();
        }

        // render the template
        const compiledTemplateFn = this._handlebars.compile(
          templateObj.content,
          {
            noEscape: true
          }
        );
        const renderedTemplate = await compiledTemplateFn();
        // resolve the rendering process with the rendered stack
        resolve(renderedTemplate);
      },
      {
        id: 'SDocblockRendererRender'
      }
    );
  }
}

export default SDocblockRenderer;
