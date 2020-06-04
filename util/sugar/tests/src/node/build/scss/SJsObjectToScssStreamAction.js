const __deepMerge = require('../../object/deepMerge');
const __SActionsStreamAction = require('../../stream/SActionsStreamAction');
const __writeFile = require('../../fs/writeFile');
const __tmpDir = require('../../fs/tmpDir');
const __child_process = require('child_process');
const __fs = require('fs');

/**
 * @name                SJsObjectToScssStreamAction
 * @namespace           sugar.node.build.scss
 * @type                Class
 * @extends             SActionsStreamAction
 *
 * This function is responsible of transform a js object to an scss map
 *
 * @param       {Object}        streamObj          The streamObj object with the properties described bellow:
 * @return      {Promise}                         A simple promise that will be resolved when the process is finished
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SJsObjectToScssStreamAction extends __SActionsStreamAction {
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
    jsObjectToScss: {
      type: 'Object',
      required: true
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
      await __writeFile(
        __tmpDir() + '/sugar.build.scss.config.json',
        JSON.stringify(streamObj.jsObjectToScss, null, 4)
      );

      const command = `npx --no-install json-to-scss ${__tmpDir()}/sugar.build.scss.config.json ${__tmpDir()}/sugar.build.scss.config.scss --mo`;
      __child_process.execSync(command);
      const scssConfigString = __fs
        .readFileSync(`${__tmpDir()}/sugar.build.scss.config.scss`, 'ascii')
        .replace('$sugar:', '$sugarUserSettings:')
        .trim();

      __fs.unlinkSync(`${__tmpDir()}/sugar.build.scss.config.json`);
      __fs.unlinkSync(`${__tmpDir()}/sugar.build.scss.config.scss`);

      // set or append in the "data" property
      if (streamObj.data) streamObj.data = scssConfigString + streamObj.data;
      else streamObj.data = scssConfigString;

      // resolving the action
      resolve(streamObj);
    });
  }
};
