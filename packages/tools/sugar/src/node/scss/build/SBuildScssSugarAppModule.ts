// @ts-nocheck

import __SSugarAppModule from '../../app/sugar/SSugarAppModule';
import __SBuildScssInterface from './interface/SBuildScssInterface';
import __deepMerge from '../../object/deepMerge';
import __SBuildScssCli from './SBuildScssCli';
import __SBuildScssProcess from './SBuildScssProcess';

/**
 * @name                SBuildScssSugarAppModule
 * @namespace           sugar.node.build.scss
 * @type                Class
 * @extends             SSugarAppModule
 * @wip
 *
 * This class represent the build SCSS module for the Sugar UI.
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
export = class SBuildScssSugarAppModule extends __SSugarAppModule {
  static interfaces = {
    this: __SBuildScssInterface
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
   * to start the modules. Take this as your kind of "launcher" function.
   *
   * @since       2.0.0
   */
  start() {
    const pro = new __SBuildScssProcess(
      this.params,
      this._settings.processSettings
    );
    return super.start(pro);
  }
};
