// @ts-nocheck

import __deepMerge from '../../object/deepMerge';
import __SInterface from '../../interface/SInterface';
import __sugarConfig from '../../config/sugar';
import __SCompiler, { ISCompiler } from '../../compiler/SCompiler';
import __SJsFile from '../SJsFile';
import __SPromise from '../../promise/SPromise';
import __absolute from '../../path/absolute';
import __isGlob from '../../is/glob';
import __glob from 'glob';

import __SJsCompilerParamsInterface from './interface/SJsCompilerParamsInterface';

export interface ISJsCompilerCtorSettings {
  jsCompiler?: ISJsCompilerOptionalSettings;
}
export interface ISJsCompilerOptionalSettings {}
export interface ISJsCompilerSettings {}

export interface ISJsCompilerParams {
  input: string | string[];
  outputDir: string;
  rootDir: string;
  map: boolean;
  prod: boolean;
  stripComments: boolean;
  minify: boolean;
  banner: string;
  save: boolean;
  watch: boolean;
  esbuild: any;
}
export interface ISJsCompilerOptionalParams {
  input?: string | string[];
  outputDir?: string;
  rootDir?: string;
  map?: boolean;
  prod?: boolean;
  stripComments?: boolean;
  minify?: boolean;
  banner?: string;
  save?: boolean;
  watch?: boolean;
  esbuild?: any;
}

export interface ISJsCompiler extends ISCompiler {}

/**
 * @name                SJsCompiler
 * @namespace           sugar.node.js.compile
 * @type                Class
 * @extends             SCompiler
 * @wip
 *
 * This class wrap the "esbuild" compiler with some additional features which are:
 *
 * @feature         2.0.0       Expose a simple API that return SPromise instances for convinience
 *
 * @param         {ISJsCompilerOptionalParams}      [initialParams={}]      Some parameters to use for your compilation process
 * @param           {ISJsCompilerCtorSettings}            [settings={}]       An object of settings to configure your instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import SJsCompiler from '@coffeekraken/sugar/node/scss/compile/SJsCompiler';
 * const compiler = new SJsCompiler();
 * const compiledFile = await compiler.compile('my/cool/code.esbuild');
 *
 * @see             https://www.npmjs.com/package/esbuild
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SJsCompiler extends __SCompiler {
  static interfaces = {
    params: {
      apply: false,
      class: __SJsCompilerParamsInterface
    }
  };

  /**
   * @name      jsCompilerSettings
   * @type      ISJsCompilerSettings
   * @get
   *
   * Access to the esbuild compiler settings
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get jsCompilerSettings(): ISJsCompilerSettings {
    return (<any>this._settings).esbuildCompiler;
  }

  /**
   * @name      constructor
   * @type      Function
   * @constructor
   *
   * Constructor
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(
    initialParams: ISJsCompilerOptionalParams,
    settings: ISJsCompilerCtorSettings
  ) {
    super(
      initialParams,
      __deepMerge(
        {
          esbuildCompiler: {}
        },
        settings || {}
      )
    );

    // prod
    if (this.jsCompilerSettings.prod) {
      this.jsCompilerSettings.minify = true;
      this.jsCompilerSettings.stripComments = true;
    }
  }

  /**
   * @name              _compile
   * @type              Function
   * @async
   *
   * This method is the main one that allows you to actually compile the
   * code you pass either inline, either a file path.
   *
   * @param         {String}            source          The source you want to compile. Can be a file path or some inline codes
   * @param         {Object}            [settings={}]       An object of settings to override the instance ones
   * @return        {SPromise}                          An SPromise instance that will be resolved (or rejected) when the compilation is finished
   *
   * @since             2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _compile(
    params: ISJsCompilerParams,
    settings: ISJsCompilerOptionalSettings = {}
  ) {
    return new __SPromise(async ({ resolve, reject, pipe, emit }) => {
      settings = __deepMerge(this.jsCompilerSettings, {}, settings);

      let input = Array.isArray(params.input) ? params.input : [params.input];

      const resultsObj = {};

      let filesPaths: string[] = [];

      // make input absolute
      input = __absolute(input);
      // process inputs
      input.forEach((inputStr) => {
        if (__isGlob(inputStr)) {
          filesPaths = [...filesPaths, ...__glob.sync(inputStr)];
        } else {
          filesPaths.push(inputStr);
        }
      });

      const startTime = Date.now();

      for (let i = 0; i < filesPaths.length; i++) {
        let filePath = filesPaths[i];
        let file = new __SJsFile(filePath, {
          jsFile: {
            compile: settings
          }
        });
        pipe(file);

        const resPromise = file.compile(params, {
          ...settings
        });
        const res = await resPromise;
        resultsObj[file.path] = res;
      }

      // resolve with the compilation result
      if (!params.watch) {
        resolve({
          files: resultsObj,
          startTime: startTime,
          endTime: Date.now(),
          duration: Date.now() - startTime
        });
      } else {
        emit('files', {
          files: resultsObj,
          startTime: startTime,
          endTime: Date.now(),
          duration: Date.now() - startTime
        });
      }
    });
  }
}

export default SJsCompiler;
