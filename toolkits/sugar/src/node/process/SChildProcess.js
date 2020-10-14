const __SPromise = require('../promise/SPromise');
const __SChildProcessInterface = require('./interface/SChildProcessInterface');
const __notifier = require('node-notifier');
const __deepMerge = require('../object/deepMerge');
const __packageRoot = require('../path/packageRoot');
const __isChildProcess = require('../is/childProcess');
const __SIpc = require('../ipc/SIpc');
const __SError = require('../error/SError');
const __SProcess = require('./SProcess');

/**
 * @name                SChildProcess
 * @namespace           sugar.node.process
 * @type                Class
 * @extends             SPromise
 *
 * This class represent an SChildProcess run iteration that store things like
 * the value, the startTime, endTime, duration, state, etc...
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SChildProcess extends __SProcess {
  static command = 'sugar process.runChild [arguments]';

  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    super(__deepMerge({}, settings));
  }

  /**
   * @name      run
   * @type      Function
   * @async
   *
   * Access the process run when this one is finished
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(params = {}, settings = {}) {
    settings = __deepMerge(this._settings, settings);

    super.run(settings);
  }
};
