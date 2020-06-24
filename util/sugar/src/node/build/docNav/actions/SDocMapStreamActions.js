const __SActionsStreamAction = require('../../../stream/SActionsStreamAction');
const __docMap = require('../../../doc/docMap');
const __fs = require('fs');

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
    outputDir: {
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
    console.log(streamObj.outputDir);

    // make sure we have a correct streamObj
    this.checkStreamObject(streamObj);

    // return the promise for this action
    return new Promise(async (resolve, reject) => {
      // get the docmap object
      const docMap = await __docMap(streamObj.outputDir);

      __fs.writeFileSync(
        streamObj.outputDir + '/docMap.json',
        JSON.stringify(docMap, null, 4)
      );

      resolve(streamObj);
    });
  }
};
