import __SPromise from '@coffeekraken/s-promise';
import * as __esbuild from 'esbuild';
import __path from 'path';
import __deepMerge from '../../shared/object/deepMerge';
import __filter from '../../shared/object/filter';
import __SDuration from '@coffeekraken/s-duration';
import __wait from '../../shared/time/wait';
import __esbuildAggregateLibsPlugin from '../esbuild/plugins/aggregateLibs';
import __getFilename from '../fs/filename';
import __SFile from '@coffeekraken/s-file';
import __SInterface from '@coffeekraken/s-interface';
import __onProcessExit from '../process/onProcessExit';
import __SJsCompiler, {
  ISJsCompilerParams,
  SJsCompilerInterface
} from '@coffeekraken/s-js-compiler';

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

export interface ISJsFileCompileSettings {}

export interface ISJsFileSettings {
  plugins: any[];
  compile: Partial<ISJsFileCompileSettings>;
}
export interface ISJsFileCtorSettings {
  plugins?: any[];
  jsFile?: Partial<ISJsFileSettings>;
}

export interface ISJsFile {
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
 * @param       {String}            path            The path to the scss file
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
      class: SJsCompilerInterface
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
    return (<any>this)._settings.jsFile;
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
          file: {
            sourcesExtensions: [path.match(/\.jsx?$/) ? 'ts' : '']
          },
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
   * @setting       {Object}            [sass={}]               Specify some settings that will be passed to the ```sass``` compiler
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
    return new __SPromise(
      async ({ resolve, reject, emit, pipeFrom, pipeTo, on }) => {
        settings = __deepMerge(this.jsFileSettings, settings);
        this._currentCompilationParams = Object.assign({}, params);
        this._currentCompilationSettings = Object.assign({}, settings);

        // const tree = await __dependencyTree(this.path);
        // console.log(tree);
        // return;

        // @weird:ts-compilation-issue
        params = (<any>this).applyInterface('compilerParams', params);

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
          // @weird:ts-compilation-issue
          title: `${(<any>this).id} compilation started`
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
        if (params.outDir === undefined) {
          savePath = this.path.replace(/\.js$/, '.compiled.js');
        } else {
          savePath = __path.resolve(
            params.outDir,
            this.path.replace(`${params.rootDir}/`, '')
          );
        }

        const esbuildParams: any = {
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
          plugins: [
            __esbuildAggregateLibsPlugin({
              outputDir: params.outDir,
              rootDir: params.rootDir
            })
          ],
          ...params.esbuild
        };

        let resultObj: any;

        try {
          resultObj = await __esbuild.build(esbuildParams);
        } catch (e) {
          console.log(e);
          return reject(e);
        }

        return resolve(true);

        // async function rewriteImports(code) {
        //   return '';

        //   // const reg = /\sfrom\s['"`](.*)['"`];?/gm;
        //   // let match = reg.exec(code);
        //   // do {
        //   //   if (!match) continue;
        //   //   if (match[1].match(/^[\.\/]/)) continue;

        //   //   // const absPath = `${__sugarConfig('storage.nodeModulesDir')}/${match[1]}`;
        //   //   // if (__fs.existsSync())

        //   //   const res = __resolve(match[1], {
        //   //     fields:
        //   //       params.format === 'esm'
        //   //         ? ['module', 'main', 'browser']
        //   //         : ['main', 'browser', 'module']
        //   //   });

        //   //   if (res) {
        //   //     const list = await pipeFrom(
        //   //       __dependencyTree(res, {
        //   //         // cache: true
        //   //       })
        //   //     );

        //   //     _console.log(list);

        //   //     code = code.replace(
        //   //       match[0],
        //   //       ` from "${res.replace(__sugarConfig('storage.rootDir'), '')}";`
        //   //     );
        //   //   }
        //   // } while ((match = reg.exec(code)) !== null);
        //   // return code;
        // }

        // const resultJs = await rewriteImports(
        //   [
        //     params.banner || '',
        //     'let process = {};' + resultObj.outputFiles[0].text
        //   ].join('\n')
        // );

        // // check if need to save
        // if (params.save) {
        //   // build the save path
        //   emit('log', {
        //     type: 'file',
        //     file: this.toObject(),
        //     to: savePath.replace(`${__sugarConfig('storage.rootDir')}/`, ''),
        //     action: 'save'
        //   });
        //   this.writeSync(resultJs, {
        //     path: savePath
        //   });
        //   if (params.map) {
        //     // this.writeSync(result.js.map.toString(), {
        //     //   path: savePath.replace(/\.js$/, '.js.map')
        //     // });
        //     // emit('log', {
        //     //   type: 'file',
        //     //   action: 'saved',
        //     //   to: savePath
        //     //     .replace(/\.js$/, '.js.map')
        //     //     .replace(`${__sugarConfig('storage.rootDir')}/`, ''),
        //     //   file: this.toObject()
        //     // });
        //   }

        //   emit('log', {
        //     type: 'file',
        //     action: 'saved',
        //     to: savePath.replace(`${__sugarConfig('storage.rootDir')}/`, ''),
        //     file: this.toObject()
        //   });
        // }

        // emit('log', {
        //   type: 'separator'
        // });

        // if (params.watch) {
        //   emit('log', {
        //     value: `<blue>[watch] </blue>Watching for changes...`
        //   });
        // }

        return resolve({
          js: 'efewf',
          map: undefined, // @todo      handle map
          esbuild: resultObj,
          ...duration.end()
        });
      }
    );
  }

  /**
   * @name            ast
   * @type            Function
   * @status        wip
   *
   * This method parse the file and return his AST (abstract syntax tree)
   *
   * @param       {ISJsFileAstSettings}         [settings={}]       Some settings to configure your AST generation. Support all the acorn.parse settings
   * @return      {Any}                                             The AST representation of this file
   *
   * @todo        implement this method
   */
}

export default SJsFile;
