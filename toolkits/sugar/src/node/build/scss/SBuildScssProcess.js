const __SProcess = require('../../process/SProcess');
const __SBuildScssActionsStream = require('./SBuildScssActionsStream');
const __SPromise = require('../../promise/SPromise');

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
    const actionStream = new __SBuildScssActionsStream(settings);
    this._buildScssActionsStream = actionStream.start(argsObj);
    this._buildScssActionsStream.on('log', (l) => {
      console.log('_lo', l);
    });
    // __SPromise.pipe(this._buildScssActionsStream, this);

    // this.on('log', (l) => {
    //   console.log('A');
    // });

    return super.run(this._buildScssActionsStream);
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
