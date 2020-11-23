import __SSugarAppModule from '../../app/sugar/SSugarAppModule';
import __SBuildJsInterface from './interface/SBuildJsInterface';
import __deepMerge from '../../object/deepMerge';
import __SBuildJsProcess from './SBuildJsProcess';

/**
 * @name                SBuildJsSugarAppModule
 * @namespace           sugar.node.build.js
 * @type                Class
 * @extends             SSugarAppModule
 *
 * This class represent the build JS module for the Sugar App.
 *
 * @param         {Object}          [settings={}]           An object of arguments passed by the SSugarUi main class
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default class SBuildJsSugarAppModule extends __SSugarAppModule {
  static interface = __SBuildJsInterface;

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
}
