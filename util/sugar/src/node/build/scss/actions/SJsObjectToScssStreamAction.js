const __deepMerge = require('../../../object/deepMerge');
const __SActionsStreamAction = require('../../../stream/SActionsStreamAction');
const __jsonSass = require('json-sass-vars');

/**
 * @name                SJsObjectToScssStreamAction
 * @namespace           node.build.scss.actions
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

    settings = __deepMerge(
      {
        quoteKeys: ['src', 'import', 'font-family']
      },
      settings
    );

    return new Promise(async (resolve, reject) => {
      let scssConfigString = __jsonSass.convertJs(streamObj.jsObjectToScss);

      scssConfigString = `$sugarUserSettings: ${scssConfigString};`;

      scssConfigString.split('\n').forEach((line) => {
        line = line.trim();
        const isComma = line.substr(-1) === ',';
        if (isComma) {
          line = line.slice(0, -1);
        }
        const prop = line.split(':')[0];
        const value = line.split(':').slice(1).join(':').trim();
        if (prop === '),' || prop === ')' || value === '(') return;

        if (settings.quoteKeys.indexOf(prop) === -1) return;

        scssConfigString = scssConfigString.replace(
          line,
          `${prop}: "${value}"`
        );
      });

      // set or append in the "data" property
      if (streamObj.data) streamObj.data = scssConfigString + streamObj.data;
      else streamObj.data = scssConfigString;

      // resolving the action
      resolve(streamObj);
    });
  }
};
