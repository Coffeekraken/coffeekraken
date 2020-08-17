const __SProcess = require('../../process/SProcess');
const __SBuildScssActionsStream = require('./SBuildScssActionsStream');

/**
 * @name            SBuildScssProcess
 * @namespace           node.build.scss
 * @type            Class
 * @extends         SProcess
 *
 * This class represent the process that build the SCSS files into CSS
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SBuildScssProcess extends __SProcess {
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
    super({
      id: 'process.build.scss',
      name: 'Build SCSS Process',
      ...settings
    });
  }

  /**
   * @name              run
   * @type              Function
   *
   * Method that execute the frontend server code, listen for errors, etc...
   *
   * @param       {Object}        argsObj           The arguments object that will be passed to the underlined actions stream instance
   * @param       {Object}        [settings={}]     An object of settings passed to the ```start``` method of the ```SBuildScssActionsStream``` instance
   * @return      {Süromise}                        An SPomise instance representing the build process
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(argsObj, settings = {}) {
    try {
      const actionStream = new __SBuildScssActionsStream(settings);
      this._buildScssActionsStream = actionStream.start(argsObj);
      return super.run(this._buildScssActionsStream);
    } catch (e) {
      this._buildScssActionsStream.trigger('log', {
        value: 'sssss'
      });
      console.log('XXX');
    }
  }

  /**
   * @name          kill
   * @type          Function
   *
   * Method that allows you to kill the process
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  kill() {
    this._buildScssActionsStream.cancel();
    super.kill();
  }
};
