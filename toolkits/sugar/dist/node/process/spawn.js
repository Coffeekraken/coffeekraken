"use strict";

const __childProcess = require('child_process');

const __deepMerge = require('../object/deepMerge');

const __SPromise = require('../promise/SPromise');

const __uniqid = require('../string/uniqid');

const __parse = require('../string/parse');

const __hotkey = require('../keyboard/hotkey');

const __tkill = require('tree-kill');

const __registerProcess = require('./registerProcess');

const __getRegisteredProcesses = require('./getRegisteredProcesses');

const __wait = require('../time/wait');

const __clone = require('../object/clone');
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


module.exports = function spawn(command, argsOrSettings, settings) {
  if (argsOrSettings === void 0) {
    argsOrSettings = null;
  }

  if (settings === void 0) {
    settings = null;
  }

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
    before: null,
    after: null,
    shell: true,
    env: { ...process.env,
      CHILD_PROCESS_LEVEL: process.env.CHILD_PROCESS_LEVEL ? process.env.CHILD_PROCESS_LEVEL + 1 : 1,
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

  if (settings.id) runningProcess.id = settings.id;
  const promise = new __SPromise((resolve, reject, trigger, cancel) => {
    // check if not lazy
    if (settings.lazy === false) run();
  }, {
    id: runningProcess.id
  });

  function runBeforeAfterCommand(when, command, argsArray, spawnSettings) {
    if (argsArray === void 0) {
      argsArray = [];
    }

    if (spawnSettings === void 0) {
      spawnSettings = {};
    }

    const pro = new __SPromise(async (resolve, reject) => {
      let result = true;
      promise.trigger(`${when}.start`, {
        time: Date.now()
      });
      promise.log(`Cleaning the <cyan>${runningProcess.id}</cyan>...`);

      if (typeof settings[when] === 'function') {
        result = await settings[when](command, argsArray, spawnSettings);
      } else if (typeof settings[when] === 'string') {
        const pro = spawn(settings[when], [], {
          id: settings.id + '.' + when,
          ...spawnSettings
        }).start();
        pro.on('log,error', value => {
          if (!value) return;
          value.value = `  - ${value.value}`;
          promise.trigger('log', value);
        }); // __SPromise.pipe(pro, promise, {
        //   stacks: 'log,error'
        // });

        result = await pro;
      }

      await __wait(1500);
      promise.trigger(`${when}.end`, {
        time: Date.now()
      });
      resolve(result);
    });
    return pro;
  }

  async function run() {
    const spawnSettings = __clone(settings);

    delete spawnSettings.lazy;
    delete spawnSettings.before;
    delete spawnSettings.after;
    delete spawnSettings.id;

    if (settings.before) {
      const res = await runBeforeAfterCommand('before', command, [], spawnSettings);
    }

    childProcess = __childProcess.spawn(command, argsArray, spawnSettings);
    promise.childProcess = childProcess; // runningProcess.childProcess = childProcess;

    __hotkey('ctrl+c', {
      once: true
    }).on('press', () => {
      childProcess.kill();
    }); // save the process


    __registerProcess(promise); // before start


    promise.trigger('beforeStart', {
      time: Date.now(),
      process: runningProcess
    }); // start

    runningProcess.state = 'running';
    promise.trigger('start', {
      time: Date.now(),
      process: runningProcess
    });
    let finished = false;

    const resolveOrReject = async function (what, extendObj, code, signal) {
      if (extendObj === void 0) {
        extendObj = {};
      }

      if (finished) return;
      finished = true;
      runningProcess.end = Date.now();
      runningProcess.duration = runningProcess.end - runningProcess.start;

      if (settings.after) {
        await runBeforeAfterCommand('after', command, [], spawnSettings);
      }

      promise[what]({ ...extendObj,
        code,
        signal,
        time: Date.now(),
        process: runningProcess
      });
    }; // close


    childProcess.on('close', (code, signal) => {
      if (!code && signal) {
        runningProcess.state = 'killed';
        resolveOrReject('reject', {}, code, signal);
      } else if (code === 0 && !signal) {
        // console.log('CC');
        runningProcess.state = 'success';
        resolveOrReject('resolve', {}, code, signal);
      } else {
        runningProcess.state = 'error';
        resolveOrReject('reject', {
          error: runningProcess.stderr.join('\n')
        }, code, signal);
      }
    }); // error

    childProcess.on('error', error => {
      runningProcess.state = 'error';
      resolveOrReject('reject', {
        error
      }, 1, null);
    }); // stdout data

    let triggerBuffer = 0;
    childProcess.stdout.on('data', async value => {
      const logsArray = value.toString().split('⠀').filter(l => l !== ''); // logsArray.forEach(async (log) => {

      for (let log of logsArray) {
        const resultReg = /^#result\s(.*)$/gm;

        if (log.match(resultReg)) {
          runningProcess.state = 'success';
          resolveOrReject('resolve', {
            value: __parse(log.replace('#result ', ''))
          }, 0, null);
          return;
        }

        runningProcess.stdout.push(log);
        await promise.trigger('log', {
          process: runningProcess,
          time: Date.now(),
          value: log
        });
      }
    }); // stderr data

    childProcess.stderr.on('data', error => {
      // console.log(error.toString());
      runningProcess.stderr.push(error.toString());
      promise.trigger('error', {
        process: runningProcess,
        time: Date.now(),
        error: error.toString(),
        value: error.toString()
      });
    }); // return the promise

    return promise;
  }

  promise.run = run;

  promise.hasAfterCommand = () => settings.after !== null;

  promise.isClosed = () => {
    return runningProcess.state === 'killed' || runningProcess.state === 'success' || runningProcess.state === 'error';
  };

  promise.process = runningProcess;

  promise.log = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    args.forEach(arg => {
      runningProcess.stdout.push(arg.toString());
      promise.trigger('log', {
        value: arg.toString()
      });
    });
  };

  const _promiseCancel = promise.cancel.bind(promise);

  promise.cancel = () => {
    return new __SPromise((resolve, reject) => {
      const pid = childProcess.pid; // childProcess && childProcess.kill('SIGTERM');
      // if (pid) console.log(`kill -9 ${pid}`);
      // __childProcess.spawn(`kill -9 ${pid}`);

      if (pid) {
        __tkill(pid, 'SIGTERM', e => {
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