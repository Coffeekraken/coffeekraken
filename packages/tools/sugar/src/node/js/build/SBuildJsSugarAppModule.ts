// @ts-nocheck

import __SSugarAppModule from '../../app/sugar/SSugarAppModule';
import __SBuildJsInterface from './interface/SBuildJsInterface';
import __deepMerge from '../../object/deepMerge';
import __SBuildJsProcess from './SBuildJsProcess';

/**
 * @name                SBuildJsSugarAppModule
 * @namespace           sugar.node.build.js
 * @type                Class
 * @extends             SSugarAppModule
 * @wip
 *
 * This class represent the build JS module for the Sugar App.
 *
 * @param         {Object}          [settings={}]           An object of arguments passed by the SSugarUi main class
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export = class SBuildJsSugarAppModule extends __SSugarAppModule {
  static interfaces = {
    this: __SBuildJsInterface
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
    super(params, __deepMerge({}, settings));
  }

  /**
   * @name          start
   * @type          Function
   *
   * This method is the one called by the SugarUi main class when all is ready
   * to run the modules. Take this as your kind of "launcher" function.
   *
   * @since       2.0.0
   */
  start() {
    const pro = new __SBuildJsProcess(
      this.params,
      this._settings.processSettings
    );
    return super.start(pro);
  }
};
