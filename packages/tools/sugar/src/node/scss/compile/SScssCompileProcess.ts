import SProcess from '../../process/SProcess';
import __SScssCompiler from './SScssCompiler';
import __deepMerge from '../../object/deepMerge';

import __SScssCompilerParamsInterface from './interface/SScssCompilerParamsInterface';
import { ISScssCompiler, ISScssCompilerParams } from './SScssCompiler';
import {
  ISProcessSettings,
  ISProcessOptionalSettings
} from '../../process/SProcess';

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

interface ISScssCompileProcessOptionalSettings
  extends ISProcessOptionalSettings {}
interface ISScssCompileProcessSettings extends ISProcessSettings {}

class SScssCompileProcess extends SProcess {
  static interfaces = {
    initialParams: {
      autoApply: false,
      class: __SScssCompilerParamsInterface
    },
    params: {
      autoApply: false,
      class: __SScssCompilerParamsInterface
    }
  };

  /**
   * @name      scssCompileProcessSettings
   * @type      ISScssCompileProcessSettings
   * @get
   *
   * Access the ```scssCompileProcess``` settings
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get scssCompileProcessSettings() {
    return (<any>this._settings).scssCompileProcessSettings;
  }

  /**
   * @name      _scssCompiler
   * @type      ISScssCompiler
   * @private
   *
   * Store the compiler instance
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  private _scssCompiler: ISScssCompiler;

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
    settings: ISScssCompileProcessOptionalSettings = {}
  ) {
    super(
      initialParams,
      __deepMerge(
        {
          scssCompileProcess: {}
        },
        {
          id: 'SScssCompileProcess',
          name: 'Compile Scss Process'
        },
        settings
      )
    );

    this._scssCompiler = new __SScssCompiler(initialParams, {});
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
    params: ISScssCompilerParams,
    settings: ISScssCompileProcessOptionalSettings = {}
  ) {
    this.processSettings.exitAtEnd = !params.compileOnChange;
    return this._scssCompiler.compile(params, settings);
  }
}

export = SScssCompileProcess;
