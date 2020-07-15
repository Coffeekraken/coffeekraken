const __deepMerge = require('../object/deepMerge');
const __getRegisteredProcessed = require('./getRegisteredProcesses');
const __clear = require('clear');
const __fkill = require('fkill');
const __hotkey = require('../keyboard/hotkey');
const __spawn = require('../process/spawn');
const __parseHtml = require('../terminal/parseHtml');

/**
 * @name              exitCleanup
 * @namespace           node.process
 * @type              Function
 *
 * This function register a handler on process exit and try to clean all the child process, etc...
 *
 * @param       {Function}       [handler=null]       A custom function to handle custom cleanup if you need. MUST return a promise that you have to resolve once the cleanup has been done
 * @param       {Object}        [settings={}]         An object of settings to configure your cleanup:
 * - childProcess (true) {Boolean}: Specify if you want to clean the child processes or not
 *
 * @example         js
 * const exitCleanup = require('@coffeekraken/sugar/node/process/exitCleanup');
 * exitCleanup();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
let _exitCleanupRegistered = false;
module.exports = function exitCleanup(handler = null, settings = {}) {
  if (_exitCleanupRegistered) return;
  _exitCleanupRegistered = true;

  __hotkey('ctrl+c', {
    once: true
  }).on('press', async () => {

  // if (global.screen) global.screen.clearRegion(0, global.screen.width, 0, global.screen.height);
  // __clear();

    // check if all processes are closed
    const processes = __getRegisteredProcessed();
    const processesCount = Object.keys(processes).length;
    let remainingProcessesCount = Object.keys(processes).length;

    console.log(
      __parseHtml(
        '  Cleaning your system after <primary>Sugar</primary> execution...'
      )
    );

    async function processKilled() {
      remainingProcessesCount--;
      if (remainingProcessesCount <= 0) {
        await __spawn('sugar util.kill all');
        console.log('\00');
        console.log(
          __parseHtml(
            `  All of the <cyan>${processesCount}</cyan> process(es) have been <green>successfully</green> closed`
          )
        );
        setTimeout(() => {
          process.exit();
        }, 2000);
      }
    }

    if (remainingProcessesCount > 0) {
      Object.keys(processes).forEach(async (key) => {
        const processObj = processes[key];
        if (!processObj.exitCode && process.pid !== processObj.pid) {
          console.log('\00');
          console.log(
            __parseHtml(
              `  Killing the process with the PID <cyan>${processObj.pid}</cyan>`
            )
          );
          await __fkill(processObj.pid);
          processKilled();
        } else {
          processKilled();
        }
      });
    } else {
      await __spawn('sugar util.kill all');
      process.exit();
    }
  });

  // settings = __deepMerge(
  //   {
  //     childProcess: true
  //   },
  //   settings
  // );

  // function tkill(pid) {
  //   return new Promise((resolve, reject) => {
  //     __tkill(pid, 'SIGTERM', () => {
  //       resolve();
  //     });
  //   });
  // }

  // async function terminate() {
  //   // handle the custom cleanup if their's one
  //   if (handler) await handler();

  //   // clean the child process
  //   if (settings.childProcess) {
  //     const processesNames = Object.keys(__getRegisteredProcessed());
  //     for (let i = 0; i < processesNames.length; i++) {
  //       const processInstance = __getRegisteredProcessed()[processesNames[i]];
  //       if (!processInstance) continue;
  //       const pid = processInstance.pid;
  //       if (pid) {
  //         await tkill(pid);
  //       }
  //     }
  //   }
  //   // we can not shut the process down
  //   return true;
  // }

  // __hotkey('ctrl+c', {
  //   once: true
  // }).on('press', async () => {
  //   await terminate();
  //   process.exit();
  // });

  // // do something when app is closing
  // [
  //   `exit`,
  //   // `SIGINT`,
  //   `SIGUSR1`,
  //   `SIGUSR2`,
  //   // `uncaughtException`,
  //   `SIGTERM`
  // ].forEach((eventName) => {
  //   process.on(eventName, async () => {
  //     await terminate();
  //     process.exit();
  //   });
  // });
};
