const __deepMerge = require('../../../object/deepMerge');
const __SActionsStreamAction = require('../../../stream/SActionsStreamAction');
const __terser = require('terser');
const __SBuildJsInterface = require('../interface/SBuildJsInterface');

/**
 * @name                STerserStreamAction
 * @namespace           sugar.node.build.js.actions
 * @type                Class
 * @extends             SActionsStreamAction
 *
 * This function is responsible of passing terser js on the output files
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class STerserStreamAction extends __SActionsStreamAction {
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
    definitionObj: {
      filename: {
        type: 'String',
        required: true
      },
      data: {
        type: 'String',
        required: true
      },
      sourcemapData: {
        type: 'String|Object',
        required: false
      }
    }
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
          id: 'actionStream.action.js.terser'
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
    return super.run(streamObj, (resolve, reject) => {
      // minify the "data"

      if (!streamObj.prod) return resolve(streamObj);

      const terserResult = __terser.minify(
        streamObj.data,
        __deepMerge(
          {
            output: {
              comments: false
            },
            sourceMap: {
              filename: streamObj.filename,
              url: streamObj.filename + '.map'
            }
          },
          settings
        )
      );

      // check if has some error
      if (terserResult.error) {
        throw new Error(terserResult.error);
      }

      // otherwise, save the new data in the streamObj
      streamObj.data = terserResult.code;

      // set the map if has been generated
      if (terserResult.map) streamObj.sourcemapData = terserResult.map;

      // resolve the new streamObj
      resolve(streamObj);
    });
  }
};
