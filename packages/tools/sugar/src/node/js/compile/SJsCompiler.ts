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
import __glob from 'glob';
import __csso from 'csso';
import __isGlob from 'is-glob';
import __unique from '../../array/unique';
import __SCompiler from '../../compiler/SCompiler';
import __absolute from '../../path/absolute';
import __ensureDirSync from '../../fs/ensureDirSync';
import __SJsFile from '../SJsFile';
import __express from 'express';

import __SJsCompilerParamsInterface from './interface/SJsCompilerParamsInterface';
import { ISCompiler } from '../../compiler/SCompiler';

export interface ISJsCompilerParams {
  input: string | string[];
  outputDir: string;
  rootDir: string;
  bundle: boolean;
  map: boolean;
  prod: boolean;
  stripComments: boolean;
  minify: boolean;
  banner: string;
  save: boolean;
  watch: boolean;
  serve: boolean;
  port: number;
  host: string;
  esbuild: any;
}

export interface ISJsCompilerCtorSettings {
  jsCompiler?: Partial<ISJsCompilerSettings>;
}
export interface ISJsCompilerSettings {}

export interface ISJsCompilerCtor {
  new (initialParams: any, settings?: ISJsCompilerCtorSettings): ISJsCompiler;
}

export interface ISJsCompiler extends ISCompiler {}

/**
 * @name                SJsCompiler
 * @namespace           sugar.node.js.compile
 * @type                Class
 * @extends             SCompiler
 * @status              wip
 *
 * This class wrap the "js" compiler with some additional features which are:
 *
 * @feature         2.0.0       Expose a simple API that return SPromise instances for convinience
 *
 * @param           {Partial<ISJsCompilerParams>}        [initialParams={}]      Some initial parameters to configure your compilation process. Can be overrided thgouth the ```compile``` method
 * @param           {ISJsCompilerCtorSettings}            [settings={}]       An object of settings to configure your instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo            check for map output when no file path
 *
 * @example         js
 * import SJsCompiler from '@coffeekraken/sugar/node/js/compile/SJsCompiler';
 * const compiler = new SJsCompiler();
 * const compiledFile = await compiler.compile('my/cool/code.js');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SJsCompiler extends __SCompiler implements ISCompiler {
  static interfaces = {
    params: {
      apply: false,
      class: __SJsCompilerParamsInterface
    }
  };

  static _serveServer: any;

  /**
   * @name            _esbuildAcceptedSettings
   * @type            Array
   * @static
   *
   * This static property store all the accepted esbuild options keys
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static _esbuildAcceptedSettings = [
    'bundle',
    'define',
    'external',
    'format',
    'globalName',
    'inject',
    'jsxFactory',
    'jsxFragment',
    'platform',
    'loader',
    'minify',
    'outdir',
    'outfile',
    'sourcemap',
    'target',
    'write',
    'avoidTDZ',
    // 'banner',
    'charset',
    'color',
    'errorLimit',
    'footer',
    'keepNames',
    'logLevel',
    'mainFields',
    'metafile',
    'outExtension',
    'plugins',
    'outbase',
    'publicPath',
    'pure',
    'resolveExtensions',
    'sourcefile',
    'stdin',
    'tsconfig',
    'tsconfigRaw'
  ];

  /**
   * @name          jsCompilerSettings
   * @type          ISJsCompilerSettings
   * @get
   *
   * Access the js compiler settings
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get jsCompilerSettings(): ISJsCompilerSettings {
    return (<any>this._settings).jsCompiler;
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
    initialParams: Partial<ISJsCompilerParams>,
    settings: ISJsCompilerCtorSettings
  ) {
    super(
      initialParams,
      __deepMerge(
        {
          jsCompiler: {}
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
    params: ISJsCompilerParams,
    settings: Partial<ISJsCompilerSettings> = {}
  ) {
    return new __SPromise(async ({ resolve, reject, pipe, emit }) => {
      const compileSettings = __deepMerge(
        this.jsCompilerSettings,
        {},
        settings
      );

      let input = Array.isArray(params.input) ? params.input : [params.input];

      // prod
      if (params.prod) {
        params.minify = true;
        params.stripComments = true;
        params.map = false;
      }

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

      const serverPromise = new Promise((serverResolve, serverReject) => {
        if (params.serve && !SJsCompiler._serveServer) {
          const server = __express();

          filesPaths.forEach((path) => {
            const filename = __getFilename(path);

            const relPath = __path.relative(params.rootDir, path);
            const destPath = __path.resolve(params.outputDir, relPath);

            server.get(`/${filename}`, (req, res) => {
              const content = __fs.readFileSync(destPath, 'utf8');
              res.type('text/javascript');
              res.status(200);
              res.send(content);
            });
          });

          const serverLogStrArray: string[] = [
            `Your <yellow>Js</yellow> server is <green>up and running</green>:`,
            '',
            `- Hostname        : <yellow>${params.host}</yellow>`,
            `- Port            : <yellow>${params.port}</yellow>`,
            `- URL's           : <cyan>http://${params.host}:${params.port}</cyan>`
          ];

          filesPaths.forEach((path) => {
            serverLogStrArray.push(
              `                  : <cyan>${`http://${params.host}:${
                params.port
              }/${__getFilename(path)}`.trim()} </cyan>`
            );
          });

          server
            .listen(params.port, () => {
              emit('log', {
                type: 'time'
              });
              emit('log', {
                clear: true,
                mb: 1,
                type: 'heading',
                value: serverLogStrArray.join('\n')
              });

              setTimeout(() => {
                serverResolve(true);
              }, 500);
            })
            .on('error', (e) => {
              SJsCompiler._serveServer = undefined;
              const string = e.toString();
              reject(string);
            });

          SJsCompiler._serveServer = server;
        } else {
          serverResolve(true);
        }
      });

      await serverPromise;

      const startTime = Date.now();

      for (let i = 0; i < filesPaths.length; i++) {
        let filePath = filesPaths[i];
        let file = new __SJsFile(filePath, {
          jsFile: {
            compile: compileSettings
          }
        });
        pipe(file);

        // @todo    {Clean}     remove the ts-ignore
        // @ts-ignore
        const resPromise = file.compile(params, compileSettings);
        const res = await resPromise;
        resultsObj[file.path] = res;
      }

      // aggregate the compiled files css
      let aggregateStrArray: string[] = [];
      Object.keys(resultsObj).forEach((path) => {
        const jsRes = resultsObj[path];
        aggregateStrArray.push(jsRes.js);
      });

      // resolve with the compilation result
      if (!params.watch) {
        resolve({
          files: resultsObj,
          js: aggregateStrArray.join('\n'),
          startTime: startTime,
          endTime: Date.now(),
          duration: Date.now() - startTime
        });
      } else {
        emit('files', {
          files: resultsObj,
          js: aggregateStrArray.join('\n'),
          startTime: startTime,
          endTime: Date.now(),
          duration: Date.now() - startTime
        });
      }
    });
  }
}

export default SJsCompiler;
