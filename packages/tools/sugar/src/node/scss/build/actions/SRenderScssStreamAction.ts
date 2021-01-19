// @ts-nocheck

import __SActionsStreamAction from '../../../stream/SActionsStreamAction';
import __deepMerge from '../../../object/deepMerge';
import __SBuildScssInterface from '../interface/SBuildScssInterface';
import __SScssCompiler from '../../SScssCompiler';

/**
 * @name                SRenderSassStreamAction
 * @namespace           sugar.node.build.scss.actions
 * @type                Class
 * @extends             SActionsStreamAction
 * @wip
 *
 * This function is responsible of rendering the sass string in the "data" property
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
export = class SRenderSassStreamAction extends __SActionsStreamAction {
  /**
   * @name            interface
   * @type             Object
   * @static
   *
   * Store the definition object that specify the streamObj required properties, types, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static interface = __SBuildScssInterface;

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
          name: 'Render',
          id: 'actionStream.action.scss.render'
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
    return super.run(streamObj, async ({ resolve, reject, emit }) => {
      // compile using the SScssCompiler class
      if (!streamObj.outputStack) streamObj.outputStack = {};

      const compiler = new __SScssCompiler(streamObj);
      const compileRes = await compiler.compile(streamObj.input);

      streamObj.data = compileRes.css;
      if (compileRes.map) {
        streamObj.sourcemapData = compileRes.map;
      }
      resolve(streamObj);
    });
  }
};
