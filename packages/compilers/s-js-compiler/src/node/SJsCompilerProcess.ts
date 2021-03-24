import SProcess, { ISProcessSettings } from '../../process/SProcess';
import __SJsCompiler, { ISJsCompiler, ISJsCompilerParams } from './SJsCompiler';
import __deepMerge from '../../../shared/object/deepMerge';

import __SJsCompilerParamsInterface from './interface/SJsCompilerParamsInterface';

/**
 * @name            SJsCompilerProcess
 * @namespace           sugar.node.js.compile
 * @type            Class
 * @extends         SProcess
 * @status              wip
 *
 * This class represent the js compilation process to compile raw js files to es2015 js one
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export type ISJsCompilerProcessSettings = ISProcessSettings;

// @ts-ignore
class SJsCompilerProcess extends SProcess {
  static interfaces = {
    initialParams: {
      apply: false,
      class: __SJsCompilerParamsInterface
    },
    params: {
      apply: false,
      class: __SJsCompilerParamsInterface
    }
  };

  /**
   * @name      jsCompileProcessSettings
   * @type      ISJsCompilerProcessSettings
   * @get
   *
   * Access the ```scssCompileProcess``` settings
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get jsCompileProcessSettings() {
    return (<any>this)._settings.jsCompileProcess;
  }

  /**
   * @name      _jsCompiler
   * @type      ISJsCompiler
   * @private
   *
   * Store the compiler instance
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  private _jsCompiler: ISJsCompiler;

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
    settings: Partial<ISJsCompilerProcessSettings> = {}
  ) {
    super(
      initialParams,
      __deepMerge(
        {
          jsCompileProcess: {}
        },
        {
          id: 'SJsCompilerProcess',
          name: 'Js Compiler Process'
        },
        settings
      )
    );

    this._jsCompiler = new __SJsCompiler(initialParams, {});
  }

  /**
   * @name              process
   * @type              Function
   *
   * Method that actually execute the process
   *
   * @param       {Object}        params           The arguments object that will be passed to the underlined actions stream instance
   * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
   * @return      {Süromise}                        An SPomise instance representing the build process
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  process(
    params: ISJsCompilerParams,
    settings: Partial<ISJsCompilerProcessSettings> = {}
  ) {
    const promise = this._jsCompiler.compile(params, settings);
    return promise;
  }
}

export default SJsCompilerProcess;
