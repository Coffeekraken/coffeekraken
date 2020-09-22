const __SIpc = require('../ipc/SIpc');
const __IPC = require('node-ipc').IPC;
const __fs = require('fs');
const __tmp = require('tmp');
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
const __SProcessInterface = require('../process/interface/SProcessInterface');
const __SProcess = require('../process/SProcess');
const __isChildProcess = require('../is/childProcess');
const __parse = require('../string/parse');
const __hasExitCleanup = require('../process/hasExitCleanup');
const __onProcessExit = require('../process/onProcessExit');

/**
 * @name              SChildProcess
 * @namespace         sugar.node.process
 * @extends           SProcess
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
class SChildProcess extends __SProcess {
  /**
   * @name          _commandOrPath
   * @type          String
   * @private
   *
   * Store the command of path to an executable file
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _commandOrPath = null;

  /**
   * @name          _runningProcess
   * @type          Object
   * @private
   *
   * Store the current running process
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _runningProcess = null;

  /**
   * @param         _processesStack
   * @type          Array<Object>
   * @private
   *
   * Store all the runned processes ojects
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _processesStack = [];

  /**
   * @name          _ipcChildInstance
   * @type          Object
   * @private
   *
   * Store the IPC instance that will connect to the parent process IPC server
   * when the actual process is a child one
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static _ipcChildInstance = null;

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
  constructor(commandOrPath, settings = {}) {
    settings = __deepMerge(
      {
        id: __uniqid(),
        definitionObj: {},
        defaultParams: {},
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
    settings.env.CHILD_PROCESS_IPC_PARENT_SERVER_ID = settings.id;

    super({}, settings);
    this._commandOrPath = commandOrPath;
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
   * @name            runningProcess
   * @type            Object
   * @get
   *
   * Get the running process object
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get runningProcess() {
    return this._processesStack.length
      ? this._processesStack[this._processesStack.length - 1]
      : null;
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
    let runningProcessId = settings.id || __uniqid();
    settings = __deepMerge(this._settings, settings);

    // build the command to run depending on the passed command in the constructor and the params
    const paramsToRun = __deepMerge(settings.defaultParams, params);
    const commandToRun = __buildCommandLine(
      this._commandOrPath,
      settings.definitionObj,
      paramsToRun,
      {
        alias: false
      }
    );

    // initialize the runningProcess object
    this._runningProcess = {
      instanceId: this._settings.id,
      id: runningProcessId,
      promise: new __SPromise(),
      settings: Object.assign({}, settings),
      start: Date.now(),
      end: null,
      duration: null,
      stdout: [],
      stderr: [],
      rawCommand: this._commandOrPath,
      params: paramsToRun,
      command: commandToRun,
      state: 'running',
      before: null,
      after: null
    };

    // adding the runningProcess in the stack
    this._processesStack.push(this._runningProcess);

    // execute the "before" SChildProcess instance if setted
    // if (settings.before) {
    //   if (!settings.before instanceof SChildProcess) {
    //     throw new Error(
    //       `The passed "<cyan>settings.before</cyan>" setting has to be an instance of the "<primary>SChildProcess</primary>" class...`
    //     );
    //   }

    //   // trigger a "before" event
    //   promise.trigger(`before`, {
    //     time: Date.now(),
    //     process: Object.assign({}, this._runningProcess)
    //   });

    //   // running the before child process
    //   this._runningProcess.before = await settings.before.run();
    // }

    // extracting the spawn settings from the global settings object
    const spawnSettings = Object.assign({}, settings);
    [
      'id',
      'definitionObj',
      'defaultParams',
      'method',
      'before',
      'after',
      'noisy'
    ].forEach((key) => {
      delete spawnSettings[key];
    });

    // trigger a "start" event
    this._runningProcess.promise.trigger(`start`, {
      time: Date.now(),
      process: Object.assign({}, this._runningProcess)
    });

    // executing the actual command through the spawn node function
    this._runningProcess.childProcess = __childProcess[
      settings.method || 'spawn'
    ](commandToRun, [], spawnSettings);

    __onProcessExit(() => {
      this._runningProcess.childProcess.kill();
    });

    // close
    let finished = false;
    const resolveOrReject = async (what, extendObj = {}, code, signal) => {
      if (finished) return;
      finished = true;

      this._runningProcess.end = Date.now();
      this._runningProcess.duration =
        this._runningProcess.end - this._runningProcess.start;

      // if (settings.after) {
      //   if (!settings.after instanceof SChildProcess) {
      //     throw new Error(
      //       `The passed "<cyan>settings.after</cyan>" setting has to be an instance of the "<primary>SChildProcess</primary>" class...`
      //     );
      //   }

      //   // trigger a "after" event
      //   promise.trigger(`after`, {
      //     time: Date.now(),
      //     ...this.runningProcess
      //   });

      //   // running the after child process
      //   this._runningProcess.after = await settings.after.run();
      // }

      // console.log(this._runningProcess.stderr);

      let error = null;
      if (this._runningProcess.state === 'error') {
        error = this._runningProcess.stderr.join('\n');
      }
      this._runningProcess.promise.trigger(`${this._runningProcess.state}`, {
        time: Date.now(),
        error,
        ...this.runningProcess
      });

      this._runningProcess.promise[what]({
        ...this._runningProcess,
        ...extendObj,
        code,
        signal
      });
    };

    const triggerState = () => {
      this._runningProcess.promise.trigger(`state`, this.runningProcess.state);
    };

    this._runningProcess.childProcess.on('close', (code, signal) => {
      if (this._runningProcess.stderr.length) {
        this._runningProcess.state = 'error';
        const error = new __SError(this._runningProcess.stderr.join('\n'));
        this._runningProcess.promise.trigger('log', {
          value: `<yellow>Child Process</yellow>\n${error.message}`
        });
      } else if (this._isKilling || (!code && signal)) {
        this._runningProcess.state = 'killed';
      } else if (code === 0 && !signal) {
        this._runningProcess.state = 'success';
      } else {
        this._runningProcess.state = 'error';
      }
      triggerState();

      // console.log('CLOS', this._runningProcess.stderr.join('\n'));

      this._runningProcess.promise.trigger(`close`, {
        time: Date.now(),
        code,
        signal,
        ...this.runningProcess
      });

      if (this._runningProcess.state === 'killed') {
        resolveOrReject('reject', {}, code, signal);
      } else if (this._runningProcess.state === 'success') {
        resolveOrReject('resolve', {}, code, signal);
      } else if (this._runningProcess.state === 'error') {
        // resolveOrReject(
        //   'reject',
        //   {
        //     error: this._runningProcess.stderr.join('\n')
        //   },
        //   code,
        //   signal
        // );
      }

      // reset isKilling boolean
      this._isKilling = false;
    });

    __SIpc.on('message', (data, socket) => {
      this._runningProcess.promise.trigger(data.stack, data.value, data.metas);
    });

    // if (__isChildProcess()) {
    //   const ipcInstance = new __IPC();
    //   ipcInstance.config.id = `SChildProcess_server_${this._settings.id}`;
    //   ipcInstance.config.retry = 1500;
    //   ipcInstance.config.silent = false;
    //   ipcInstance.serve(() => {
    //     ipcInstance.server.on('message', (data, socket) => {
    //       this._runningProcess.promise.trigger(
    //         data.stack,
    //         data.value,
    //         data.metas
    //       );
    //     });
    //   });
    //   ipcInstance.server.start();
    // }

    // stdout data
    // if (this._runningProcess.childProcess.stdout) {
    //   let currentLog = '';
    //   let logsBuffer = [];

    //   setInterval(() => {
    //     // nativeConsole.log(logsBuffer[logsBuffer.length - 1]);

    //     return;

    //     logsBuffer = logsBuffer.filter((logObj) => {
    //       if (logObj.triggered) return false;
    //       let logString = logObj.log;
    //       let parsedLog = __parse(logString);

    //       // if (typeof logObj === 'object' && logObj.$file) {
    //       //   if (!__fs.existsSync(logObj.$file)) return;
    //       //   logString = __fs.readFileSync(logObj.$file, 'utf8');
    //       //   logObj = __parse(logString);
    //       // }

    //       logObj.triggered = true;
    //       if (typeof parsedLog === 'object' && parsedLog.$triggerParent) {
    //         this._runningProcess.promise.trigger(
    //           parsedLog.metas.stack,
    //           parsedLog.value,
    //           parsedLog.metas
    //         );
    //       } else {
    //         this._runningProcess.stdout.push(logString);
    //         this._runningProcess.promise.trigger(`log`, {
    //           value: logString
    //         });
    //       }

    //       return false;
    //     });
    //   }, 1000);

    //   this._runningProcess.childProcess.stdout.on('data', (log) => {
    //     log = log.toString();
    //     if (log.includes('⠀')) {
    //       const logs = log.split('⠀');
    //       logs.forEach((l, i) => {
    //         if (i === 0) {
    //           currentLog += l;
    //           if (currentLog.trim() !== '')
    //             logsBuffer.push({
    //               triggered: false,
    //               log: __parse(currentLog)
    //             });
    //           currentLog = '';
    //         } else if (i < logs.length - 1) {
    //           if (currentLog.trim() !== '')
    //             logsBuffer.push({
    //               triggered: false,
    //               log: __parse(l)
    //             });
    //           currentLog = '';
    //         } else {
    //           currentLog += l;
    //         }
    //       });
    //     } else {
    //       currentLog += log;
    //     }

    //     nativeConsole.log(logsBuffer[logsBuffer.length - 1]);

    //     // logsBuffer = [];

    //     // const logs = log.toString().split(/⠀/);
    //     // logs.forEach((log) => {

    //     // });
    //   });
    // }

    // this._runningProcess.childProcess.on('error', (error) => {
    //   console.log('SOMEHT', error);
    // });

    // stderr data
    if (this._runningProcess.childProcess.stderr) {
      this._runningProcess.childProcess.stderr.on('data', (error) => {
        this._runningProcess.stderr.push(error.toString());
        // throw new __SError(error.toString());
      });
    }

    return super.run(this._runningProcess.promise);
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
    if (!this._runningProcess) return;
    this._isKilling = true;
    this._runningProcess.childProcess.kill();
  }

  /**
   * @name            hasAfterCommand
   * @type            Function
   *
   * Return true is the "settings.after" property is setted
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  hasAfterCommand() {
    return this._runningProcess
      ? this._runningProcess.settings.after !== null
      : this._settings.after !== null;
  }

  /**
   * @name            hasBeforeCommand
   * @type            Function
   *
   * Return true is the "settings.before" property is setted
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  hasBeforeCommand() {
    return this._runningProcess
      ? this._runningProcess.settings.before !== null
      : this._settings.before !== null;
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
    return this._runningProcess
      ? this._runningProcess.state === 'killed' ||
          this._runningProcess.state === 'success' ||
          this._runningProcess.state === 'error'
      : false;
  }

  /**
   * @name        log
   * @type        Function
   *
   * This method simply log one or muliple message through the running process
   *
   * @param         {String}        ...logs         The message(s) you want to log
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  // log(...logs) {
  //   if (!this._runningProcess) return;
  //   logs.forEach((log) => {
  //     this._runningProcess.stdout.push(log.toString());
  //     this._runningProcess.promise.trigger('log', {
  //       value: log.toString()
  //     });
  //     promise.trigger(`${this._runningProcess.id}.log`, {
  //       value: log.toString()
  //     });
  //   });
  // }
}

module.exports = __SProcessInterface.implements(
  SChildProcess,
  __SProcessInterface
);
