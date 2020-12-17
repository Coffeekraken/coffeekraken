// @ts-nocheck

import SProcess from '../../process/SProcess';
import ISCompileTsProcess, {
  ISCompileTsProcessParams,
  ISCompileTsProcessSettings,
  ISCompileTsProcessCtor
} from './interface/ISCompileTsProcess';
import __SCompileTsProcessInterface from './interface/SCompileTsProcessInterface';

import compileTs from './compileTs';

/**
 * @name            STypescriptToJsProcess
 * @namespace           sugar.node.typescript
 * @type            Class
 * @extends         SProcess
 * @wip
 *
 * This class represent the tsc compilation process to compile typescript to js
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const Cls: ISCompileTsProcessCtor = class SCompileTsProcess
  extends SProcess
  implements ISCompileTsProcess {
  static interface = __SCompileTsProcessInterface;

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings?: ISCompileTsProcessSettings) {
    super({
      id: 'SCompileTsProcess',
      name: 'Compile TS Process',
      ...(settings || {})
    });
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
  process(
    params?: ISCompileTsProcessParams,
    settings?: ISCompileTsProcessSettings
  ): Promise<any> {
    return compileTs(params, settings.tsc || {});
  }
};

export = Cls;
