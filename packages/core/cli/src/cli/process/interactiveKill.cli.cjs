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
var interactiveKill_cli_exports = {};
__export(interactiveKill_cli_exports, {
  default: () => interactiveKill
});
module.exports = __toCommonJS(interactiveKill_cli_exports);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"));
var import_spawn = __toESM(require("@coffeekraken/sugar/node/process/spawn"));
var import_cli = __toESM(require("@coffeekraken/cli"));
function interactiveKill(params) {
  return new import_s_promise.default(async ({ resolve, reject, emit, pipe }) => {
    let res;
    res = await emit("ask", {
      type: "select",
      message: "How would you like to kill your process?",
      choices: ["by id", "by port"]
    });
    let command;
    switch (res) {
      case "by id":
        res = await emit("ask", {
          type: "input",
          message: "Specify the process id you want to kill",
          validate(...args) {
            if (!args[0].match(/^[0-9]+$/))
              return `Process id must be an integer`;
            return true;
          }
        });
        command = import_cli.default.replaceTokens(`%sugar process.kill --id ${res}`);
        emit("log", {
          value: `> Running command: <yellow>${command}</yellow>`
        });
        pipe((0, import_spawn.default)(command));
        break;
      case "by port":
        res = await emit("ask", {
          type: "input",
          message: "Specify the port on which the process you want to kill is running",
          validate(...args) {
            if (!args[0].match(/^[0-9]+$/))
              return `Process id must be an integer`;
            return true;
          }
        });
        command = import_cli.default.replaceTokens(`%sugar process.kill --port ${res}`);
        emit("log", {
          value: `> Running command: <yellow>${command}</yellow>`
        });
        pipe((0, import_spawn.default)(command));
        break;
    }
  }, {
    metas: {
      id: "process.kill"
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
