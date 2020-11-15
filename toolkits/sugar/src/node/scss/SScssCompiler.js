const __toString = require('../string/toString');
const __extension = require('../fs/extension');
const __SCache = require('../cache/SCache');
const __unquote = require('../string/unquote');
const __sugarConfig = require('../config/sugar');
const __path = require('path');
const __stripCssComments = require('../css/stripCssComments');
const __folderPath = require('../fs/folderPath');
const __deepMerge = require('../object/deepMerge');
const __SPromise = require('../promise/SPromise');
const __md5 = require('../crypt/md5');
const __sass = require('sass');
const __globImporter = require('node-sass-glob-importer');
const __packageRoot = require('../path/packageRoot');
const __getFilename = require('../fs/filename');
const __isPath = require('../is/path');
const __fs = require('fs');
const __copy = require('../clipboard/copy');
const __getSharedResourcesString = require('./getSharedResourcesString');
const __putUseStatementsOnTop = require('./putUseStatementsOnTop');
const __glob = require('glob');
const __parseScss = require('scss-parser').parse;
const __stringifyScss = require('scss-parser').stringify;
const __createQueryWrapper = require('query-ast');

/**
 * @name                SScssCompiler
 * @namespace           sugar.node.scss
 * @type                Class
 *
 * This class wrap the "sass" compiler with some additional features which are:
 *
 * @feature         2.0.0       Expose a simple API that return SPromise instances for convinience
 * @feature         2.0.0       Optimize the render time as much as 6x faster
 *
 * @param           {Object}            [settings={}]       An object of settings to configure your instance
 *
 * @setting         {String}        [id=this.constructor.name]          An id for your compiler. Used for cache, etc...
 * @setting         {Object}        [sass={}]        Pass the "sass" (https://www.npmjs.com/package/sass) options here. ! The "file" and "data" properties are overrided by the first parameter of the "compile" method
 * @setting         {Onject}       [optimizers={}]     Pass an object of optimizing settings
 * @setting         {Boolean}       [optimizers.split=true]     Specify if you want to make use of the splitting code technique to compile only what's really changed
 *
 * @todo            tests
 *
 * @example         js
 * const SScssCompiler = require('@coffeekraken/sugar/node/scss/SScssCompiler');
 * const compiler = new SScssCompiler();
 * const compiledFile = await compiler.compile('my/cool/code.scss');
 * const compiledCode = await compiler.compile(`
 *      \@include myCoolMixin();
 * `);
 *
 * @see             https://www.npmjs.com/package/sass
 * @since           2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SScssCompiler {
  /**
   * @name            _settings
   * @type            Object
   * @private
   *
   * Store the instance settings
   *
   * @since           2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = {};

  /**
   * @name            constructor
   * @type             Function
   * @constructor
   *
   * Constructor
   *
   * @since           2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    this._settings = __deepMerge(
      {
        id: this.constructor.name,
        cache: false,
        stripComments: true,
        sass: {},
        rootDir: __sugarConfig('frontend.rootDir'),
        optimizers: {
          split: false
        },
        putUseOnTop: true,
        settings: {
          variableName: '$sugarUserSettings',
          object: __sugarConfig('scss')
        }
      },
      settings
    );
  }

  /**
   * @name              compile
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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  compile(source, settings = {}) {
    return new __SPromise(
      async (resolve, reject, trigger, cancel) => {
        settings = __deepMerge(
          this._settings,
          {
            _isChild: false
          },
          settings
        );

        const startTime = Date.now();

        let dataObj = {
          imports: [],
          scss: null,
          css: null,
          mixinsAndVariables: null
        };

        source = source.trim();

        const includePaths = [
          ...(settings.rootDir || []),
          ...(settings.sass.includePaths || []),
          `${__packageRoot()}/node_modules`
        ];

        let sharedResources = settings.sharedResources || [];
        if (!Array.isArray(sharedResources))
          sharedResources = [sharedResources];

        let sassPassedSettings = Object.assign({}, settings.sass || {});
        delete sassPassedSettings.includePaths;
        delete sassPassedSettings.sharedResources;
        const sassSettings = __deepMerge(
          {
            importer: [
              // __globImporter(),
            ],
            sourceMap: true,
            includePaths
          },
          sassPassedSettings
        );

        // engage the cache
        const cache = new __SCache(this._settings.id, {
          ttl: '10d'
        });
        let cacheId;

        if (__isPath(source)) {
          if (!__fs.existsSync(source) && source.slice(0, 1) === '/') {
            source = source.slice(1);
          }
          source = __path.resolve(settings.rootDir, source);
          const sourcePath = this._getRealFilePath(source);
          if (sourcePath) {
            // get the file stats
            const stats = __fs.statSync(sourcePath);
            const mTimeMs = stats.mtimeMs;
            // try to get from cache
            cacheId = __md5.encrypt(`${sourcePath}-${mTimeMs}`);
            // add the folder path in the includePaths setting
            const filePath = __folderPath(sourcePath);
            sassSettings.includePaths.unshift(filePath);
            settings.rootDir = filePath;
            // read the file to get his content
            dataObj.scss = __fs.readFileSync(source, 'utf8');
          }
        } else {
          // set the scss property with the source
          dataObj.scss = source;
          // create the cache id using the source code
          cacheId = __md5.encrypt(source);
        }

        // try to get from cache
        // const cachedObj = await cache.get(cacheId);
        // if (this._settings.cache && cachedObj) {
        //   // build the css code to return
        //   dataObj = cachedObj;
        //   // resolve the compilation using this generated
        //   return resolve({
        //     ...dataObj,
        //     startTime: startTime,
        //     endTime: Date.now(),
        //     duration: Date.now() - startTime
        //   });
        // }

        // extract the things that can be used
        // by others like mixins and variables declarations$
        const ast = __parseScss(dataObj.scss);
        const $ = __createQueryWrapper(ast);
        let mixinsVariablesString = '';
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
          mixinsVariablesString += `
            ${__stringifyScss(node.node)}
          `;
        });

        // save the mixin and variables resources
        dataObj.mixinsAndVariables = mixinsVariablesString;

        // strip comments of not
        dataObj.scss = settings.stripComments
          ? __stripCssComments(dataObj.scss)
          : dataObj.scss;

        const resourceContent = __getSharedResourcesString(sharedResources);
        if (resourceContent) {
          dataObj.scss = `
              ${resourceContent}
              ${dataObj.scss}
            `;
        }

        const importStatements = dataObj.scss.match(
          /^((?!\/\/)[\s]{0,999999999999}?)@import\s['"].*['"];/gm
        );
        if (importStatements) {
          // save the import statements in the dataObj
          dataObj.imports = importStatements;
          // compile the import statements
          dataObj.scss = await this._compileImports(
            importStatements,
            dataObj.scss,
            settings
          );
        }

        if (settings.putUseOnTop) {
          dataObj.scss = __putUseStatementsOnTop(dataObj.scss);
        }

        // compile
        const renderObj = __sass.renderSync({
          ...sassSettings,
          data: dataObj.scss
        });
        const compiledResultString = renderObj.css.toString();
        dataObj.css = compiledResultString.trim();

        if (!settings._isChild) {
          console.log('finished');
          __copy(dataObj.css);
        }

        // resolve with the compilation result
        resolve({
          ...dataObj,
          startTime: startTime,
          endTime: Date.now(),
          duration: Date.now() - startTime
        });
      },
      {
        id: this._settings.id
      }
    );
  }

  async _compileImports(importStatements, scss, settings) {
    // loop on each imports
    for (let i = 0; i < importStatements.length; i++) {
      const importStatement = importStatements[i];
      const importStatementPath = __unquote(
        importStatement.replace('@import ', '').replace(';', '').trim()
      );
      let importAbsolutePath = __path.resolve(
        settings.rootDir,
        importStatementPath
      );
      const importPath = this._getRealFilePath(importAbsolutePath);
      if (importPath) {
        // compile the finded path
        const compileRes = await this.compile(importPath, {
          ...settings,
          _isChild: true,
          rootDir: __folderPath(importPath)
        });

        // replace the import statement with the compiled
        // result
        const resultString = `
          ${compileRes.mixinsAndVariables || ''}
          ${compileRes.css || ''}
        `;
        scss = scss.replace(
          importStatement,
          settings.stripComments
            ? __stripCssComments(resultString)
            : resultString
        );
      }
    }
    return scss;
  }

  _getRealFilePath(path) {
    const extension = __extension(path);
    const filename = __getFilename(path);
    const folderPath = __folderPath(path);
    let pattern;
    if (!extension) {
      pattern = `${folderPath}/?(_)${filename}.*`;
    } else {
      pattern = `${folderPath}/?(_)${filename}`;
    }
    const potentialPaths = __glob.sync(pattern);
    if (potentialPaths && potentialPaths.length) {
      return potentialPaths[0];
    }
    return null;
  }
};
