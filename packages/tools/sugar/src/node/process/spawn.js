var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
var spawn_exports = {};
__export(spawn_exports, {
  default: () => spawn
});
module.exports = __toCommonJS(spawn_exports);
var import_cli = __toESM(require("@coffeekraken/cli"), 1);
var import_s_duration = __toESM(require("@coffeekraken/s-duration"), 1);
var import_s_event_emitter = __toESM(require("@coffeekraken/s-event-emitter"), 1);
var import_s_log = __toESM(require("@coffeekraken/s-log"), 1);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
var import_child_process = require("child_process");
var import_deepMerge = __toESM(require("../../shared/object/deepMerge"), 1);
var import_onProcessExit = __toESM(require("./onProcessExit"), 1);
function spawn(command, args = [], settings) {
  let childProcess;
  const promise = new import_s_promise.default(async ({ resolve, reject, emit, pipe }) => {
    settings = (0, import_deepMerge.default)({
      pipeEvents: true,
      returnValueOnly: false
    }, settings != null ? settings : {});
    const duration = new import_s_duration.default();
    let resolveValue, rejectValue;
    const stderr = [], stdout = [];
    command = import_cli.default.replaceTokens(command);
    const eventEmitter = await import_s_event_emitter.default.ipcServer();
    pipe(eventEmitter);
    childProcess = (0, import_child_process.spawn)(command, [], __spreadProps(__spreadValues({
      shell: true,
      stdio: ["pipe", "pipe", "pipe"],
      cwd: settings.cwd || process.cwd()
    }, settings), {
      env: __spreadProps(__spreadValues(__spreadValues({}, process.env), settings.env || {}), {
        CHILD_PROCESS_LEVEL: process.env.CHILD_PROCESS_LEVEL ? process.env.CHILD_PROCESS_LEVEL + 1 : 1,
        IS_CHILD_PROCESS: true
      })
    }));
    let childProcessExitPromiseResolve;
    process.on("exit", function() {
      childProcess.kill();
    });
    (0, import_onProcessExit.default)(() => {
      new Promise((resolve2) => {
        childProcessExitPromiseResolve = resolve2;
        emit("log", {
          value: `<red>[kill]</red> Gracefully killing child process "<yellow>${command}</yellow>"`
        });
        childProcess.kill("SIGINT");
      });
    });
    if (childProcess.stdout) {
      childProcess.stdout.on("data", (data) => {
        if (!data)
          return;
        stdout.push(data.toString());
        if (process.env.NODE_ENV === "test") {
          console.log(data.toString());
        } else {
          emit("log", {
            type: import_s_log.default.TYPE_CHILD_PROCESS,
            value: data.toString()
          });
        }
      });
    }
    if (childProcess.stderr) {
      childProcess.stderr.on("data", (data) => {
        if (!data)
          return;
        stderr.push(data.toString());
        if (process.env.NODE_ENV === "test") {
          console.error(data.toString());
        } else {
          emit("log", {
            type: import_s_log.default.TYPE_CHILD_PROCESS,
            value: data.toString()
          });
        }
      });
    }
    let isEnded = false;
    childProcess.on("close", (code, signal) => {
      if (isEnded)
        return;
      isEnded = true;
      let value = resolveValue || rejectValue || stdout.length ? stdout.join("\n") : stderr.length ? stderr.join("\n") : "";
      try {
        value = JSON.parse(value);
      } catch (e) {
      }
      const resultObj = __spreadValues({
        code,
        signal,
        value,
        stdout,
        stderr,
        spawn: true
      }, duration.end());
      childProcessExitPromiseResolve == null ? void 0 : childProcessExitPromiseResolve();
      emit("close", resultObj);
      if (resolveValue) {
        emit("close.success", resultObj);
        if (settings.returnValueOnly)
          return resolve(resultObj.value);
        return resolve(resultObj);
      } else if (rejectValue) {
        emit("close.error", resultObj);
        if (settings.returnValueOnly)
          return reject(resultObj.value);
        return reject(resultObj);
      }
      if (stderr.length) {
        emit("close.error", resultObj);
        if (settings.returnValueOnly)
          return reject(resultObj.value);
        return reject(resultObj);
      } else if (!code && signal) {
        emit("close.killed", resultObj);
        if (settings.returnValueOnly)
          return resolve(resultObj.value);
        return resolve(resultObj);
      } else if (code === 0 && !signal) {
        emit("close.success", resultObj);
        if (settings.returnValueOnly)
          return resolve(resultObj.value);
        return resolve(resultObj);
      } else {
        emit("close.error", resultObj);
        if (settings.returnValueOnly)
          return reject(resultObj.value);
        return reject(resultObj);
      }
    });
  }, {});
  return promise;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
