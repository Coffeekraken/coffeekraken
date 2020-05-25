const __childProcess = require('child_process');
const __deepMerge = require('../object/deepMerge');
const __SPromise = require('../promise/SPromise');
const __uniqid = require('../string/uniqid');
const __parseLog = require('../cli/parseLog');
const __hotkey = require('../keyboard/hotkey');
const __fkill = require('fkill');
const __tkill = require('tree-kill');

/**
 * @name                                spawn
 * @namespace                           sugar.node.childProcess
 * @type                                Function
 *
 * This function is a wrapper for the native "spawn" one that add the Promise support
 * and parse automatically the logs received using the "sugar.node.cli.parseLog" function.
 *
 * @param       {String}        command           The command to execute
 * @param       {Array|Object}    [argsOrSettings=null]     Either an Array of args, or an object of settings
 * @param       {Object}        [settings=null]               An object of settings for your spawn command. This is the same as the settings of the native spawn
 *
 * @example       js
 * const spawn = require('@coffeekraken/sugar/node/childProcess/spawn');
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function spawn(
  command,
  argsOrSettings = null,
  settings = null
) {
  let childProcess;

  return new __SPromise((resolve, reject, trigger, cancel) => {
    const defaultSettings = {
      shell: true,
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

    childProcess = __childProcess.spawn(command, argsOrSettings, settings);

    // runningProcess.childProcess = childProcess;
    __hotkey('ctrl+c').on('press', () => {
      // childProcess.kill();
    });

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
      runningProcess.stdout.push(__parseLog(value.toString()));
      trigger('stdout.data', {
        process: runningProcess,
        time: Date.now(),
        value: __parseLog(value.toString())
      });
    });

    // stderr data
    childProcess.stderr.on('data', (error) => {
      runningProcess.stderr.push(__parseLog(error.toString()));
      trigger('stderr.data', {
        process: runningProcess,
        time: Date.now(),
        error: __parseLog(error.toString()),
        value: __parseLog(error.toString())
      });
    });
  })
    .on('cancel,finally', () => {
      const pid = childProcess.pid;
      // childProcess && childProcess.kill('SIGTERM');
      if (pid) __tkill(pid);
    })
    .start();
};
