// @ts-nocheck

import __deepMerge from '../../object/deepMerge';
import __SInterface from '../../interface/SInterface';
import __sugarConfig from '../../config/sugar';
import __SCompiler, { ISCompiler } from '../../compiler/SCompiler';
import __SSvelteFile from '../SSvelteFile';
import __SPromise from '@coffeekraken/s-promise';
import __absolute from '../../path/absolute';
import __isGlob from '../../is/glob';
import __glob from 'glob';
import __chokidar from 'chokidar';
import __fsPool from '../../fs/pool';
import __SDuration from '../../time/SDuration';

import __SSvelteCompilerParamsInterface from './interface/SSvelteCompilerParamsInterface';

export interface ISSvelteCompilerCtorSettings {
  svelteCompiler?: Partial<ISSvelteCompilerSettings>;
}
export interface ISSvelteCompilerSettings {}

export interface ISSvelteCompilerParams {
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
  svelte: any;
}

export interface ISSvelteCompiler extends ISCompiler {}

/**
 * @name                SSvelteCompiler
 * @namespace           sugar.node.svelte
 * @type                Class
 * @extends             SCompiler
 * @status              wip
 *
 * This class wrap the "svelte" compiler with some additional features which are:
 *
 * @feature         2.0.0       Expose a simple API that return SPromise instances for convinience
 *
 * @param         {Partial<ISSvelteCompilerParams>}      [initialParams={}]      Some parameters to use for your compilation process
 * @param           {ISSvelteCompilerCtorSettings}            [settings={}]       An object of settings to configure your instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import SSvelteCompiler from '@coffeekraken/sugar/node/scss/compile/SSvelteCompiler';
 * const compiler = new SSvelteCompiler();
 * const compiledFile = await compiler.compile('my/cool/code.svelte');
 *
 * @see             https://svelte.dev/docs#Compile_time
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SSvelteCompiler extends __SCompiler {
  static interfaces = {
    params: {
      apply: false,
      class: __SSvelteCompilerParamsInterface
    }
  };

  /**
   * @name      svelteCompilerSettings
   * @type      ISSvelteCompilerSettings
   * @get
   *
   * Access to the svelte compiler settings
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get svelteCompilerSettings(): ISSvelteCompilerSettings {
    return (<any>this._settings).svelteCompiler;
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
    initialParams: Partial<ISSvelteCompilerParams>,
    settings: ISSvelteCompilerCtorSettings
  ) {
    super(
      initialParams,
      __deepMerge(
        {
          svelteCompiler: {}
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
    params: ISSvelteCompilerParams,
    settings: Partial<ISSvelteCompilerSettings> = {}
  ) {
    return new __SPromise(async ({ resolve, reject, pipe, emit, on }) => {
      settings = __deepMerge(this.svelteCompilerSettings, {}, settings);

      let input = Array.isArray(params.input) ? params.input : [params.input];

      // prod
      if (params.prod) {
        params.style = 'compressed';
        params.minify = true;
        params.stripComments = true;
      }

      const resultsObj = {};
      let aggregateStrArray: string[] = [];
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
            let compileRes = await compilePromise;
            resultsObj[file.path] = compileRes;
            aggregateStrArray.push(compileRes.js);
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
            js: aggregateStrArray.join('\n'),
            ...duration.end()
          });
        }
      });
    });
  }
}

export default SSvelteCompiler;
