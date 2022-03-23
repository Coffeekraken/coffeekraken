var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
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
var SProcessManagerProcessWrapper_exports = {};
__export(SProcessManagerProcessWrapper_exports, {
  default: () => SProcessManagerProcessWrapper_default
});
module.exports = __toCommonJS(SProcessManagerProcessWrapper_exports);
var import_s_event_emitter = __toESM(require("@coffeekraken/s-event-emitter"), 1);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
var import_wait = __toESM(require("@coffeekraken/sugar/shared/time/wait"), 1);
var import_plainObject = __toESM(require("@coffeekraken/sugar/shared/is/plainObject"), 1);
class SProcessManagerProcessWrapper extends import_s_event_emitter.default {
  constructor(processInstance, settings) {
    super((0, import_deepMerge.default)({
      processManagerProcess: {
        stdio: "inherit",
        restart: false,
        log: {
          filter: void 0
        }
      }
    }, settings));
    this._isDetached = false;
    this._currentProcessPromise = null;
    const restartDefaultSettings = {
      on: "reject",
      maxTimes: -1,
      maxEvery: -1,
      delay: 0,
      before: void 0
    };
    if (this.processManagerProcessSettings.restart === true) {
      this.processManagerProcessSettings.restart = restartDefaultSettings;
    } else if ((0, import_plainObject.default)(this.processManagerProcessSettings.restart)) {
      this.processManagerProcessSettings.restart = __spreadValues(__spreadValues({}, restartDefaultSettings), this.processManagerProcessSettings.restart);
    }
    processInstance.processSettings.stdio = false;
    this.processInstance = processInstance;
  }
  get initialParams() {
    return Object.assign({}, this._settings.initialParams);
  }
  get processManagerProcessSettings() {
    return this._settings.processManagerProcess;
  }
  _handleRestartFor(processPromise) {
    if (this._isDetached)
      return;
    this._currentProcessPromise = processPromise;
    processPromise.on("reject", async (value, metas) => {
      if (this._isDetached)
        return;
      await (0, import_wait.default)(0);
      this.emit("log", {
        group: `s-process-manager-process-wrapper-${this.metas.id}`,
        value: `The process "<yellow>${this.metas.id}</yellow>" has been stoped after a(n) <red>${this.processInstance.lastExecutionObj.state}</red> after <cyan>${this.processInstance.lastExecutionObj.formatedDuration}</cyan> of execution`
      });
      if (this.processManagerProcessSettings.restart.maxEvery > 0) {
        if (this.processInstance.lastExecutionObj.endTime + this.processManagerProcessSettings.restart.maxEvery >= Date.now()) {
          this.emit("log", {
            group: `s-process-manager-process-wrapper-${this.metas.id}`,
            value: `The process "<yellow>${this.metas.id}</yellow>" will not being restarted cause it has crashed before the <cyan>maxEvery</cyan> setting setted to <magenta>${this.processManagerProcessSettings.restart.maxEvery}ms</magenta>`
          });
          if (this._restartingProcessResolve && !this._isDetached) {
            this._restartingProcessResolve(this.processInstance.executionsStack);
          }
          return;
        }
      }
      if (this.processManagerProcessSettings.restart.maxTimes > 0) {
        if (this.processInstance.executionsStack.length >= this.processManagerProcessSettings.restart.maxTimes) {
          this.emit("log", {
            group: `s-process-manager-process-wrapper-${this.metas.id}`,
            value: `The process "<yellow>${this.metas.id}</yellow>" will not being restarted cause it has reached the <cyan>maxTimes</cyan> setting setted to <magenta>${this.processManagerProcessSettings.restart.maxTimes}</magenta>`
          });
          if (this._restartingProcessResolve && !this._isDetached) {
            this._restartingProcessResolve(this.processInstance.executionsStack);
          }
          return;
        }
      }
      let newProcessArgs = Object.assign({}, this.processInstance.lastExecutionObj.params);
      if (this.processManagerProcessSettings.restart.before && typeof this.processManagerProcessSettings.restart.before === "function") {
        newProcessArgs = await this.processManagerProcessSettings.restart.before(this.processInstance.lastExecutionObj);
      }
      if (!newProcessArgs) {
        this.emit("log", {
          group: `s-process-manager-process-wrapper-${this.metas.id}`,
          value: `Stop restarting the process "<yellow>${this.metas.id}</yellow>"`
        });
        if (this._restartingProcessResolve && !this._isDetached) {
          this._restartingProcessResolve(this.processInstance.executionsStack);
        }
        return;
      }
      if (this.processManagerProcessSettings.restart.delay)
        this.emit(`log`, {
          group: `s-process-manager-process-wrapper-${this.metas.id}`,
          value: `Waiting <cyan>${this.processManagerProcessSettings.restart.delay / 1e3}s</cyan> before restart...`
        });
      await (0, import_wait.default)(this.processManagerProcessSettings.restart.delay);
      this.emit("log", {
        group: `s-process-manager-process-wrapper-${this.metas.id}`,
        value: `Restarting process "<yellow>${this.metas.id}</yellow>"`
      });
      this._run(newProcessArgs.params, newProcessArgs.settings);
    }, {
      id: "restartHandler"
    });
  }
  detach() {
    this._isDetached = true;
    if (this._currentProcessPromise)
      this._currentProcessPromise.off("restartHandler");
  }
  _run(paramsOrStringArgs = {}, settings = {}) {
    if (this._isDetached)
      return;
    const promise = this.processInstance.run(paramsOrStringArgs, settings);
    if (this.processManagerProcessSettings.restart)
      this._handleRestartFor(promise);
    return promise;
  }
  run(paramsOrStringArgs = {}, settings = {}) {
    if (this._isDetached) {
      throw new Error(`Sorry but you cannot run this "<yellow>${this.metas.id}</yellow>" process cause it has been detached from the process manager`);
    }
    return new import_s_promise.default(async ({ resolve, pipe }) => {
      this._restartingProcessResolve = resolve;
      const resPromise = this._run(paramsOrStringArgs, settings);
      pipe(resPromise);
      const res = await resPromise;
      if (!this.processManagerProcessSettings.restart && !this._isDetached) {
        resolve(res);
      }
    }, {
      id: "plop",
      metas: {
        id: "coco"
      }
    });
  }
}
var SProcessManagerProcessWrapper_default = SProcessManagerProcessWrapper;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
