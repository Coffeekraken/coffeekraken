const __psList = require('ps-list');
const __fkill = require('fkill');
const __deepMerge = require('../object/deepMerge');
const __minimatch = require('minimatch');

/**
 * @name              exitCleanup
 * @namespace           sugar.node.process
 * @type              Function
 * @async
 *
 * This function simply cleanup all the processes and other things that stay alive after that
 * the main process has been terminated
 *
 * @example         js
 * const exitCleanup = require('@coffeekraken/sugar/node/process/exitCleanup');
 * await exitCleanup();
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = function exitCleanup(settings = {}) {
  return new Promise((resolve, reject) => {
    settings = __deepMerge(
      {
        pid: [],
        cmd: [/.*\/bin\/sugar\s.*/]
      },
      settings
    );

    (async () => {
      const processes = await __psList();
      const processesToKill = processes.filter((p) => {
        if (p.pid === process.pid) return false;
        if (p.ppid === process.pid) return true;
        if (settings.pid.indexOf(p.pid) !== -1) return true;
        for (let i = 0; i < settings.cmd.length; i++) {
          const cmdReg = settings.cmd[i];
          if (p.cmd.match(cmdReg)) return true;
        }
        return false;
      });

      for (let j = 0; j < processesToKill.length; j++) {
        await __fkill(processesToKill[j].pid, {
          force: true
        });
      }

      resolve();
    })();
  });
};
