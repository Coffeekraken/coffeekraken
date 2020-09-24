const __SSugarUiModule = require('../../ui/sugar/SSugarUiModule');
const __SFrontendServerInterface = require('./interface/SFrontendServerInterface');
const __frontend = require('../../server/frontend/frontend');
const __deepMerge = require('../../object/deepMerge');
const __SFrontendServerProcess = require('../../server/frontend/SFrontendServerProcess');

/**
 * @name                SFrontendServerSugarUiModule
 * @namespace           sugar.node.server.frontend
 * @type                Class
 * @extends             SSugarUiModule
 *
 * This class represent the frontend server module for the Sugar UI.
 *
 * @param         {Object}          [settings={}]           An object of arguments passed by the SSugarUi main class
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
module.exports = class SFrontendServerSugarUiModule extends __SSugarUiModule {
  static interface = __SFrontendServerInterface;

  /**
   * @name            constructor
   * @type             Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author 		Olivier Bossel<olivier.bossel@gmail.com>
   */
  constructor(params = {}, settings = {}) {
    // check the settings interface
    super(
      params,
      __deepMerge(
        {
          autoRun: true
        },
        settings
      )
    );
  }

  /**
   * @name          start
   * @type          Function
   *
   * This method is the one called by the SugarUi main class when all is ready
   * to start the modules. Take this as your kind of "launcher" function.
   *
   * @since       2.0.0
   */
  start() {
    const pro = new __SFrontendServerProcess(
      this.params,
      this._settings.processSettings
    );
    return super.start(pro);
  }
};
