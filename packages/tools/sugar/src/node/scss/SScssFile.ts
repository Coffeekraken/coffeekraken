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
import __SCache from '../cache/SCache';
import __putUseStatementsOnTop from './utils/putUseStatementsOnTop';
import __toString from '../string/toString';
import __csso from 'csso';
import __stripCssComments from '../css/stripCssComments';
import __repl from 'repl';
import __getSharedResourcesString from './utils/getSharedResourcesString';
import __wait from '../time/wait';
import __getFilename from '../fs/filename';

import __SInterface from '../interface/SInterface';
import { ISFile, ISFileSettings, ISFileCtorSettings } from '../fs/SFile';
import { ISScssCompilerParams } from './compile/SScssCompiler';
import __SScssCompilerParamsInterface from './compile/interface/SScssCompilerParamsInterface';

/**
 * @name      SScssFileSettingsInterface
 * @type      Class
 * @extends     SInterface
 * @status              beta
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
 * @status              beta
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
 * @status              beta
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

interface ISScssFileCompileSettings {}

interface ISScssFileSettings {
  compile: Partial<ISScssFileCompileSettings>;
}
interface ISScssFileCtorSettings extends ISFileCtorSettings {
  scssFile?: Partial<ISScssFileSettings>;
}

interface ISScssFile {
  _cache: __SCache;
  _sharedResources: string;
  mixinsAndVariables: string;
  dependencies: Array<ISScssFile>;
  compile(
    params: Partial<ISScssCompilerParams>,
    settings?: Partial<ISScssFileSettings>
  );
}

// @ts-ignore
class SScssFile extends __SFile implements ISScssFile {
  static interfaces = {
    compilerParams: {
      apply: false,
      class: __SScssCompilerParamsInterface
    },
    settings: {
      apply: true,
      on: '_settings',
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

  _cache: __SCache;
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

    this._cache = new __SCache(this.constructor.name);
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
  _currentCompilationSettings: Partial<ISScssFileSettings> = {};
  _currentCompilationParams: Partial<ISScssCompilerParams> = {};
  compile(
    params: Partial<ISScssCompilerParams>,
    settings?: Partial<ISScssFileSettings>
  ) {
    settings = __deepMerge(this.scssFileSettings, settings);
    this._currentCompilationParams = Object.assign({}, params);
    this._currentCompilationSettings = Object.assign({}, settings);

    const completeParams: ISScssCompilerParams = this.applyInterface(
      'compilerParams',
      params
    );

    // init the promise
    return new __SPromise(async ({ resolve, reject, emit, pipeTo, on }) => {
      // listen for the end
      on('finally', () => {
        this._isCompiling = false;
      });

      pipeTo(this);

      emit('notification', {
        title: `${this.id} compilation started`
      });

      if (this._isCompiling) {
        emit('warn', {
          value: `This file is compiling at this time. Please wait the end of the compilation before running another one...`
        });
        return;
      }
      this._isCompiling = true;

      // sass settings
      const sassSettings = {
        outputStyle:
          completeParams.style || __sugarConfig('scss.compile.style'),
        sourceMap:
          completeParams.map !== undefined
            ? completeParams.map
            : __sugarConfig('scss.compile.map'),
        includePaths: [
          this.dirPath,
          ...__sugarConfig('scss.compile.includePaths')
        ],
        ...(completeParams.sass || {})
      };

      // notify start
      emit('log', {
        value: `<yellow>[start]</yellow> Starting "<cyan>${this.relPath}</cyan>" compilation`
      });

      const duration = new __SDuration();

      if (completeParams.clearCache) await this._cache.clear();
      let toCompile = this.content;

      // get all the imports from the toCompile string
      const imports = __findImportStatements(toCompile, {
        import: true,
        use: false
      });

      imports.forEach((importObj) => {
        // @ts-ignore
        toCompile = toCompile.replace(importObj.raw, `// ${importObj.raw}`);
      });

      // @ts-ignore
      this._sharedResources = __getSharedResourcesString(
        // @ts-ignore
        completeParams.sharedResources
      );

      if (this._sharedResources) {
        toCompile = [this._sharedResources, toCompile].join('\n');
      }

      toCompile = __putUseStatementsOnTop(toCompile);

      // leverage cache
      if (completeParams.cache) {
        const cachedValue = await this._cache.get(this.path, {
          context: {
            toCompile
            // params: completeParams
          }
        });

        if (cachedValue && cachedValue.css) {
          emit('log', {
            value: `<magenta>[cached]</magenta> "<cyan>${this.relPath}</cyan>"`
          });
          return resolve({
            css: this._processResultCss(cachedValue.css, completeParams),
            ...duration.end()
          });
        }
      }

      let renderObj;
      emit('log', {
        value: `<yellow>[compiling]</yellow> "<cyan>${this.relPath}</cyan>"`
      });

      renderObj = __sass.renderSync({
        ...sassSettings,
        data: toCompile
      });

      // save in cache
      if (completeParams.cache) {
        // @ts-ignore
        await this._cache.set(
          this.path,
          {
            css: renderObj.css.toString()
          },
          {
            context: {
              toCompile
              // params: completeParams
            }
          }
        );
      }

      let resultCss = renderObj.css.toString();

      // replace the imports
      resultCss = [
        ...imports.map((importObj) => {
          let path = `@import '${importObj.path.replace(
            /\.s[ca]ss$/,
            '.css'
          )}';`;
          if (!path.match(/\.css';$/)) {
            path = path.replace(`';`, `.css';`);
          }
          return path;
        }),
        resultCss
      ].join('\n');

      resultCss = this._processResultCss(resultCss, completeParams);

      // check if need to save
      if (completeParams.save && completeParams.outputDir) {
        // build the save path
        const savePath = __path.resolve(
          completeParams.outputDir,
          this.path
            .replace(`${completeParams.rootDir}/`, '')
            .replace(/\.s[ac]ss$/, '.css')
        );

        emit('log', {
          type: 'file',
          action: 'save',
          to: savePath.replace(`${__sugarConfig('storage.rootDir')}/`, ''),
          file: this.toObject()
        });
        this.writeSync(resultCss, {
          path: savePath
        });

        // notify end
        emit('log', {
          type: 'file',
          action: 'saved',
          to: savePath.replace(`${__sugarConfig('storage.rootDir')}/`, ''),
          file: this.toObject()
        });
      }

      const durationEnd = duration.end();

      // notify end
      emit('log', {
        value: `<green>[success]</green> File "<cyan>${this.relPath}</cyan>" compiled <green>successfully</green> in <yellow>${durationEnd.formatedDuration}</yellow>`
      });

      emit('notification', {
        type: 'success',
        title: `${this.id} compilation success`
      });

      return resolve({
        css: this._processResultCss(resultCss, completeParams),
        ...durationEnd
      });
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
    super.update();
  }
}

export default SScssFile;
