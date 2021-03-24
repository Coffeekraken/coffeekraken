import __extension from '../../fs/extension';
import __SCache from '@coffeekraken/s-cache';
import __unquote from '../../../shared/string/unquote';
import __path from 'path';
import __stripCssComments from '../../../shared/css/stripCssComments';
import __folderPath from '../../fs/folderPath';
import __deepMerge from '../../../shared/object/deepMerge';
import __SPromise from '@coffeekraken/s-promise';
import __md5 from '../../../shared/crypt/md5';
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
import __unique from '../../../shared/array/unique';
import __SCompiler, { ISCompiler } from '../../compiler/SCompiler';
import __absolute from '../../path/absolute';
import __ensureDirSync from '../../fs/ensureDirSync';
import __SScssFile from '../SScssFile';
import __express from 'express';
import __chokidar from 'chokidar';
import __SDuration from '../../../shared/time/SDuration';
import __fsPool from '../../fs/pool';

import __SScssCompilerParamsInterface from './interface/SScssCompilerParamsInterface';

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

export type ISScssCompiler = ISCompiler;

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
 * @param           {ISScssCompilerCtorSettings}            [settings={}]       An object of settings to configure your instance
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
    return (<any>this)._settings.scssCompiler;
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
   * @param         {String}            source          The source you want to compile. Can be a file path or some inline codes
   * @param         {Object}            [settings={}]       An object of settings to override the instance ones
   * @return        {SPromise}                          An SPromise instance that will be resolved (or rejected) when the compilation is finished
   *
   * @since             2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _compile(
    params: ISScssCompilerParams,
    settings: Partial<ISScssCompilerSettings> = {}
  ) {
    return new __SPromise(async ({ resolve, reject, pipe, emit, on }) => {
      settings = __deepMerge(this.scssCompilerSettings, {}, settings);

      const input = Array.isArray(params.input) ? params.input : [params.input];

      // prod
      if (params.prod) {
        params.cache = false;
        params.style = 'compressed';
        params.minify = true;
        params.stripComments = true;
      }

      const duration = new __SDuration();

      const pool = __fsPool(input, {
        watch: params.watch
      });

      on('cancel', () => {
        pool.cancel();
      });

      if (params.watch) {
        emit('log', {
          value: `<blue>[watch]</blue> Watching for changes...`
        });
      }

      pool.on(params.watch ? 'update' : 'files', async (files) => {
        files = Array.isArray(files) ? files : [files];

        const resultsObj = {};
        const aggregateStrArray: string[] = [];

        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const compilePromise = file.compile(
            {
              ...params,
              watch: false
            },
            settings
          );
          try {
            pipe(compilePromise);
            const compileRes = await compilePromise;
            resultsObj[file.path] = compileRes;
            aggregateStrArray.push(compileRes.css);
            emit('file', compileRes);
          } catch (e) {
            emit('warn', {
              value: e.toString()
            });
          }
        }

        if (params.watch) {
          emit('log', {
            value: `<blue>[watch]</blue> Watching for changes...`
          });
        } else {
          resolve({
            files: resultsObj,
            css: aggregateStrArray.join('\n'),
            ...duration.end()
          });
        }
      });
    });
  }
}

export default SScssCompiler;
