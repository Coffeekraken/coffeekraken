const __SActionsStreamAction = require('../SActionsStreamAction');
const __deepMerge = require('../../object/deepMerge');
const __SInterface = require('../../class/SInterface');
const __SDocMap = require('../../doc/SDocMap');

class SDocMapStreamActionInterface extends __SInterface {
  static definitionObj = {
    outputDir: {
      type: 'String',
      required: true
    },
    input: {
      type: 'String',
      required: true
    },
    docMapInput: {
      type: 'String',
      required: true
    }
  };
}

/**
 * @name            SDocMapStreamAction
 * @namespace           sugar.node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 *
 * This actions allows you to scan files defined by a glob pattern and generate a ```docMap.json``` file containing the reference of all the
 * finded namespace docblock tags.
 *
 * @param       {Object}        [settings={}]          A settings object to configure your action
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SDocMapStreamAction extends __SActionsStreamAction {
  /**
   * @name            definitionObj
   * @type             Object
   * @static
   *
   * Store the definition object that specify the streamObj required properties, types, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static interface = SDocMapStreamActionInterface;

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
          id: 'actionStream.action.docMap'
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
    if (!streamObj.docMapInput) {
      streamObj.docMapInput = streamObj.input;
    }

    return super.run(streamObj, async (resolve, reject) => {
      const docMap = new __SDocMap({
        outputDir: streamObj.outputDir
      });
      await docMap.scan(streamObj.docMapInput);
      // await docMap.save();

      resolve(streamObj);
    });
  }
};
