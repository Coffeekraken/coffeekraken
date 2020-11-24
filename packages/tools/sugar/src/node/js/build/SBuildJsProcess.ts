// @ts-nocheck

import __SBuildJsActionsStream from './SBuildJsActionsStream';
import __deepMerge from '../../object/deepMerge';
import __SProcess from '../../process/SProcess';
import __SBuildJsInterface from './interface/SBuildJsInterface';

/**
 * @name            SBuildJsProcess
 * @namespace           sugar.node.build.js
 * @type            Class
 * @extends         SProcess
 * @wip
 *
 * This class represent the process that build the JS files
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = class SBuildJsProcess extends __SProcess {
  static interface = __SBuildJsInterface;

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    super(
      __deepMerge(
        {
          id: 'SBuildJsProcess',
          name: 'Build JS Process'
        },
        settings
      )
    );
  }

  /**
   * @name              process
   * @type              Function
   *
   * Method that actually execute the process
   *
   * @param       {Object}        params           The arguments object that will be passed to the underlined actions stream instance
   * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
   * @return      {Süromise}                        An SPomise instance representing the build process
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  process(params, settings = {}) {
    setTimeout(() => {
      const actionStream = new __SBuildJsActionsStream({
        ...settings,
        logs: {
          success: false,
          start: false
        }
      });
      this._buildJsActionStream = actionStream.start(params);
      this.bindSPromise(this._buildJsActionStream);
    }, 1000);
  }
}
