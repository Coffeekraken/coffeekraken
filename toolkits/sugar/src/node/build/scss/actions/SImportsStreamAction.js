const __SActionsStreamAction = require('../../../stream/SActionsStreamAction');
const __Bundler = require('scss-bundle').Bundler;
const __getFilename = require('../../../fs/filename');
const __sugarConfig = require('../../../config/sugar');
const __getScssImportsStrings = require('../getScssImportsStrings');

/**
 * @name                SImportsStreamAction
 * @namespace           node.build.scss.actions
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
   * @name            definitionObj
   * @type             Object
   * @static
   *
   * Store the definition object that specify the streamObj required properties, types, etc...
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static definitionObj = {
    imports: {
      type: 'Array<Object>',
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
  run(streamObj, settings) {
    // make sure we have a correct streamObj
    this.checkStreamObject(streamObj);

    return new Promise(async (resolve, reject) => {
      const importsStrings = __getScssImportsStrings(streamObj.imports);

      streamObj.data = streamObj.data
        ? `
        ${importsStrings.prepend}
        ${streamObj.data}
        ${importsStrings.append}
      `
        : importsString.prepend + importsStrings.append;

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
