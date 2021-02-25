import __SFile from '../fs/SFile';
import __md5 from '../crypt/md5';
import __SDuration from '../time/SDuration';
import __fs from 'fs';
import __path from 'path';
import __SPromise from '../promise/SPromise';
import __deepMerge from '../object/deepMerge';
import __sugarConfig from '../config/sugar';
import __SFileCache from '../cache/SFileCache';
import __toString from '../string/toString';
import __wait from '../time/wait';
import __getFilename from '../fs/filename';
import * as __esbuild from 'esbuild';
import __filter from '../object/filter';
import __esbuildScssLoaderPlugin from './compile/plugins/esbuild/esbuildScssLoaderPlugin';
import __SEventEmitter from '../event/SEventEmitter';
import __onProcessExit from '../process/onProcessExit';
import __resolve from '../module/resolve';

import __SInterface from '../interface/SInterface';
import __SJsCompiler, { ISJsCompilerParams } from './compile/SJsCompiler';
import __SJsCompilerParamsInterface from './compile/interface/SJsCompilerParamsInterface';

/**
 * @name          SJsFileSettingsInterface
 * @type            Class
 * @extends         SInterface
 * @status              beta
 *
 * The interface describing the jsFile settings
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export class SJsFileSettingsInterface extends __SInterface {
  static definition: {};
}

/**
 * @name          SJsFileCtorSettingsInterface
 * @type            Class
 * @extends         SInterface
 * @status              beta
 *
 * The interface describing the jsFile settings
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export class SJsFileCtorSettingsInterface extends __SInterface {
  static definition: {
    jsFile: {
      interface: SJsFileSettingsInterface;
      type: 'Object';
      required: true;
    };
  };
}

interface ISJsFileCompileSettings {}

interface ISJsFileSettings {
  plugins: any[];
  compile: Partial<ISJsFileCompileSettings>;
}
interface ISJsFileCtorSettings {
  plugins?: any[];
  jsFile?: Partial<ISJsFileSettings>;
}

interface ISJsFile {
  _watchEsbuildProcess: any;
  compile(params: ISJsCompilerParams, settings?: Partial<ISJsFileSettings>);
}

/**
 * @name            SJsFile
 * @namespace       sugar.node.js
 * @type            Class
 * @extends         SFile
 * @status              beta
 *
 * This represent a javascript file
 *
 * @param       {String}            path            The path to the scss file
 * @param       {ISJsFileSettings}     [settings={}]       Some settings to configure your file
 *
 * @example         js
 * import SJsFile from '@coffeekraken/sugar/node/js/SJsFile';
 * const file = new SJsFile('/my/cool/file.js');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// @ts-ignore
class SJsFile extends __SFile implements ISJsFile {
  static interfaces = {
    compilerParams: {
      apply: false,
      class: __SJsCompilerParamsInterface
    },
    settings: {
      apply: true,
      on: '_settings',
      class: SJsFileCtorSettingsInterface
    }
  };

  /**
   * @name      jsFileSettings
   * @type      ISJsFileSettings
   * @get
   *
   * Access the jsFile settings
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get jsFileSettings(): ISJsFileSettings {
    return (<any>this._settings).jsFile;
  }

  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(path: string, settings: ISJsFileCtorSettings = {}) {
    super(
      path,
      __deepMerge(
        {
          id: __getFilename(path),
          jsFile: {
            plugins: []
          }
        },
        settings
      )
    );

    this.jsFileSettings.plugins.unshift(
      (<any>this.constructor)._resolverPlugin
    );
    // this.jsFileSettings.plugins.unshift(__esbuildScssLoaderPlugin);

    __onProcessExit(() => {
      if (this._watchEsbuildProcess) this._watchEsbuildProcess.stop();
    });
  }

  /**
   * @name              compile
   * @type              Function
   *
   * Simply compile the file using the settings that you can pass as argument
   *
   * @param         {ISJsFileCompileSettings}         [settings={}]           Some settings to configure your compilation process
   *
   * @setting       {Boolean}           [minify=false]          Specify if you want to minify the output
   * @setting       {Boolean}           [stripComments=false]       Specify if you want to remove all the comments from the output
   * @setting       {Boolean}              [cache=true]             Specify if you want to make use of the cache or not
   * @setting       {Boolean}           [clearCache=false]          Specify if you want to clear the cache before compilation
   * @setting       {String}            [sharedResources=null]      Specify some scss code that you want to be present in every compiled files
   * @setting       {Object}            [sass={}]               Specify some settings that will be passed to the ```sass``` compiler
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _isCompiling = false;
  _watchEsbuildProcess: any = null;
  _currentCompilationSettings: Partial<ISJsFileSettings> = {};
  _currentCompilationParams: Partial<ISJsCompilerParams> = {};
  compile(params: ISJsCompilerParams, settings?: Partial<ISJsFileSettings>) {
    // init the promise
    return new __SPromise(async ({ resolve, reject, emit, pipeTo, on }) => {
      settings = __deepMerge(this.jsFileSettings, settings);
      this._currentCompilationParams = Object.assign({}, params);
      this._currentCompilationSettings = Object.assign({}, settings);

      params = this.applyInterface('compilerParams', params);

      if (this._isCompiling) {
        emit('warn', {
          value: `This file is compiling at this time. Please wait the end of the compilation before running another one...`
        });
        return;
      }
      this._isCompiling = true;

      // listen for the end
      on('finally', () => {
        this._isCompiling = false;
      });

      pipeTo(this);

      emit('notification', {
        title: `${this.id} compilation started`
      });

      emit('log', {
        clear: true,
        type: 'time'
      });

      // notify start
      emit('log', {
        value: `<yellow>[start]</yellow> Starting "<cyan>${this.relPath}</cyan>" compilation`
      });

      const duration = new __SDuration();

      await __wait(0);

      emit('log', {
        value: `<yellow>[compiling]</yellow> File "<cyan>${this.relPath}</cyan>"`
      });

      // prod
      if (params.prod || params.bundle) {
        params.minify = true;
        params.stripComments = true;
        params.map = false;
      }

      let savePath;
      if (params.outputDir === undefined) {
        savePath = this.path.replace(/\.js$/, '.compiled.js');
      } else {
        savePath = __path.resolve(
          params.outputDir,
          this.path.replace(`${params.rootDir}/`, '')
        );
      }

      // let exampleOnResolvePlugin = {
      //   name: 'example',
      //   setup(build) {
      //     build.onResolve({ filter: /.*/ }, (args) => {
      //       console.log(args.path);
      //       return { path: __path.join(args.resolveDir, args.path) };
      //       // return { path: path.join(args.resolveDir, 'public', args.path) };
      //     });
      //   }
      // };

      let esbuildParams: any = {
        charset: 'utf8',
        format: params.format,
        logLevel: 'info',
        ...__filter(params, (key, value) => {
          if (Array.isArray(value) && !value.length) return false;
          return __SJsCompiler._esbuildAcceptedSettings.indexOf(key) !== -1;
        }),
        entryPoints: [this.path],
        bundle: params.bundle,
        write: false, // write to disk bellow
        errorLimit: 100,
        minify: params.minify,
        sourcemap: params.map,
        // plugins: [exampleOnResolvePlugin],
        ...params.esbuild
      };

      let resultObj: any;

      try {
        resultObj = await __esbuild.build(esbuildParams);
      } catch (e) {
        return reject(e);
      }

      function rewriteImports(code) {
        const reg = /\sfrom\s['"`](.*)['"`];?/gm;
        let match = reg.exec(code);
        do {
          if (!match) continue;
          if (match[1].match(/^[\.\/]/)) continue;

          // const absPath = `${__sugarConfig('storage.nodeModulesDir')}/${match[1]}`;
          // if (__fs.existsSync())

          const res = __resolve(match[1], {
            fields:
              params.format === 'esm'
                ? ['module', 'main', 'browser']
                : ['main', 'browser', 'module']
          });

          if (res) {
            code = code.replace(
              match[0],
              ` from "${res.replace(__sugarConfig('storage.rootDir'), '')}";`
            );
          }
        } while ((match = reg.exec(code)) !== null);
        return code;
      }

      const resultJs = rewriteImports(
        [
          params.banner || '',
          'let process = {};' + resultObj.outputFiles[0].text
        ].join('\n')
      );

      // check if need to save
      if (params.save) {
        // build the save path
        emit('log', {
          type: 'file',
          file: this.toObject(),
          to: savePath.replace(`${__sugarConfig('storage.rootDir')}/`, ''),
          action: 'save'
        });
        this.writeSync(resultJs, {
          path: savePath
        });
        if (params.map) {
          // this.writeSync(result.js.map.toString(), {
          //   path: savePath.replace(/\.js$/, '.js.map')
          // });
          // emit('log', {
          //   type: 'file',
          //   action: 'saved',
          //   to: savePath
          //     .replace(/\.js$/, '.js.map')
          //     .replace(`${__sugarConfig('storage.rootDir')}/`, ''),
          //   file: this.toObject()
          // });
        }

        emit('log', {
          type: 'file',
          action: 'saved',
          to: savePath.replace(`${__sugarConfig('storage.rootDir')}/`, ''),
          file: this.toObject()
        });
      }

      emit('log', {
        type: 'separator'
      });

      if (params.watch) {
        emit('log', {
          value: `<blue>[watch] </blue>Watching for changes...`
        });
      }

      return resolve({
        js: resultJs,
        map: undefined, // @todo      handle map
        esbuild: resultObj,
        ...duration.end()
      });
    });
  }
}

export default SJsFile;
