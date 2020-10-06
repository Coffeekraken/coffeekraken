const __SActionsStreamAction = require('../SActionsStreamAction');
const __deepMerge = require('../../object/deepMerge');
const __SInterface = require('../../class/SInterface');
const __SFrontspec = require('../../doc/SFrontspec');

class SFrontspecReadStreamActionInterface extends __SInterface {
  static definitionObj = {};
}

/**
 * @name            SFrontspecReadStreamAction
 * @namespace           sugar.node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 *
 * This action allows you to search and aggregate the "frontspec.json" files in the current
 * package as well as in the node modules packages.
 * The result of this action will be on the streamObj under the "frontspec" property
 *
 * @param       {Object}        [settings={}]          A settings object to configure your action
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SFrontspecReadStreamAction extends __SActionsStreamAction {
  /**
   * @name            interface
   * @type             Object
   * @static
   *
   * Store the definition object that specify the streamObj required properties, types, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static interface = SFrontspecReadStreamActionInterface;

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
          id: 'SFrontspecReadStreamAction'
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
      const res = await __SFrontspec.read();
      if (res) streamObj.frontspec = res;
      resolve(streamObj);
    });
  }
};
