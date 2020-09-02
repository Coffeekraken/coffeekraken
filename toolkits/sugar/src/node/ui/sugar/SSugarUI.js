const __deepMerge = require('../../object/deepMerge');
const __SPromise = require('../../promise/SPromise');
const __sugarConfig = require('../../config/sugar');
const __SSugarUiModuleConfigInterface = require('./interface/SSugarUiModuleConfigInterface');
const __isClass = require('../../is/class');
const __SError = require('../../error/SError');
const __SSugarUiModule = require('./SSugarUiModule');
const __SComponent = require('../../blessed/SComponent');

/**
 * @name            SSugarUi
 * @namespace       node.ui.sugar
 * @type            Class
 * @extends         SPromise
 *
 * This class represent the main sugar ui one. His work it to:
 * - Aggregate all the wanted modules registered through the ```sugar-ui.config.js``` file
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
 * const SSugarUi = require('@coffeekraken/sugar/node/ui/sugar/SSugarUi');
 * const sugarUi = new SSugarUi();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SSugarUi extends __SPromise {
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
    settings = __deepMerge({
      id: 'ui.sugar',
      name: 'Sugar UI'
    });

    super(null, settings).start();

    // load and check each modules
    this._loadModules(__sugarConfig('sugar-ui.modules'));

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
          return value;
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
    for (const [key, moduleObj] of Object.entries(this._modulesObjs)) {
      if (moduleObj.instance.autorun) {
        try {
          moduleObj.instance.run();
        } catch (e) {
          console.log('CCC');
        }
      }
    }
  }

  /**
   * @name            _loadModules
   * @type            Function
   * @private
   *
   * This method simply load and check all the registered modules
   * before being able to continue the process...
   *
   * @param       {Object}      modulesObj        An object of SSugarUiModuleInterface compatible modules
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

      if (moduleObj.module && moduleObj.module.slice(-3) !== '.js') {
        moduleObj.module += '.js';
      }

      // validate module interface
      __SSugarUiModuleConfigInterface.applyAndComplete(moduleObj, {
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
        ...moduleObj.settings
      };
      const moduleInstance = new moduleClass(settings);
      if (!(moduleInstance instanceof __SSugarUiModule)) {
        throw new __SError(
          `It seems that the passed class for your module "<yellow>${moduleObj.name}</yellow>" does not extends the sugar "<green>SSugarUiModule</green>" one...`
        );
      }
      moduleObj.instance = moduleInstance;

      // listen for the "ready" event from the module
      moduleInstance.on('ready', () => {
        // update module ready count
        readyModulesCount++;
        // when all the modules are loaded, call the _modulesReady method
        if (readyModulesCount >= Object.keys(modulesObj).length) {
          this._modulesReady();
        }
      });

      // add the validated module in the _modulesObjArray property
      this._modulesObjs[moduleIdx] = moduleObj;
    });
  }
};
