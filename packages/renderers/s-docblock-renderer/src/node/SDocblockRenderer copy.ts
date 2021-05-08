import __path from 'path';
import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SPromise from '@coffeekraken/s-promise';
import __handlebars from 'handlebars';
import __promisedHandlebars from 'promised-handlebars';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __fs from 'fs';
import __glob from 'glob';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';

import __SDocblockRendererSettingsInterface from './interface/SDocblockRendererSettingsInterface';
import { ISDocblock, ISDocblockBlock } from '@coffeekraken/s-docblock';

/**
 * @name            SDocblockRenderer
 * @namespace       node
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

export interface ISDocblockRendererSettings {
  scope: string;
  rootDir: string;
}
export interface ISDocblockRendererCtorSettings {
  docblockRenderer?: Partial<ISDocblockRendererSettings>;
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
   * @name        _registeredTemplates
   * @type        Record<string, string>
   * @private
   *
   * Store the registered templates, blocks and partials
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _registeredTemplates: Record<string, string> = {};

  /**
   * @name        docblockRendererSettings
   * @type        ISDocblockRendererSettings
   * @get
   *
   * Access the docblock renderer settings
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get docblockRendererSettings(): ISDocblockRendererSettings {
    return (<any>this)._settings.docblockRenderer;
  }

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
            ...__SDocblockRendererSettingsInterface.defaults()
          }
        },
        settings
      )
    );

    // save the docblock instance
    this._docblockInstance = docblockInstance;
    // init the handlebars helpers
    this._registerHandlerbarsHelpers();
    // register helpers
    this._registerHelpers();
    // register templates
    this._registerTemplates();
  }

  /**
   * @name      _registerTemplates
   * @type      Function
   * @private
   *
   * This method scan the directories "layouts", "blocks" and "partials" of the renderer directory
   * and register them automatically
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _registerTemplates() {
    const scanDir = (rootDir, directory) => {
      const layoutsPathes = __glob.sync(`${rootDir}/${directory}/**/*.hbs`);
      layoutsPathes.forEach((path) => {
        const name = __path
          .relative(rootDir, path)
          .replace('.hbs', '')
          .split('/')
          .join('.');
        this.registerTemplate(name, path);
      });
    };

    // const layouts = __glob.sync(`${__dirname}/layouts/**/*.js`);
    // layouts.forEach((layoutPath) => {
    //   const helperObj = require(filePath);
    //   if (!helperObj.id || !helperObj.helper) return;
    //   this._handlebars.registerHelper(helperObj.id, (...args) => {
    //     helperObj.helper(...args);
    //   });
    // });
    scanDir(`${__dirname}/default`, 'layouts');
    scanDir(`${__dirname}/default`, 'blocks');
    scanDir(`${__dirname}/default`, 'partials');
    scanDir(`${__dirname}/default`, 'tags');
    if (this.docblockRendererSettings.rootDir) {
      scanDir(this.docblockRendererSettings.rootDir, 'layouts');
      scanDir(this.docblockRendererSettings.rootDir, 'blocks');
      scanDir(this.docblockRendererSettings.rootDir, 'partials');
      scanDir(this.docblockRendererSettings.rootDir, 'tags');
    }
  }

  /**
   * @name        registerLayout
   * @type        Function
   *
   * Allows you to register a new layout for this particular renderer instance
   *
   * @param     {String}      name        The name of this template
   * @param     {String}    path          The path to the template file
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  registerTemplate(name: string, path: string): void {
    if (!__fs.existsSync(path)) {
      throw new Error(
        `You try to register the template named "<yellow>${name}</yellow>" with the path "<cyan>${path}</cyan>" but it seems that this template is either inexistant, or invalid...`
      );
    }
    if (name.match(/^partials\./)) {
      name = name.replace(/^partials\./, '');
      this._handlebars.registerPartial(name, __fs.readFileSync(path, 'utf8'));
    } else {
      this._registeredTemplates[name] = path;
    }
  }

  /**
   * @name        _registerHelpers
   * @type        Function
   * @private
   *
   * Register all the helpers inside the "helpers" folders
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _registerHelpers() {
    const files = __glob.sync(`${__dirname}/helpers/**/*.js`);
    files.forEach((filePath) => {
      const helperObj = require(filePath);
      if (!helperObj.id || !helperObj.helper) return;
      this._handlebars.registerHelper(helperObj.id, (...args) => {
        helperObj.helper(...args);
      });
    });
    if (this.docblockRendererSettings.rootDir) {
      const rendererFiles = __glob.sync(
        `${this.docblockRendererSettings.rootDir}/helpers/**/*.js`
      );
      rendererFiles.forEach((filePath) => {
        const helperObj = require(filePath).default;
        if (!helperObj.id || !helperObj.helper) return;
        this._handlebars.registerHelper(helperObj.id, (...args) => {
          const api = {
            settings: this.docblockRendererSettings,
            renderer: this,
            hbs: this._handlebars,
            render: (string, data = {}) => {
              const tpl = this._handlebars.compile(string);
              return tpl(data);
            }
          };
          if (!helperObj.args) {
            throw new Error(
              `You try to make use of the "<yellow>${helperObj.id}</yellow>" SDocblockRenderer helper but it does not have the required "<cyan>args</cyan>" property.`
            );
          }
          Object.keys(helperObj.args).forEach((key, i) => {
            const value = args[i];
            if (value !== undefined) {
              api[key] = value;
            } else {
              api[key] = helperObj[key];
            }
          });
          return helperObj.helper(api);
        });
      });
    }
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

    let currentBlock;
    const blocksByHash: Record<string, any> = {};

    this._handlebars.registerHelper('block', (type) => {
      return new Promise(async (resolve, reject) => {
        if (
          !this._docblockInstance.blocks ||
          !this._docblockInstance.blocks.length
        )
          return '';

        // filter blocks
        const blocks = this._docblockInstance.blocks.filter((block) => {
          const blockObj = block.toObject();

          if (type !== '...') {
            if (!blockObj.type) return false;
            if (blockObj.type.toLowerCase() !== type.toLowerCase())
              return false;
          }

          const blockHash = __md5.encrypt(blockObj);
          if (blocksByHash[blockHash]) return false;

          // add the block in the rendered blocks stack
          blocksByHash[blockHash] = block;
          return true;
        });

        const renderedBlocks: string[] = [];
        for (let i = 0; i < blocks.length; i++) {
          const blockObj = blocks[i].toObject();
          currentBlock = blocks[i];
          const result = await this.renderBlock(blocks[i]);
          renderedBlocks.push(result);
        }

        resolve(renderedBlocks.join('\n\n'));
      });
    });

    this._handlebars.registerHelper('tag', async (tagName) => {
      if (!currentBlock) return '';
      return await this.renderTag(currentBlock, tagName);
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
   * @param       {Object}        [settings={}]       An object of settings to override the one passed in the constructor
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
      this._registeredTemplates[`blocks.${type}`] ||
      this._registeredTemplates['blocks.default'];
    let compiledTemplateFn;

    // get template object
    const templateObj: any = await this.getTemplateObj(template);

    compiledTemplateFn = this._handlebars.compile(templateObj.content, {
      noEscape: true
    });
    const renderedTemplate = await compiledTemplateFn(blockObj);
    // return the rendered template
    return renderedTemplate;
  }

  /**
   * @name          renderTag
   * @type          Function
   * @async
   *
   * This method is the one take will render a tag using the correct block template
   * and the passed block object data
   *
   * @param       {Object}          blockObj          The object representing the block to render
   * @param       {Object}        [settings={}]       An object of settings to override the one passed in the constructor
   * @return      {String}                            The rendered block
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async renderTag(blockObj, tagName = 'default', settings = {}) {
    if (blockObj.toObject && typeof blockObj.toObject === 'function')
      blockObj = blockObj.toObject();

    const template =
      this._registeredTemplates[`tags.${tagName}`] ||
      this._registeredTemplates['tags.default'];
    let compiledTemplateFn;

    // get template object
    const templateObj: any = await this.getTemplateObj(template);

    compiledTemplateFn = this._handlebars.compile(templateObj.content, {
      noEscape: true
    });

    const renderedTemplate = await compiledTemplateFn({
      [tagName]: blockObj[tagName]
    });
    // return the rendered template
    return renderedTemplate;
  }

  /**
   * @name          getTemplateObj
   * @type          Function
   * @async
   *
   * This method take the layout url setted in the settings object and
   * resolve it to get back a full layout object with the path and the stats if we are in node context
   *
   * @param         {String}        layoutPath        The template path to get
   * @return      {ISDocblockRendererTemplateObj}                          The template object with the path and the stats if we are in node context
   *
   * @since       2.0.0
   * @author 	        Olivier Bossel <olivier.bossel@gmail.com>   (https://olivierbossel.com)
   */
  async getTemplateObj(
    layoutPath: string
  ): Promise<ISDocblockRendererTemplateObj> {
    let stats;

    if (__fs.existsSync(layoutPath)) {
    } else if (
      __fs.existsSync(`${__packageRoot()}/node_modules/${layoutPath}`)
    ) {
      layoutPath = `${__packageRoot()}/node_modules/${layoutPath}`;
    } else {
      throw new Error(
        `Sorry but the passed template url "<yellow>${layoutPath}</yellow>" does not exists...`
      );
    }
    stats = __fs.statSync(layoutPath);

    const content = __fs.readFileSync(layoutPath, 'utf8');
    const templateObj: ISDocblockRendererTemplateObj = {
      path: layoutPath,
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
   * @return      {SPromise}                          An SPromise instance that will be resolved with the rendered string once it has been fully rendered
   *
   * @since       2.0.0
   * @author 	Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  render() {
    // init the partials
    // this.registerPartials();

    return new __SPromise(
      async ({ resolve, reject }) => {
        // get the block in object format
        const blocksArray = this._docblockInstance.toObject();
        // get the first block
        const firstBlock = blocksArray[0];
        // get the layout to render
        const type =
          typeof firstBlock.type === 'string'
            ? firstBlock.type.toLowerCase()
            : 'default';
        const layout =
          this._registeredTemplates[`layouts.${type}`] ||
          this._registerTemplates['layouts.default'];

        const layoutObj = await this.getTemplateObj(layout);

        if (!layoutObj || !layoutObj.content) {
          return reject();
        }

        // render the template
        const compiledTemplateFn = this._handlebars.compile(layoutObj.content, {
          noEscape: true
        });
        const renderedLayout = await compiledTemplateFn();
        // resolve the rendering process with the rendered stack
        resolve(renderedLayout);
      },
      {
        id: 'SDocblockRendererRender'
      }
    );
  }
}

export default SDocblockRenderer;
