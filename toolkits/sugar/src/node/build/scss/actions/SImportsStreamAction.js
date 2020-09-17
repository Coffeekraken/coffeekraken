const __SActionsStreamAction = require('../../../stream/SActionsStreamAction');
const __getScssImportsStrings = require('../getScssImportsStrings');
const __deepMerge = require('../../../object/deepMerge');
const __SBuildScssInterface = require('../interface/SBuildScssInterface');

/**
 * @name                SImportsStreamAction
 * @namespace           sugar.node.build.scss.actions
 * @type                Class
 * @extends             SActionsStreamAction
 *
 * This function is responsible of importing some packages directly on top of the scss files
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SImportsStreamAction extends __SActionsStreamAction {
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
          name: 'Imports',
          id: 'actionStream.action.scss.imports'
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
      const importsStrings = __getScssImportsStrings(streamObj.imports);

      streamObj.data = streamObj.data
        ? `
        ${importsStrings.prepend}
        ${streamObj.data}
        ${importsStrings.append}
      `
        : importsStrings.prepend + importsStrings.append;

      const atUseReg = /\s?@use.+/gm;
      const atUseMatches = streamObj.data.match(atUseReg);

      if (atUseMatches) {
        // remove all the lines from the string
        atUseMatches.forEach((atUseLine) => {
          streamObj.data = streamObj.data.replace(atUseLine, '');
        });
        // prepend all the @use statements
        streamObj.data = `
          ${atUseMatches.join('\n')}
          ${streamObj.data}
        `;
      }

      // resolve the action
      resolve(streamObj);
    });
  }
};
