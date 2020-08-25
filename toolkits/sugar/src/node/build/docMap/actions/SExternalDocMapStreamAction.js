const __SActionsStreamAction = require('../../../stream/SActionsStreamAction');
const __deepMerge = require('../../../object/deepMerge');
const __globby = require('globby');
const __path = require('path');
const __packageRoot = require('../../../path/packageRoot');
const __getFilename = require('../../../fs/filename');

/**
 * @name                SExternalDocMapStreamAction
 * @namespace           node.build.docMap.actions
 * @type                Class
 * @extends             SActionsStreamAction
 *
 * This function is responsible of getting docMap.js references into external folders like node_modules, etc...
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SExternalDocMapStreamAction extends __SActionsStreamAction {
  /**
   * @name            definitionObj
   * @type             Object
   * @static
   *
   * Store the definition object that specify the streamObj required properties, types, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static definitionObj = {
    externalDirs: {
      type: 'String|Array<String>',
      required: true
    }
  };

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
          id: 'actionStream.action.docMapExternal'
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
      const files = await __globby(streamObj.externalDocMaps);

      if (!files) return resolve(streamObj);

      files.forEach((filePath) => {
        const json = require(filePath);
        const cwd = __path
          .relative(__packageRoot(), filePath)
          .replace(`/docMap.json`, '');

        Object.keys(json).forEach((key) => {
          const itemObj = json[key];
          if (!itemObj.name || !itemObj.namespace) return;
          if (streamObj.data[key]) return;
          itemObj.cwd = cwd;
          streamObj.data[key] = itemObj;
        });
      });

      resolve(streamObj);
    });
  }
};
