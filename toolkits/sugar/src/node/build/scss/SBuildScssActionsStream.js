const __SActionsStream = require('../../stream/SActionsStream');
const __deepMerge = require('../../object/deepMerge');
const __getFilename = require('../../fs/filename');
const __SFsOutputStreamAction = require('../../stream/actions/SFsOutputStreamAction');
const __SJsObjectToScssStreamAction = require('./actions/SJsObjectToScssStreamAction');
const __SImportsStreamAction = require('./actions/SImportsStreamAction');
const __SBundleScssStreamAction = require('./actions/SBundleScssStreamAction');
const __SRenderSassStreamAction = require('./actions/SRenderSassStreamAction');
const __SPostCssStreamAction = require('./actions/SPostCssStreamAction');
const __SSugarJsonStreamAction = require('./actions/SSugarJsonStreamAction');
const __SFsFilesResolverStreamAction = require('../../stream/actions/SFsFilesResolverStreamAction');
const __SFsCacheStreamAction = require('../../stream/actions/SFsCacheStreamAction');
const __SExtractStreamAction = require('../../stream/actions/SExtractStreamAction');
const __path = require('path');
const __sugarConfig = require('../../config/sugar');
const { stream } = require('globby');

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
 * @todo        Document the streamObj required properties
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
        filesResolver: __SFsFilesResolverStreamAction,
        fsCache: __SFsCacheStreamAction,
        bundle: __SBundleScssStreamAction,
        sugarJson: __SSugarJsonStreamAction,
        imports: __SImportsStreamAction,
        jsConfig: __SJsObjectToScssStreamAction,
        render: __SRenderSassStreamAction,
        extract: __SExtractStreamAction,
        postCss: __SPostCssStreamAction,
        fsOutput: __SFsOutputStreamAction
      },
      __deepMerge(
        {
          name: 'Build SCSS',
          actions: {
            filesResolver: {
              out: 'array'
            }
          },
          before: (streamObj) => {
            streamObj.jsObjectToScss = __sugarConfig('scss');
            return streamObj;
          },
          afterActions: {
            filesResolver: (streamObj) => {
              streamObj.filename = __getFilename(streamObj.input);
              return streamObj;
            }
          },
          beforeActions: {
            fsCache: (streamObj) => {
              if (!streamObj.outputStack) streamObj.outputStack = {};
              if (streamObj.outputDir && streamObj.filename) {
                streamObj.outputStack.data = __path.resolve(
                  streamObj.outputDir,
                  streamObj.prod
                    ? streamObj.filename.replace('.scss', '.prod.css')
                    : streamObj.filename.replace('.scss', '.css')
                );
              }
              return streamObj;
            },
            fsOutput: (streamObj) => {
              return streamObj;
            }
          }
        },
        settings
      )
    );
  }
};
