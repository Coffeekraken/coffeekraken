// @ts-nocheck

import SProcess from '../../process/SProcess';
import __SScssCompiler from './SScssCompiler';

import __SScssCompileParamsInterface from './interface/SScssCompileParamsInterface';
import __ISScssCompileParams from './interface/ISScssCompileParams';

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
  static interface = __SScssCompileParamsInterface;

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
  process(params: __ISScssCompileParams, settings = {}) {
    const input = params.input;
    delete params.input;
    this._settings.exitAtEnd = !params.watch;
    return this._scssCompiler.compile(input, {
      ...params
    });
  }
}

export = SScssCompileProcess;
