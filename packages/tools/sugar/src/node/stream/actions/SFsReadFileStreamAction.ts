import __SActionsStreamAction from '../SActionsStreamAction';
import __fs from 'fs';
import __isDirectory from '../../is/directory';
import __deepMerge from '../../object/deepMerge';
import __SInterface from '../../class/SInterface';

class SFsReadFileStreamActionInterface extends __SInterface {
  static definitionObj = {
    input: {
      type: 'String',
      required: true
    },
    dataProperty: {
      type: 'String',
      required: false,
      default: 'data'
    }
  };
}

/**
 * @name            SFsReadFileStreamAction
 * @namespace           sugar.node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 *
 * This class is a stream action that allows you to read file(s) to the filesystem
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SFsReadFileStreamAction extends __SActionsStreamAction {
  /**
   * @name            interface
   * @type             Object
   * @static
   *
   * Store the definition object that specify the streamObj required properties, types, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static interface = SFsReadFileStreamActionInterface;

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
          id: 'actionStream.action.fs.readFile'
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
      if (!__fs.existsSync(streamObj.input))
        throw new Error(
          `The given "<yellow>input</yellow>" streamObj file path property "<red>${streamObj}</red>" does not exists...`
        );

      if (__isDirectory(streamObj.input)) return resolve(streamObj);

      streamObj[
        streamObj.dataProperty ||
          SFsReadFileStreamAction.definitionObj.dataProperty.default
      ] = __fs.readFileSync(streamObj.input, 'utf8');

      resolve(streamObj);
    });
  }
}
