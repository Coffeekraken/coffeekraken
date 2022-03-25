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
var SProcessPipe_exports = {};
__export(SProcessPipe_exports, {
  default: () => SProcessPipe_default
});
module.exports = __toCommonJS(SProcessPipe_exports);
var import_class = __toESM(require("@coffeekraken/sugar/shared/is/class"));
var import_s_promise = __toESM(require("@coffeekraken/s-promise"));
var import_s_event_emitter = __toESM(require("@coffeekraken/s-event-emitter"));
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"));
var import_typeof = __toESM(require("@coffeekraken/sugar/shared/value/typeof"));
class SProcessPipe extends import_s_event_emitter.default {
  get processPipeSettings() {
    return this._settings.processPipe;
  }
  constructor(processes, settings = {}) {
    super((0, import_deepMerge.default)({
      processPipe: {
        stdio: "inherit"
      }
    }, settings));
    this._processes = processes;
  }
  run(params = {}, settings = {}) {
    const processPipeSettings = (0, import_deepMerge.default)(this.processPipeSettings, settings);
    const promise = new import_s_promise.default(async ({ resolve, reject, emit, pipe, pipeTo }) => {
      if (!Array.isArray(this._processes)) {
        throw `Sorry but you've passed an "<yellow>${(0, import_typeof.default)(this._processes)}</yellow>" as "<cyan>SProcessManager.pipe</cyan>" argument but it needs to be an <green>Array</green>`;
      }
      for (let i = 0; i < this._processes.length; i++) {
        const pro = this._processes[i];
        let processInstance, processParams = {}, processSettings = processPipeSettings.processesSettings;
        if ((0, import_class.default)(pro)) {
          processInstance = new pro(__spreadProps(__spreadValues({}, processPipeSettings.processesSettings || {}), {
            stdio: false
          }));
        } else if (typeof pro === "function") {
          params = pro(params);
        } else if (typeof pro === "object") {
          processSettings = pro.settings || {};
          processParams = pro.params || {};
          if (!pro.process) {
            emit("warn", {
              value: `You have passed an "<yellow>Object</yellow>" as process parameter in the "<cyan>SProcessManager.pipe</cyan>" static method but you don't have specified the "<magenta>process</magenta>" property with either an SProcess instance, or directly the SProcess class you want`
            });
            continue;
          }
          if ((0, import_class.default)(pro.process)) {
            processInstance = new pro.process(__spreadProps(__spreadValues({}, processSettings), {
              stdio: false
            }));
          }
        }
        if (processInstance) {
          emit("log", {
            group: `s-process-pipe-${this.metas.id}`,
            type: "heading",
            value: processInstance.metas.formattedName
          });
          const resPromise = processInstance.run(params, processSettings);
          pipe(resPromise);
          const res = await resPromise;
        }
      }
    });
    return promise;
  }
}
var SProcessPipe_default = SProcessPipe;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
