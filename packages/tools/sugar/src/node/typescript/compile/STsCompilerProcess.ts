// @ts-nocheck

import SProcess, { ISProcessSettings } from '../../process/SProcess';
import __STsCompiler, { ISTsCompilerParams } from './STsCompiler';

import __STsCompilerParamsInterface from './interface/STsCompilerParamsInterface';

/**
 * @name            STsCompilerProcess
 * @namespace           sugar.node.typescript.compile
 * @type            Class
 * @extends         SProcess
 * @status              wip
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

export type ISTsCompileProcessSettings = ISProcessSettings;

export interface ISCompileTsProcess {}

class STsCompilerProcess extends SProcess implements ISCompileTsProcess {
  static interfaces = {
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
  constructor(initialParams: any, settings?: ISTsCompileProcessSettings) {
    super(initialParams, {
      id: 'STsCompilerProcess',
      name: 'TS Compiler Process',
      ...(settings || {}),
      process: {
        runAsChild: true
      }
    });

    this._tsCompiler = new __STsCompiler();
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
    settings?: ISTsCompileProcessSettings
  ): Promise<any> {
    const promise = this._tsCompiler.compile(params, settings);
    return promise;
  }
}

export default STsCompilerProcess;
