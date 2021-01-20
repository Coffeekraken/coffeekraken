// @ts-nocheck

import __SSugarAppModule from '../../app/sugar/SSugarAppModule';
import __SFrontendServerInterface from './interface/SFrontendServerInterface';
import __frontend from '../../server/frontend/frontend';
import __deepMerge from '../../object/deepMerge';
import __SFrontendServerProcess from '../../server/frontend/SFrontendServerProcess';

/**
 * @name                SFrontendServerSugarAppModule
 * @namespace           sugar.node.server.frontend
 * @type                Class
 * @extends             SSugarAppModule
 * @wip
 *
 * This class represent the frontend server module for the Sugar UI.
 *
 * @param         {Object}          [settings={}]           An object of arguments passed by the SSugarUi main class
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export = class SFrontendServerSugarAppModule extends __SSugarAppModule {
  static interfaces = {
    this: __SFrontendServerInterface
  };

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
    const pro = new __SFrontendServerProcess({
      runAsChild: false,
      ...this._settings.processSettings
    });
    return super.start(pro);
  }
};
