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
var onProcessExit_exports = {};
__export(onProcessExit_exports, {
  default: () => onProcessExit_default
});
module.exports = __toCommonJS(onProcessExit_exports);
var import_terminal_kit = __toESM(require("terminal-kit"));
const __onProcessExitCallbacks = [];
function onProcessExit(callback) {
  if (!__onProcessExitCallbacks.length) {
    process.stdin.resume();
    process.env.HAS_ON_PROCESS_EXIT_HANDLERS = true;
    let isExiting = false;
    async function exitHandler(state) {
      if (isExiting)
        return;
      isExiting = true;
      for (let i = 0; i < __onProcessExitCallbacks.length; i++) {
        const cbFn = __onProcessExitCallbacks[i];
        await cbFn(state);
      }
      setTimeout(() => {
        import_terminal_kit.default.terminal.processExit("SIGTERM");
      }, 100);
    }
    process.on("close", (code) => code === 0 ? exitHandler("success") : exitHandler("error"));
    process.on("exit", (code) => code === 0 ? exitHandler("success") : exitHandler("error"));
    process.on("custom_exit", (state) => {
      exitHandler(state);
    });
    process.on("SIGINT", () => exitHandler("killed"));
    process.on("SIGUSR1", () => exitHandler("killed"));
    process.on("SIGUSR2", () => exitHandler("killed"));
    process.on("uncaughtException", () => exitHandler("error"));
  }
  if (__onProcessExitCallbacks.indexOf(callback) !== -1)
    return;
  __onProcessExitCallbacks.push(callback);
}
var onProcessExit_default = onProcessExit;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
