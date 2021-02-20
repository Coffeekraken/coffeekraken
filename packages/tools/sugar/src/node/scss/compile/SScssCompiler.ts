import __extension from '../../fs/extension';
import __SCache from '../../cache/SCache';
import __SFileCache from '../../cache/SFileCache';
import __unquote from '../../string/unquote';
import __path from 'path';
import __stripCssComments from '../../css/stripCssComments';
import __folderPath from '../../fs/folderPath';
import __deepMerge from '../../object/deepMerge';
import __SPromise from '../../promise/SPromise';
import __md5 from '../../crypt/md5';
import __sass from 'sass';
import __packageRoot from '../../path/packageRoot';
import __getFilename from '../../fs/filename';
import __isPath from '../../is/path';
import __fs from 'fs';
import __getSharedResourcesString from '../utils/getSharedResourcesString';
import __putUseStatementsOnTop from '../utils/putUseStatementsOnTop';
import __glob from 'glob';
import __csso from 'csso';
import __isGlob from 'is-glob';
import __unique from '../../array/unique';
import __SCompiler from '../../compiler/SCompiler';
import __absolute from '../../path/absolute';
import __ensureDirSync from '../../fs/ensureDirSync';
import __SScssFile from '../SScssFile';
import __express from 'express';
import __chokidar from 'chokidar';

import __SScssCompilerParamsInterface from './interface/SScssCompilerParamsInterface';
import { ISCompiler } from '../../compiler/SCompiler';

export interface ISScssCompilerParams {
  input: string | string[];
  outputDir: string;
  rootDir: string;
  save: boolean;
  style: string;
  map: boolean;
  cache: boolean;
  clearCache: boolean;
  stripComments: boolean;
  minify: boolean;
  prod: boolean;
  sharedResources: string;
  banner: string;
  serve: boolean;
  host: string;
  port: number;
  sass: any;
  watch: boolean;
}

export interface ISScssCompilerCtorSettings {
  scssCompiler?: Partial<ISScssCompilerSettings>;
}
export interface ISScssCompilerSettings {}

export interface ISScssCompilerCtor {
  new (
    initialParams: any,
    settings?: ISScssCompilerCtorSettings
  ): ISScssCompiler;
}

export interface ISScssCompiler extends ISCompiler {}

/**
 * @name                SScssCompiler
 * @namespace           sugar.node.scss
 * @type                Class
 * @extends             SCompiler
 * @status              wip
 *
 * This class wrap the "sass" compiler with some additional features which are:
 *
 * @feature         2.0.0       Expose a simple API that return SPromise instances for convinience
 * @feature         2.0.0       Optimize the render time as much as 6x faster
 *
 * @param           {Partial<ISScssCompilerParams>}        [initialParams={}]      Some initial parameters to configure your compilation process. Can be overrided thgouth the ```compile``` method
 * @param           {ISScssCompilerCtorSettings}            [settings={}]       An object of settings to configure your instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo            check for map output when no file path
 *
 * @example         js
 * import SScssCompiler from '@coffeekraken/sugar/node/scss/compile/SScssCompiler';
 * const compiler = new SScssCompiler();
 * const compiledFile = await compiler.compile('my/cool/code.scss');
 *
 * @see             https://www.npmjs.com/package/sass
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SScssCompiler extends __SCompiler implements ISCompiler {
  static interfaces = {
    params: {
      apply: false,
      class: __SScssCompilerParamsInterface
    }
  };

  static _serveServer: any;

  /**
   * @name          scssCompilerSettings
   * @type          ISScssCompilerSettings
   * @get
   *
   * Access the scss compiler settings
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get scssCompilerSettings(): ISScssCompilerSettings {
    return (<any>this._settings).scssCompiler;
  }

  /**
   * @name            constructor
   * @type             Function
   * @constructor
   *
   * Constructor
   *
   * @since           2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(
    initialParams: Partial<ISScssCompilerParams>,
    settings: ISScssCompilerCtorSettings
  ) {
    super(
      initialParams,
      __deepMerge(
        {
          scssCompiler: {}
        },
        settings || {}
      )
    );
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
    params: ISScssCompilerParams,
    settings: Partial<ISScssCompilerSettings> = {}
  ) {
    return new __SPromise(async ({ resolve, reject, pipe, emit }) => {
      settings = __deepMerge(this.scssCompilerSettings, {}, settings);

      let input = Array.isArray(params.input) ? params.input : [params.input];

      // prod
      if (params.prod) {
        params.cache = false;
        params.style = 'compressed';
        params.minify = true;
        params.stripComments = true;
      }

      const resultsObj = {};

      let filesPaths: string[] = [];
      let scssFiles: Record<string, __SScssFile> = {};

      if (params.watch) {
        __chokidar.watch(input).on('change', async (path) => {
          let file: __SScssFile = scssFiles[path];
          if (!file) {
            file = new __SScssFile(path, {
              scssFile: {
                compile: settings
              }
            });
            scssFiles[path] = file;
            pipe(file);
          }
          // compile the file
          await file.compile(
            {
              ...params,
              watch: false
            },
            settings
          );

          emit('log', {
            type: 'separator'
          });
          emit('log', {
            value: `<blue>[watch]</blue> Watching for changes...`
          });
        });

        emit('log', {
          value: `<blue>[watch]</blue> Watching for changes...`
        });
      } else {
        input = __absolute(input);
        // process inputs
        input.forEach((inputStr) => {
          if (__isGlob(inputStr)) {
            filesPaths = [...filesPaths, ...__glob.sync(inputStr)];
          } else {
            filesPaths.push(inputStr);
          }
        });
        filesPaths.forEach((path) => {
          const file = new __SScssFile(path, {
            scssFile: {
              compile: settings
            }
          });
          scssFiles[file.path] = file;
          pipe(file);
        });

        const resultsObj: Record<string, string> = {};
        for (let i = 0; i < Object.keys(scssFiles).length; i++) {
          const file = scssFiles[Object.keys(scssFiles)[i]];
          // @todo    {Clean}     remove the ts-ignore
          // @ts-ignore
          const resPromise = file.compile(
            {
              ...params,
              watch: false
            },
            settings
          );
          const res = await resPromise;
          resultsObj[file.path] = res.css;
        }

        let aggregateStrArray: string[] = [];
        Object.keys(resultsObj).forEach((path) => {
          const cssRes = resultsObj[path];
          aggregateStrArray.push(cssRes);
        });

        const startTime = Date.now();
        resolve({
          files: resultsObj,
          css: aggregateStrArray.join('\n'),
          startTime: startTime,
          endTime: Date.now(),
          duration: Date.now() - startTime
        });
      }
    });
  }
}

export default SScssCompiler;
