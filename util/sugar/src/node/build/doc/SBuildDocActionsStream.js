const __SActionsStream = require('../../stream/SActionsStream');
const __deepMerge = require('../../object/deepMerge');
const __getFilename = require('../../fs/filename');
const __SFsOutputStreamAction = require('../../stream/actions/SFsOutputStreamAction');
const __SFsReadFileStreamAction = require('../../stream/actions/SFsReadFileStreamAction');
const __SGlobResolverStreamAction = require('../../stream/actions/SGlobResolverStreamAction');
const __SDocblockObjectsToMarkdownStreamAction = require('./actions/SDocblocksObjectsToMarkdownStreamAction');
const __SUnlinkStreamAction = require('../../stream/actions/SUnlinkStreamAction');
const __path = require('path');

/**
 * @name            SBuildDocActionStream
 * @namespace       sugar.node.build.doc
 * @type            Class
 * @extends         SActionsStream
 *
 * This class represent a pre-configured action stream to build easily some javascript files
 *
 * @param           {Object}          [settings={}]         The settings object to configure your instance
 *
 * @example         js
 * const SBuildDocActionStream = require('@coffeekraken/sugar/node/build/doc/SBuildDocActionStream');
 * const myStream = new SBuildDocActionStream();
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
module.exports = class SBuildDocActionStream extends __SActionsStream {
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
        unlink: __SUnlinkStreamAction,
        globResolver: __SGlobResolverStreamAction,
        fsReadFile: __SFsReadFileStreamAction,
        docblocksToMarkdown: __SDocblockObjectsToMarkdownStreamAction,
        fsOutput: __SFsOutputStreamAction
      },
      __deepMerge(
        {
          before: (streamObj) => {
            streamObj.globProperty = 'input';
            streamObj.unlink = streamObj.outputDir;
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
                  streamObj.filename.replace('.js', '.md')
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
