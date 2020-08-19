const __SProcess = require('../../process/SProcess');
const __SBuildScssActionsStream = require('./SBuildScssActionsStream');
const __SPromise = require('../../promise/SPromise');
const __SFsDeamon = require('../../deamon/fs/SFsDeamon');
const { initial } = require('lodash');

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
  constructor(initialParams = {}, settings = {}) {
    super(initialParams, {
      id: 'process.build.scss',
      name: 'Build SCSS Process',
      deamon: {
        class: __SFsDeamon,
        watchArgs: [initialParams.watch, settings],
        runOn: ['update', 'add', 'unlink']
      },
      ...settings
    });
    this._actionStream = new __SBuildScssActionsStream(settings);
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
    this._buildScssActionsStream = this._actionStream.start(argsObj);
    return super.run(this._buildScssActionsStream, argsObj, settings);
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
