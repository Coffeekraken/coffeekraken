// @ts-nocheck

import SProcess from '../../process/SProcess';
import ISCompileTsProcess, {
  ISCompileTsProcessParams,
  ISCompileTsProcessSettings,
  ISCompileTsProcessCtor
} from './interface/ISCompileTsProcess';
import __SScssInterface from './interface/SScssInterface';

import __SScssCompiler from './SScssCompiler';

/**
 * @name            SScssCompileProcess
 * @namespace           sugar.node.scss.compile
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
class SScssCompileProcess extends SProcess {
  static interface = __SScssInterface;

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
      id: 'SScssCompileProcess',
      name: 'Compile Scss Process',
      ...(settings || {})
    });

    this._scssCompiler = new __SScssCompiler({});
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
    const input = params.input;
    delete params.input;

    return this._scssCompiler.compile(input, {
      ...settings,
      ...params
    });
  }
}

export = SScssCompileProcess;
