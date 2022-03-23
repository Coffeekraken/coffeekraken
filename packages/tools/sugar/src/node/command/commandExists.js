var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var commandExists_exports = {};
__export(commandExists_exports, {
  default: () => commandExists
});
module.exports = __toCommonJS(commandExists_exports);
var import_child_process = require("child_process");
async function commandExists(command) {
  const isWin = process.platform === "win32";
  const where = isWin ? "where" : "whereis";
  const versionOut = (0, import_child_process.spawnSync)(`${command} --version`, ["/?"], {
    encoding: "utf-8",
    shell: true
  });
  if (versionOut.stdout)
    return versionOut.stdout;
  const out = (0, import_child_process.spawnSync)(where + " " + command, ["/?"], {
    encoding: "utf8",
    shell: true
  });
  return out.stdout !== "";
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
