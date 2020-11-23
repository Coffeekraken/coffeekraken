import __SSugarAppModule from '../../app/sugar/SSugarAppModule';
import __SBuildFrontspecInterface from './interface/SBuildFrontspecInterface';
import __deepMerge from '../../object/deepMerge';
import __SBuildFrontspecProcess from './SBuildFrontspecProcess';

/**
 * @name                SBuildFrontspecSugarAppModule
 * @namespace           sugar.node.build.scss
 * @type                Class
 * @extends             SSugarAppModule
 *
 * This class represent the build SCSS module for the Sugar UI.
 *
 * @param         {Object}          [settings={}]           An object of arguments passed by the SSugarUi main class
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default class SBuildFrontspecSugarAppModule extends __SSugarAppModule {
  static interface = __SBuildFrontspecInterface;

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
    const pro = new __SBuildFrontspecProcess(
      this.params,
      this._settings.processSettings
    );
    return super.start(pro);
  }
}
