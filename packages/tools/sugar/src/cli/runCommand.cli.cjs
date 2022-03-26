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
var runCommand_cli_exports = {};
__export(runCommand_cli_exports, {
  default: () => runCommand
});
module.exports = __toCommonJS(runCommand_cli_exports);
var import_s_glob = __toESM(require("@coffeekraken/s-glob"), 1);
var import_spawn = __toESM(require("../node/process/spawn"), 1);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
var import_path = __toESM(require("path"), 1);
var import_s_duration = __toESM(require("@coffeekraken/s-duration"), 1);
var import_formatDuration = __toESM(require("@coffeekraken/sugar/shared/time/formatDuration"), 1);
var import_SRunCommandParamsInterface = __toESM(require("./interface/SRunCommandParamsInterface"), 1);
function runCommand(stringArgs = "") {
  return new import_s_promise.default(async ({ resolve, reject, emit, pipe, pipeErrors }) => {
    const props = import_SRunCommandParamsInterface.default.apply(stringArgs);
    let paths = [];
    const duration = new import_s_duration.default();
    let currentDuration = 0;
    if (props.directory) {
      paths = import_s_glob.default.resolve(props.directory, {
        cwd: process.cwd(),
        nodir: false,
        SFile: false
      });
    } else {
      paths = [process.cwd()];
    }
    emit("log", {
      value: `<yellow>[command]</yellow> Executing the command "<magenta>${props.command}</magenta>" in these <cyan>${paths.length}</cyan> folder(s):${paths.map((p) => {
        return `
- <cyan>${import_path.default.relative(process.cwd(), p)}</cyan>`;
      })}`
    });
    emit("log", {
      value: " "
    });
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      emit("log", {
        value: `<yellow>[command]</yellow> Executing command "<yellow>${props.command}</yellow>" in folder:`
      });
      emit("log", {
        value: `<yellow>[command]</yellow> <cyan>${import_path.default.relative(process.cwd(), path)}</cyan>`
      });
      const start = Date.now();
      const command = (0, import_spawn.default)(props.command, [], {
        cwd: path
      });
      if (props.verbose)
        pipe(command);
      else
        pipeErrors(command);
      const result = await command;
      const end = Date.now();
      currentDuration += end - start;
      const average = currentDuration / i;
      const remaining = average * (paths.length - i);
      emit("log", {
        value: `<green>[command]</green> Command executed <green>successfully</green> in <yellow>${result.formatedDuration}</yellow>`
      });
      emit("log", {
        value: `<green>[command]</green> <magenta>${paths.length - (i + 1)}</magenta> folder(s), <cyan>~${(0, import_formatDuration.default)(remaining)}</cyan> remaining...`
      });
      emit("log", {
        value: " "
      });
    }
    emit("log", {
      value: `<green>[success]</green> Command "<yellow>${props.command}</yellow>" executed <green>successfully</green> in <cyan>${paths.length}</cyan> folder(s) in <yellow>${duration.end().formatedDuration}</yellow>`
    });
    resolve();
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
