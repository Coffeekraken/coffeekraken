const __SActionsStreamAction = require('../../../stream/SActionsStreamAction');
const __SDocMap = require('../../../doc/SDocMap');
const __deepMerge = require('../../../object/deepMerge');

/**
 * @name                SDocMapStreamActions
 * @namespace           sugar.node.build.docMap.actions
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
    super(
      __deepMerge(
        {
          id: 'SDocMapStreamAction'
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
      const docMap = new __SDocMap(settings);
      const res = await docMap.generate();
      if (res) {
        streamObj.data = res;
      }
      resolve(streamObj);
    });
  }
};
