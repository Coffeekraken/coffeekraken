const __SProcessManager = require('../../process/SProcess');
const __SBuildScssActionsStream = require('./SBuildScssActionsStream');
const __SPromise = require('../../promise/SPromise');
const __SFsDeamon = require('../../deamon/fs/SFsDeamon');
const __deepMerge = require('../../object/deepMerge');

/**
 * @name            SBuildScssProcess
 * @namespace           sugar.node.build.scss
 * @type            Class
 * @extends         SProcess
 *
 * This class represent the process that build the SCSS files into CSS
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SBuildScssProcess extends __SProcessManager {
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
    super(
      initialParams,
      __deepMerge(
        {
          id: 'SBuildScssProcess',
          name: 'Build SCSS Process',
          deamon: new __SFsDeamon({})
        },
        settings
      )
    );
  }

  /**
   * @name              deamonUpdate
   * @type              Function
   *
   * Method that is called by the deamon when something has been detected.
   * You must return the params that will be passed to the ```run``` method
   * depending on the input ones that are the ```initialParams``` object and the
   * ```deamonUpdateObj``` one.
   * If you don't want to trigger a ```run``` process, just return ```false```
   *
   * @param     {Object}      [initialParams={}]      The constructor passed initialParams object
   * @param     {Object}      [deamonUpdateObj={}]    The deamon update object
   * @return    {Object|Boolean}                      The new object to pass to the ```run``` method, or ```false``` if you don't want to trigger a ```run```
   */
  deamonUpdate(initialParams = {}, deamonUpdateObj = {}) {
    return initialParams;
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
