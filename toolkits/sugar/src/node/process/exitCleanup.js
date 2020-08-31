const __deepMerge = require('../object/deepMerge');
const __getRegisteredProcessed = require('./getRegisteredProcesses');
const __clear = require('clear');
const __fkill = require('fkill');
const __hotkey = require('../keyboard/hotkey');
const __spawn = require('../process/spawn');
const __parseHtml = require('../terminal/parseHtml');
const __keypress = require('keypress');
const __wait = require('../time/wait');
const __SOutput = require('../blessed/SOutput');
const __sugarHeading = require('../ascii/sugarHeading');
const __packageJson = require('../package/json');

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
process.env.EXIT_CLEANUP = false;
module.exports = function exitCleanup() {
  if (process.env.EXIT_CLEANUP === true) return;
  process.env.EXIT_CLEANUP = true;
  __hotkey('ctrl+c', {
    once: true
  }).on('press', async () => {
    // check if all processes are closed
    const processes = __getRegisteredProcessed();
    const remainingProcessesCount = Object.keys(processes).length;

    __hotkey('ctrl+c', {
      once: true
    }).on('press', () => {
      process.exit();
    });

    __keypress.disableMouse(process.stdout);

    // destroy the screen if exists
    try {
      if (global._screen) global._screen.destroy();
    } catch (e) {}

    await __wait(50);

    const $output = new __SOutput([], {});

    $output.log({
      value: `${__sugarHeading({
        version: __packageJson(__dirname).version
      })}`
    });

    $output.log({
      value: 'Cleaning your system after <primary>Sugar</primary> execution...'
    });

    // processed that have been registered during the process
    if (remainingProcessesCount > 0) {
      Object.keys(processes).forEach(async (key) => {
        const processObj = processes[key];
        // if (processObj.hasAfterCommand && processObj.hasAfterCommand()) {
        //   function waitForClose() {
        //     const p = new Promise((resolve) => {
        //       processObj
        //         .on('close', () => {
        //           resolve();
        //         })
        //         .on('log,error', (value) => {
        //           $output.log({
        //             value: __parseHtml(`  ${value.value}`)
        //           });
        //         });
        //     });
        //     return p;
        //   }
        //   await waitForClose();
        //   processKilled();
        // } else
        if (!processObj.exitCode && process.pid !== processObj.pid) {
          $output.log({
            group: key,
            value: `Killing the process with the PID <cyan>${processObj.pid}</cyan>`
          });
          await __fkill(processObj.pid);
          $output.log({
            group: key,
            value: `#success The process has been killed <green>successfully</green>`
          });
          // processKilled();
        } else {
          processKilled();
        }
      });
    }

    // Forgotten processes
    $output.log({
      group: 'Forgotten processes',
      value: 'Cleaning the forgotten process(es)...'
    });
    await __spawn('sugar util.kill all')
      .on('log,error', (value) => {
        $output.log({
          group: 'Forgotten processes',
          value: __parseHtml(`    - ${value.value}`)
        });
      })
      .on('cancel,finally', async () => {
        $output.log({
          group: 'Forgotten processes',
          value: `#success All of the forgotten process(es) have been <green>successfully</green> killed`
        });

        await __wait(20);

        $output.log({
          value: `Closing the main process in <yellow>5s</yellow>...\n- <cyan>ctrl+c</cyan> to close directly`
        });

        await __wait(5000);

        process.exit();
      });
  });
};
