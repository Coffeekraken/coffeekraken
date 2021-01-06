// @ts-nocheck

const __SActionsStream = require('../../stream/SActionsStream');
const __deepMerge = require('../../object/deepMerge');
const __SFsFilesResolverStreamAction = require('../../stream/actions/SFsFilesResolverStreamAction');
const __SFsOutputStreamAction = require('../../stream/actions/SFsOutputStreamAction');
const __SDocMapStreamAction = require('./actions/SDocMapStreamAction');

/**
 * @name            SBuildDocMapActionsStream
 * @namespace           sugar.node.build.docMap
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
 * const SBuildDocMapActionsStream = require('@coffeekraken/sugar/node/build/doc/SBuildDocMapActionsStream');
 * const myStream = new SBuildDocMapActionsStream();
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
module.exports = class SBuildDocMapActionsStream extends __SActionsStream {
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
        docMap: __SDocMapStreamAction,
        fsOutput: __SFsOutputStreamAction
      },
      __deepMerge(
        {
          id: 'SBuildDocMapActionsStream',
          name: 'Build docMap.json Actions Stream',
          actions: {
            filesResolver: {
              ignoreFolders: [],
              out: 'files'
            }
          },
          beforeActions: {
            fsOutput: (streamObj) => {
              if (!streamObj.outputStack) streamObj.outputStack = {};
              if (streamObj.output && streamObj.data) {
                streamObj.outputStack.data = streamObj.output;
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
