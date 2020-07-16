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
        console.log(__parseHtml('  Cleaning the forgotten process(es)...'));
        const pro = __spawn('sugar util.kill all', {
          id: 'cleanup'
        })
          .on('stdout.data,stderr.data', (value) => {
            console.log(__parseHtml(`    - ${value.value}`));
          })
          .on('cancel,finally', () => {
            console.log(
              __parseHtml(
                `  All of the <cyan>${processesCount}</cyan> process(es) have been <green>successfully</green> closed`
              )
            );
            process.exit();
          });
      }
    }

    if (remainingProcessesCount > 0) {
      Object.keys(processes).forEach(async (key) => {
        const processObj = processes[key];
        if (processObj.hasAfterCommand()) {
          function waitForClose() {
            const p = new Promise((resolve) => {
              processObj
                .on('close', () => {
                  resolve();
                })
                .on('stdout.data,stderr.data', (value) => {
                  console.log(__parseHtml(`  ${value.value}`));
                });
            });
            return p;
          }
          await waitForClose();
          processKilled();
        } else if (!processObj.exitCode && process.pid !== processObj.pid) {
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
      console.log(__parseHtml('  Cleaning the forgotten process(es)...'));
      await __spawn('sugar util.kill all')
        .on('stdout.data,stderr.data', (value) => {
          console.log(__parseHtml(`    - ${value.value}`));
        })
        .on('cancel,finally', () => {
          console.log(
            __parseHtml(
              `  All of the <cyan>${processesCount}</cyan> process(es) have been <green>successfully</green> closed`
            )
          );
          process.exit();
        });
    }
  });
};
