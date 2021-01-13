import { ISFileSettings } from '../fs/interface/ISFile';
import __SFile from '../fs/SFile';
import __ISFile from '../fs/interface/ISFile';
import __findImportStatements from './utils/findImportStatements';
import __resolveDependency from './utils/resolveDependency';
import { parse as __parseScss } from 'scss-parser';
import { stringify as __stringifyScss } from 'scss-parser';
import __createQueryWrapper from 'query-ast';
import __sass from 'sass';
import __md5 from '../crypt/md5';
import __SPromise from '../promise/SPromise';
import __deepMerge from '../object/deepMerge';
import __sugarConfig from '../config/sugar';
import __SFileCache from '../cache/SFileCache';
import __putUseStatementsOnTop from './utils/putUseStatementsOnTop';
import __toString from '../string/toString';
import __csso from 'csso';
import __stripCssComments from '../css/stripCssComments';
import __hashFiles from 'hash-files';

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
interface ISScssFileSettings {}

interface ISScssFileCompileSettings {
  sharedResources?: string;
  minify?: boolean;
  stripComments?: boolean;
  clearCache?: boolean;
  cache?: boolean;
  sass?: any;
}

interface ISScssFile extends __ISFile {
  _fileCache: __SFileCache;
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

  static COMPILED_CSS: any = {};

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
        const file = new SScssFile(obj.path);
        file._import = obj.import;
        return file;
      });

    if (Object.keys(deps).length) {
      this._dependencies = deps;
    }

    return this._dependencies || [];
  }

  get hash() {
    return __md5.encrypt(this.content);
  }

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
        const useFile = new SScssFile(realPath);
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

  getCompileString() {
    // const strArray: string[] = [];
    // let content = this.content;
    // // check if the file is in the cache
    // const cacheValue = await this._fileCache.get(this.path);
    // if (cacheValue) {
    // }
    // const depsArray = this.dependencies || [];
    // for (let i = 0; i < depsArray.length; i++) {
    //   const file = depsArray[i];
    //   if (file.dependencyType === 'use') {
    //     continue;
    //   }
    //   const str = file.getCompileString();
    //   content = content.replace(file.dependencyLoadString, str);
    // }
    // return content;
  }

  compile(settings: ISScssFileCompileSettings = {}) {
    settings = __deepMerge(
      {
        clearCache: false,
        cache: true,
        minify: true,
        stripComments: true,
        sharedResources: null,
        sass: {}
      },
      settings
    );

    return new __SPromise(async (resolve, reject, trigger) => {
      if (settings.clearCache) await this._fileCache.clear();
      let toCompile = this.content;

      // @ts-ignore
      this._sharedResources = settings.sharedResources || '';

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
        const res = await depFile.compile(settings);

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
        settings.cache
      ) {
        console.log('from cache');
        const result = this._processResultCss(cachedValue.css, settings);
        SScssFile.COMPILED_CSS[this.path] = result;
        return resolve(result);
      }

      if (settings.sharedResources) {
        toCompile = [settings.sharedResources, toCompile].join('\n');
      }

      toCompile = __putUseStatementsOnTop(toCompile);

      let sassPassedSettings = Object.assign({}, settings.sass);
      const sassSettings = __deepMerge(
        {
          outputStyle: 'expanded',
          sourceMap: false,
          includePaths: [
            this.dirPath,
            ...__sugarConfig('scss.compile.includePaths')
          ]
        },
        sassPassedSettings
      );

      let renderObj;
      try {
        // console.log(toCompile);

        // if (this._import.type === 'main') {
        //   toCompile = [COMPILED_CSS.join('\n'), toCompile].join('\n');
        // }

        console.log('comepile', this.path);

        // if (this.path.includes('index.scss')) {
        //   console.log('CCC', toCompile);
        // }

        renderObj = __sass.renderSync({
          ...sassSettings,
          data: toCompile
        });

        // save in cache
        if (settings.cache) {
          console.log('save in cache');
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

          return resolve(result);
        } else {
          SScssFile.COMPILED_CSS[this.path] = renderObj.css;
          return resolve(
            this._processResultCss(renderObj.css.toString(), settings)
          );
        }
      } catch (e) {
        console.log(e);
        return reject(e.toString());
      }
    });
  }

  _processResultCss(css, settings: ISScssFileCompileSettings = {}) {
    // try {
    // css = css.replace(/^\s*[\r\n]/gm, '').trim();
    // } catch (e) {}

    if (settings.stripComments) {
      css = __stripCssComments(css);
    }

    if (settings.minify) {
      css = __csso.minify(css).css;
    }

    return css;
  }

  update() {
    this._mixinsAndVariables = undefined;
    this._dependencies = undefined;
    super.update();
  }
};
