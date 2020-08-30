const __SProcess = require('../../process/SProcess');
const __SBuildJsActionsStream = require('./SBuildJsActionsStream');
const __SFsDeamon = require('../../deamon/fs/SFsDeamon');

/**
 * @name            SBuildJsProcess
 * @namespace           node.build.js
 * @type            Class
 * @extends         SProcess
 *
 * This class represent the process that build the JS files
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SBuildJsProcess extends __SProcess {
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
      id: 'build.js.process',
      name: 'Build JS Process',
      deamon: {
        class: __SFsDeamon,
        watchArgs: [initialParams.watch, settings],
        runOn: ['update', 'add', 'unlink'],
        processParams: (params, data) => {
          return params;
        }
      },
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
    const actionStream = new __SBuildJsActionsStream(settings);
    this._buildJsActionStream = actionStream.start(argsObj);
    return super.run(this._buildJsActionStream);
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
    this._buildJsActionStream.cancel();
    super.kill();
  }
};
