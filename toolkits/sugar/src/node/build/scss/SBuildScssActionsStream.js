const __SActionsStream = require('../../stream/SActionsStream');
const __deepMerge = require('../../object/deepMerge');
const __getFilename = require('../../fs/filename');
const __SFsOutputStreamAction = require('../../stream/actions/SFsOutputStreamAction');
const __SJsObjectToScssStreamAction = require('./actions/SJsObjectToScssStreamAction');
const __SImportsStreamAction = require('./actions/SImportsStreamAction');
const __SBundleScssStreamAction = require('./actions/SBundleScssStreamAction');
const __SRenderSassStreamAction = require('./actions/SRenderSassStreamAction');
const __SPostCssStreamAction = require('./actions/SPostCssStreamAction');
const __SGlobResolverStreamAction = require('../../stream/actions/SGlobResolverStreamAction');
const __path = require('path');
const __sugarConfig = require('../../config/sugar');

/**
 * @name            SBuildScssActionsStream
 * @namespace           node.build.scss
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
            globResolver: (streamObj) => {
              return streamObj;
            },
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
