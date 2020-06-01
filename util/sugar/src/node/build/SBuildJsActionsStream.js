const __SActionsStream = require('../stream/SActionsStream');
const __SWebpackStreamAction = require('./js/SWebpackStreamAction');
const __SUglifyJsStreamAction = require('./js/SUglifyJsStreamAction');
const __glob = require('glob');
const __SPromise = require('../promise/SPromise');
const __deepMerge = require('../object/deepMerge');
const __getFilename = require('../fs/filename');
const __SFsOutputStreamAction = require('../stream/actions/SFsOutputStreamAction');
const __path = require('path');

/**
 * @name            SBuildJsActionsStream
 * @namespace       sugar.node.build
 * @type            Class
 * @extends         SActionsStream
 *
 * This class represent a pre-configured action stream to build easily some javascript files
 *
 * @param           {Object}          [settings={}]         The settings object to configure your instance
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
        webpack: __SWebpackStreamAction,
        uglify: __SUglifyJsStreamAction,
        fsOutput: __SFsOutputStreamAction
      },
      __deepMerge(
        {
          before: (streamObj) => {
            if (streamObj.input) {
              streamObj.filename = __getFilename(streamObj.input);
            }
            return streamObj;
          },
          beforeActions: {
            fsOutput: (streamObj) => {
              if (!streamObj.outputStack) streamObj.outputStack = {};
              if (streamObj.outputDir && streamObj.filename && streamObj.data) {
                streamObj.outputStack.data = __path.resolve(
                  streamObj.outputDir,
                  streamObj.filename
                );
              }
              if (
                streamObj.outputDir &&
                streamObj.filename &&
                streamObj.sourcemapData
              ) {
                streamObj.outputStack.sourcemapData = __path.resolve(
                  streamObj.outputDir,
                  streamObj.filename + '.map'
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
