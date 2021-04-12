import __unique from '@coffeekraken/sugar/shared/array/unique';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __sugarConfig from '@coffeekraken/sugar/shared/config/sugar';
import __path from 'path';
import __fs from 'fs';
import __glob from 'glob';
import __SViewEngine, {
  ISViewEngine,
  ISViewEngineMetas
} from './engines/SViewEngine';
import __SClass from '@coffeekraken/s-class';
import __SDuration, { ISDurationObject } from '@coffeekraken/s-duration';

import __SPromise, { ISPromise } from '@coffeekraken/s-promise';

/**
 * @name          SViews
 * @namespace     sugar.node.template
 * @type          Class
 * @status              wip
 *
 * This class represent a template that can be rendered using all the supported render engines listed in the features bellow.
 *
 * @feature       2.0.0         Support for ```bladePhp``` render engine
 * @feature       2.0.0         Simply render your template using the ```render``` method that returns you back a nice SPromise instance resolved once the template has been rendered correctly
 *
 * @param       {String}        viewPathOrViewString      The view doted file path relative to the ```rootDir``` setting, or directly a template string to render using the engine specify in ```engine``` setting...
 * @param       {Object}        [settings={}]           An object of settings to configure your template rendering process:
 * - rootDir (@config.views.rootDir) {String}: Specify either 1 rootDir in which to search for your view, or an Array of rootDir to search in
 * - engine (null) {String|SViewsEngine}: Specify the engine to use in order to render your template. By default it will try to automatically detect the engine but you can specify it yourself. Can be a string like "blade.php" that identify a registered template engine, or directly an SViewsEngine based template engine instance
 * - engineSettings ({}) {Object}: Specify some settings that will be passed to the corresponding engine
 * - defaultData ({}) {Object}: A data object to use by default when calling the ```render``` method. Can be overrided obviously in the ```render``` method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import SViews from '@coffeekraken/sugar/node/template/SViews';
 * const myTemplate = new SViews('my.cool.view', {
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
export interface ISViewSettings {
  rootDirs: string[];
  cacheDir: string;
  engine: string | ISViewEngine;
  engineSettings?: any;
  defaultData?: any;
}
export interface ISViewCtorSettings {
  view?: Partial<ISViewSettings>;
}

export interface ISViewViewMetas {
  path: string;
  relPath: string;
  type: string;
}

export interface ISViewEngines {
  [key: string]: ISViewEngine;
}

export interface ISViewDataHandler {
  (filePath: string): ISPromise;
}
export interface ISViewDataHandlers {
  [key: string]: ISViewDataHandler;
}

export interface ISViewRenderResult extends ISDurationObject {
  engine: ISViewEngineMetas;
  view: ISViewViewMetas;
  value: string;
}

export interface ISView {
  _viewPath?: string;
  _viewString?: string;
  _engineInstance?: ISViewEngine;
}

// @ts-ignore
class SView extends __SClass implements ISView {
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
   * @name      _viewString
   * @type      String
   * @default    undefined
   * @private
   *
   * Store the template string if the passed view is a template string and not a view path
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  private _viewString?: string;

  /**
   * @name      _engineInstance
   * @type      __SViewEngine
   * @default     undefined
   * @private
   *
   * Store the engine instance used to render the passed template
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  private _engineInstance?: ISViewEngine;

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
    ...__sugarConfig('views.rootDirs'),
    __path.resolve(__dirname, '../php/views/blade')
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
      ...SView.defaultRootDirs
    ]);
  }

  /**
   * @name      render
   * @type      Function
   * @static
   *
   * This static method allows you to render quickly a passed view
   *
   * @param     {String}    viewPath      The doted view path relative to the views.rootDir config
   * @param     {Any}         [data=null
   *
   * @since       2.0.0
   */
  static render(
    viewPath: string,
    data: any = null,
    settings: Partial<ISViewCtorSettings>
  ) {
    return new __SPromise(async ({ resolve, reject }) => {
      const viewInstance = new SView(
        viewPath,
        __deepMerge(
          {
            view: {}
          },
          settings ?? {}
        )
      );
      let resultObj;
      try {
        resultObj = await viewInstance.render(data, settings?.view ?? {});
        resultObj.status = 200;
        return resolve({
          ...resultObj
        });
      } catch (e) {
        const errorViewInstance = new SView('pages.501', {
          ...settings
        });
        resultObj = await errorViewInstance.render(
          {
            ...data,
            error: e
          },
          settings?.view ?? {}
        );
        resultObj.status = 501;
        return reject({
          ...resultObj
        });
      }
    });
  }

  /**
   * @name      registerEngine
   * @type      Function
   * @static
   *
   * This static method can be used to register a compatible __SViewEngine engine class
   * into the available SViews engines.
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
      throw new Error(
        `Sorry but the engine "<yellow>${enginePath}</yellow>" that you want to register does not exists...`
      );
    }
    // get the engine class
    let EngineClass = require(enginePath); // eslint-disable-line
    EngineClass = EngineClass.default || EngineClass;
    // make sure we have names defined
    if (
      !EngineClass.names ||
      !Array.isArray(EngineClass.names) ||
      !EngineClass.names.length
    ) {
      throw new Error(
        `You try to register an SViews engine with the class "<yellow>${EngineClass.name}</yellow>" but you forgot to specify the static property "<cyan>names</cyan>" with something like "<green>['twig.js','twig']</green>"...`
      );
    }
    // register the engine under each names
    EngineClass.names.forEach((name) => {
      // register the engine in the stack
      SView.engines[name] = EngineClass;
    });
  }

  /**
   * @name      registerDataHandler
   * @type      Function
   * @static
   *
   * This static method can be used to register a compatible __SViewEngine engine class
   * into the available SViews engines.
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
      throw new Error(
        `Sorry but the data handler "<yellow>${handlerPath}</yellow>" that you want to register does not exists...`
      );
    }
    // get the engine class
    const HandlerClass = require(handlerPath).default; // eslint-disable-line
    // make sure we have extensions defined
    if (
      !HandlerClass.extensions ||
      !Array.isArray(HandlerClass.extensions) ||
      !HandlerClass.extensions.length
    ) {
      throw new Error(
        `You try to register an SViews data handler with the class "<yellow>${HandlerClass.name}</yellow>" but you forgot to specify the property "<cyan>extensions</cyan>" with something like "<green>['json','js']</green>"...`
      );
    }
    // register the engine under each names
    HandlerClass.extensions.forEach((extension) => {
      // register the engine in the stack
      SView.dataHandlers[extension] = HandlerClass;
    });
  }

  /**
   * @name					getViewMetas
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
  static getViewMetas(viewPath: string): ISViewViewMetas | undefined {
    const viewsDirs = __sugarConfig('views.rootDirs');

    for (let i = 0; i < viewsDirs.length; i++) {
      const viewsDir = viewsDirs[i];

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
        for (let i = 0; i < Object.keys(SView.engines).length; i++) {
          const engineExt = Object.keys(SView.engines)[i];
          if (__fs.existsSync(`${path}.${engineExt}`)) {
            finalViewPath = `${path}.${engineExt}`;
            viewType = engineExt;
            break;
          }
        }
      }

      // check if we have a view founded
      if (!finalViewPath) continue;

      // build the info object
      const infoObj = {
        path: finalViewPath,
        relPath: __path.relative(viewsDir, finalViewPath),
        type: viewType
      };

      // return the infos
      return infoObj;
    }

    return undefined;
  }

  /**
   * @name      viewSettings
   * @type      ISViewSettings
   * @get
   *
   * Access the template settings
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get viewSettings(): ISViewSettings {
    return (<any>this)._settings.view;
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
  constructor(viewPathOrViewString, settings?: ISViewCtorSettings) {
    // save the settings
    super(
      __deepMerge(
        {
          view: {
            rootDirs: __sugarConfig('views.rootDirs'),
            cacheDir: __sugarConfig('views.cacheDir'),
            engine: null,
            engineSettings: {},
            defaultData: {}
          }
        },
        settings || {}
      )
    );
    this.viewSettings.rootDirs = (<any>this.constructor).getRootDirs(
      this.viewSettings.rootDirs || []
    );

    Object.keys(SView.engines).forEach((ext) => {
      viewPathOrViewString = viewPathOrViewString.replace(`.${ext}`, '');
    });

    // if the "engine" setting is an instance, save it as engineInstance
    if (
      typeof this.viewSettings.engine !== 'string' &&
      this.viewSettings.engine instanceof __SViewEngine
    ) {
      this._engineInstance = this.viewSettings.engine;
    }

    // detect and save the view doted path or the view template string
    if (
      viewPathOrViewString.split(' ').length === 1 &&
      viewPathOrViewString.trim() === viewPathOrViewString
    ) {
      // check if we can find the view path passed
      if (__path.isAbsolute(viewPathOrViewString)) {
        if (!__fs.existsSync(viewPathOrViewString)) {
          throw new Error(
            `Sorry but the absolute path to the view "<cyan>${viewPathOrViewString}</cyan>" does not exist...`
          );
        }
        this._viewPath = viewPathOrViewString;
      } else if (!viewPathOrViewString.match(/\//gm)) {
        // doted path
        for (let i = 0; i < this.viewSettings.rootDirs.length; i++) {
          const rootDir = this.viewSettings.rootDirs[i];
          const viewPath = `${rootDir}/${viewPathOrViewString
            .split('.')
            .join('/')}.[!data]*`;
          const matches = __glob.sync(viewPath);
          if (matches && matches.length) {
            this._viewPath = matches[0];
            const extension = this._viewPath.split('.').slice(1).join('.');
            if (!this.viewSettings.engine) this.viewSettings.engine = extension;
            break;
          }
        }
        if (!this._viewPath) {
          throw new Error(
            `Sorry but the passed dot path "<cyan>${viewPathOrViewString}</cyan>" does not resolve to any existing views...`
          );
        }
      } else {
      }
    } else {
      this._viewString = viewPathOrViewString;
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
   * @return    {SViewsEngine|undefined}     The engine class or undefined
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  private _getEngineByName(name: string): ISViewEngine | undefined {
    if (SView.engines[name] !== undefined) return SView.engines[name];
    else if (name.includes('.')) {
      const engineName = name.split('.')[0];
      if (SView.engines[engineName]) return SView.engines[engineName];
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
  render(
    data = {},
    settings?: Partial<ISViewSettings>
  ): Promise<ISViewRenderResult> {
    return new __SPromise(async ({ resolve, reject }) => {
      const renderSettings = <ISViewSettings>(
        __deepMerge(this.viewSettings, settings || {})
      );
      data = __deepMerge(renderSettings.defaultData, data);

      const duration = new __SDuration();

      if (this._viewString) {
        if (!renderSettings.engine) {
          // loop on the engines to get the better one
          for (let i = 0; i < Object.keys(SView.engines).length; i++) {
            const enginePath = SView.engines[Object.keys(SView.engines)[i]];
            let EngineClass = require(enginePath); // eslint-disable-line
            EngineClass = EngineClass.default || EngineClass;
            if (
              EngineClass.input === 'string' &&
              EngineClass.canRender(this._viewString)
            ) {
              renderSettings.engine = Object.keys(SView.engines)[i];
              break;
            }
          }
        } else if (<any>renderSettings.engine instanceof __SViewEngine) {
          if (
            !(<any>renderSettings.engine).constructor.canRender(
              this._viewString
            )
          ) {
            return reject(
              `It seems that you've passed directly an SViewEngine engine as the settings.engine option but this engine cannot render your passed template string...`
            );
          }
        }
        if (!renderSettings.engine) {
          return reject(
            `Sorry but it seems that the passed template string cannot be rendered using any of the available engines:\n- ${Object.keys(
              SView.engines
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
        Object.keys(SView.dataHandlers).forEach((extension) => {
          if (dataHandlerFn) return;
          if (__fs.existsSync(`${viewPathWithoutExtension}.${extension}`)) {
            dataFilePath = `${viewPathWithoutExtension}.${extension}`;
            dataHandlerFn = require(SView.dataHandlers[extension]);
          }
        });

        // check if we have a data file
        if (dataFilePath && dataHandlerFn) {
          const dataObj = await dataHandlerFn(dataFilePath);
          data = __deepMerge(dataObj, data);
        }
      }

      if (!this._engineInstance && typeof renderSettings.engine === 'string') {
        // get the engine class
        const EngineClass = this._getEngineByName(renderSettings.engine);
        if (EngineClass) {
          this._engineInstance = new EngineClass({
            viewEngine: {
              rootDirs: [...(this.viewSettings.rootDirs ?? [])],
              cacheDir: this.viewSettings.cacheDir
            }
          });
        }
      }

      if (this._engineInstance) {
        const renderPromise = this._engineInstance.render(
          this._viewPath || this._viewString || '',
          data,
          renderSettings
        );
        const result = await renderPromise;

        if (renderPromise.isRejected()) {
          const resObj: Partial<ISViewRenderResult> = {
            engine: this._engineInstance.engineMetas,
            ...duration.end()
          };
          if (this._viewPath) {
            resObj.view = SView.getViewMetas(this._viewPath);
          }
          return reject(resObj);
        }

        // resolve the render process
        const resObj: Partial<ISViewRenderResult> = {
          engine: this._engineInstance.engineMetas,
          ...duration.end(),
          value: result
        };
        if (this._viewPath) {
          resObj.view = SView.getViewMetas(this._viewPath);
        }
        resolve(resObj);
      }
    });
  }
}

const defaultEngines = __sugarConfig('views.engines') || {};
Object.keys(defaultEngines).forEach((name) => {
  SView.registerEngine(defaultEngines[name]);
});

const defaultDataHandlers = __sugarConfig('views.dataHandlers') || {};
Object.keys(defaultDataHandlers).forEach((name) => {
  SView.registerDataHandler(defaultDataHandlers[name]);
});

export default SView;
