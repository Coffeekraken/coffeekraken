const __SSugarUiModule = require('../../ui/sugar/SSugarUiModule');
const __SFrontendServerInterface = require('./interface/SFrontendServerInterface');
const __frontend = require('../../server/frontend/frontend');
const __deepMerge = require('../../object/deepMerge');

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
          autorun: true
        },
        settings
      )
    );
    this.ready();
  }

  /**
   * @name          run
   * @type          Function
   *
   * This method is the one called by the SugarUi main class when all is ready
   * to run the modules. Take this as your kind of "launcher" function.
   *
   * @since       2.0.0
   */
  run() {
    return super.run(this._runServer(this._settings));
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
