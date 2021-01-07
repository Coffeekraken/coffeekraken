// @ts-nocheck

import __SBuildDocMapActionsStream from './SBuildDocMapActionsStream';
import __SProcess from '../process/SProcess';
import __SBuildDocMapInterface from './interface/SBuildDocMapInterface';
import __SDocMap from './SDocMap';

/**
 * @name            SBuildDocMapProcess
 * @namespace           sugar.node.build.docMap
 * @type            Class
 * @extends         SProcess
 *
 * This class represent the process that build the docMap.json file
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SBuildDocMapProcess extends __SProcess {
  static interface = __SBuildDocMapInterface;

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
    super({
      id: 'SBuildDocMapProcess',
      name: 'Build docMap.json Process',
      ...settings
    });
  }

  /**
   * @name              process
   * @type              Function
   *
   * Method that execute the actual process code
   *
   * @param       {Object}        params           The arguments object that will be passed to the underlined actions stream instance
   * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
   * @return      {Süromise}                        An SPomise instance representing the build process
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  process(params, settings = {}) {
    const docMap = new __SDocMap({
      ...params
    });
    const promise = docMap.save();
    return promise;
  }
};
