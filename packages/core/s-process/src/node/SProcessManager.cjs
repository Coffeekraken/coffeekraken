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
var SProcessManager_exports = {};
__export(SProcessManager_exports, {
  default: () => SProcessManager_default
});
module.exports = __toCommonJS(SProcessManager_exports);
var import_s_event_emitter = __toESM(require("@coffeekraken/s-event-emitter"));
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"));
var import_getColorFor = __toESM(require("@coffeekraken/sugar/shared/dev/color/getColorFor"));
var import_SProcessManagerProcessWrapper = __toESM(require("./SProcessManagerProcessWrapper"));
var import_s_promise = __toESM(require("@coffeekraken/s-promise"));
var import_s_log = __toESM(require("@coffeekraken/s-log"));
class SProcessManager extends import_s_event_emitter.default {
  constructor(settings) {
    super((0, import_deepMerge.default)({
      processManager: {
        stdio: "terminal",
        stdioSettings: {},
        runInParallel: true
      }
    }, settings != null ? settings : {}));
    this._processesStack = {};
    this._processesQueue = {};
    this._isQueueRunning = false;
  }
  get processManagerSettings() {
    return this._settings.processManager;
  }
  attachProcess(id, processInstance, settings) {
    if (this._processesStack[id])
      throw new Error(`<yellow>[${this.constructor.name}.attach]</yellow> Sorry but a process with the id "<magenta>${id}</magenta>" is already attached to this process manager`);
    const instanceId = this.constructor.name === "SProcessManager" ? `SPM.${id}` : `${this.constructor.name}.${id}`;
    const processManagerProcess = new import_SProcessManagerProcessWrapper.default(processInstance, {
      metas: {
        color: (0, import_getColorFor.default)(instanceId, {
          scope: this.constructor.name
        }),
        id: instanceId
      },
      processManagerProcess: settings != null ? settings : {}
    });
    this._processesStack[id] = processManagerProcess;
  }
  detachProcess(id) {
    if (!this._processesStack[id])
      throw new Error(`<yellow>[${this.constructor.name}.attach]</yellow> Sorry but a process with the id "<magenta>${id}</magenta>" has not being attached to this process manager`);
    this._processesStack[id].detach();
  }
  runQueue() {
    if (this._queuePromise) {
      return this._queuePromise;
    }
    this._queuePromise = new Promise((resolve) => {
      clearTimeout(this._parallelRunTimeout);
      this._parallelRunTimeout = setTimeout(() => {
        import_s_promise.default.queue(this._processesQueue, (processId, promise) => {
        }).then((results) => {
          resolve(results);
          this._queuePromise = void 0;
        });
      });
    });
    return this._queuePromise;
  }
  run(processId, paramsOrStringArgs = {}, settings = {}) {
    if (!this._processesStack[processId])
      throw new Error(`<red>[${this.constructor.name}.run]</red> Sorry but no process exists with the id "<magenta>${processId}</magenta>"`);
    let promise;
    if (!this.processManagerSettings.runInParallel) {
      this._processesQueue[processId] = () => {
        return this.pipe(this._processesStack[processId].run(paramsOrStringArgs, settings));
      };
      promise = this.runQueue();
    } else {
      promise = this._processesStack[processId].run(paramsOrStringArgs, settings);
      this.emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: `<bgYellow><black> Starting process ${processId} </black></bgYellow><yellow>${"-".repeat(process.stdout.columns - 19 - processId.length)}</yellow>`
      });
      this.pipe(promise, {
        overrideEmitter: true
      });
    }
    return promise;
  }
}
var SProcessManager_default = SProcessManager;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
