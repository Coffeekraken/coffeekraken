// @ts-nocheck

import __SSugarAppModule from './SSugarAppModule';
import __deepMerge from '../../object/deepMerge';

/**
 * @name                SSugarAppProcessModule
 * @namespace           sugar.node.app.sugar
 * @type                Class
 * @extends             SSugarAppModule
 * @wip
 *
 * This class represent the simple process module for the Sugar UI.
 *
 * @param         {Object}          [settings={}]           An object of arguments passed by the SSugarUi main class
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export = class SSugarAppProcessModule extends __SSugarAppModule {
  // static interface = __SFrontendServerInterface;

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
    super(params, __deepMerge(settings));
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
    const ProcessClass = require(this.params.processPath);
    const pro = new ProcessClass({
      ...this._settings.processSettings
    });
    return super.start(pro);
  }
};
