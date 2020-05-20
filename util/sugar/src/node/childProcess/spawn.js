const __childProcess = require('child_process');
const __deepMerge = require('../object/deepMerge');
const __SPromise = require('../promise/SPromise');
const __uniqid = require('../string/uniqid');
const __parseLog = require('../cli/parseLog');

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
      time: null,
      stdout: [],
      stderr: [],
      command,
      args: Array.isArray(argsOrSettings) ? argsOrSettings : []
    };

    childProcess = __childProcess.spawn(command, argsOrSettings, settings);

    // runningProcess.childProcess = childProcess;

    // start
    trigger('start', {
      time: Date.now(),
      ...runningProcess
    });

    // close
    childProcess.on('close', (code, signal) => {
      runningProcess.end = Date.now();
      runningProcess.duration = runningProcess.end - runningProcess.start;
      trigger('close', {
        code,
        signal,
        time: Date.now(),
        ...runningProcess
      });
      if (!code && signal) {
        trigger('kill', {
          code,
          signal,
          time: Date.now(),
          ...runningProcess
        });
      } else if (code === 0 && !signal) {
        resolve({
          code,
          signal,
          time: Date.now(),
          ...runningProcess
        });
        trigger('success', {
          code,
          signal,
          time: Date.now(),
          ...runningProcess
        });
      }
    });

    // error
    childProcess.on('error', (error) => {
      runningProcess.end = Date.now();
      runningProcess.duration = runningProcess.end - runningProcess.start;
      reject({
        error,
        time: Date.now(),
        ...runningProcess
      });
      trigger('error', {
        error,
        time: Date.now(),
        ...runningProcess
      });
    });

    // stdout data
    childProcess.stdout.on('data', (value) => {
      runningProcess.stdout.push(__parseLog(value.toString()));
      trigger('stdout.data', {
        ...runningProcess,
        time: Date.now(),
        value: __parseLog(value.toString())
      });
    });

    // stderr data
    childProcess.stderr.on('data', (error) => {
      runningProcess.stderr.push(__parseLog(error.toString()));
      trigger('stderr.data', {
        ...runningProcess,
        time: Date.now(),
        error: __parseLog(error.toString())
      });
    });
  })
    .on('cancel,finally', () => {
      childProcess && childProcess.kill();
    })
    .start();
};
