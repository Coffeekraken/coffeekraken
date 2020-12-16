// @ts-nocheck

import __deepMerge from '../object/deepMerge';
import __getRegisteredProcessed from './getRegisteredProcesses';
import __clear from 'clear';
import __fkill from 'fkill';
import __hotkey from '../keyboard/hotkey';
import __parseHtml from '../terminal/parseHtml';
import __keypress from 'keypress';
import __wait from '../time/wait';
import __SBlessedOutput from '../blessed/SBlessedOutput';
import __sugarHeading from '../ascii/sugarHeading';
import __packageJson from '../package/json';
import __SChildProcessManager from '../process/SChildProcess';

/**
 * @name              exitCleanup
 * @namespace           sugar.node.process
 * @type              Function
 *
 * This function register a handler on process exit and try to clean all the child process, etc...
 *
 * @param       {Function}       [handler=null]       A custom function to handle custom cleanup if you need. MUST return a promise that you have to resolve once the cleanup has been done
 * @param       {Object}        [settings={}]         An object of settings to configure your cleanup:
 * - childProcess (true) {Boolean}: Specify if you want to clean the child processes or not
 *
 * @example         js
 * import exitCleanup from '@coffeekraken/sugar/node/process/exitCleanup';
 * exitCleanup();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
process.env.EXIT_CLEANUP = false;
function exitCleanup() {
  if (process.env.EXIT_CLEANUP === true) return;
  process.env.EXIT_CLEANUP = true;
  __hotkey('ctrl+c', {
    once: true
  }).on('press', async () => {
    // check if all processes are closed
    const processes = __getRegisteredProcessed();
    const remainingProcessesCount = Object.keys(processes).length;

    //console.log(processes);

    __hotkey('ctrl+c', {
      once: true
    }).on('press', () => {
      process.exit();
    });

    __keypress.disableMouse(process.stdout);

    await __wait(50);

    const $output = new __SBlessedOutput([], {
      attach: true,
      maxItemsByGroup: 1000
    });

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
          // processKilled();
        }
      });
    }

    // Forgotten processes
    $output.log({
      group: 'Forgotten processes',
      value: 'Cleaning the forgotten process(es)...'
    });
    const childProcess = new __SChildProcessManager('sugar util.kill all', {});
    await childProcess
      .run()
      .on('log,error', (value) => {
        if (value.value.includes('#success')) {
          $output.log({
            group: 'Forgotten processes',
            value: value.value
          });
        }
      })
      .on('cancel,finally', async () => {
        $output.log({
          group: 'Forgotten processes',
          value: `#success All of the forgotten process(es) have been <green>successfully</green> killed`
        });

        await __wait(20);

        $output.log({
          value: `Closing the main process in <yellow>5s</yellow>...\n<cyan>ctrl+c</cyan> to close directly`
        });

        await __wait(5000);

        process.exit();
      });
  });
}
export = exitCleanup;
