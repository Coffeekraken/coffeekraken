const __SActionsStreamAction = require('../../../stream/SActionsStreamAction');
const __getScssSharedResourcesStrings = require('../getScssSharedResourcesStrings');
const __deepMerge = require('../../../object/deepMerge');
const __SBuildScssInterface = require('../interface/SBuildScssInterface');
const __fs = require('fs');
const __tmpDir = require('../../../fs/tmpDir');
const __packageRoot = require('../../../path/packageRoot');

/**
 * @name                SSharedResourcesStreamAction
 * @namespace           sugar.node.build.scss.actions
 * @type                Class
 * @extends             SActionsStreamAction
 *
 * This function is responsible of importing some packages directly on top of the scss files
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SSharedResourcesStreamAction extends __SActionsStreamAction {
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
          name: 'Shared Ressources',
          id: 'SSharedResourcesStreamAction'
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
    return super.run(streamObj, async (resolve, reject) => {
      if (!streamObj.sharedResources) return resolve(streamObj);

      const sharedResourcesStrings = __getScssSharedResourcesStrings(
        streamObj.sharedResources
      );
      streamObj.sharedResources = [sharedResourcesStrings];

      // resolve the action
      resolve(streamObj);
    });
  }
};
