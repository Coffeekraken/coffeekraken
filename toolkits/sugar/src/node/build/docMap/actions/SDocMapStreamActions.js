const __SActionsStreamAction = require('../../../stream/SActionsStreamAction');
const __SDocMapItem = require('../../../doc/SDocMapItem');
/**
 * @name                SDocMapStreamActions
 * @namespace           node.build.doc.actions
 * @type                Class
 * @extends             SActionsStreamAction
 *
 * This function is responsible of generating the docMap.json file at the root of the documentation directory
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SDocMapStreamActions extends __SActionsStreamAction {
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
    files: {
      type: 'Array<String>',
      required: true
    },
    output: {
      type: 'String',
      required: true
    }
  };

  static once = true;

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

    // return the promise for this action
    return new Promise(async (resolve, reject) => {
      // create the items array
      const itemsArray = [];

      // loop on files
      streamObj.files.forEach((filePath) => {
        // create a docMap item
        const item = new __SDocMapItem(filePath, {
          output: streamObj.output
        });
        itemsArray.push(item.toJson());
      });

      streamObj.data = JSON.stringify(itemsArray, null, 4);

      resolve(streamObj);
    });
  }
};
