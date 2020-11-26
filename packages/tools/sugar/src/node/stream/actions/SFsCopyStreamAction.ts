// @ts-nocheck

import __SActionsStreamAction from '../SActionsStreamAction';
import __deepMerge from '../../object/deepMerge';
import __SInterface from '../../class/SInterface';
import { ncp as __ncp } from 'ncp';

class SFsCopyStreamActionInterface extends __SInterface {
  static definition = {
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
 * @namespace           sugar.node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 * @wip
 *
 * This class is a stream action that allows you to copy some files or folders from one location to another
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
export = class SFsCopyStreamAction extends __SActionsStreamAction {
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
