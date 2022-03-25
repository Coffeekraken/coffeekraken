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
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
import __SDuration from "@coffeekraken/s-duration";
import __SEventEmitter from "@coffeekraken/s-event-emitter";
import __fs from "fs";
import __SPromise from "@coffeekraken/s-promise";
import __SStdio from "@coffeekraken/s-stdio";
import __isChildProcess from "@coffeekraken/sugar/node/is/childProcess";
import __onProcessExit from "@coffeekraken/sugar/node/process/onProcessExit";
import __spawn from "@coffeekraken/sugar/node/process/spawn";
import __extendsStack from "@coffeekraken/sugar/shared/class/utils/getExtendsStack";
import __buildCommandLine from "@coffeekraken/sugar/shared/cli/buildCommandLine";
import __isClass from "@coffeekraken/sugar/shared/is/class";
import __isPlainObject from "@coffeekraken/sugar/shared/is/plainObject";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __toString from "@coffeekraken/sugar/shared/string/toString";
import __path from "path";
import __stackTrace from "stack-trace";
import __SProcessSettingsInterface from "./interface/SProcessSettingsInterface";
import __dirname from "@coffeekraken/sugar/node/fs/dirname";
const _SProcess = class extends __SEventEmitter {
  constructor(initialParams, settings) {
    super(__deepMerge({
      process: {}
    }, settings != null ? settings : {}));
    this.stdio = void 0;
    this._state = "idle";
    this.executionsStack = [];
    var _a;
    this.initialParams = Object.assign({}, initialParams != null ? initialParams : {});
    this.paramsInterface = this.processSettings.interface;
    if (!this.paramsInterface) {
      this.paramsInterface = (_a = this.constructor.interface) != null ? _a : this.getInterface("params");
    }
    __onProcessExit(async (state) => {
      this.state(state);
    });
    if (!this.processSettings.processPath) {
      for (const callSite of __stackTrace.get()) {
        if (callSite.getFunctionName() === this.constructor.name) {
          this.processSettings.processPath = callSite.getFileName();
          break;
        }
      }
    }
    if (!this.processSettings.processPath) {
      throw new Error(`An SProcess instance MUST have a "<yellow>processPath</yellow>" property either populated automatically if possible, or specified in the "<cyan>settings.processPath</cyan>" property...`);
    }
  }
  get params() {
    return this._params;
  }
  get processSettings() {
    return this._settings.process;
  }
  static async from(what, settings) {
    var _a, _b;
    if (__isClass(what) && __extendsStack(what)["SProcess"]) {
      return new what({}, settings);
    }
    if (what instanceof _SProcess) {
      return what;
    }
    if (what instanceof Promise) {
      class SPromiseProcess extends _SProcess {
        constructor() {
          super({}, settings);
        }
        process() {
          what.catch((e) => {
          });
          return what;
        }
      }
      return new SPromiseProcess();
    }
    if (typeof what === "function") {
      class SFunctionProcess extends _SProcess {
        constructor() {
          super({}, __spreadValues({}, settings));
        }
        process(params, settings2) {
          return what(params, settings2 != null ? settings2 : {});
        }
      }
      return new SFunctionProcess();
    }
    if (typeof what === "string") {
      let potentialPath = __path.resolve(what);
      if (!potentialPath.match(/\.js$/))
        potentialPath += ".js";
      if (__fs.existsSync(potentialPath)) {
        const requireValue = (_a = await Promise.resolve().then(() => __toESM(require(potentialPath)))) == null ? void 0 : _a.default;
        if (requireValue) {
          const pro = await this.from(requireValue, __deepMerge(settings, {
            process: {
              processPath: potentialPath
            }
          }));
          return pro;
        }
      } else {
        const __SCommandProcess = (_b = await Promise.resolve().then(() => __toESM(require("./SCommandProcess")))) == null ? void 0 : _b.default;
        const commandProcess = new __SCommandProcess({
          command: what
        }, __deepMerge(settings, {
          process: {
            processPath: __path.resolve("./SCommandProcess.js")
          }
        }));
        return commandProcess;
      }
    }
    throw new Error([
      `<red>[SProcess.from]</red> Sorry but the passed "<magenta>what</magenta>" argument must be either:`,
      `- A <green>command string</green> like "<cyan>ls -la</cyan>"`,
      `- A valid <green>file path</green> that exports <green>one of these accepted types</green>`,
      `- A <yellow>function</yellow> that return a valid <green>Promise</green> instance or a valid <green>SPromise</green> instance`,
      `- A <green>Promise</green> or <green>SPromise</green> instance`,
      `- An <green>SProcess</green> based class`
    ].join("\n"));
  }
  static async fromCommand(initialParams = {}, settings) {
    const { default: __SCommandProcess } = await Promise.resolve().then(() => __toESM(require("./SCommandProcess")));
    return new __SCommandProcess(initialParams, settings);
  }
  static async run(paramsOrStringArgs = {}, settings = {}) {
    const instance = new this({});
    return instance.run(paramsOrStringArgs, settings);
  }
  get lastExecutionObj() {
    if (!this.executionsStack.length)
      return -1;
    return this.executionsStack[this.executionsStack.length - 1];
  }
  ready() {
    if (this.state() === "ready")
      return;
    this.state("ready");
  }
  run(paramsOrStringArgs = {}, settings = {}) {
    var _a, _b, _c;
    const processSettings = __deepMerge(this.processSettings, settings);
    if (this.currentExecutionObj !== void 0) {
      if (processSettings.throw === true) {
        throw new Error(`Sorry but you can not execute multiple process of the "<yellow>${this.metas.name || this.metas.id || this.constructor.name}</yellow>" SProcess instance...`);
      }
      return;
    }
    if (process.env.NODE_ENV !== "test" && !__isChildProcess() && processSettings.stdio && !this.stdio) {
      this.stdio = __SStdio.existingOrNew("default", this, processSettings.stdio, {});
    }
    this._duration = new __SDuration();
    this.currentExecutionObj = {
      state: "idle",
      stdout: [],
      stderr: [],
      settings: Object.assign({}, settings)
    };
    if (this.currentExecutionObj) {
      this.currentExecutionObj.stdout.toString = () => {
        if (!this.currentExecutionObj)
          return "";
        return this.currentExecutionObj.stdout.map((item) => {
          return __toString(item);
        }).join("\n");
      };
      this.currentExecutionObj.stderr.toString = () => {
        if (!this.currentExecutionObj)
          return "";
        return this.currentExecutionObj.stderr.map((item) => {
          return __toString(item);
        }).join("\n");
      };
    }
    let paramsObj = __isPlainObject(paramsOrStringArgs) ? paramsOrStringArgs : {};
    if (this.paramsInterface) {
      paramsObj = this.paramsInterface.apply(paramsOrStringArgs, {
        baseObj: (_a = this.initialParams) != null ? _a : {}
      });
    }
    if (paramsObj.help === true && this.paramsInterface !== void 0) {
      const helpString = this.paramsInterface.render();
      this.emit("log", {
        group: `s-process-${this.metas.id}`,
        value: helpString
      });
      return;
    }
    this._params = Object.assign({}, paramsObj);
    this.currentExecutionObj.params = Object.assign({}, paramsObj);
    this.state("running");
    (_b = processSettings.before) == null ? void 0 : _b.call(processSettings, this);
    if (processSettings.runAsChild && !__isChildProcess()) {
      const commandToRun = __buildCommandLine(`node --experimental-specifier-resolution=node ${__path.resolve(__dirname(), "runAsChild.cli.js")} [arguments]`, __spreadProps(__spreadValues({}, this._params), {
        _settings: processSettings
      }), {
        keepFalsy: true
      });
      this._processPromise = __spawn(commandToRun, [], __spreadValues({}, processSettings.spawnSettings || {}));
    } else {
      this._processPromise = this.process(this._params, processSettings);
      if (__isChildProcess() && this._processPromise && this._processPromise.pipeTo) {
        this._processPromise.pipeTo(process, {
          exclude: []
        });
      }
    }
    if (this._processPromise instanceof __SPromise) {
      this.pipe(this._processPromise, {});
      this._processPromise && this._processPromise.on("log", (data, metas) => {
        if (this.currentExecutionObj) {
          this.currentExecutionObj.stdout.push(data);
        }
      });
      this._processPromise && this._processPromise.on("error,reject", (data, metas) => {
        if (this.currentExecutionObj) {
          this.currentExecutionObj.stderr.push(data);
        }
        if (!this.processSettings.killOnError && metas.event === "error")
          return;
      });
      this._processPromise.on([
        "resolve:1",
        "reject:1",
        "cancel:1",
        "error:1",
        "success:1",
        "close.success:1",
        "close.error:1",
        "close.killed:1"
      ].join(","), (data, metas) => {
        if (metas.event === "resolve" || metas.event === "close.success")
          this.state("success");
        else if (metas.event === "reject" || metas.event === "error" || metas.event === "close.error")
          this.state("error");
        else if (metas.event === "cancel" || metas.event === "close.killed")
          this.state("killed");
        else
          this.state("idle");
      });
      this._processPromise && this._processPromise.on("finally", () => {
        var _a2;
        if (this.processSettings.exitAtEnd === true) {
          process.exit();
        }
        (_a2 = processSettings.after) == null ? void 0 : _a2.call(processSettings, this);
      });
      (_c = this._processPromise) == null ? void 0 : _c.registerProxy("resolve,reject", (value) => {
        if (value && value.value !== void 0)
          value = value.value;
        return __spreadProps(__spreadValues({}, this.executionsStack[this.executionsStack.length - 1]), {
          value
        });
      });
      return this._processPromise;
    }
    if (this._processPromise instanceof Promise) {
      this._processPromise.catch((e) => {
      });
      return new __SPromise(({ resolve }) => {
        this._processPromise.then((value) => {
          var _a2;
          this.state("success");
          resolve(__spreadProps(__spreadValues({}, this.executionsStack[this.executionsStack.length - 1]), {
            value
          }));
          (_a2 = processSettings.after) == null ? void 0 : _a2.call(processSettings, this);
        }).catch((error) => {
          var _a2;
          this.state("error");
          resolve(__spreadProps(__spreadValues({}, this.executionsStack[this.executionsStack.length - 1]), {
            error
          }));
          (_a2 = processSettings.after) == null ? void 0 : _a2.call(processSettings, this);
        });
      });
    }
    throw new Error(`<red>[${this.constructor.name}.run]</red> Sorry but the returned value of the "<yellow>process</yellow>" method MUST be either an <yellow>SPromise</yellow> instance or a simple <yellow>Promise</yellow> instance`);
  }
  state(value) {
    if (!value)
      return this._state;
    if (["idle", "ready", "running", "killed", "error", "success"].indexOf(value) === -1) {
      throw new Error(`Sorry but the "<yellow>state</yellow>" property setted to "<magenta>${__toString(value)}</magenta>" of your "<cyan>${this.constructor.name}</cyan>" class can contain only one of these values: ${[
        "idle",
        "running",
        "killed",
        "error",
        "success"
      ].map((i) => {
        return `"<green>${i}</green>"`;
      }).join(", ")}`);
    }
    this.emit(`state.${value}`, void 0);
    this.emit("state", value);
    this._state = value;
    this._onStateChange(value);
    return this._state;
  }
  kill(data) {
    this.cancel(data);
  }
  cancel(data) {
    if (this.state() === "running")
      this.state("killed");
    if (this._processPromise && this._processPromise.cancel) {
      this._processPromise.cancel(data);
      setTimeout(() => {
        this.emit("error", data);
      }, 50);
    }
  }
  _onStateChange(state) {
    if (!this.currentExecutionObj)
      return;
    this.currentExecutionObj.state = state;
    if (state === "killed" || state === "error" || state === "success") {
      this.currentExecutionObj = __spreadValues(__spreadValues({}, this.currentExecutionObj), this._duration.end());
    }
    if (state === "success" || state === "killed" || state === "error") {
      this.executionsStack.push(Object.assign({}, this.currentExecutionObj));
      this.currentExecutionObj = void 0;
    }
  }
  isRunning() {
    return this.state() === "running";
  }
  isIdle() {
    return this.state() === "idle";
  }
  isReady() {
    return this.state() !== "idle";
  }
  isKilled() {
    return this.state() === "killed";
  }
  isError() {
    return this.state() === "error";
  }
  isSuccess() {
    return this.state() === "success";
  }
  log(...logs) {
    logs.forEach((log) => {
      if (this.currentExecutionObj) {
        this.currentExecutionObj.stdout.push(log.value || log.toString());
      }
      this.emit("log", log);
    });
  }
  error(...errors) {
    errors.forEach((error) => {
      if (this.currentExecutionObj) {
        this.currentExecutionObj.stderr.push(error.value || error.toString());
      }
      this.emit("error", error);
    });
  }
};
let SProcess = _SProcess;
SProcess.interfaces = {
  settings: {
    on: "_settings.process",
    class: __SProcessSettingsInterface
  }
};
var SProcess_default = SProcess;
export {
  SProcess_default as default
};
