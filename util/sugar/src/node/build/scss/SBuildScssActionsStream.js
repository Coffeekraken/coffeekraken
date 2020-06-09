const __SActionsStream = require('../../stream/SActionsStream');
const __glob = require('glob');
const __SPromise = require('../../promise/SPromise');
const __deepMerge = require('../../object/deepMerge');
const __getFilename = require('../../fs/filename');
const __SFsOutputStreamAction = require('../../stream/actions/SFsOutputStreamAction');
const __SJsObjectToScssStreamAction = require('./scss/SJsObjectToScssStreamAction');
const __SImportsStreamAction = require('./scss/SImportsStreamAction');
const __SBundleScssStreamAction = require('./scss/SBundleScssStreamAction');
const __SRenderSassStreamAction = require('./scss/SRenderSassStreamAction');
const __SPostCssStreamAction = require('./scss/SPostCssStreamAction');
const __SGlobResolverStreamAction = require('../../stream/actions/SGlobResolverStreamAction');
const __path = require('path');
const __packageRoot = require('../../path/packageRoot');
const __sugarConfig = require('../../config/sugar');
const __isInPackage = require('../../is/inPackage');

/**
 * @name            SBuildScssActionsStream
 * @namespace       sugar.node.build.scss
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
        globResolver: __SGlobResolverStreamAction,
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
            streamObj.globProperty = 'input';

            if (streamObj.import && streamObj.import.sugar) {
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
          afterActions: {
            globResolver: (streamObj) => {
              if (streamObj.input) {
                streamObj.filename = __getFilename(streamObj.input);
              }
              return streamObj;
            }
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
              return streamObj;
            }
          }
        },
        settings
      )
    );
  }
};
