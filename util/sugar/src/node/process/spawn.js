const __childProcess = require('child_process');
const __deepMerge = require('../object/deepMerge');
const __SPromise = require('../promise/SPromise');
const __uniqid = require('../string/uniqid');
const __hotkey = require('../keyboard/hotkey');
const __tkill = require('tree-kill');
const __registerProcess = require('./registerProcess');

/**
 * @name                                spawn
 * @namespace                           sugar.node.process
 * @type                                Function
 *
 * This function is a wrapper for the native "spawn" one that add the Promise support
 *
 * @param       {String}        command           The command to execute
 * @param       {Array|Object}    [argsOrSettings=null]     Either an Array of args, or an object of settings
 * @param       {Object}        [settings=null]               An object of settings for your spawn command. This is the same as the settings of the native spawn
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

  const promise = new __SPromise((resolve, reject, trigger, cancel) => {
    const defaultSettings = {
      shell: true,
      // detached: true,
      // stdio: 'inherit',
      env: {
        ...process.env,
        IS_CHILD_PROCESS: true
      }
    };
    if (typeof argsOrSettings === 'object') {
      argsOrSettings = __deepMerge(defaultSettings, argsOrSettings);
    }
    if (typeof settings === 'object') {
      settings = __deepMerge(defaultSettings, settings);
    }

    childProcess = __childProcess.spawn(command, argsOrSettings, settings);
    // runningProcess.childProcess = childProcess;
    // __hotkey('ctrl+c').on('press', () => {
    //   // childProcess.kill();
    // });

    // start
    runningProcess.state = 'running';
    trigger('start', {
      time: Date.now(),
      process: runningProcess
    });

    // close
    childProcess.on('close', (code, signal) => {
      runningProcess.end = Date.now();
      runningProcess.duration = runningProcess.end - runningProcess.start;
      trigger('close', {
        code,
        signal,
        time: Date.now(),
        process: runningProcess
      });
      if (!code && signal) {
        runningProcess.state = 'killed';
        trigger('kill', {
          code,
          signal,
          time: Date.now(),
          process: runningProcess
        });
        reject({
          code,
          signal,
          time: Date.now(),
          process: runningProcess
        });
      } else if (code === 0 && !signal) {
        runningProcess.state = 'success';
        trigger('success', {
          code,
          signal,
          time: Date.now(),
          process: runningProcess
        });
        resolve({
          code,
          signal,
          time: Date.now(),
          process: runningProcess
        });
      } else {
        runningProcess.state = 'error';
        trigger('error', {
          code,
          signal,
          time: Date.now(),
          process: runningProcess
        });
        reject({
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
      trigger('error', {
        error,
        time: Date.now(),
        process: runningProcess
      });
      reject({
        error,
        time: Date.now(),
        process: runningProcess
      });
    });

    // stdout data
    childProcess.stdout.on('data', (value) => {
      runningProcess.stdout.push(value.toString());
      trigger('stdout.data', {
        process: runningProcess,
        time: Date.now(),
        value: value.toString()
      });
    });

    // stderr data
    childProcess.stderr.on('data', (error) => {
      runningProcess.stderr.push(error.toString());
      trigger('stderr.data', {
        process: runningProcess,
        time: Date.now(),
        error: error.toString(),
        value: error.toString()
      });
    });
  })
    .on('cancel,finally', () => {})
    .start();

  // save the process
  __registerProcess(childProcess);

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
