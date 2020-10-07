const __SActionsStreamAction = require('../../../stream/SActionsStreamAction');
const __deepMerge = require('../../../object/deepMerge');
const __SBuildScssInterface = require('../interface/SBuildScssInterface');
const __SScssCompiler = require('../../../scss/SScssCompiler');
const __folderPath = require('../../../fs/folderPath');
const __copy = require('../../../clipboard/copy');

/**
 * @name                SRenderSassStreamAction
 * @namespace           sugar.node.build.scss.actions
 * @type                Class
 * @extends             SActionsStreamAction
 *
 * This function is responsible of rendering the sass string in the "data" property
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SRenderSassStreamAction extends __SActionsStreamAction {
  /**
   * @name            interface
   * @type             Object
   * @static
   *
   * Store the definition object that specify the streamObj required properties, types, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static interface = __SBuildScssInterface;

  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    super(
      __deepMerge(
        {
          name: 'Render',
          id: 'actionStream.action.scss.render'
        },
        settings
      )
    );
  }

  /**
   * @name          run
   * @type          Function
   * @async
   *
   * Override the base class run method
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(streamObj, settings) {
    return super.run(streamObj, async (resolve, reject, trigger, cancel) => {
      // compile using the SScssCompiler class

      if (!streamObj.outputStack) streamObj.outputStack = {};

      const compiler = new __SScssCompiler({
        sharedResources: streamObj.sharedResources
      });
      const promise = compiler.compile(streamObj.data, {
        sass: {
          includePaths: [__folderPath(streamObj.input)]
        },
        optimizers: {
          split: false
        }
      });
      promise.catch((e) => {
        reject(e);
      });
      const result = await promise;
      // streamObj = result.streamObj;
      streamObj.data = result.data;
      resolve(streamObj);
    });
  }
};
