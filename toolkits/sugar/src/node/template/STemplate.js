const __deepMerge = require('../object/deepMerge');
const __sugarConfig = require('../config/sugar');
const __path = require('path');
const __fs = require('fs');
const __SError = require('../error/SError');
const __glob = require('glob');
const __STemplateEngine = require('./engines/STemplateEngine');
const __SPromise = require('../promise/SPromise');

/**
 * @name          STemplate
 * @namespace     sugar.node.template
 * @type          Class
 *
 * This class represent a template that can be rendered using all the supported render engines listed in the features bellow.
 *
 * @feature       2.0.0         Support for ```bladePhp``` render engine
 * @feature       2.0.0         Simply render your template using the ```render``` method that returns you back a nice SPromise instance resolved once the template has been rendered correctly
 *
 * @param       {String}        viewPathOrTemplateString      The view doted file path relative to the ```rootDir``` setting, or directly a template string to render using the engine specify in ```engine``` setting...
 * @param       {Object}        [settings={}]           An object of settings to configure your template rendering process:
 * - rootDir (@config.views.rootDir) {String}: Specify either 1 rootDir in which to search for your view, or an Array of rootDir to search in
 * - engine (null) {String|STemplateEngine}: Specify the engine to use in order to render your template. By default it will try to automatically detect the engine but you can specify it yourself. Can be a string like "blade.php" that identify a registered template engine, or directly an STemplateEngine based template engine instance
 * - engineSettings ({}) {Object}: Specify some settings that will be passed to the corresponding engine
 * - defaultData ({}) {Object}: A data object to use by default when calling the ```render``` method. Can be overrided obviously in the ```render``` method
 *
 * @example       js
 * const STemplate = require('@coffeekraken/sugar/node/template/STemplate');
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
class STemplate {
  /**
   * @name      _settings
   * @type      Object
   * @private
   *
   * Store the passed settings
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = {};

  /**
   * @name      _viewPath
   * @type      String
   * @default   null
   * @private
   *
   * Store the view doted path if the passed parameter is a valid path
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _viewPath = null;

  /**
   * @name      _templateString
   * @type      String
   * @default    null
   * @private
   *
   * Store the template string if the passed view is a template string and not a view path
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _templateString = null;

  /**
   * @name      _engineInstance
   * @type      __STemplateEngine
   * @private
   *
   * Store the engine instance used to render the passed template
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _engineInstance = null;

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
  static registerEngine(extension, enginePath) {
    if (enginePath.slice(-3) !== '.js') enginePath += '.js';
    // make sure the engine path exists
    if (!__fs.existsSync(enginePath)) {
      throw new __SError(
        `Sorry but the engine "<yellow>${extension}</yellow>" that you want to register using the path "<cyan>${enginePath}</cyan>" does not exists...`
      );
    }
    // register the engine in the stack
    STemplate.engines[extension] = enginePath;
  }

  /**
   * @name      registerDataHandler
   * @type      Function
   * @static
   *
   * This static method can be used to register a compatible __STemplateEngine engine class
   * into the available STemplate engines.
   *
   * @param       {String}        extension       The file extension to detect the engine. For example "blade.php" will be used to render all the files names "%name.blade.php"
   * @param       {String}        handlerPath      The absolute path to the engine class file
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static registerDataHandler(extension, handlerPath) {
    if (handlerPath.slice(-3) !== '.js') handlerPath += '.js';
    // make sure the engine path exists
    if (!__fs.existsSync(handlerPath)) {
      throw new __SError(
        `Sorry but the data handler "<yellow>${extension}</yellow>" that you want to register using the path "<cyan>${handlerPath}</cyan>" does not exists...`
      );
    }
    // register the engine in the stack
    STemplate.dataHandlers[extension] = handlerPath;
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
  constructor(viewPathOrTemplateString, settings = {}) {
    // save the settings
    this._settings = __deepMerge(
      {
        rootDir: [__sugarConfig('views.rootDir')],
        engine: null,
        engineSettings: {},
        defaultData: {}
      },
      settings
    );

    // if the "engine" setting is an instance, save it as engineInstance
    if (this._settings.engine instanceof __STemplateEngine) {
      this._engineInstance = this._settings.engine;
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
        for (let i = 0; i < this._settings.rootDir.length; i++) {
          const rootDir = this._settings.rootDir[i];
          const viewPath = `${rootDir}/${viewPathOrTemplateString
            .split('.')
            .join('/')}.[!data]*`;
          const matches = __glob.sync(viewPath);
          if (matches && matches.length) {
            this._viewPath = matches[0];
            const extension = this._viewPath.split('.').slice(1).join('.');
            if (!this._settings.engine) this._settings.engine = extension;
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
   * @name          render
   * @type          Function
   * @async
   *
   * Main method to render your view by passing it an object of data to use as well as an object of settings to override the default passed onces
   *
   * @param       {Object}        [data={}]       An object of data to use to render the view.
   * @param       {Object}        [settings={}]     An object of settings that will be passed to the render engine method to use to override the default onces passed in the constructor. Check the used engine render documentation
   * @return      {SPromise}                    An SPromise instance that will be resolved once the rendering process has correctly finished
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  render(data = {}, settings = {}) {
    return new __SPromise(async (resolve, reject, trigger, cancel) => {
      settings = __deepMerge(this._settings.engineSettings, settings);
      data = __deepMerge(settings.defaultData, data);

      if (this._templateString) {
        if (!this._settings.engine) {
          // loop on the engines to get the better one
          for (let i = 0; i < Object.keys(STemplate.engines).length; i++) {
            const enginePath =
              STemplate.engines[Object.keys(STemplate.engines)[i]];
            const EngineClass = require(enginePath);
            if (
              EngineClass.input === 'string' &&
              EngineClass.canRender(this._templateString)
            ) {
              this._settings.engine = Object.keys(STemplate.engines)[i];
              break;
            }
          }
        } else if (this._settings.engine instanceof __STemplateEngine) {
          if (
            !this._settings.engine.constructor.canRender(this._templateString)
          ) {
            throw new __SError(
              `It seems that you've passed directly an __STemplateEngine engine as the settings.engine option but this engine cannot render your passed template string...`
            );
          }
        }
        if (!this._settings.engine) {
          throw new __SError(
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
          `.${this._settings.engine}`,
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

      if (!this._engineInstance) {
        // get the engine class
        const EngineClass = require(STemplate.engines[this._settings.engine]);
        this._engineInstance = new EngineClass({
          ...this._settings.engineSettings
        });
      }

      const result = await this._engineInstance.render(
        this._viewPath || this._templateString,
        data,
        settings
      );

      // resolve the render process
      resolve(result);
    });
  }
}

const defaultEngines = __sugarConfig('views.engines') || {};
Object.keys(defaultEngines).forEach((extension) => {
  STemplate.registerEngine(extension, defaultEngines[extension]);
});

const defaultDataHandlers = __sugarConfig('views.dataHandlers') || {};
Object.keys(defaultDataHandlers).forEach((extension) => {
  STemplate.registerDataHandler(extension, defaultDataHandlers[extension]);
});

module.exports = STemplate;
