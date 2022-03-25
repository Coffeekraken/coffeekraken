import __psList from "ps-list";
import __fkill from "fkill";
import __deepMerge from "../../shared/object/deepMerge";
function exitCleanup(settings = {}) {
  return new Promise(({ resolve, reject }) => {
    settings = __deepMerge({
      pid: [],
      cmd: [/.*\/bin\/sugar\s.*/]
    }, settings);
    (async () => {
      const processes = await __psList();
      const processesToKill = processes.filter((p) => {
        if (p.pid === process.pid)
          return false;
        if (p.ppid === process.pid)
          return true;
        if (settings.pid.indexOf(p.pid) !== -1)
          return true;
        for (let i = 0; i < settings.cmd.length; i++) {
          const cmdReg = settings.cmd[i];
          if (p.cmd.match(cmdReg))
            return true;
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
}
var exitCleanup_default = exitCleanup;
export {
  exitCleanup_default as default
};
