import __SActionsStream from '../../stream/SActionsStream';
import __deepMerge from '../../object/deepMerge';
import __getFilename from '../../fs/filename';
import __SFsOutputStreamAction from '../../stream/actions/SFsOutputStreamAction';
import __SRenderScssStreamAction from './actions/SRenderScssStreamAction';
import __SFsFilesResolverStreamAction from '../../stream/actions/SFsFilesResolverStreamAction';
import __path from 'path';
import __SBuildScssInterface from './interface/SBuildScssInterface';
/**
 * @name            SBuildScssActionsStream
 * @namespace           sugar.node.build.scss
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
 * import SBuildScssActionsStream from '@coffeekraken/sugar/node/build/SBuildScssActionsStream';
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
export default class SBuildScssActionsStream extends __SActionsStream {
  static interface = __SBuildScssInterface;

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
        render: __SRenderScssStreamAction,
        fsOutput: __SFsOutputStreamAction
      },
      __deepMerge(
        {
          id: 'SBuildScssActionsStream',
          name: 'Build SCSS Actions Stream',
          before: (streamObj) => {
            return streamObj;
          },
          afterActions: {
            filesResolver: (streamObj) => {
              streamObj.filename = __getFilename(streamObj.input);
              return streamObj;
            }
          },
          beforeActions: {
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
          ? streamObj.filename.replace('.scss', '.prod.css')
          : streamObj.filename.replace('.scss', '.css')
      );
    }
    if (streamObj.outputDir && streamObj.filename && streamObj.sourcemapData) {
      streamObj.outputStack.sourcemapData = __path.resolve(
        streamObj.outputDir,
        streamObj.prod
          ? streamObj.filename.replace('.css', '.prod.css.map')
          : streamObj.filename.replace('.css', '.css.map')
      );
    }
    return streamObj;
  }
}
