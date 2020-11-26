// @ts-nocheck

import __deepMerge from '../../../object/deepMerge';
import __SActionsStreamAction from '../../../stream/SActionsStreamAction';
import __SBuildJsInterface from '../interface/SBuildJsInterface';
import __SJsCompiler from '../../SJsCompiler';

/**
 * @name                SCompileJsStreamAction
 * @namespace           sugar.node.build.js.actions
 * @type                Class
 * @extends             SActionsStreamAction
 * @wip
 *
 * This function is responsible of compiling the passed file
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
export = class SCompileJsStreamAction extends __SActionsStreamAction {
  /**
   * @name            interface
   * @type             Object
   * @static
   *
   * Store the definition object that specify the streamObj required properties, types, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static interface = __SBuildJsInterface.extends({
    definition: {}
  });

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
          id: 'SCompileJsStreamAction'
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
      const compiler = new __SJsCompiler(streamObj);
      const compileRes = await compiler.compile(streamObj.input);

      // otherwise, save the new data in the streamObj
      streamObj.data = compileRes.js;

      // set the map if has been generated
      if (compileRes.map) streamObj.sourcemapData = compileRes.map;

      // resolve the new streamObj
      resolve(streamObj);
    });
  }
};
