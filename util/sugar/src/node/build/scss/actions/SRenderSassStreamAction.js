const __SActionsStreamAction = require('../../../stream/SActionsStreamAction');
const __getFilename = require('../../../fs/filename');
const __sass = require('sass');
const __deepMerge = require('../../../object/deepMerge');
const __packageRoot = require('../../../path/packageRoot');

/**
 * @name                SRenderSassStreamAction
 * @namespace           sugar.node.build.scss.actions
 * @type                Class
 * @extends             SActionsStreamAction
 *
 * This function is responsible of rendering the sass string in the "data" property
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SRenderSassStreamAction extends __SActionsStreamAction {
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
    data: {
      type: 'String',
      required: true
    },
    map: {
      type: 'Boolean',
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

    return new Promise(async (resolve, reject) => {
      __sass.render(
        __deepMerge(
          {
            data: streamObj.data,
            includePaths: [`${__packageRoot(process.cwd())}/node_modules`],
            sourceMap: streamObj.map
          },
          settings
        ),
        async function (err, result) {
          if (err) {
            reject(err);
            return;
          }

          // save the new css into "data"
          streamObj.data = result.css.toString();

          // save the map if exist into "sourcemapData"
          if (result.map) {
            streamObj.sourcemapData = result.map.toString();
          }

          // resolve the action
          resolve(streamObj);
        }
      );
    });
  }
};
