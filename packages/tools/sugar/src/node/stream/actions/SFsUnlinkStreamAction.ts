// @ts-nocheck

import __SActionsStreamAction from '../SActionsStreamAction';
import __rimraf from 'rimraf';
import __deepMerge from '../../object/deepMerge';
import __SInterface from '../../class/SInterface';

class SFsUnlinkStreamActionInterface extends __SInterface {
  static definition = {
    unlink: {
      type: 'String',
      required: true
    }
  };
}

/**
 * @name            SFsUnlinkStreamAction
 * @namespace           sugar.node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 * @status              beta
 *
 * This class is an action that allows you to delete some files / folders depending on the "unlink" property of the streamObj.
 * You can specify some glob patterns if you want
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @see       https://www.npmjs.com/package/rimraf
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SFsUnlinkStreamAction extends __SActionsStreamAction {
  /**
   * @name            interface
   * @type             Object
   * @static
   *
   * Store the definition object that specify the streamObj required properties, types, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static interfaces = {
    this: SFsUnlinkStreamActionInterface
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
    super(
      __deepMerge(
        {
          id: 'actionStream.action.fs.unlink'
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
    return super.run(streamObj, async ({ resolve, reject }) => {
      __rimraf.sync(streamObj.unlink);
      delete streamObj.unlink;
      resolve(streamObj);
    });
  }
}
