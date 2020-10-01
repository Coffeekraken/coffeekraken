const __deepMerge = require('../../object/deepMerge');
const __SPromise = require('../../promise/SPromise');
const __sugarConfig = require('../../config/sugar');
const __SSugarAppModuleConfigInterface = require('./interface/SSugarAppModuleConfigInterface');
const __isClass = require('../../is/class');
const __SError = require('../../error/SError');
const __SSugarAppModule = require('./SSugarAppModule');

/**
 * @name            SSugarApp
 * @namespace       sugar.node.ui.sugar
 * @type            Class
 * @extends         SPromise
 *
 * This class represent the main sugar ui one. His work it to:
 * - Aggregate all the wanted modules registered through the ```sugar-app.config.js``` file
 * - Instantiate all the modules like frontend server, build scss, etc...
 * - Configure the frontend server to serve all the needed files like js or css ones, etc...
 * - Open a socket connection to allow the front modules parts to talk with the back parts easily
 *
 * @todo        Complete the documentation
 *
 * @param       {Object}              [settings={}]           An object of settings to configure your sugar ui:
 * -
 *
 * @example         js
 * const SSugarApp = require('@coffeekraken/sugar/node/ui/sugar/SSugarApp');
 * const sugarUi = new SSugarApp();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SSugarApp extends __SPromise {
  /**
   * @name              _modulesObjs
   * @type              Object<Object>
   * @private
   *
   * Store the registered modules objects
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _modulesObjs = {};

  /**
   * @name              _modulesInError
   * @type              Array<SSugarAppModule>
   * @private
   *
   * Store all the modules that are in error
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _modulesInError = [];

  /**
   * @name          state
   * @type          String
   * @values        loading,ready,running,error
   * @default       loading
   *
   * Store the module state
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _state = 'loading';
  get state() {
    return this._state;
  }
  set state(value) {
    this._setState(value);
  }
  _setState(value) {
    if (['loading', 'ready', 'error'].indexOf(value) === -1) {
      throw new __SError(
        `Sorry but the "<yellow>state</yellow>" property setted to "<magenta>${__toString(
          value
        )}</magenta>" of your "<cyan>${
          this.constructor.name
        }</cyan>" class can contain only one of these values: ${[
          'loading',
          'ready',
          'error'
        ]
          .map((i) => {
            return `"<green>${i}</green>"`;
          })
          .join(', ')}`
      );
    }

    // trigger an event
    this.trigger('state', value);
    this._state = value;
  }

  /**
   * @name              constructor
   * @type              Function
   * @constructor
   *
   * Constructor
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    settings = __deepMerge(
      {
        id: 'sugar.app',
        name: 'Sugar App'
      },
      settings
    );

    super(settings);

    // load and check each modules
    this._loadModules(__sugarConfig('sugar-app.modules'));

    // Pipe all the modules "events"
    Object.keys(this._modulesObjs).forEach((moduleIdx) => {
      const moduleObj = this._modulesObjs[moduleIdx];
      __SPromise.pipe(moduleObj.instance, this, {
        processor: (value, metas) => {
          if (typeof value === 'object') {
            value.module = {
              id: moduleObj.id,
              name: moduleObj.name,
              idx: moduleIdx
            };
          } else {
            value = {
              module: {
                id: moduleObj.id,
                name: moduleObj.name,
                idx: moduleIdx
              },
              value
            };
          }
          metas.stack = `module.${metas.stack}`;

          return [value, metas];
        }
      });
    });
  }

  /**
   * @name            _modulesReady
   * @type            Function
   * @private
   *
   * This method is called once all the modules are flagged as ready
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _modulesReady() {
    setTimeout(() => {
      for (const [key, moduleObj] of Object.entries(this._modulesObjs)) {
        if (moduleObj.instance.autorun) {
          moduleObj.instance.run();
        }
      }
      this.state = 'ready';
    }, 20);
  }

  /**
   * @name            _modulesError
   * @type            Function
   * @private
   *
   * This method is called once a module is flagged as in error
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _modulesError() {
    this.state = 'error';
  }

  /**
   * @name            _loadModules
   * @type            Function
   * @private
   *
   * This method simply load and check all the registered modules
   * before being able to continue the process...
   *
   * @param       {Object}      modulesObj        An object of SSugarAppModuleInterface compatible modules
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _loadModules(modulesObj) {
    // track how many modules are ready
    let readyModulesCount = 0;
    // loop on all registered modules
    Object.keys(modulesObj).forEach((moduleIdx) => {
      const moduleObj = modulesObj[moduleIdx];

      // stop here if a module has error...
      if (this._modulesInError.length) return;

      if (moduleObj.module && moduleObj.module.slice(-3) !== '.js') {
        moduleObj.module += '.js';
      }

      // validate module interface
      __SSugarAppModuleConfigInterface.applyAndComplete(moduleObj, {
        name: `${this.constructor.name}.modules.${moduleIdx}`
      });

      // require and instanciate the module class
      const moduleClass = require(moduleObj.module);
      if (!__isClass(moduleClass)) {
        throw new __SError(
          `The passed module file "<cyan>${moduleObj.module}</cyan>" does not export a <green>proper Class</green> for the module "<yellow>${moduleObj.name}</yellow>"...`
        );
      }
      const settings = {
        id: moduleObj.id,
        name: moduleObj.name,
        shortcuts: moduleObj.shortcuts
      };

      const moduleInstance = new moduleClass(moduleObj.params, settings);
      if (!(moduleInstance instanceof __SSugarAppModule)) {
        throw new __SError(
          `It seems that the passed class for your module "<yellow>${moduleObj.name}</yellow>" does not extends the sugar "<green>SSugarAppModule</green>" one...`
        );
      }
      moduleObj.instance = moduleInstance;

      moduleInstance.on('state', (state, metas) => {
        if (state === 'ready') {
          if (this._modulesInError.indexOf(moduleObj) !== -1) return;
          // update module ready count
          readyModulesCount++;
          // when all the modules are loaded, call the _modulesReady method
          if (readyModulesCount >= Object.keys(modulesObj).length) {
            this._modulesReady();
          }
        } else if (state === 'error') {
          // add the module in the error modules stack
          this._modulesInError.push(moduleObj);
          this._modulesError();
        }
      });

      // add the validated module in the _modulesObjArray property
      this._modulesObjs[moduleIdx] = moduleObj;
    });
  }
};
