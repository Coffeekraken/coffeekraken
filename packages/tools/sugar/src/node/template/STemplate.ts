import __unique from '../../shared/array/unique';
import __deepMerge from '../../shared/object/deepMerge';
import __sugarConfig from '../../shared/config/sugar';
import __path from 'path';
import __fs from 'fs';
import __SError from '../../shared/error/SError';
import __glob from 'glob';
import __STemplateEngine, { ISTemplateEngine } from './engines/STemplateEngine';
import __SClass from '@coffeekraken/s-class';

import __SPromise, { ISPromise } from '@coffeekraken/s-promise';

/**
 * @name          STemplate
 * @namespace     sugar.node.template
 * @type          Class
 * @status              wip
 *
 * This class represent a template that can be rendered using all the supported render engines listed in the features bellow.
 *
 * @feature       2.0.0         Support for ```bladePhp``` render engine
 * @feature       2.0.0         Simply render your template using the ```render``` method that returns you back a nice SPromise instance resolved once the template has been rendered correctly
 *
 * @param       {String}        viewPathOrTemplateString      The view doted file path relative to the ```rootDir``` setting, or directly a template string to render using the engine specify in ```engine``` setting...
 * @param       {Object}        [settings={}]           An object of settings to configure your template rendering process:
 * - rootDir (@config.views.rootDir) {String}: Specify either 1 rootDir in which to search for your view, or an Array of rootDir to search in
 * - engine (null) {String|STemplateEngine}: Specify the engine to use in order to render your template. By default it will try to automatically detect the engine but you can specify it yourself. Can be a string like "blade.php" that identify a registered template engine, or directly an STemplateEngine based template engine instance
 * - engineSettings ({}) {Object}: Specify some settings that will be passed to the corresponding engine
 * - defaultData ({}) {Object}: A data object to use by default when calling the ```render``` method. Can be overrided obviously in the ```render``` method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import STemplate from '@coffeekraken/sugar/node/template/STemplate';
 * const myTemplate = new STemplate('my.cool.view', {
 *    title: 'Hello'
 * }, {
 *    engine: 'blade'
 * });
 * const result = await myTemplate.render({
 *    title: 'World'
 * });
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export interface ISTemplateSettings {
  rootDirs: string[];
  engine: string | ISTemplateEngine;
  engineSettings?: any;
  defaultData?: any;
}
export interface ISTemplateCtorSettings {
  template?: Partial<ISTemplateSettings>;
}

export interface ISTemplateViewInfo {
  path: string;
  relPath: string;
  type: string;
}

export interface ISTemplateEngines {
  [key: string]: ISTemplateEngine;
}

export interface ISTemplateDataHandler {
  (filePath: string): ISPromise;
}
export interface ISTemplateDataHandlers {
  [key: string]: ISTemplateDataHandler;
}

export interface ISTemplateCtor {
  engines: ISTemplateEngines;
  dataHandlers;
}

export interface ISTemplate {
  _viewPath?: string;
  _templateString?: string;
  _engineInstance?: ISTemplateEngine;
}

// @ts-ignore
class STemplate extends __SClass implements ISTemplate {
  /**
   * @name      _viewPath
   * @type      String
   * @default   undefined
   * @private
   *
   * Store the view doted path if the passed parameter is a valid path
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  private _viewPath?: string;

  /**
   * @name      _templateString
   * @type      String
   * @default    undefined
   * @private
   *
   * Store the template string if the passed view is a template string and not a view path
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  private _templateString?: string;

  /**
   * @name      _engineInstance
   * @type      __STemplateEngine
   * @default     undefined
   * @private
   *
   * Store the engine instance used to render the passed template
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  private _engineInstance?: ISTemplateEngine;

  /**
   * @name       engines
   * @type      Object
   * @static
   *
   * Store the registered engines using the ```registerEngine``` static method
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static engines = {};

  /**
   * @name       dataHandlers
   * @type      Object
   * @static
   *
   * Store the registered dataHandlers using the ```registerDataHandler``` static method
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static dataHandlers = {};

  /**
   * @name      defaultRootDirs
   * @type      Array
   * @static
   *
   * This static property store the default root directories where the class
   * will search for views to render
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static defaultRootDirs: string[] = [
    __sugarConfig('views.rootDir'),
    __path.resolve(__dirname, '../../php/views/blade')
  ];

  /**
   * @name      getRootDirs
   * @type      Function
   * @static
   *
   * This function accept an array of root directories
   * and return the final array with the default root directories
   * added correctly
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static getRootDirs(rootDirs = []): string[] {
    return __unique([
      ...(Array.isArray(rootDirs) ? rootDirs : [rootDirs]),
      ...STemplate.defaultRootDirs
    ]);
  }

  /**
   * @name      registerEngine
   * @type      Function
   * @static
   *
   * This static method can be used to register a compatible __STemplateEngine engine class
   * into the available STemplate engines.
   *
   * @param       {String}        extension       The file extension to detect the engine. For example "blade.php" will be used to render all the files names "%name.blade.php"
   * @param       {String}        enginePath      The absolute path to the engine class file
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static registerEngine(enginePath: string): void {
    if (!enginePath.match(/\.js$/)) enginePath += '.js';
    // make sure the engine path exists
    if (!__fs.existsSync(enginePath)) {
      throw new __SError(
        `Sorry but the engine "<yellow>${enginePath}</yellow>" that you want to register does not exists...`
      );
    }
    // get the engine class
    let EngineClass = require(enginePath);
    EngineClass = EngineClass.default || EngineClass;
    // make sure we have names defined
    if (
      !EngineClass.names ||
      !Array.isArray(EngineClass.names) ||
      !EngineClass.names.length
    ) {
      throw new Error(
        `You try to register an STemplate engine with the class "<yellow>${EngineClass.name}</yellow>" but you forgot to specify the static property "<cyan>names</cyan>" with something like "<green>['twig.js','twig']</green>"...`
      );
    }
    // register the engine under each names
    EngineClass.names.forEach((name) => {
      // register the engine in the stack
      STemplate.engines[name] = EngineClass;
    });
  }

  /**
   * @name      registerDataHandler
   * @type      Function
   * @static
   *
   * This static method can be used to register a compatible __STemplateEngine engine class
   * into the available STemplate engines.
   *
   * @param       {String}        handlerPath      The absolute path to the engine class file
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static registerDataHandler(handlerPath: string): void {
    if (handlerPath.slice(-3) !== '.js') handlerPath += '.js';
    // make sure the engine path exists
    if (!__fs.existsSync(handlerPath)) {
      throw new __SError(
        `Sorry but the data handler "<yellow>${handlerPath}</yellow>" that you want to register does not exists...`
      );
    }
    // get the engine class
    const HandlerClass = require(handlerPath).default;
    // make sure we have extensions defined
    if (
      !HandlerClass.extensions ||
      !Array.isArray(HandlerClass.extensions) ||
      !HandlerClass.extensions.length
    ) {
      throw new Error(
        `You try to register an STemplate data handler with the class "<yellow>${HandlerClass.name}</yellow>" but you forgot to specify the property "<cyan>extensions</cyan>" with something like "<green>['json','js']</green>"...`
      );
    }
    // register the engine under each names
    HandlerClass.extensions.forEach((extension) => {
      // register the engine in the stack
      STemplate.dataHandlers[extension] = HandlerClass;
    });
  }

  /**
   * @name					getViewInfo
   * @type 					Function
   * @static
   *
   * This static method allows you to give a "potential" view path (with or without the extension) and get
   * back an object that describe the view with infos like "type", "path", "extension", etc...
   * If nothing is found, you will get ```false``` back.
   *
   * @param       {String}      viewPath        The view path to check. Either a relative path to the @config.frontend.viewsDir configuration, or an absolute path
   * @return      {Object|Boolean}              Return an object describing the view or ```false``` if not found
   *
   * @since
   * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static getViewInfo(viewPath: string): ISTemplateViewInfo | false {
    const viewsDir = __sugarConfig('views.rootDir');

    let path = `${viewsDir}/${viewPath}`;
    if (__path.isAbsolute(viewPath)) {
      path = viewPath;
    }

    let finalViewPath, viewType;

    if (__fs.existsSync(path)) {
      finalViewPath = path;
      const fileName = path.split('/').slice(-1).join('');
      viewType = fileName.split('.').slice(1).join('.');
    } else {
      for (let i = 0; i < Object.keys(STemplate.engines).length; i++) {
        const engineExt = Object.keys(STemplate.engines)[i];
        if (__fs.existsSync(`${path}.${engineExt}`)) {
          finalViewPath = `${path}.${engineExt}`;
          viewType = engineExt;
          break;
        }
      }
    }

    // check if we have a view founded
    if (!finalViewPath) return false;

    // build the info object
    const infoObj = {
      path: finalViewPath,
      relPath: __path.relative(viewsDir, finalViewPath),
      type: viewType
    };

    // return the infos
    return infoObj;
  }

  /**
   * @name      templateSettings
   * @type      ISTemplateSettings
   * @get
   *
   * Access the template settings
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get templateSettings(): ISTemplateSettings {
    return (<any>this)._settings.template;
  }

  /**
   * @name      constructor
   * @type      Function
   * @constructor
   *
   * Constructor
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(viewPathOrTemplateString, settings?: ISTemplateCtorSettings) {
    // save the settings
    super(
      __deepMerge(
        {
          id: 'STemplate',
          template: {
            rootDirs: [],
            engine: null,
            engineSettings: {},
            defaultData: {}
          }
        },
        settings || {}
      )
    );
    this.templateSettings.rootDirs = (<any>this.constructor).getRootDirs(
      this.templateSettings.rootDirs || []
    );

    Object.keys(STemplate.engines).forEach((ext) => {
      viewPathOrTemplateString = viewPathOrTemplateString.replace(
        `.${ext}`,
        ''
      );
    });

    // if the "engine" setting is an instance, save it as engineInstance
    if (
      typeof this.templateSettings.engine !== 'string' &&
      this.templateSettings.engine instanceof __STemplateEngine
    ) {
      this._engineInstance = this.templateSettings.engine;
    }

    // detect and save the view doted path or the view template string
    if (
      viewPathOrTemplateString.split(' ').length === 1 &&
      viewPathOrTemplateString.trim() === viewPathOrTemplateString
    ) {
      // check if we can find the view path passed
      if (__path.isAbsolute(viewPathOrTemplateString)) {
        if (!__fs.existsSync(viewPathOrTemplateString)) {
          throw new __SError(
            `Sorry but the absolute path to the view "<cyan>${viewPathOrTemplateString}</cyan>" does not exist...`
          );
        }
        this._viewPath = viewPathOrTemplateString;
      } else if (!viewPathOrTemplateString.match(/\//gm)) {
        // doted path
        for (let i = 0; i < this.templateSettings.rootDirs.length; i++) {
          const rootDir = this.templateSettings.rootDirs[i];
          const viewPath = `${rootDir}/${viewPathOrTemplateString
            .split('.')
            .join('/')}.[!data]*`;
          const matches = __glob.sync(viewPath);
          if (matches && matches.length) {
            this._viewPath = matches[0];
            const extension = this._viewPath.split('.').slice(1).join('.');
            if (!this.templateSettings.engine)
              this.templateSettings.engine = extension;
            break;
          }
        }
        if (!this._viewPath) {
          throw new __SError(
            `Sorry but the passed dot path "<cyan>${viewPathOrTemplateString}</cyan>" does not resolve to any existing views...`
          );
        }
      } else {
      }
    } else {
      this._templateString = viewPathOrTemplateString;
    }
  }

  /**
   * @name          _getEngineByName
   * @type          Function
   * @private
   *
   * This method take an engine name and tries to returns you the engine instance
   * registered in the stack
   *
   * @param     {String}    name    The engine name wanted
   * @return    {STemplateEngine|undefined}     The engine class or undefined
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  private _getEngineByName(name: string): ISTemplateEngine | undefined {
    if (STemplate.engines[name] !== undefined) return STemplate.engines[name];
    else if (name.includes('.')) {
      const engineName = name.split('.')[0];
      if (STemplate.engines[engineName]) return STemplate.engines[engineName];
    }
    return undefined;
  }

  /**
   * @name          render
   * @type          Function
   * @async
   *
   * Main method to render your view by passing it an object of data to use as well as an object of settings to override the default passed onces
   *
   * @param       {Object}        [data={}]       An object of data to use to render the view.
   * @param       {Object}        [settings={}]     An object of settings that will be passed to the render engine method to use to override the default onces passed in the constructor. Check the used engine render documentation
   * @return      {SPromise}                    An SPromise instance that will be resolved once the rendering process has correctly finished
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  render(data = {}, settings?: Partial<ISTemplateSettings>) {
    return new __SPromise(
      async ({ resolve, reject, emit }) => {
        const renderSettings = <ISTemplateSettings>(
          __deepMerge(this.templateSettings, settings || {})
        );
        data = __deepMerge(renderSettings.defaultData, data);
        if (this._templateString) {
          if (!renderSettings.engine) {
            // loop on the engines to get the better one
            for (let i = 0; i < Object.keys(STemplate.engines).length; i++) {
              const enginePath =
                STemplate.engines[Object.keys(STemplate.engines)[i]];
              let EngineClass = require(enginePath);
              EngineClass = EngineClass.default || EngineClass;
              if (
                EngineClass.input === 'string' &&
                EngineClass.canRender(this._templateString)
              ) {
                renderSettings.engine = Object.keys(STemplate.engines)[i];
                break;
              }
            }
          } else if (<any>renderSettings.engine instanceof __STemplateEngine) {
            if (
              !(<any>renderSettings.engine).constructor.canRender(
                this._templateString
              )
            ) {
              return reject(
                `It seems that you've passed directly an __STemplateEngine engine as the settings.engine option but this engine cannot render your passed template string...`
              );
            }
          }
          if (!renderSettings.engine) {
            return reject(
              `Sorry but it seems that the passed template string cannot be rendered using any of the available engines:\n- ${Object.keys(
                STemplate.engines
              )
                .map((l) => {
                  return `<yellow>${l}</yellow>`;
                })
                .join('\n- ')}`
            );
          }
        } else if (this._viewPath) {
          const viewPathWithoutExtension = this._viewPath.replace(
            `.${renderSettings.engine}`,
            ''
          );

          // loop on each dataHandlers available
          let dataHandlerFn, dataFilePath;
          Object.keys(STemplate.dataHandlers).forEach((extension) => {
            if (dataHandlerFn) return;
            if (__fs.existsSync(`${viewPathWithoutExtension}.${extension}`)) {
              dataFilePath = `${viewPathWithoutExtension}.${extension}`;
              dataHandlerFn = require(STemplate.dataHandlers[extension]);
            }
          });

          // check if we have a data file
          if (dataFilePath && dataHandlerFn) {
            const dataObj = await dataHandlerFn(dataFilePath);
            data = __deepMerge(dataObj, data);
          }
        }

        if (
          !this._engineInstance &&
          typeof renderSettings.engine === 'string'
        ) {
          // get the engine class
          const EngineClass = this._getEngineByName(renderSettings.engine);
          if (EngineClass) {
            this._engineInstance = new EngineClass(
              renderSettings.engineSettings || {}
            );
          }
        }

        if (this._engineInstance) {
          const renderPromise = this._engineInstance.render(
            this._viewPath || this._templateString || '',
            data,
            renderSettings
          );
          const result = await renderPromise;

          if (renderPromise.isRejected()) {
            return reject({
              view: this._viewPath,
              engine: renderSettings.engine,
              content: '0cc'
            });
          }

          // resolve the render process
          resolve({
            view: this._viewPath,
            engine: renderSettings.engine,
            content: result
          });
        }
      },
      {
        id: this.metas.id + '.render'
      }
    );
  }
}

const defaultEngines = __sugarConfig('views.engines') || {};
Object.keys(defaultEngines).forEach((name) => {
  STemplate.registerEngine(defaultEngines[name]);
});

const defaultDataHandlers = __sugarConfig('views.dataHandlers') || {};
Object.keys(defaultDataHandlers).forEach((name) => {
  STemplate.registerDataHandler(defaultDataHandlers[name]);
});

const cls: ISTemplateCtor = STemplate;

export default STemplate;
