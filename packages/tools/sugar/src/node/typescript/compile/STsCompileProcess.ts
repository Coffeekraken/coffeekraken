// @ts-nocheck

import SProcess from '../../process/SProcess';
import __STsCompiler from './STsCompiler';

import __STsCompilerParamsInterface from './interface/STsCompilerParamsInterface';
import { ISTsCompilerParams } from './STsCompiler';
import {
  ISProcessSettings,
  ISProcessOptionalSettings
} from '../../process/SProcess';

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

export interface ISTsCompileProcessOptionalSettings
  extends ISProcessOptionalSettings {}
export interface ISTsCompileProcessSettings extends ISProcessSettings {}

class STsCompilerProcess extends SProcess implements ISCompileTsProcess {
  static interfaces = {
    // initialParams: {
    //   apply: false,
    //   class: __SSvelteCompilerParamsInterface
    // },
    params: {
      apply: false,
      class: __STsCompilerParamsInterface
    }
  };

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
      id: 'STsCompileProcess',
      name: 'Compile TS Process',
      ...(settings || {})
    });

    this._tsCompiler = new __STsCompiler({});
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
    params?: ISTsCompilerParams,
    settings?: ISCompileTsProcessSettings
  ): Promise<any> {
    this.processSettings.exitAtEnd = !params.watch;
    const promise = this._tsCompiler.compile(params, settings);
    return promise;
  }
}

export default STsCompilerProcess;
