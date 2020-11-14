const __extension = require('../fs/extension');
const __SCache = require('../cache/SCache');
const __unquote = require('../string/unquote');
const __sugarConfig = require('../config/sugar');
const __path = require('path');
const __stripCssComments = require('../css/stripCssComments');
const __folderPath = require('../fs/folderPath');
const __tmpDir = require('../fs/tmpDir');
const __deepMerge = require('../object/deepMerge');
const __SPromise = require('../promise/SPromise');
const __includeBlockSplitter = require('../code/splitters/scss/includeBlockSplitter');
const __includeInlineSplitter = require('../code/splitters/scss/includeInlineSplitter');
const __mixinBlockSplitter = require('../code/splitters/scss/mixinBlockSplitter');
const __mediaQuerySplitter = require('../code/splitters/scss/mediaQuerySplitter');
const __selectorBlockSplitter = require('../code/splitters/scss/selectorBlockSplitter');
const __md5 = require('../crypt/md5');
const __sass = require('sass');
const __globImporter = require('node-sass-glob-importer');
const __packageRoot = require('../path/packageRoot');
const __getFilename = require('../fs/filename');
const __isPath = require('../is/path');
const __fs = require('fs');
const __SCodeSplitter = require('../code/SCodeSplitter');
const __copy = require('../clipboard/copy');
const __writeFileSync = require('../fs/writeFileSync');
const __removeSync = require('../fs/removeSync');
const __getSharedResourcesString = require('./getSharedResourcesString');
const __putUseStatementsOnTop = require('./putUseStatementsOnTop');
const __glob = require('glob');

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
        settings = __deepMerge(this._settings, settings);

        const startTime = Date.now();
        let folderContext = settings.rootDir;

        let resultObj,
          resultString = '';

        const includePaths = [
          // tmpPath,
          ...(settings.rootDir || []),
          ...(settings.sass.includePaths || []),
          `${__packageRoot()}/node_modules`
          // `${__packageRoot(__dirname)}/src/scss`,
          // `${__packageRoot()}/src/scss`
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
            sharedResources,
            sourceMap: true,
            includePaths
          },
          sassPassedSettings
        );

        if (source.slice(0, 1) === '/') {
          source = source.slice(1);
        }

        if (__isPath(source)) {
          source = __path.resolve(settings.rootDir, source);
          if (__fs.existsSync(source)) {
            folderContext = __folderPath(source);
            sassSettings.includePaths.unshift(folderContext);
            source = __fs.readFileSync(source, 'utf8');
          }
        }

        sassSettings.data = this._settings.stripComments
          ? __stripCssComments(source)
          : source;

        const importStatements = sassSettings.data.match(
          /^((?!\/\/)[\s]{0,999999999999}?)@import\s['"].*['"];/gm
        );
        if (importStatements) {
          importStatements.forEach(async (importStatement) => {
            const importStatementPath = __unquote(
              importStatement.replace('@import ', '').replace(';', '').trim()
            );
            let importAbsolutePath = __path.resolve(
              folderContext,
              importStatementPath
            );
            const extension = __extension(importAbsolutePath);
            const filename = __getFilename(importAbsolutePath);
            const folderPath = __folderPath(importAbsolutePath);
            let pattern;
            if (!extension) {
              pattern = `${folderPath}/?(_)${filename}.*`;
            } else {
              pattern = `${folderPath}/?(_)${filename}`;
            }
            const potentialPaths = __glob.sync(pattern);
            if (potentialPaths && potentialPaths.length) {
              let result;
              // check if we use the cache or not
              if (this._settings.cache) {
                // get the file stats
                const stats = __fs.statSync(potentialPaths[0]);
                const mTimeMs = stats.mtimeMs;
                // engage the cache
                const cache = new __SCache(this._settings.id, {
                  ttl: '10d'
                });
                // try to get from cache
                const cacheId = __md5.encrypt(
                  `${potentialPaths[0]}-${mTimeMs}`
                );
                const cachedContent = cache.get(cacheId);
                if (cachedContent) result = cachedContent;
              }
              if (!result) {
                // compile the finded path
                result = await this.compile(potentialPaths[0], {
                  ...settings,
                  rootDir: folderContext
                });
                console.log('compiled');
              }
              // replace the import statement with the compiled
              // result
              sassSettings.data = sassSettings.data.replace(
                importStatement,
                this._settings.stripComments
                  ? __stripCssComments(result.data)
                  : result.data
              );
              // console.log(sassSettings.data);
              throw 'coco';
            }
          });
        }

        const resourceContent = __getSharedResourcesString(sharedResources);
        if (resourceContent) {
          sassSettings.data = `
            ${resourceContent}
            ${sassSettings.data}
          `;
        }

        // if (settings.putUseOnTop) {
        //   sassSettings.data = __putUseStatementsOnTop(sassSettings.data);
        // }

        console.log('compile', sassSettings.data);

        // compile
        resultObj = __sass.renderSync(sassSettings);
        const compiledResultString = resultObj.css.toString();
        resultString = compiledResultString.trim();

        // resolve with the compilation result
        resolve({
          data: resultString,
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
};
