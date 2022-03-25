var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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
import __SSugarCli from "@coffeekraken/cli";
import __SDuration from "@coffeekraken/s-duration";
import __SEventEmitter from "@coffeekraken/s-event-emitter";
import __SLog from "@coffeekraken/s-log";
import __SPromise from "@coffeekraken/s-promise";
import { spawn as __spawn } from "child_process";
import __deepMerge from "../../shared/object/deepMerge";
import __onProcessExit from "./onProcessExit";
function spawn(command, args = [], settings) {
  let childProcess;
  const promise = new __SPromise(async ({ resolve, reject, emit, pipe }) => {
    settings = __deepMerge({
      pipeEvents: true,
      returnValueOnly: false
    }, settings != null ? settings : {});
    const duration = new __SDuration();
    let resolveValue, rejectValue;
    const stderr = [], stdout = [];
    command = __SSugarCli.replaceTokens(command);
    const eventEmitter = await __SEventEmitter.ipcServer();
    pipe(eventEmitter);
    childProcess = __spawn(command, [], __spreadProps(__spreadValues({
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
    __onProcessExit(() => {
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
            type: __SLog.TYPE_CHILD_PROCESS,
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
            type: __SLog.TYPE_CHILD_PROCESS,
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
export {
  spawn as default
};
