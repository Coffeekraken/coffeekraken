import __SFile from '../fs/SFile';
import __md5 from '../crypt/md5';
import __SDuration from '../time/SDuration';
import __path from 'path';
import __SPromise from '../promise/SPromise';
import __deepMerge from '../object/deepMerge';
import __sugarConfig from '../config/sugar';
import __SFileCache from '../cache/SFileCache';
import __toString from '../string/toString';
import __wait from '../time/wait';
import __getFilename from '../fs/filename';
import * as __esbuild from 'esbuild';
import __resolve from 'resolve';
import __filter from '../object/filter';
import __esbuildScssLoaderPlugin from './compile/plugins/esbuild/esbuildScssLoaderPlugin';
import __SEventEmitter from '../event/SEventEmitter';

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
  }

  /**
   * @name        _startWatch
   * @type        Function
   * @private
   *
   * Start to watch the file. Does this only once
   * to avoid multiple compilation and logs
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  private _startWatch() {
    // listen for change event
    this.on('update', (file, metas) => {
      if (this._currentCompilationParams.watch) {
        const promise = this.compile(
          <ISJsCompilerParams>this._currentCompilationParams
        );
        this.emit('log', {
          clear: true,
          type: 'file',
          action: 'update',
          file
        });
      }
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
  _currentCompilationSettings: Partial<ISJsFileSettings> = {};
  _currentCompilationParams: Partial<ISJsCompilerParams> = {};
  compile(params: ISJsCompilerParams, settings?: Partial<ISJsFileSettings>) {
    // init the promise
    return new __SPromise(async ({ resolve, reject, emit, pipeTo, on }) => {
      settings = __deepMerge(this.jsFileSettings, settings);
      this._currentCompilationParams = Object.assign({}, params);
      this._currentCompilationSettings = Object.assign({}, settings);

      params = this.applyInterface('compilerParams', params);

      if (params.watch) {
        this.startWatch();
      }

      // listen for the end
      on('finally', () => {
        this._isCompiling = false;
      });

      pipeTo(this);

      if (this._isCompiling) {
        emit('warn', {
          value: `This file is compiling at this time. Please wait the end of the compilation before running another one...`
        });
        return;
      }
      this._isCompiling = true;

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
        value: `<yellow>[compiling]</yellow> file "<cyan>${this.relPath}</cyan>"`
      });

      // prod
      if (params.prod || params.bundle) {
        params.minify = true;
        params.stripComments = true;
        params.map = false;
      }

      let esbuildParams: any = {
        charset: 'utf8',
        logLevel: 'silent',
        ...__filter(params, (key, value) => {
          if (Array.isArray(value) && !value.length) return false;
          return __SJsCompiler._esbuildAcceptedSettings.indexOf(key) !== -1;
        }),
        entryPoints: [this.path],
        bundle: params.bundle,
        write: false,
        minify: params.minify,
        sourcemap: params.map,
        ...params.esbuild
      };

      const buildPromise = new Promise(async (buildResolve, buildReject) => {
        const buildService = await __esbuild.startService();
        buildService
          .build(esbuildParams)
          .then((resultObj) => {
            buildResolve(resultObj);
          })
          .catch((e) => buildReject(e));
      });

      const resultObj: any = await buildPromise;

      const resultJs = [
        params.banner || '',
        'let process = {};' + resultObj.outputFiles[0].text
      ].join('\n');

      // check if need to save
      if (params.save) {
        // build the save path
        let savePath;
        if (params.outputDir === undefined) {
          savePath = this.path.replace(/\.js$/, '.builded.js');
        } else {
          savePath = __path.resolve(
            params.outputDir,
            this.path.replace(`${params.rootDir}/`, '')
          );
        }
        emit('log', {
          type: 'file',
          file: this,
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
          //   file: this
          // });
        }

        emit('log', {
          type: 'file',
          action: 'saved',
          to: savePath.replace(`${__sugarConfig('storage.rootDir')}/`, ''),
          file: this
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
