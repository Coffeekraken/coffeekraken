const __SActionsStreamAction = require('../../../stream/SActionsStreamAction');
const __deepMerge = require('../../../object/deepMerge');
const __SBuildFrontspecInterface = require('../interface/SBuildFrontspecInterface');
const __folderPath = require('../../../fs/folderPath');
const __SFrontspec = require('../../../doc/SFrontspec');

/**
 * @name                SBuildFrontspecStreamAction
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
module.exports = class SBuildFrontspecStreamAction extends __SActionsStreamAction {
  /**
   * @name            interface
   * @type             Object
   * @static
   *
   * Store the definition object that specify the streamObj required properties, types, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static interface = __SBuildFrontspecInterface;

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
          name: 'Build Frontspec',
          id: 'SBuildFrontspecStreamAction'
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

      const frontspec = new __SFrontspec({
        filename: streamObj.filename,
        outputDir: streamObj.outputDir,
        dirDepth: streamObj.dirDepth,
        cache: streamObj.cache
      });

      const promise = frontspec.json();
      promise.catch((e) => {
        reject(e);
      });
      const json = await promise;

      // set in output stack
      streamObj.data = json;
      streamObj.outputStack.data = `${streamObj.outputDir}/${streamObj.filename}`;

      resolve(streamObj);
    });
  }
};
