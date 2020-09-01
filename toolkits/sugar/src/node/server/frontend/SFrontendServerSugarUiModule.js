const __SFrontendServerSugarUiModuleSettingsInterface = require('./interface/SFrontendServerSugarUiModuleSettingsInterface');
const __SSugarUiModule = require('../../ui/sugar/SSugarUiModule');
const __frontend = require('../../server/frontend/frontend');

/**
 * @name                SFrontendServerSugarUiModule
 * @namespace           node.server.frontend
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
  constructor(settings = {}) {
    // check the settings interface
    __SFrontendServerSugarUiModuleSettingsInterface.apply(settings);

    super(settings);

    this._runServer(settings);
  }

  /**
   * @name          _runServer
   * @type          Function
   * @private
   *
   * This method simply takes the settings passed to the module and launch
   * the frontend server available in sugar with these settings
   *
   * @param       {Object}      [settings={}]       The settings to pass to the frontend server
   * @return      {SPromise}                        An SPromise instance that wrap the frontend server
   *
   * @since       2.0.0
   *
   */
  _runServer(settings = {}) {
    this._server = __frontend(settings);
    return this._server;
  }
};
