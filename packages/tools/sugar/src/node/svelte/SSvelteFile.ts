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

const __svelte = require('svelte/compiler');

import __SInterface from '../interface/SInterface';
import {
  ISSvelteCompilerParams,
  ISSvelteCompilerOptionalParams
} from './compile/SSvelteCompiler';
import __SSvelteCompilerParamsInterface from './compile/interface/SSvelteCompilerParamsInterface';

/**
 * @name          SSvelteFileSettingsInterface
 * @type            Class
 * @extends         SInterface
 * @beta
 *
 * The interface describing the svelteFile settings
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export class SSvelteFileSettingsInterface extends __SInterface {
  static definition: {};
}

/**
 * @name          SSvelteFileCtorSettingsInterface
 * @type            Class
 * @extends         SInterface
 * @beta
 *
 * The interface describing the svelteFile settings
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export class SSvelteFileCtorSettingsInterface extends __SInterface {
  static definition: {
    svelteFile: {
      interface: SSvelteFileSettingsInterface;
      type: 'Object';
      required: true;
    };
  };
}

/**
 * @name            SSvelteFile
 * @namespace       sugar.node.svelte
 * @type            Class
 * @extends         SFile
 * @beta
 *
 * This represent a svelte file
 *
 * @param       {String}            path            The path to the scss file
 * @param       {ISSvelteFileSettings}     [settings={}]       Some settings to configure your file
 *
 * @example         js
 * import SSvelteFile from '@coffeekraken/sugar/node/svelte/SSvelteFile';
 * const file = new SSvelteFile('/my/cool/file.svelte');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

interface ISSvelteFileCompileOptionalSettings {}
interface ISSvelteFileCompileSettings {}

interface ISSvelteFileOptionalSettings {
  compile?: ISSvelteFileCompileOptionalSettings;
}
interface ISSvelteFileSettings {
  compile: ISSvelteFileCompileOptionalSettings;
}
interface ISSvelteFileCtorSettings {
  svelteFile?: ISSvelteFileOptionalSettings;
}

interface ISSvelteFile {
  _fileCache: __SFileCache;
  compile(
    params: ISSvelteCompilerParams,
    settings?: ISSvelteFileOptionalSettings
  );
}

// @ts-ignore
class SSvelteFile extends __SFile implements ISSvelteFile {
  static interfaces = {
    compilerParams: {
      apply: false,
      class: __SSvelteCompilerParamsInterface
    }
    // _settings: {
    //   apply: true,
    //   class: SSvelteFileCtorSettingsInterface
    // }
  };

  /**
   * @name      svelteFileSettings
   * @type      ISSvelteFileSettings
   * @get
   *
   * Access the svelteFile settings
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get svelteFileSettings(): ISSvelteFileSettings {
    return (<any>this._settings).svelteFile;
  }

  _fileCache: __SFileCache;

  static COMPILED_SVELTE: any = {};
  static FILES: any = {};

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
  constructor(path: string, settings: ISSvelteFileCtorSettings = {}) {
    super(
      path,
      __deepMerge(
        {
          id: __getFilename(path),
          svelteFile: {}
        },
        settings
      )
    );

    // store this instance in a stack to avoid creating multiple instances of the same file
    SSvelteFile.FILES[this.path] = this;

    this._fileCache = new __SFileCache(this.constructor.name);
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
          <ISSvelteCompilerParams>this._currentCompilationParams
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
   * @param         {ISSvelteFileCompileSettings}         [settings={}]           Some settings to configure your compilation process
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
  _currentCompilationSettings: ISSvelteFileOptionalSettings = {};
  _currentCompilationParams: ISSvelteCompilerOptionalParams = {};
  compile(
    params: ISSvelteCompilerParams,
    settings?: ISSvelteFileOptionalSettings
  ) {
    settings = __deepMerge(this.svelteFileSettings, settings);
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

        // RENDERING HERE
        const result = __svelte.compile(toCompile, {
          filename: this.name,
          dev: !params.prod,
          preserveComments: !params.stripComments,
          preserveWhitespace: !params.prod,
          outputFilename: this.name,
          cssOutputFilename: this.name,
          ...(params.svelte || {})
        });

        result.warnings.forEach((warning) => {
          emit('warn', {
            value: warning.toString()
          });
        });

        // nativeConsole.log(result);

        // check if need to save
        if (params.save && params.outputDir) {
          // build the save path
          const savePath = __path.resolve(
            params.outputDir,
            this.path
              .replace(`${params.rootDir}/`, '')
              .replace(/\.svelte$/, '.js')
          );
          emit('log', {
            type: 'file',
            file: this,
            to: savePath.replace(`${__sugarConfig('storage.rootDir')}/`, ''),
            action: 'save'
          });
          this.writeSync(result.js.code, {
            path: savePath
          });

          // notify end
          const time = duration.end();

          emit('log', {
            type: 'file',
            action: 'saved',
            to: savePath.replace(`${__sugarConfig('storage.rootDir')}/`, ''),
            file: this
          });
        }

        // emit('log', {
        //   value: `<green>[success]</green> File "<cyan>${this.relPath}</cyan>" compiled <green>successfully</green> in <yellow>${time}s</yellow>`
        // });

        if (params.watch) {
          emit('log', {
            value: `<blue>[watch] </blue>Watching for changes...`
          });
        }

        return resolve(result);
      } catch (e) {
        console.log(e);
        // .log(e);
        return reject(e.toString());
      }

      return true;
    });
  }

  update() {
    super.update();
  }
}

// import getExtendsStack from '../class/getExtendsStack';

// class Sup {
//   static coco = {
//     hello: 'world'
//   };
//   constructor() {
//     console.log(
//       getExtendsStack(this, {
//         includeBaseClass: true
//       })
//     );
//   }
// }

// class Middle extends Sup {
//   static coco = {
//     plop: 'OPOP',
//     hello: 'HELLO'
//   };
//   constructor() {
//     super();
//   }
// }

// class Sub extends Middle {
//   static coco = {
//     plop: 'rop',
//     hello: 'hello'
//   };
//   constructor() {
//     super();
//   }
// }
// const sub = new Sub();

export default SSvelteFile;
