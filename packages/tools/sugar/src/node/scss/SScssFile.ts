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

import __ISFile from '../fs/interface/ISFile';
import { ISFileSettings } from '../fs/interface/ISFile';
import __ISScssCompileParams from './compile/interface/ISScssCompileParams';
import __SScssCompileParamsInterface from './compile/interface/SScssCompileParamsInterface';

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
 * @param       {IScssFileSettings}     [settings={}]       Some settings to configure your file
 *
 * @example         js
 * import SScssFile from '@coffeekraken/sugar/node/scss/SScssFile';
 * const file = new SScssFile('/my/cool/file.scss');
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
interface ISScssFileSettings extends ISFileSettings {
  compile?: __ISScssCompileParams;
}

interface ISScssFile extends __ISFile {
  _fileCache: __SFileCache;
  _sharedResources: string;
  mixinsAndVariables: string;
  dependencies: Array<ISScssFile>;
}

export = class SScssFile extends __SFile {
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
  constructor(path: string, settings: ISScssFileSettings = {}) {
    super(path, settings);
    this._settings.compile = __deepMerge(
      __SScssCompileParamsInterface.defaults(),
      this._settings.compile || {}
    );

    SScssFile.FILES[this.path] = this;

    this._fileCache = new __SFileCache(this.constructor.name);

    // start watching the file if needed
    // @ts-ignore
    if (settings.compile.watch) {
      this.startWatch();
    }

    // listen for change event
    // @ts-ignore
    this.on('update', () => {
      console.log('UP');
      if (this._settings.compile.compileOnChange) {
        const promise = this.compile(this._settings.compile);
        // @ts-ignore
        promise.trigger('log', {
          value: `<blue>[updated]</blue> ""`
        });
      }
    });
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
        else
          file = file = new SScssFile(
            obj.path,
            __deepMerge(this._settings, {
              compile: {
                ...(this._settings.compile || {}),
                ...(this._currentCompilationSettings || {})
              }
            })
          );
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
          this.trigger('warn', {
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
          useFile = useFile = new SScssFile(
            realPath,
            __deepMerge(this._settings, {
              compile: {
                ...(this._settings.compile || {}),
                ...(this._currentCompilationSettings || {})
              }
            })
          );
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
  _currentCompilationSettings;
  compile(settings: __ISScssCompileParams = {}) {
    settings = __deepMerge(
      {
        ...__SScssCompileParamsInterface.defaults()
      },
      this._settings.compile || {},
      settings
    );
    this._currentCompilationSettings = Object.assign({}, settings);

    // init the promise
    const promise = new __SPromise({});

    // listen for the end
    promise.on('finally', () => {
      this._isCompiling = false;
    });

    // // pipe this promise
    // @ts-ignore
    this.pipe(promise);

    if (this._isCompiling) {
      promise.trigger('warn', {
        value: `This file is compiling at this time. Please wait the end of the compilation before running another one...`
      });
      return;
    }
    this._isCompiling = true;

    // sass settings
    const sassSettings = {
      outputStyle: settings.style || __sugarConfig('scss.compile.style'),
      sourceMap:
        settings.map !== undefined
          ? settings.map
          : __sugarConfig('scss.compile.map'),
      includePaths: [
        this.dirPath,
        ...__sugarConfig('scss.compile.includePaths')
      ],
      ...(settings.sass || {})
    };

    // start watching the file if needed
    if (settings.watch) {
      this.startWatch();
    }

    promise.trigger('log', {
      type: 'separator'
    });

    // notify start
    promise.trigger('log', {
      value: `Starting "<cyan>${this.relPath}</cyan>" compilation`
    });

    const duration = new __SDuration();

    (async () => {
      await __wait(0);

      if (settings.clearCache) await this._fileCache.clear();
      let toCompile = this.content;

      // @ts-ignore
      this._sharedResources = __getSharedResourcesString(
        // @ts-ignore
        settings.sharedResources
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

        // promise.trigger('log', {
        //   value: `<yellow>[dependency]</yellow> "<cyan>${depFile.relPath}</cyan>"`
        // });

        // compile the dependency
        const res = await depFile.compile({
          ...settings,
          clearCache: false
        });

        // replace the import in the content
        toCompile = toCompile.replace(depFile._import.raw, ``);
      }

      // check if we are loaded through a "use"
      if (this._import.type === 'use') {
        return promise.resolve(`@use "${this.path}" as ${this._import.as}`);
      }

      const dependenciesHash = this.dependenciesHash;

      // check cache
      const cachedValue = await this._fileCache.get(this.path);
      if (
        cachedValue &&
        cachedValue.dependenciesHash === dependenciesHash &&
        settings.cache
      ) {
        // console.log('from cache');
        let result = cachedValue.css;
        SScssFile.COMPILED_CSS[this.path] = result;

        promise.trigger('log', {
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
        result = this._processResultCss(result, settings);

        // check if need to save
        if (
          this._import.type === 'main' &&
          settings.save &&
          settings.outputDir
        ) {
          // build the save path
          const savePath = __path.resolve(
            settings.outputDir,
            this.path
              .replace(`${settings.rootDir}/`, '')
              .replace(/\.s[ac]ss$/, '.css')
          );
          promise.trigger('log', {
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
          promise.trigger('log', {
            value: `File "<cyan>${this.relPath}</cyan>" compiled <green>successfully</green> in <yellow>${time}s</yellow>`
          });
        }

        return promise.resolve(result);
      }

      if (this._sharedResources) {
        toCompile = [this._sharedResources, toCompile].join('\n');
      }

      toCompile = __putUseStatementsOnTop(toCompile);

      let renderObj;
      try {
        promise.trigger('log', {
          value: `<yellow>[compiling]</yellow> "<cyan>${this.relPath}</cyan>"`
        });

        // console.log('comepile', toCompile);
        renderObj = __sass.renderSync({
          ...sassSettings,
          data: toCompile
        });

        // save in cache
        if (settings.cache) {
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

          result = this._processResultCss(result, settings);

          // check if need to save
          if (settings.save && settings.outputDir) {
            // build the save path
            const savePath = __path.resolve(
              // @ts-ignore
              settings.outputDir,
              this.path
                .replace(`${settings.rootDir}/`, '')
                .replace(/\.s[ac]ss$/, '.css')
            );
            promise.trigger('log', {
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
          promise.trigger('log', {
            value: `File "<cyan>${this.relPath}</cyan>" compiled <green>successfully</green> in <yellow>${time}s</yellow>`
          });

          return promise.resolve(result);
        } else {
          SScssFile.COMPILED_CSS[this.path] = renderObj.css;
          return promise.resolve(
            this._processResultCss(renderObj.css.toString(), settings)
          );
        }
      } catch (e) {
        // .log(e);
        return promise.reject(e.toString());
      }

      return true;
    })();

    return promise;
  }

  _processResultCss(css, settings: __ISScssCompileParams = {}) {
    // remove @charset "UTF-8";
    css = css.replace(/@charset "UTF-8";/gm, '');

    if (settings.stripComments) {
      css = __stripCssComments(css);
    }

    if (settings.minify) {
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
};
