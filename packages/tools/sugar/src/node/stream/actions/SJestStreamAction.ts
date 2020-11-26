// @ts-nocheck

import __SActionsStreamAction from '../SActionsStreamAction';
import __glob from 'glob';
import __clone from '../../object/clone';
import __extractSame from '../../string/extractSame';
import __getFilename from '../../fs/filename';
import __deepMerge from '../../object/deepMerge';
import __SInterface from '../../class/SInterface';
import __STestJestCli from '../../test/jest/STestJestCli';
import __STestJestProcess from '../../test/jest/STestJestProcessManager';

class SJestStreamActionInterface extends __SInterface {
  static definition = {};
}

/**
 * @name            SJestStreamAction
 * @namespace           sugar.node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 * @wip
 *
 * This class is a stream action that allows you execute attached jest tests ([filename.test.js|__tests__/[filename].test.js])
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = class SJestStreamAction extends __SActionsStreamAction {
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

      // const cli = new __STestJestCli({

      // })
    });
  }
};
