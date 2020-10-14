const __SIpc = require('../ipc/SIpc');
const __IPC = require('node-ipc').IPC;
const __fs = require('fs');
const __tmp = require('tmp');
const __copy = require('../clipboard/copy');
const __SError = require('../error/SError');
const __toString = require('../string/toString');
const __SPromise = require('../promise/SPromise');
const __deepMerge = require('../object/deepMerge');
const __childProcess = require('child_process');
const __hotkey = require('../keyboard/hotkey');
const __registerProcess = require('./registerProcess');
const __uniqid = require('../string/uniqid');
const __buildCommandLine = require('../cli/buildCommandLine');
const __isPath = require('../is/path');
const __output = require('./output');
const __SProcessManagerInterface = require('./interface/SProcessManagerInterface');
const __SProcessManager = require('./SProcessManager');
const __isChildProcess = require('../is/childProcess');
const __parse = require('../string/parse');
const __hasExitCleanup = require('./hasExitCleanup');
const __onProcessExit = require('./onProcessExit');

/**
 * @name              SChildProcessManager
 * @namespace         sugar.node.process
 * @extends           SProcessManager
 * @type              Class
 *
 * This class allows you to spawn/fork some child process and having back an SPromise based instance on
 * which you can track the child process status using the ```on``` method to register to some
 * events like "start", "success", "error", etc...
 *
 * @todo            doc
 * @todo            tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SChildProcessManager extends __SProcessManager {
  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(initialParams = {}, settings = {}) {
    settings = __deepMerge(
      {
        id: 'SChildProcessManager',
        name: 'Unnamed Child Process Manager',
        definitionObj: {},
        killOnCtrlC: !__hasExitCleanup(),
        triggerParent: true,
        method: __isPath(commandOrPath, true) ? 'fork' : 'spawn',
        before: null,
        after: null,
        shell: true,
        env: {
          ...process.env,
          CHILD_PROCESS_LEVEL: process.env.CHILD_PROCESS_LEVEL
            ? process.env.CHILD_PROCESS_LEVEL + 1
            : 1,
          IS_CHILD_PROCESS: true
        }
      },
      settings
    );

    super(initialParams, settings);
  }

  /**
   * @name            isChildProcess
   * @type            Function
   * @static
   *
   * This method simply return true if the process is a child process.
   *
   * @return        {Boolean}           true if is a child process, false if not
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static isChildProcess() {
    return __isChildProcess();
  }

  /**
   * @name          run
   * @type          Function
   *
   * This method simply run a new process
   * and return a SPromise instance on which you can listen for the
   * exact same events that you can on the global SChildProcess isntance
   * but scoped to this running process.
   *
   * @param       {Object}         [params={}]          An object of parameters
   * @param       {Object}        [settings={}]       THe same settings object that you can pass to the SChildProcess instance constructor but only for this particular process
   * @return      (SPromise}                        An SPromise instance on which you can listen for events scoped to this particular process
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(params = {}, settings = {}) {
    settings = __deepMerge(this._settings, settings);

    // get a new SProcess instance from the parent manager
    const processInstance = super.run(null, settings);

    // build the command to run depending on the passed command in the constructor and the params
    const paramsToRun = __deepMerge(
      Object.assign({}, this.initialParams),
      params
    );
    const commandToRun = __buildCommandLine(
      this.constructor.command,
      settings.definitionObj,
      paramsToRun,
      {
        alias: false
      }
    );

    // extracting the spawn settings from the global settings object
    const spawnSettings = Object.assign({}, settings);
    [
      'id',
      'definitionObj',
      'defaultParams',
      'method',
      'before',
      'after',
      'noisy',
      'processSettings'
    ].forEach((key) => {
      delete spawnSettings[key];
    });

    // trigger a "start" event
    // this.currentProcess.promise.trigger(`start`, {
    //   time: Date.now(),
    //   process: Object.assign({}, this.currentProcess)
    // });

    (async () => {
      if (await __SIpc.isServer()) {
        settings.env.GLOBAL_SIPC_TRIGGER_ID = settings.id;
      }

      // executing the actual command through the spawn node function
      this._currentChildProcess = __childProcess[settings.method || 'spawn'](
        commandToRun,
        [],
        spawnSettings
      );

      // processInstance.on('*', (d, m) => {
      //   console.log('CCC', m.stack);
      // });

      __onProcessExit(() => {
        this._currentChildProcess.kill();
      });

      this._currentChildProcess.on('close', (code, signal) => {
        if (processInstance.stderr.length) {
          processInstance.reject(processInstance.stderr.join('\n'));
          const error = new __SError(processInstance.stderr.join('\n'));
          this.error(`<yellow>Child Process</yellow>\n${error.message}`);
        } else if (this._isKilling || (!code && signal)) {
          processInstance.kill();
        } else if (code === 0 && !signal) {
          processInstance.resolve();
        } else {
          processInstance.reject();
        }
        // reset isKilling boolean
        this._isKilling = false;
      });

      if (await __SIpc.isServer()) {
        __SIpc.on(
          `${settings.env.GLOBAL_SIPC_TRIGGER_ID}.trigger`,
          (data, socket) => {
            processInstance.trigger(data.stack, data.value, data.metas);
          }
        );
      }

      // stdout data
      if (this._currentChildProcess.stdout) {
        this._currentChildProcess.stdout.on('data', (data) => {
          processInstance.log({
            value: data.toString()
          });
        });
      }
      // stderr data
      if (this._currentChildProcess.stderr) {
        this._currentChildProcess.stderr.on('data', (error) => {
          processInstance.error({
            error: true,
            value: error.toString()
          });
        });
      }
    })();

    return processInstance;
  }

  /**
   * @name            kill
   * @type            Function
   *
   * This method allows you to kill the child process properly
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  kill() {
    if (!this._currentChildProcess) return;
    this._isKilling = true;
    this._currentChildProcess.kill();
    super.kill();
  }

  /**
   * @name          isClosed
   * @type          Function
   *
   * Return true if the last process is closed, false if not...
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  isClosed() {
    return this.currentProcess
      ? this.currentProcess.state === 'killed' ||
          this.currentProcess.state === 'success' ||
          this.currentProcess.state === 'error'
      : false;
  }
}

module.exports = __SProcessManagerInterface.implements(
  SChildProcessManager,
  __SProcessManagerInterface
);
