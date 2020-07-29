const __childProcess = require('child_process');
const __deepMerge = require('../object/deepMerge');
const __SPromise = require('../promise/SPromise');
const __uniqid = require('../string/uniqid');
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

  const promise = new __SPromise(
    (resolve, reject, trigger, cancel) => {
      // check if not lazy
      if (settings.lazy === false) run();
    },
    {
      id: runningProcess.id
    }
  );

  function runBeforeAfterCommand(
    when,
    command,
    argsArray = [],
    spawnSettings = {}
  ) {
    const pro = new Promise(async (resolve, reject) => {
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
        pro.on('stdout.data,stderr.data', (value) => {
          if (!value) return;
          value.value = `  - ${value.value}`;
          promise.trigger('stdout.data', value);
        });
        // __SPromise.pipe(pro, promise, {
        //   stacks: 'stdout.data,stderr.data'
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
      const res = await runBeforeAfterCommand(
        'before',
        command,
        [],
        spawnSettings
      );
    }

    childProcess = __childProcess.spawn(command, argsArray, spawnSettings);
    promise.childProcess = childProcess;
    // runningProcess.childProcess = childProcess;
    __hotkey('ctrl+c', {
      once: true
    }).on('press', () => {
      childProcess.kill();
    });

    // save the process
    __registerProcess(promise);

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

      const resolveOrReject = async (what, extendObj = {}) => {
        if (settings.after) {
          await runBeforeAfterCommand('after', command, [], spawnSettings);
        }
        promise.trigger('close', {
          code,
          signal,
          time: Date.now(),
          process: runningProcess
        });
        promise[what]({
          ...extendObj,
          code,
          signal,
          time: Date.now(),
          process: runningProcess
        });
      };

      if (!code && signal) {
        runningProcess.state = 'killed';
        promise.trigger('kill', {
          code,
          signal,
          time: Date.now(),
          process: runningProcess
        });
        resolveOrReject('reject');
      } else if (code === 0 && !signal) {
        runningProcess.state = 'success';
        promise.trigger('success', {
          code,
          signal,
          time: Date.now(),
          process: runningProcess
        });
        resolveOrReject('resolve');
      } else {
        runningProcess.state = 'error';
        promise.trigger('error', {
          error: runningProcess.stderr.join('\n'),
          code,
          signal,
          time: Date.now(),
          process: runningProcess
        });
        resolveOrReject('reject', {
          error: runningProcess.stderr.join('\n')
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
      resolveOrReject({
        error
      });
    });

    // stdout data
    childProcess.stdout.on('data', (value) => {
      // console.log('data', value.toString());
      runningProcess.stdout.push(value.toString());
      promise.trigger('stdout.data', {
        process: runningProcess,
        time: Date.now(),
        value: value.toString()
      });
    });

    // stderr data
    childProcess.stderr.on('data', (error) => {
      // console.log(error.toString());
      runningProcess.stderr.push(error.toString());
      promise.trigger('stderr.data', {
        process: runningProcess,
        time: Date.now(),
        error: error.toString(),
        value: error.toString()
      });
    });

    // return the promise
    return promise;
  }

  promise.run = run;

  promise.hasAfterCommand = () => settings.after !== null;

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
