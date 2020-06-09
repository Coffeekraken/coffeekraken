const __deepMerge = require('../../../object/deepMerge');
const __SActionsStreamAction = require('../../../stream/SActionsStreamAction');
const __uglifyJs = require('uglify-js');

/**
 * @name                SUglifyJsStreamAction
 * @namespace           sugar.node.build.js.actions
 * @type                Class
 * @extends             SActionsStreamAction
 *
 * This function is responsible of passing uglify js on the output files
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SUglifyJsStreamAction extends __SActionsStreamAction {
  /**
   * @name            definitionObj
   * @type             Object
   * @static
   *
   * Store the definition object that specify the streamObj required properties, types, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static definitionObj = {
    filename: {
      type: 'String',
      required: true
    },
    data: {
      type: 'String',
      required: true
    },
    sourcemapData: {
      type: 'String',
      required: false
    }
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
    super(settings);
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
    // make sure we have a correct streamObj
    this.checkStreamObject(streamObj);

    // return the promise for this action
    return new Promise((resolve, reject) => {
      // minify the "data"
      const uglifyResult = __uglifyJs.minify(
        streamObj.data,
        __deepMerge(
          {
            sourceMap: {
              filename: streamObj.filename,
              url: streamObj.filename + '.map'
            }
          },
          settings
        )
      );

      // check if has some error
      if (uglifyResult.error) {
        throw new Error(uglifyResult.error);
      }

      // otherwise, save the new data in the streamObj
      streamObj.data = uglifyResult.code;

      // set the map if has been generated
      if (uglifyResult.map) streamObj.sourcemapData = uglifyResult.map;

      // resolve the new streamObj
      resolve(streamObj);
    });
  }
};
