import __SFile from '../fs/SFile';
import __findImportStatements from './utils/findImportStatements';
import __resolveDependency from './utils/resolveDependency';
import { parse as __parseScss } from 'scss-parser';
import { stringify as __stringifyScss } from 'scss-parser';
import __createQueryWrapper from 'query-ast';
import __sass from 'sass';
import __md5 from '../crypt/md5';
import __SDuration from '../time/SDuration';
import __path from 'path';
import __SPromise from '../promise/SPromise';
import __deepMerge from '../object/deepMerge';
import __sugarConfig from '../config/sugar';
import __SFileCache from '../cache/SFileCache';
import __putUseStatementsOnTop from './utils/putUseStatementsOnTop';
import __toString from '../string/toString';
import __csso from 'csso';
import __stripCssComments from '../css/stripCssComments';
import __repl from 'repl';
import __getSharedResourcesString from './utils/getSharedResourcesString';
import __wait from '../time/wait';
import __getFilename from '../fs/filename';

import __SInterface from '../interface/SInterface';
import { ISFile, ISFileSettings } from '../fs/SFile';
import {
  ISScssCompilerParams,
  ISScssCompilerOptionalParams
} from './compile/SScssCompiler';
import __SScssCompilerParamsInterface from './compile/interface/SScssCompilerParamsInterface';

