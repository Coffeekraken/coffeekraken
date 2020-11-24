// @ts-nocheck

import __SActionsStreamAction from '../SActionsStreamAction';
import __writeFile from '../../fs/writeFile';
import __toString from '../../string/toString';
import __packageRoot from '../../path/packageRoot';
import __deepMerge from '../../object/deepMerge';
import __get from '../../object/get';
import __SInterface from '../../class/SInterface';

class SFsOutputStreamActionInterface extends __SInterface {
  static definitionObj = {
    outputStack: {
      type: 'Object',
      required: false
    }
  };
}

/**
 * @name            SFsOutputStreamAction
 * @namespace           sugar.node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 * @beta
 *
 * This class is a stream action that allows you to save file(s) to the filesystem
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
export = class SFsOutputStreamAction extends __SActionsStreamAction {
  /**
   * @name            interface
   * @type             Object
   * @static
   *
   * Store the definition object that specify the streamObj required properties, types, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static interface = SFsOutputStreamActionInterface;

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
          id: 'actionStream.action.fs.output'
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
    return super.run(streamObj, async (resolve, reject, trigger) => {
      if (!streamObj.outputStack || typeof streamObj.outputStack !== 'object') {
        this.warn(
          `The streamObj does not contain any "<cyan>outputStack</cyan>" property so no file will be saved at all...`
        );
        return resolve(streamObj);
      }

      // loop on the files to save
      const outputStackKeys = Object.keys(streamObj.outputStack);

      for (let i = 0; i < outputStackKeys.length; i++) {
        const key = outputStackKeys[i];
        const outputPath = streamObj.outputStack[key];
        const readableOutputPath = outputPath.replace(
          __packageRoot(process.cwd()),
          ''
        );
        if (!__get(streamObj, key)) continue;
        await __writeFile(
          outputPath,
          __toString(__get(streamObj, key), {
            beautify: true
          })
        );
      }

      resolve(streamObj);
    });
  }
}
