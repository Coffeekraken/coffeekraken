const __deepMerge = require('../../../object/deepMerge');
const __SActionsStreamAction = require('../../../stream/SActionsStreamAction');
const __jsObjectToScssMap = require('../jsObjectToScssMap');

/**
 * @name                SJsObjectToScssStreamAction
 * @namespace           node.build.scss.actions
 * @type                Class
 * @extends             SActionsStreamAction
 *
 * This function is responsible of transform a js object to an scss map
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SJsObjectToScssStreamAction extends __SActionsStreamAction {
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
    jsObjectToScss: {
      type: 'Object',
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

    settings = __deepMerge({}, settings);

    return new Promise(async (resolve, reject) => {
      const result = __jsObjectToScssMap(streamObj.jsObjectToScss, settings);

      // set or append in the "data" property
      if (streamObj.data) streamObj.data = result + streamObj.data;
      else streamObj.data = result;

      // resolving the action
      resolve(streamObj);
    });
  }
};
