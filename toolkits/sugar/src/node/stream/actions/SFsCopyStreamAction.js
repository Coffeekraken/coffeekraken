const __SActionsStreamAction = require('../SActionsStreamAction');
const __ncp = require('ncp').ncp;
const __deepMerge = require('../../object/deepMerge');
const __SInterface = require('../../class/SInterface');

class SFsCopyStreamActionInterface extends __SInterface {
  static definitionObj = {
    input: {
      type: 'String',
      required: true
    },
    outputDir: {
      type: 'String',
      required: true
    }
  };
}

/**
 * @name            SFsCopyStreamAction
 * @namespace           node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 *
 * This class is a stream action that allows you to copy some files or folders from one location to another
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SFsCopyStreamAction extends __SActionsStreamAction {
  /**
   * @name            interface
   * @type             Object
   * @static
   *
   * Store the definition object that specify the streamObj required properties, types, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static interface = SFsCopyStreamActionInterface;

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
          id: 'actionStream.action.fs.copy'
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
  run(streamObj, settings = this._settings) {
    return super.run(streamObj, async (resolve, reject) => {
      __ncp(streamObj.input, streamObj.outputDir, (e) => {
        if (e) return reject(e);
        resolve(streamObj);
      });
    });
  }
};
