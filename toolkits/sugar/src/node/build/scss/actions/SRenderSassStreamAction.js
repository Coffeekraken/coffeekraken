const __SActionsStreamAction = require('../../../stream/SActionsStreamAction');
const __sass = require('sass');
const __deepMerge = require('../../../object/deepMerge');
const __packageRoot = require('../../../path/packageRoot');
const __globImporter = require('node-sass-glob-importer');
const __getFilename = require('../../../fs/filename');
const __SPromise = require('../../../promise/SPromise');
const __SBuildScssInterface = require('../interface/SBuildScssInterface');

/**
 * @name                SRenderSassStreamAction
 * @namespace           node.build.scss.actions
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
    return super.run(streamObj, async (resolve, reject, trigger, cancel) => {
      __sass.render(
        __deepMerge(
          {
            importer: __globImporter(),
            data: streamObj.data,
            includePaths: [
              `${streamObj.input.replace(__getFilename(streamObj.input), '')}`,
              `${__packageRoot(process.cwd())}/node_modules`,
              `${__packageRoot(__dirname)}/src/scss`,
              `${__packageRoot(process.cwd())}/src/scss`
            ],
            sourceMap: streamObj.map
          },
          settings
        ),
        async function (err, result) {
          if (err) {
            reject(err.formatted ? err.formatted : err.toString());
            return;
          }

          const resultString = result.css.toString();
          // save the new css into "data"
          streamObj.data = resultString;

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
