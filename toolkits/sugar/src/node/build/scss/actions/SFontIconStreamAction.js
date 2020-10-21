const __SActionsStreamAction = require('../../../stream/SActionsStreamAction');
const __deepMerge = require('../../../object/deepMerge');
const __SBuildScssInterface = require('../interface/SBuildScssInterface');
const __SScssCompiler = require('../../../scss/SScssCompiler');
const __folderPath = require('../../../fs/folderPath');
const __copy = require('../../../clipboard/copy');
const __childProcess = require('child_process');
const __ensureDirSync = require('../../../fs/ensureDirSync');
const __removeSync = require('../../../fs/removeSync');

/**
 * @name                SFontIconStreamAction
 * @namespace           sugar.node.build.scss.actions
 * @type                Class
 * @extends             SActionsStreamAction
 *
 * This function is responsible of generating the icon font from the passed source directory
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SFontIconStreamAction extends __SActionsStreamAction {
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
          name: 'Font icons generator',
          id: 'SFontIconStreamAction'
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
      // compile using the SScssCompiler class

      __removeSync(`${streamObj.outputDir}/icons`);
      __ensureDirSync(`${streamObj.outputDir}/icons`);

      const pro = __childProcess.spawn(
        `npx @ln-e/icon-font-generator ${streamObj.iconsInput} -o ${streamObj.outputDir}/icons`,
        [],
        {
          shell: true,
          stdout: 'inherit'
        }
      );

      // import the icon css into
      streamObj.data = `
        @import "icons/icons.css";
        ${streamObj.data}
      `;

      resolve(streamObj);
    });
  }
};
