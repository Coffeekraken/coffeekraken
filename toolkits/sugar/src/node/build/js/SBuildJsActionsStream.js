const __SActionsStream = require('../../stream/SActionsStream');
const __SWebpackStreamAction = require('./actions/SWebpackStreamAction');
const __STerserStreamAction = require('./actions/STerserStreamAction');
const __SFsReadFileStreamAction = require('../../stream/actions/SFsReadFileStreamAction');
const __deepMerge = require('../../object/deepMerge');
const __getFilename = require('../../fs/filename');
const __SFsFilesResolverStreamAction = require('../../stream/actions/SFsFilesResolverStreamAction');
const __SFsCacheStreamAction = require('../../stream/actions/SFsCacheStreamAction');
const __SFsOutputStreamAction = require('../../stream/actions/SFsOutputStreamAction');
const __SSugarJsonStreamAction = require('../actions/SSugarJsonStreamAction');
const __SDocMapStreamAction = require('../../stream/actions/SDocMapStreamAction');
const __path = require('path');

/**
 * @name            SBuildJsActionsStream
 * @namespace           sugar.node.build.js
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
 * const SBuildJsActionsStream = require('@coffeekraken/sugar/node/build/SBuildJsActionsStream');
 * const myStream = new SBuildJsActionsStream();
 * myStream.start({
 *    input: '...',
 *    output: '...'
 * }).on('resolve', (result) => {
 *    // do something
 * });
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SBuildJsActionsStream extends __SActionsStream {
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
        readFile: __SFsReadFileStreamAction,
        sugarJson: __SSugarJsonStreamAction,
        webpack: __SWebpackStreamAction,
        terser: __STerserStreamAction,
        fsOutput: __SFsOutputStreamAction,
        docMap: __SDocMapStreamAction
      },
      __deepMerge(
        {
          id: 'build.js.actionStream',
          name: 'Build JS Actions Stream',
          before: (streamObj) => {
            streamObj.docMapInput = streamObj.input;
            return streamObj;
          },
          afterActions: {
            filesResolver: (streamObj) => {
              if (streamObj.input) {
                streamObj.filename = __getFilename(streamObj.input);
              }
              return streamObj;
            }
          },
          beforeActions: {
            fsCache: (streamObj) => {
              return this._ensureOutputStack(streamObj);
            },
            fsOutput: (streamObj) => {
              return this._ensureOutputStack(streamObj);
            }
          }
        },
        settings
      )
    );
  }

  _ensureOutputStack(streamObj) {
    if (!streamObj.outputStack) streamObj.outputStack = {};
    if (streamObj.outputDir && streamObj.filename) {
      streamObj.outputStack.data = __path.resolve(
        streamObj.outputDir,
        streamObj.prod
          ? streamObj.filename.replace('.js', '.prod.js')
          : streamObj.filename.replace('.js', '.js')
      );
    }
    if (streamObj.outputDir && streamObj.filename && streamObj.sourcemapData) {
      streamObj.outputStack.sourcemapData = __path.resolve(
        streamObj.outputDir,
        streamObj.prod
          ? streamObj.filename.replace('.js', '.prod.js.map')
          : streamObj.filename.replace('.js', '.js.map')
      );
    }
    return streamObj;
  }
};
