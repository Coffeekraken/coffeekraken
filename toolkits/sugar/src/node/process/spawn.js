const __childProcess = require('child_process');
const __deepMerge = require('../object/deepMerge');
const __SPromise = require('../promise/SPromise');
const __uniqid = require('../string/uniqid');
const __hotkey = require('../keyboard/hotkey');
const __tkill = require('tree-kill');
const __registerProcess = require('./registerProcess');
const __getRegisteredProcesses = require('./getRegisteredProcesses');

/**
 * @name                                spawn
 * @namespace           node.process
 * @type                                Function
 *
 * This function is a wrapper for the native "spawn" one that add the Promise support
 *
 * @param       {String}        command           The command to execute
 * @param       {Array|Object}    [argsOrSettings=null]     Either an Array of args, or an object of settings
 * @param       {Object}        [settings=null]               An object of settings for your spawn command. This is the same as the settings of the native spawn
 *
 * @TODO        settings documentation
 * @TODO        API documentation (isClosed, etc...)
 *
 * @example       js
 * const spawn = require('@coffeekraken/sugar/node/process/spawn');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function spawn(
  command,
  argsOrSettings = null,
  settings = null
) {
  let childProcess;

  const runningProcess = {
    id: __uniqid(),
    start: Date.now(),
    end: null,
    duration: null,
    stdout: [],
    stderr: [],
    command,
    state: 'idle',
    args: Array.isArray(argsOrSettings) ? argsOrSettings : []
  };

  let argsArray = [];
  const defaultSettings = {
    lazy: false,
    shell: true,
    env: {
      ...process.env,
      IS_CHILD_PROCESS: true
    }
  };
  if (typeof argsOrSettings === 'object') {
    settings = __deepMerge(defaultSettings, argsOrSettings);
  } else if (Array.isArray(argsOrSettings)) {
    argsArray = argsOrSettings;
  }
  if (typeof settings === 'object') {
    settings = __deepMerge(defaultSettings, settings);
  }

  const promise = new __SPromise((resolve, reject, trigger, cancel) => {
    // check if not lazy
    if (settings.lazy === false) run();
  }).on('cancel,finally', () => {});

  function run() {
    const spawnSettings = Object.assign({}, settings);
    delete spawnSettings.lazy;
    childProcess = __childProcess.spawn(command, argsArray, spawnSettings);
    // runningProcess.childProcess = childProcess;
    // __hotkey('ctrl+c').on('press', () => {
    //   // childProcess.kill();
    // });

    // save the process
    __registerProcess(childProcess);

    // start
    runningProcess.state = 'running';
    promise.trigger('start', {
      time: Date.now(),
      process: runningProcess
    });

    // close
    childProcess.on('close', (code, signal) => {
      runningProcess.end = Date.now();
      runningProcess.duration = runningProcess.end - runningProcess.start;
      if (!global.isExitCleanupProcess) {
        promise.trigger('close', {
          code,
          signal,
          time: Date.now(),
          process: runningProcess
        });
      }
      if (!code && signal) {
        runningProcess.state = 'killed';
        promise.trigger('kill', {
          code,
          signal,
          time: Date.now(),
          process: runningProcess
        });
        promise.reject({
          code,
          signal,
          time: Date.now(),
          process: runningProcess
        });
      } else if (code === 0 && !signal) {
        runningProcess.state = 'success';
        promise.trigger('success', {
          code,
          signal,
          time: Date.now(),
          process: runningProcess
        });
        promise.resolve({
          code,
          signal,
          time: Date.now(),
          process: runningProcess
        });
      } else {
        runningProcess.state = 'error';
        promise.trigger('error', {
          error: runningProcess.stderr.join('\n'),
          code,
          signal,
          time: Date.now(),
          process: runningProcess
        });
        promise.reject({
          error: runningProcess.stderr.join('\n'),
          code,
          signal,
          time: Date.now(),
          process: runningProcess
        });
      }
    });

    // error
    childProcess.on('error', (error) => {
      runningProcess.end = Date.now();
      runningProcess.duration = runningProcess.end - runningProcess.start;
      runningProcess.state = 'error';
      promise.trigger('error', {
        error,
        time: Date.now(),
        process: runningProcess
      });
      promise.reject({
        error,
        time: Date.now(),
        process: runningProcess
      });
    });

    // stdout data
    childProcess.stdout.on('data', (value) => {
      runningProcess.stdout.push(value.toString());
      promise.trigger('stdout.data', {
        process: runningProcess,
        time: Date.now(),
        value: value.toString()
      });
    });

    // stderr data
    childProcess.stderr.on('data', (error) => {
      runningProcess.stderr.push(error.toString());
      promise.trigger('stderr.data', {
        process: runningProcess,
        time: Date.now(),
        error: error.toString(),
        value: error.toString()
      });
    });
  }

  // .start();

  promise.run = run;

  promise.isClosed = () => {
    return (
      runningProcess.state === 'killed' ||
      runningProcess.state === 'success' ||
      runningProcess.state === 'error'
    );
  };
  promise.process = runningProcess;

  promise.log = (...args) => {
    args.forEach((arg) => {
      runningProcess.stdout.push(arg.toString());
      promise.trigger('stdout.data', {
        process: runningProcess,
        time: Date.now(),
        value: arg.toString()
      });
    });
  };

  const _promiseCancel = promise.cancel.bind(promise);
  promise.cancel = () => {
    return new Promise((resolve, reject) => {
      const pid = childProcess.pid;
      // childProcess && childProcess.kill('SIGTERM');
      // if (pid) console.log(`kill -9 ${pid}`);
      // __childProcess.spawn(`kill -9 ${pid}`);
      if (pid) {
        __tkill(pid, 'SIGTERM', (e) => {
          if (e) {
            reject(e);
          } else {
            resolve();
          }
          _promiseCancel(e);
        });
      }
    });
  };

  return promise;
};
