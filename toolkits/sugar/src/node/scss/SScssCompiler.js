const __deepMerge = require('../object/deepMerge');
const __SPromise = require('../promise/SPromise');
const __includeBlockSplitter = require('../code/splitters/scss/includeBlockSplitter');
const __includeInlineSplitter = require('../code/splitters/scss/includeInlineSplitter');
const __mixinBlockSplitter = require('../code/splitters/scss/mixinBlockSplitter');
const __mediaQuerySplitter = require('../code/splitters/scss/mediaQuerySplitter');
const __selectorBlockSplitter = require('../code/splitters/scss/selectorBlockSplitter');
const __SCache = require('../cache/SCache');
const __md5 = require('../crypt/md5');
const __sass = require('sass');
const __globImporter = require('node-sass-glob-importer');
const __packageRoot = require('../path/packageRoot');
const __getFilename = require('../fs/filename');
const __isPath = require('../is/path');
const __fs = require('fs');
const __SCodeSplitter = require('../code/SCodeSplitter');

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
        sass: {},
        optimizers: {
          split: true
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
  compile(source, settings = {}, streamObj) {
    return new __SPromise(async (resolve, reject, trigger, cancel) => {
      settings = __deepMerge(this._settings, settings);

      const startTime = Date.now();

      let resultObj,
        resultString = '';

      const sassSettings = __deepMerge(
        {
          importer: __globImporter(),
          sourceMap: true,
          includePaths: [
            ...(settings.sass.includePaths || []),
            `${__packageRoot(process.cwd())}/node_modules`,
            `${__packageRoot(__dirname)}/src/scss`,
            `${__packageRoot(process.cwd())}/src/scss`
          ]
        },
        settings.sass || {}
      );

      if (__isPath(source, true)) {
        sassSettings.includePaths.unshift(
          `${source.replace(__getFilename(source), '')}`
        );
        source = __fs.readFileSync(source, 'utf8');
      }
      sassSettings.data = source;

      if (settings.optimizers.split) {
        const splitter = new __SCodeSplitter();

        const splited = splitter.split(source, [
          __selectorBlockSplitter,
          __mediaQuerySplitter,
          __includeInlineSplitter,
          __includeBlockSplitter,
          __mixinBlockSplitter
        ]);

        const cache = new __SCache(settings.id, {});

        // loop on splited blocks
        const previousBlocks = [];
        for (let i = 0; i < splited.length; i++) {
          const block = splited[i];

          switch (block.type) {
            case 'string':
            case 'mixin.block':
              previousBlocks.push(block.data);
              break;
            default:
              let stringToCompile = '';
              previousBlocks.forEach((bl) => {
                stringToCompile += `      
                    ${bl}
                `;
              });
              stringToCompile += `
                ${block.data}
                `;

              //   streamObj.outputStack[`toCompile_${i}`] =
              //     streamObj.outputDir + `/toCompile_${i}.scss`;
              //   streamObj[`toCompile_${i}`] = stringToCompile;

              let compiledString = '';

              const hash = __md5.encrypt(stringToCompile);
              const cachedValue = await cache.get(hash);
              if (cachedValue) {
                compiledString = cachedValue;
                resultString += compiledString;
              } else {
                try {
                  resultObj = __sass.renderSync({
                    ...sassSettings,
                    data: stringToCompile
                  });

                  const compiledResultString = resultObj.css.toString();
                  compiledString = compiledResultString.trim();

                  //   streamObj.outputStack[`toCompile_${i}.compiled`] =
                  //     streamObj.outputDir + `/toCompile_${i}.compiled.scss`;
                  //   streamObj[`toCompile_${i}.compiled`] = compiledString;

                  resultString += compiledString;
                  // save in cache
                  await cache.set(hash, compiledString);
                } catch (e) {
                  return reject(e.toString());
                }
              }
              break;
          }
        }
      } else {
        try {
          resultObj = __sass.renderSync(sassSettings);
          const compiledResultString = resultObj.css.toString();
          resultString = compiledResultString.trim();
        } catch (e) {
          return reject(e.toString());
        }
      }

      // resolve with the compilation result
      resolve({
        streamObj,
        data: resultString,
        startTime: startTime,
        endTime: Date.now(),
        duration: Date.now() - startTime
      });
    });
  }
};
