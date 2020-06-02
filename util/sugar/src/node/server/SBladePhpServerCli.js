const __SPhpServerCli = require('./SPhpServerCli');
const __packageRoot = require('../path/packageRoot');
const __deepMerge = require('../object/deepMerge');

/**
 * @name            SBladePhpServerCli
 * @namespace       sugar.node.server
 * @type            Class
 * @extends         SPhpServerCli
 *
 * This class represent the Blade PHP cli
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SBladePhpServerCli extends __SPhpServerCli {
  /**
   * @name          definitionObj
   * @type          Object
   * @static
   *
   * Store the definition object
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static definitionObj = {
    ...__SPhpServerCli.definitionObj
  };

  /**
   * @name          constructor
   * @type          Function
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
   * @name            run
   * @type            Function
   * @override
   *
   * This method simply override the default one.
   * For arguments documentation, check the SCli class.
   *
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(
    argsObj = this._settings.argsObj,
    includeAllArgs = this._settings.includeAllArgs
  ) {
    const process = super.run(argsObj.server, includeAllArgs);
    setTimeout(() => {
      this.log(`<green>Your Blade PHP server is up and running</green>:

    `);
    });
    return process;
  }
};
