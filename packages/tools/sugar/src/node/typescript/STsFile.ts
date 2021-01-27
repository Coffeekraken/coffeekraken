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

import __SInterface from '../interface/SInterface';
import {
  ISTsCompilerParams,
  ISTsCompilerOptionalParams
} from './compile/STsCompiler';
import __STsCompilerParamsInterface from './compile/interface/STsCompilerParamsInterface';

/**
 * @name          STsFileSettingsInterface
 * @type            Class
 * @extends         SInterface
 * @beta
 *
 * The interface describing the tsFile settings
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export class STsFileSettingsInterface extends __SInterface {
  static definition: {};
}

/**
 * @name          STsFileCtorSettingsInterface
 * @type            Class
 * @extends         SInterface
 * @beta
 *
 * The interface describing the tsFile settings
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export class STsFileCtorSettingsInterface extends __SInterface {
  static definition: {
    tsFile: {
      interface: STsFileSettingsInterface;
      type: 'Object';
      required: true;
    };
  };
}

/**
 * @name            STsFile
 * @namespace       sugar.node.typescript
 * @type            Class
 * @extends         SFile
 * @beta
 *
 * This represent a typescript file
 *
 * @param       {String}            path            The path to the scss file
 * @param       {ISTsFileSettings}     [settings={}]       Some settings to configure your file
 *
 * @example         js
 * import STsFile from '@coffeekraken/sugar/node/typescript/STsFile';
 * const file = new STsFile('/my/cool/file.ts');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

interface ISTsFileCompileOptionalSettings {}
interface ISTsFileCompileSettings {}

interface ISTsFileOptionalSettings {
  compile?: ISTsFileCompileOptionalSettings;
}
interface ISTsFileSettings {
  compile: ISTsFileCompileOptionalSettings;
}
interface ISTsFileCtorSettings {
  tsFile?: ISTsFileOptionalSettings;
}

interface ISTsFile {
  compile(params: ISTsCompilerParams, settings?: ISTsFileOptionalSettings);
}

// @ts-ignore
class STsFile extends __SFile implements ISTsFile {
  static interfaces = {
    compilerParams: {
      apply: false,
      class: __STsCompilerParamsInterface
    },
    settings: {
      apply: true,
      on: '_settings',
      class: STsFileCtorSettingsInterface
    }
  };

  /**
   * @name      tsFileSettings
   * @type      ISTsFileSettings
   * @get
   *
   * Access the tsFile settings
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get tsFileSettings(): ISTsFileSettings {
    return (<any>this._settings).tsFile;
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
  constructor(path: string, settings: ISTsFileCtorSettings = {}) {
    super(
      path,
      __deepMerge(
        {
          id: __getFilename(path),
          tsFile: {}
        },
        settings
      )
    );
  }

  /**
   * @name        _watch
   * @type        Function
   * @private
   *
   * Start to watch the file. Does this only once
   * to avoid multiple compilation and logs
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _alreadyWatch = false;
  private _watch() {
    if (this._alreadyWatch) return;
    this._alreadyWatch = true;

    if (!this._currentCompilationParams) return;

    // start watching the file if needed
    if (this._currentCompilationParams.watch) {
      this.startWatch();
    }

    // listen for change event
    this.on('update', (file, metas) => {
      if (this._currentCompilationParams.watch) {
        const promise = this.compile(
          <ISTsCompilerParams>this._currentCompilationParams
        );
        this.emit('log', {
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
   * @param         {ISTsFileCompileSettings}         [settings={}]           Some settings to configure your compilation process
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _isCompiling = false;
  _currentCompilationSettings: ISTsFileOptionalSettings = {};
  _currentCompilationParams: ISTsCompilerOptionalParams = {};
  compile(params: ISTsCompilerParams, settings?: ISTsFileOptionalSettings) {
    settings = __deepMerge(this.tsFileSettings, settings);
    this._currentCompilationParams = Object.assign({}, params);
    this._currentCompilationSettings = Object.assign({}, settings);

    params = this.applyInterface('compilerParams', params);

    if (params.watch) {
      this._watch();
    }

    // init the promise
    return new __SPromise(async ({ resolve, reject, emit, pipeTo, on }) => {
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
        type: 'separator'
      });

      // notify start
      emit('log', {
        value: `<yellow>[start]</yellow> Starting "<cyan>${this.relPath}</cyan>" compilation`
      });

      const duration = new __SDuration();

      await __wait(0);

      let toCompile = this.content;

      try {
        emit('log', {
          value: `<yellow>[compiling]</yellow> file "<cyan>${this.relPath}</cyan>"`
        });

        const result = true;

        // RENDERING HERE
        // const result = __svelte.compile(toCompile, {
        //   filename: this.name,
        //   dev: !params.prod,
        //   preserveComments: !params.stripComments,
        //   preserveWhitespace: !params.prod,
        //   outputFilename: this.name,
        //   cssOutputFilename: this.name,
        //   ...(params.tsconfig || {})
        // });

        // result.warnings.forEach((warning) => {
        //   emit('warn', {
        //     value: warning.toString()
        //   });
        // });

        // nativeConsole.log(result.js.map.toString());

        // check if need to save
        // if (params.save) {
        //   // build the save path
        //   let savePath;
        //   if (params.outputDir === undefined) {
        //     savePath = this.path.replace(/\.svelte$/, '.js');
        //   } else {
        //     savePath = __path.resolve(
        //       params.outputDir,
        //       this.path
        //         .replace(`${params.rootDir}/`, '')
        //         .replace(/\.svelte$/, '.js')
        //     );
        //   }
        //   emit('log', {
        //     type: 'file',
        //     file: this,
        //     to: savePath.replace(`${__sugarConfig('storage.rootDir')}/`, ''),
        //     action: 'save'
        //   });
        //   this.writeSync(result.js.code, {
        //     path: savePath
        //   });
        //   if (params.map) {
        //     this.writeSync(result.js.map.toString(), {
        //       path: savePath.replace(/\.js$/, '.js.map')
        //     });
        //     emit('log', {
        //       type: 'file',
        //       action: 'saved',
        //       to: savePath
        //         .replace(/\.js$/, '.js.map')
        //         .replace(`${__sugarConfig('storage.rootDir')}/`, ''),
        //       file: this
        //     });
        //   }

        //   // notify end
        //   const time = duration.end();

        //   emit('log', {
        //     type: 'file',
        //     action: 'saved',
        //     to: savePath.replace(`${__sugarConfig('storage.rootDir')}/`, ''),
        //     file: this
        //   });
        // }

        // if (params.watch) {
        //   emit('log', {
        //     value: `<blue>[watch] </blue>Watching for changes...`
        //   });
        // }

        return resolve(result);
      } catch (e) {
        return reject(e.toString());
      }

      return true;
    });
  }
}

export default STsFile;
