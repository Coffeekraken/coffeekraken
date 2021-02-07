// @ts-nocheck

import __SActionsStream from '../../stream/SActionsStream';
import __deepMerge from '../../object/deepMerge';
import __SFsOutputStreamAction from '../../stream/actions/SFsOutputStreamAction';
import __SBuildFrontspecInterface from './interface/SBuildFrontspecInterface';
import __SBuildFrontspecStreamAction from './actions/SBuildFrontspecStreamAction';

/**
 * @name            SBuildFrontspecActionsStream
 * @namespace           sugar.node.build.frontspec
 * @type            Class
 * @extends         SActionsStream
 * @status              wip
 *
 * This class represent a pre-configured action stream to build easily frontspec files
 *
 * @param           {Object}          [settings={}]         The settings object to configure your instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 * @todo        Document the streamObj required properties
 *
 * @example         js
 * import SBuildFrontspecActionsStream from '@coffeekraken/sugar/node/build/frontspec/SBuildFrontspecActionsStream';
 * const myStream = new SBuildFrontspecActionsStream();
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
export = class SBuildFrontspecActionsStream extends __SActionsStream {
  static interfaces = {
    this: __SBuildFrontspecInterface
  };

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
        buildFrontspec: __SBuildFrontspecStreamAction,
        fsOutput: __SFsOutputStreamAction
      },
      __deepMerge(
        {
          id: 'SBuildFrontspecActionsStream',
          name: 'Build Frontspec.json Actions Stream',
          afterActions: {},
          beforeActions: {}
        },
        settings
      )
    );
  }
};