/**
 * @name      SScssFileSettingsInterface
 * @type      Class
 * @extends     SInterface
 * @beta
 *
 * Scss file settings interface
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export class SScssFileSettingsInterface extends __SInterface {
  static definition = {};
}

/**
 * @name      SScssFileCtorSettingsInterface
 * @type      Class
 * @extends     SInterface
 * @beta
 *
 * Scss file constructor settings interface
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export class SScssFileCtorSettingsInterface extends __SInterface {
  static definition = {
    scssFile: {
      interface: SScssFileSettingsInterface,
      type: 'Object',
      required: true
    }
  };
}

/**
 * @name            SScssFile
 * @namespace       sugar.node.scss
 * @type            Class
 * @extends         SFile
 * @beta
 *
 * This represent an scss file with some additional properties like "dependencies", etc...
 *
 * @param       {String}            path            The path to the scss file
 * @param       {ISScssFileSettings}     [settings={}]       Some settings to configure your file
 *
 * @example         js
 * import SScssFile from '@coffeekraken/sugar/node/scss/SScssFile';
 * const file = new SScssFile('/my/cool/file.scss');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

interface ISScssFileCompileOptionalSettings {}
interface ISScssFileCompileSettings {}

interface ISScssFileOptionalSettings {
  compile?: ISScssFileCompileOptionalSettings;
}
interface ISScssFileSettings {
  compile: ISScssFileCompileOptionalSettings;
}
interface ISScssFileCtorSettings {
  scssFile?: ISScssFileOptionalSettings;
}

interface ISScssFile {
  _fileCache: __SFileCache;
  _sharedResources: string;
  mixinsAndVariables: string;
  dependencies: Array<ISScssFile>;
  compile(params: ISScssCompilerParams, settings?: ISScssFileOptionalSettings);
}

class SScssFile extends __SFile implements ISScssFile {
  static interfaces = {
    compilerParams: {
      apply: false,
      class: __SScssCompilerParamsInterface
    },
    _settings: {
      apply: true,
      class: SScssFileCtorSettingsInterface
    }
  };

  /**
   * @name      scssFileSettings
   * @type      ISScssFileSettings
   * @get
   *
   * Access the scssFile settings
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get scssFileSettings(): ISScssFileSettings {
    return (<any>this._settings).scssFile;
  }

  /**
   * @name        dependencyType
   * @type        String
   * @values      main, import, use
   * @default     main
   *
   * Store the dependendy type of this file.
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _import: any = {
    type: 'main'
  };

  _fileCache: __SFileCache;
  _sharedResources;

  static COMPILED_CSS: any = {};
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
  constructor(path: string, settings: ISScssFileCtorSettings = {}) {
    super(
      path,
      __deepMerge(
        {
          id: __getFilename(path),
          scssFile: {}
        },
        settings
      )
    );

    console.log(this._settings);

    // store this instance in a stack to avoid creating multiple instances of the same file
    SScssFile.FILES[this.path] = this;

    this._fileCache = new __SFileCache(this.constructor.name);
  }

  /**
   * @name        dependencies
   * @type        Object<SScssFile>
   * @get
   *
   * Get the dependencies of this file
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _dependencies: any;
  get dependencies() {
    // cache
    if (this._dependencies) return this._dependencies;

    // read the file
    const content = this.readSync();

    // find dependencies
    let deps: any = __findImportStatements(content);

    deps = deps
      .map((dep) => {
        const f = __resolveDependency(dep.path, {
          from: this.path
        });
        return {
          path: f,
          import: dep
        };
      })
      .filter((p) => p.path !== undefined)
      .map((obj) => {
        let file;
        if (SScssFile.FILES[obj.path]) file = SScssFile.FILES[obj.path];
        else {
          file = new SScssFile(obj.path, {
            scssFile: <ISScssFileSettings>(
              __deepMerge(
                this.scssFileSettings,
                this._currentCompilationSettings
              )
            )
          });
          file.pipeTo(this, {
            events: 'update'
          });
        }
        file._import = obj.import;
        return file;
      });

    if (Object.keys(deps).length) {
      this._dependencies = deps;
    }

    return this._dependencies || [];
  }

  /**
   * @name          dependenciesHash
   * @type          String
   * @get
   *
   * Parse the content of the file to find the dependencies like import and use statements,
   * then generate a hash depending on these dependencies
   *
   * @since        2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get dependenciesHash() {
    const hashesStrArray = [];
    // @ts-ignore
    const content = [this._sharedResources || '', this.content].join('\n');
    const imports = __findImportStatements(content)
      // .filter(
      //   // @ts-ignore
      //   (importObj) => importObj.type === 'use'
      // )
      .forEach((useObj) => {
        // @ts-ignore
        const realPath: string = __resolveDependency(useObj.path, {
          from: this.path
        });
        if (!realPath) {
          // @ts-ignore
          this.emit('warn', {
            value: [
              `It seems that you're trying to load a file that does not exists:`,
              `- From: <cyan>${this.path}</cyan>`,
              // @ts-ignore
              `- ${useObj.raw}`
            ].join('\n')
          });
          return;
        }

        let useFile;
        if (SScssFile.FILES[realPath]) useFile = SScssFile.FILES[realPath];
        else
          useFile = useFile = new SScssFile(realPath, {
            scssFile: <ISScssFileSettings>(
              __deepMerge(
                this.scssFileSettings,
                this._currentCompilationSettings
              )
            )
          });
        [useFile, ...useFile.dependencies].forEach((depFile) => {
          // @ts-ignore
          hashesStrArray.push(depFile.hash);
        });
      });

    return __md5.encrypt(hashesStrArray.join('-'));
  }

  /**
   * @name          mixinsAndVariables
   * @type          String
   * @get
   *
   * Get the mixins and variables from the file content
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _mixinsAndVariables: any = undefined;
  get mixinsAndVariables() {
    // cache
    if (this._mixinsAndVariables) return this._mixinsAndVariables;

    // extract the things that can be used
    // by others like mixins and variables declarations$
    const ast = __parseScss(this.content);
    const $ = __createQueryWrapper(ast);
    this._mixinsAndVariables = '';
    const nodes = $('stylesheet')
      .children()
      .filter((node) => {
        return (
          (node.node.type === 'atrule' &&
            node.node.value[0].value === 'mixin') ||
          node.node.type === 'declaration'
        );
      });
    nodes.nodes.forEach((node) => {
      this._mixinsAndVariables += `\n${__stringifyScss(node.node)}`;
    });

    return this._mixinsAndVariables;
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
      if (this._currentCompilationParams.compileOnChange) {
        const promise = this.compile(
          <ISScssCompilerParams>this._currentCompilationParams
        );
        this.emit('log', {
          value: `<blue>[updated]</blue> "<cyan>${file.relPath}</cyan>"`
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
   * @param         {ISScssFileCompileSettings}         [settings={}]           Some settings to configure your compilation process
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
  _currentCompilationSettings: ISScssFileOptionalSettings = {};
  _currentCompilationParams: ISScssCompilerOptionalParams = {};
  compile(params: ISScssCompilerParams, settings?: ISScssFileOptionalSettings) {
    settings = __deepMerge(this.scssFileSettings, settings);
    this._currentCompilationParams = Object.assign({}, params);
    this._currentCompilationSettings = Object.assign({}, settings);

    this.applyInterface('compilerParams', params);

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

      // sass settings
      const sassSettings = {
        outputStyle: params.style || __sugarConfig('scss.compile.style'),
        sourceMap:
          params.map !== undefined
            ? params.map
            : __sugarConfig('scss.compile.map'),
        includePaths: [
          this.dirPath,
          ...__sugarConfig('scss.compile.includePaths')
        ],
        ...(params.sass || {})
      };

      // start watching the file if needed
      if (params.watch) {
        this.startWatch();
      }

      emit('log', {
        type: 'separator'
      });

      // notify start
      emit('log', {
        value: `Starting "<cyan>${this.relPath}</cyan>" compilation`
      });

      const duration = new __SDuration();

      await __wait(0);

      if (params.clearCache) await this._fileCache.clear();
      let toCompile = this.content;

      // @ts-ignore
      this._sharedResources = __getSharedResourcesString(
        // @ts-ignore
        params.sharedResources
      );

      if (this._import.type === 'main') {
        SScssFile.COMPILED_CSS = [];
      }

      const depsArray = this.dependencies;
      for (let i = 0; i < depsArray.length; i++) {
        const depFile = depsArray[i];
        // avoid compiling @use statements
        if (depFile._import && depFile._import.type === 'use') {
          continue;
        }

        // compile the dependency
        const res = await depFile.compile(
          {
            ...params,
            clearCache: false
          },
          settings
        );

        // replace the import in the content
        toCompile = toCompile.replace(depFile._import.raw, ``);
      }

      // check if we are loaded through a "use"
      if (this._import.type === 'use') {
        return resolve(`@use "${this.path}" as ${this._import.as}`);
      }

      const dependenciesHash = this.dependenciesHash;

      // check cache
      const cachedValue = await this._fileCache.get(this.path);
      if (
        cachedValue &&
        cachedValue.dependenciesHash === dependenciesHash &&
        params.cache
      ) {
        // console.log('from cache');
        let result = cachedValue.css;
        SScssFile.COMPILED_CSS[this.path] = result;

        emit('log', {
          value: `<green>[from cache]</green> "<cyan>${this.relPath}</cyan>"`
        });

        if (this._import.type === 'main') {
          // prepend all the compiled css
          // @ts-ignore
          result = [...Object.values(SScssFile.COMPILED_CSS), result].join(
            '\n'
          );
        }

        // process the result
        result = this._processResultCss(result, params);

        // check if need to save
        if (this._import.type === 'main' && params.save && params.outputDir) {
          // build the save path
          const savePath = __path.resolve(
            params.outputDir,
            this.path
              .replace(`${params.rootDir}/`, '')
              .replace(/\.s[ac]ss$/, '.css')
          );
          emit('log', {
            value: `Saving the file "<cyan>${
              this.relPath
            }</cyan>" to "<magenta>${savePath.replace(
              `${__sugarConfig('storage.rootDir')}/`,
              ''
            )}</magenta>" `
          });
          this.writeSync(result, {
            path: savePath
          });

          // notify end
          const time = duration.end();
          emit('log', {
            value: `File "<cyan>${this.relPath}</cyan>" compiled <green>successfully</green> in <yellow>${time}s</yellow>`
          });

          if (params.watch) {
            emit('log', {
              value: `<blue>Watching for changes...</blue>`
            });
          }
        }

        return resolve(result);
      }

      if (this._sharedResources) {
        toCompile = [this._sharedResources, toCompile].join('\n');
      }

      toCompile = __putUseStatementsOnTop(toCompile);

      let renderObj;
      try {
        emit('log', {
          value: `<yellow>[compiling]</yellow> "<cyan>${this.relPath}</cyan>"`
        });

        // console.log('comepile', toCompile);
        renderObj = __sass.renderSync({
          ...sassSettings,
          data: toCompile
        });

        // save in cache
        if (params.cache) {
          // console.log('save in cache', this.path);
          // @ts-ignore
          await this._fileCache.set(this.path, {
            dependenciesHash,
            css: renderObj.css.toString()
          });
        }

        if (this._import.type === 'main') {
          let result = renderObj.css.toString();

          // prepend all the compiled css
          result = [...Object.values(SScssFile.COMPILED_CSS), result].join(
            '\n'
          );

          result = this._processResultCss(result, params);

          // check if need to save
          if (params.save && params.outputDir) {
            // build the save path
            const savePath = __path.resolve(
              params.outputDir,
              this.path
                .replace(`${params.rootDir}/`, '')
                .replace(/\.s[ac]ss$/, '.css')
            );
            emit('log', {
              value: `Saving the file "<cyan>${
                this.relPath
              }</cyan>" to "<magenta>${savePath.replace(
                `${__sugarConfig('storage.rootDir')}/`,
                ''
              )}</magenta>" `
            });
            this.writeSync(result, {
              path: savePath
            });
          }

          // notify end
          const time = duration.end();
          emit('log', {
            value: `File "<cyan>${this.relPath}</cyan>" compiled <green>successfully</green> in <yellow>${time}s</yellow>`
          });

          if (params.watch) {
            emit('log', {
              value: `<blue>Watching for changes...</blue>`
            });
          }

          return resolve(result);
        } else {
          if (params.watch) {
            emit('log', {
              value: `<blue>Watching for changes...</blue>`
            });
          }

          SScssFile.COMPILED_CSS[this.path] = renderObj.css;
          return resolve(
            this._processResultCss(renderObj.css.toString(), params)
          );
        }
      } catch (e) {
        // .log(e);
        return reject(e.toString());
      }

      return true;
    });
  }

  _processResultCss(css, params: ISScssCompilerParams) {
    // remove @charset "UTF-8";
    css = css.replace(/@charset "UTF-8";/gm, '');

    if (params.stripComments) {
      css = __stripCssComments(css);
    }

    if (params.minify) {
      css = __csso.minify(css, {
        comments: false
      }).css;
    }

    // remove empty lines
    css = css.split(/^\s*[\r\n]/gm).join('');

    return css;
  }

  update() {
    this._mixinsAndVariables = undefined;
    this._dependencies = undefined;
    super.update();
  }
}

export default SScssFile;
