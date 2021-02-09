import SProcess from '../../process/SProcess';
import __SSvelteCompiler from './SSvelteCompiler';
import __deepMerge from '../../object/deepMerge';

import __SSvelteCompilerParamsInterface from './interface/SSvelteCompilerParamsInterface';
import { ISSvelteCompiler, ISSvelteCompilerParams } from './SSvelteCompiler';
import { ISProcessSettings } from '../../process/SProcess';

/**
 * @name            SSvelteCompilerProcess
 * @namespace           sugar.node.svelte.compile
 * @type            Class
 * @extends         SProcess
 * @status              wip
 *
 * This class represent the svelte compilation process to compile svelte files to js
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISSvelteCompilerProcessSettings extends ISProcessSettings {}
export interface ISSvelteCompilerProcessSettings extends ISProcessSettings {}

class SSvelteCompilerProcess extends SProcess {
  static interfaces = {
    initialParams: {
      apply: false,
      class: __SSvelteCompilerParamsInterface
    },
    params: {
      apply: false,
      class: __SSvelteCompilerParamsInterface
    }
  };

  /**
   * @name      svelteCompileProcessSettings
   * @type      ISSvelteCompilerProcessSettings
   * @get
   *
   * Access the ```scssCompileProcess``` settings
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get svelteCompileProcessSettings() {
    return (<any>this._settings).svelteCompileProcess;
  }

  /**
   * @name      _svelteCompiler
   * @type      ISSvelteCompiler
   * @private
   *
   * Store the compiler instance
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  private _svelteCompiler: ISSvelteCompiler;

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(
    initialParams: any,
    settings: Partial<ISSvelteCompilerProcessSettings> = {}
  ) {
    super(
      initialParams,
      __deepMerge(
        {
          svelteCompileProcess: {}
        },
        {
          id: 'SSvelteCompilerProcess',
          name: 'Svelte Compiler Process'
        },
        settings
      )
    );

    this._svelteCompiler = new __SSvelteCompiler(initialParams, {});
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
    params: ISSvelteCompilerParams,
    settings: Partial<ISSvelteCompilerProcessSettings> = {}
  ) {
    return this._svelteCompiler.compile(params, settings);
  }
}

export default SSvelteCompilerProcess;
