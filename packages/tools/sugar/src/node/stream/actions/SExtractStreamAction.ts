// @ts-nocheck

import __SActionsStreamAction from '../SActionsStreamAction';
import __packageRoot from '../../path/packageRoot';
import __fs from 'fs';
import __ensureDirSync from '../../fs/ensureDirSync';
import __deepMerge from '../../object/deepMerge';
import __md5 from '../../crypt/md5';
import __writeJsonSync from '../../fs/writeJsonSync';
import __SInterface from '../../class/SInterface';

class SExtractStreamActionInterface extends __SInterface {
  static definitionObj = {};
}

/**
 * @name            SExtractStreamAction
 * @namespace           sugar.node.stream.actions
 * @type            Class
 * @extends         SActionsStreamAction
 * @wip
 *
 * This actions allows you to extract some data from the specified streamObj property using custom comments syntax like "/* extract:propName *\/ ... /* extract *\/".
 * This "propName" specify in which streamObj property you want to save the extracted content.
 *
 * @param       {Object}        [settings={}]          A settings object to configure your action
 * - sourceProp ('data') {String}: Specify the source property you want to extract data from
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export = class SExtractStreamAction extends __SActionsStreamAction {
  /**
   * @name            interface
   * @type             Object
   * @static
   *
   * Store the definition object that specify the streamObj required properties, types, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static interface = SExtractStreamActionInterface;

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
          id: 'actionStream.action.extract',
          sourceProp: 'data'
        },
        settings
      )
    );
    this.constructor.definitionObj = {
      [this._settings.sourceProp]: {
        type: 'String',
        required: true
      }
    };
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
      const reg = /\/\*\s?extract:([a-zA-Z0-9-_]+)\s?\*\/(((?!\/\*\s?extract\s?\*\/)(.|\n))*)\/\*\s?extract\s?\*\//g;
      const source = streamObj[settings.sourceProp];
      let myArray;
      while ((myArray = reg.exec(source)) !== null) {
        const prop = myArray[1];
        const string = myArray[2];
        streamObj[prop] = string;
      }
      resolve(streamObj);
    });
  }
}
