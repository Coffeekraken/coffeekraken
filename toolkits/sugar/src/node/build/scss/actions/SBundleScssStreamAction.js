const __SActionsStreamAction = require('../../../stream/SActionsStreamAction');
const __Bundler = require('scss-bundle').Bundler;
const __getFilename = require('../../../fs/filename');

/**
 * @name                SBundleScssStreamAction
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
module.exports = class SBundleScssStreamAction extends __SActionsStreamAction {
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
    input: {
      type: 'String',
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
      const bundler = new __Bundler(
        undefined,
        streamObj.input.split('/').slice(0, -1).join('/')
      );
      let bundledScssString = await (
        await bundler.bundle(__getFilename(streamObj.input))
      ).bundledContent;

      // set the bundled content into the "data" property
      if (streamObj.data) streamObj.data += bundledScssString;
      else streamObj.data = bundledScssString;

      resolve(streamObj);
    });
  }
};
