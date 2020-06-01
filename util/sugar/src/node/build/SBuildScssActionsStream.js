const __SActionsStream = require('../stream/SActionsStream');
const __glob = require('glob');
const __SPromise = require('../promise/SPromise');
const __deepMerge = require('../object/deepMerge');
const __getFilename = require('../fs/filename');
const __SFsOutputStreamAction = require('../stream/actions/SFsOutputStreamAction');
const __SJsObjectToScssStreamAction = require('./scss/SJsObjectToScssStreamAction');
const __SImportsStreamAction = require('./scss/SImportsStreamAction');
const __SBundleScssStreamAction = require('./scss/SBundleScssStreamAction');
const __SRenderSassStreamAction = require('./scss/SRenderSassStreamAction');
const __SPostCssStreamAction = require('./scss/SPostCssStreamAction');
const __path = require('path');
const __packageRoot = require('../path/packageRoot');
const __sugarConfig = require('../config/sugar');
const __isInPackage = require('../is/inPackage');

/**
 * @name            SBuildScssActionsStream
 * @namespace       sugar.node.build
 * @type            Class
 * @extends         SActionsStream
 *
 * This class represent a pre-configured action stream to build easily some javascript files
 *
 * @param           {Object}          [settings={}]         The settings object to configure your instance
 *
 * @example         js
 * const SBuildScssActionsStream = require('@coffeekraken/sugar/node/build/SBuildScssActionsStream');
 * const myStream = new SBuildScssActionsStream();
 * myStream.start({
 *    input: '...',
 *    outputDir: '...'
 * }).on('resolve', (result) => {
 *    // do something
 * });
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SBuildScssActionsStream extends __SActionsStream {
  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    // init actions stream
    super(
      {
        bundle: __SBundleScssStreamAction,
        imports: __SImportsStreamAction,
        jsConfig: __SJsObjectToScssStreamAction,
        render: __SRenderSassStreamAction,
        postCss: __SPostCssStreamAction,
        fsOutput: __SFsOutputStreamAction
      },
      __deepMerge(
        {
          before: (streamObj) => {
            streamObj.jsObjectToScss = __sugarConfig('scss');

            if (streamObj.input) {
              streamObj.filename = __getFilename(streamObj.input);
            }

            if (streamObj.include && streamObj.include.sugar) {
              streamObj.imports = [
                {
                  name: 'Sugar',
                  path: __isInPackage('@coffeekraken/sugar')
                    ? __path.resolve(__packageRoot(__dirname), 'index')
                    : '@coffeekraken/sugar/index',
                  scss: `@include Sugar.setup($sugarUserSettings);`
                }
              ];
            }

            return streamObj;
          },
          beforeActions: {
            fsOutput: (streamObj) => {
              if (!streamObj.outputStack) streamObj.outputStack = {};
              if (streamObj.outputDir && streamObj.filename && streamObj.data) {
                streamObj.outputStack.data = __path.resolve(
                  streamObj.outputDir,
                  streamObj.prod
                    ? streamObj.filename.replace('.scss', '.prod.css')
                    : streamObj.filename.replace('.scss', '.css')
                );
              }
              // if (
              //   streamObj.outputDir &&
              //   streamObj.filename &&
              //   streamObj.sourcemapData
              // ) {
              //   streamObj.outputStack.sourcemapData = __path.resolve(
              //     streamObj.outputDir,
              //     (streamObj.prod
              //       ? streamObj.filename.replace('.css', '.prod.css')
              //       : streamObj.filename) + '.map'
              //   );
              // }
              return streamObj;
            }
          }
        },
        settings
      )
    );
  }

  start(streamObj = {}, settings = {}) {
    const promise = new __SPromise(async (resolve, reject, trigger, cancel) => {
      const files = __glob.sync(streamObj.input);
      const filesStats = {};
      // loop on each files to process
      for (let i = 0; i < files.length; i++) {
        const startPromise = super.start(
          {
            ...streamObj,
            input: files[i]
          },
          settings
        );
        __SPromise.pipe(startPromise, promise);
        const stats = await startPromise;
        filesStats[files[i]] = stats;
      }
      // ptrigger('complete', filesStats);
      promise.resolve(filesStats);
    });

    promise.start();

    return promise;
  }
};
