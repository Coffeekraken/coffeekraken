const __SActionsStreamAction = require('../SActionsStreamAction');
const __glob = require('glob');
const __clone = require('../../object/clone');
const __extractSame = require('../../string/extractSame');
const __getFilename = require('../../fs/filename');
const __deepMerge = require('../../object/deepMerge');
const __SInterface = require('../../class/SInterface');
const __STestJestCli = require('../../test/jest/STestJestCli');
const __STestJestProcess = require('../../test/jest/STestJestProcessManager');

class SJestStreamActionInterface extends __SInterface {
  static definitionObj = {};
}

/**
 * @name            SJestStreamAction
 * @namespace           sugar.node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 *
 * This class is a stream action that allows you execute attached jest tests ([filename.test.js|__tests__/[filename].test.js])
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SJestStreamAction extends __SActionsStreamAction {
  /**
   * @name            interface
   * @type             Object
   * @static
   *
   * Store the definition object that specify the streamObj required properties, types, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static interface = SJestStreamActionInterface;

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
          id: 'SJestStreamAction'
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
      // if (!streamObj.pack) return resolve(streamObj);

      const input = streamObj.updatedFilePath || streamObj.input;

      const jestProcess = new __STestJestProcess(
        {},
        {
          deamon: null
        }
      );

      const promise = jestProcess.run({
        input
      });
      //   promise.catch((e) => {
      //     reject(e);
      //   });
      const result = await promise;
      console.log(result.state);

      // const cli = new __STestJestCli({

      // })
    });
  }
};
