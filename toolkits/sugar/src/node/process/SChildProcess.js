const __SPromise = require('../promise/SPromise');
const __deepMerge = require('../object/deepMerge');
const __childProcess = require('child_process');
const __hotkey = require('../keyboard/hotkey');
const __registerProcess = require('./registerProcess');
const __uniqid = require('../string/uniqid');
const __buildCommandLine = require('../cli/buildCommandLine');
const __isPath = require('../is/path');
const __output = require('./output');

/**
 * @name              SChildProcess
 * @namespace         node.process
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
module.exports = class SChildProcess extends __SPromise {
  /**
   * @name          _settings
   * @type          Object
   * @private
   *
   * Store the passed settings
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = {};

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
    super(() => {}).start();
    this._commandOrPath = commandOrPath;
    this._settings = __deepMerge(
      {
        id: __uniqid(),
        definitionObj: {},
        defaultParamsObj: {},
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
    const promise = new __SPromise(
      async (resolve, reject, trigger, cancel) => {}
    ).start();

    (async () => {
      let runningProcessId = settings.id || __uniqid();
      settings = __deepMerge(this._settings, settings);

      // build the command to run depending on the passed command in the constructor and the params
      const paramsToRun = __deepMerge(settings.defaultParamsObj, params);
      // console.log(paramsToRun, this._commandOrPath, settings.definitionObj);
      const commandToRun = __buildCommandLine(
        this._commandOrPath,
        settings.definitionObj,
        paramsToRun
      );

      // initialize the runningProcess object
      const runningProcess = {
        instanceId: this._settings.id,
        id: runningProcessId,
        promise: promise,
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
      this._processesStack.push(runningProcess);

      // execute the "before" SChildProcess instance if setted
      if (settings.before) {
        if (!settings.before instanceof SChildProcess) {
          throw new Error(
            `The passed "<cyan>settings.before</cyan>" setting has to be an instance of the "<primary>SChildProcess</primary>" class...`
          );
        }

        // trigger a "before" event
        promise.trigger('before', {
          time: Date.now(),
          process: Object.assign({}, runningProcess)
        });
        this.trigger(`${runningProcessId}.before`, {
          time: Date.now(),
          process: Object.assign({}, runningProcess)
        });

        // running the before child process
        runningProcess.before = await settings.before.run();
      }

      // extracting the spawn settings from the global settings object
      const spawnSettings = Object.assign({}, settings);
      [
        'id',
        'definitionObj',
        'defaultParamsObj',
        'method',
        'before',
        'after'
      ].forEach((key) => {
        delete spawnSettings[key];
      });

      // trigger a "start" event
      promise.trigger('start', {
        time: Date.now(),
        process: Object.assign({}, runningProcess)
      });
      this.trigger(`${runningProcessId}.start`, {
        time: Date.now(),
        process: Object.assign({}, runningProcess)
      });

      // executing the actual command through the spawn node function
      const childProcess = __childProcess[settings.method || 'spawn'](
        commandToRun,
        [],
        spawnSettings
      );

      // listen for ctrl+c to kill the child process
      // __hotkey('ctrl+c', {
      //   once: true
      // }).on('press', () => {
      //   // console.log('THIEHIU');
      //   // childProcess.kill();
      // });

      // register this child process globally
      __registerProcess(childProcess, runningProcess.id);

      // close
      let finished = false;
      const resolveOrReject = async (what, extendObj = {}, code, signal) => {
        if (finished) return;
        finished = true;

        runningProcess.end = Date.now();
        runningProcess.duration = runningProcess.end - runningProcess.start;

        if (settings.after) {
          if (!settings.after instanceof SChildProcess) {
            throw new Error(
              `The passed "<cyan>settings.after</cyan>" setting has to be an instance of the "<primary>SChildProcess</primary>" class...`
            );
          }

          // trigger a "after" event
          promise.trigger('after', {
            time: Date.now(),
            process: Object.assign({}, runningProcess)
          });
          this.trigger(`${runningProcessId}.after`, {
            time: Date.now(),
            process: Object.assign({}, runningProcess)
          });

          // running the after child process
          runningProcess.after = await settings.after.run();
        }

        promise.trigger(runningProcess.state, {
          time: Date.now(),
          process: Object.assign({}, runningProcess)
        });
        this.trigger(`${runningProcessId}.${runningProcess.state}`, {
          time: Date.now(),
          process: Object.assign({}, runningProcess)
        });

        promise[what]({
          ...runningProcess,
          ...extendObj,
          code,
          signal
        });
      };
      childProcess.on('close', (code, signal) => {
        promise.trigger('close', {
          time: Date.now(),
          process: Object.assign({}, runningProcess),
          code,
          signal
        });
        this.trigger(`${runningProcessId}.close`, {
          time: Date.now(),
          process: Object.assign({}, runningProcess),
          code,
          signal
        });

        if (!code && signal) {
          runningProcess.state = 'killed';
          resolveOrReject('reject', {}, code, signal);
        } else if (code === 0 && !signal) {
          runningProcess.state = 'success';
          resolveOrReject('resolve', {}, code, signal);
        } else {
          runningProcess.state = 'error';
          resolveOrReject(
            'reject',
            {
              error: runningProcess.stderr.join('\n')
            },
            code,
            signal
          );
        }
      });

      // error
      childProcess.on('error', (error) => {
        console.log('EOEOEOE', error);
        runningProcess.state = 'error';
        resolveOrReject(
          'reject',
          {
            error
          },
          1,
          null
        );
      });

      // stdout data
      if (childProcess.stdout) {
        childProcess.stdout.on('data', (log) => {
          log = log.toString();
          const resultReg = /^#result\s(.*)$/gm;
          if (log.match(resultReg)) {
            runningProcess.state = 'success';
            resolveOrReject(
              'resolve',
              {
                value: __parse(log.replace('#result ', ''))
              },
              0,
              null
            );
            return;
          }

          runningProcess.stdout.push(log.toString());
          promise.trigger('log', {
            value: log.toString()
          });
          this.trigger(`${runningProcessId}.'log`, {
            value: log.toString()
          });
        });
      }

      // stderr data
      if (childProcess.stderr) {
        childProcess.stderr.on('data', (error) => {
          runningProcess.stderr.push(error.toString());
          promise.trigger('error', {
            error: error.toString(),
            value: error.toString()
          });
          this.trigger(`${runningProcessId}.error`, {
            error: error.toString(),
            value: error.toString()
          });
        });
      }
    })();

    return promise;
  }

  runWithOutput(params = {}, settings = {}) {
    __output(this.run(params, settings));
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
    return this.runningProcess
      ? this.runningProcess.settings.after !== null
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
    return this.runningProcess
      ? this.runningProcess.settings.before !== null
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
    return this.runningProcess
      ? this.runningProcess.state === 'killed' ||
          this.runningProcess.state === 'success' ||
          this.runningProcess.state === 'error'
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
  log(...logs) {
    if (!this.runningProcess) return;
    logs.forEach((log) => {
      this.runningProcess.stdout.push(log.toString());
      this.runningProcess.promise.trigger('log', {
        value: log.toString()
      });
      this.trigger(`${this.runningProcess.id}.log`, {
        value: log.toString()
      });
    });
  }
};
