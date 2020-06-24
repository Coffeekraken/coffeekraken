const __SActionsStream = require('../../stream/SActionsStream');
const __deepMerge = require('../../object/deepMerge');
const __SFsFilesResolverStreamAction = require('../../stream/actions/SFsFilesResolverStreamAction');
const __SDocMapStreamAction = require('./actions/SDocMapStreamActions');

/**
 * @name            SBuildDocNavActionStream
 * @namespace           node.build.docNav
 * @type            Class
 * @extends         SActionsStream
 *
 * This class represent a pre-configured action stream to build easily some javascript files
 *
 * @param           {Object}          [settings={}]         The settings object to configure your instance
 *
 * @example         js
 * const SBuildDocNavActionStream = require('@coffeekraken/sugar/node/build/doc/SBuildDocNavActionStream');
 * const myStream = new SBuildDocNavActionStream();
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
module.exports = class SBuildDocNavActionStream extends __SActionsStream {
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
        docMap: __SDocMapStreamAction
      },
      __deepMerge(
        {
          actions: {
            filesResolver: {
              out: 'property'
            }
          },
          before: (streamObj) => {
            return streamObj;
          },
          afterActions: {},
          beforeActions: {}
        },
        settings
      )
    );
  }
};
