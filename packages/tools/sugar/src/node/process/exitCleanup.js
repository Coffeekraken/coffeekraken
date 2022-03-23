var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var exitCleanup_exports = {};
__export(exitCleanup_exports, {
  default: () => exitCleanup_default
});
module.exports = __toCommonJS(exitCleanup_exports);
var import_ps_list = __toESM(require("ps-list"), 1);
var import_fkill = __toESM(require("fkill"), 1);
var import_deepMerge = __toESM(require("../../shared/object/deepMerge"), 1);
function exitCleanup(settings = {}) {
  return new Promise(({ resolve, reject }) => {
    settings = (0, import_deepMerge.default)({
      pid: [],
      cmd: [/.*\/bin\/sugar\s.*/]
    }, settings);
    (async () => {
      const processes = await (0, import_ps_list.default)();
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
        await (0, import_fkill.default)(processesToKill[j].pid, {
          force: true
        });
      }
      resolve();
    })();
  });
}
var exitCleanup_default = exitCleanup;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
