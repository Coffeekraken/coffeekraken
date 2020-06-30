const __SActionsStreamAction = require('../../../stream/SActionsStreamAction');
const __Bundler = require('scss-bundle').Bundler;
const __getFilename = require('../../../fs/filename');

/**
 * @name                SImportsStreamAction
 * @namespace           node.build.scss.actions
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
module.exports = class SImportsStreamAction extends __SActionsStreamAction {
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
    imports: {
      type: 'Array<Object>',
      required: false
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
    super(settings);
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
  run(streamObj, settings = this._settings) {
    // make sure we have a correct streamObj
    this.checkStreamObject(streamObj);

    return new Promise(async (resolve, reject) => {
      if (!streamObj.imports) return resolve(streamObj);

      streamObj.imports.forEach((importObj) => {
        const importString = `
          @use "${importObj.path}" as ${importObj.name};
          ${importObj.scss ? importObj.scss : ''}
        `;

        // add this to the "data" property
        if (streamObj.data) streamObj.data = importString + streamObj.data;
        else streamObj.data = importString;
      });

      // resolve the action
      resolve(streamObj);
    });
  }
};
