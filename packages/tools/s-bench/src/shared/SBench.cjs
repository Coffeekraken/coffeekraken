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
var SBench_exports = {};
__export(SBench_exports, {
  default: () => SBench
});
module.exports = __toCommonJS(SBench_exports);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
var import_utcTime = __toESM(require("@coffeekraken/sugar/shared/date/utcTime"), 1);
var import_env = __toESM(require("@coffeekraken/sugar/shared/env/env"), 1);
var import_minimatch = __toESM(require("minimatch"), 1);
const _SBench = class extends import_s_promise.default {
  constructor(id, settings) {
    super((0, import_deepMerge.default)({
      metas: {
        id
      },
      bench: {},
      promise: {}
    }, settings != null ? settings : {}));
    this._steps = [];
  }
  static filter(benchId) {
    var _a;
    let currentBenchs = (_a = (0, import_env.default)("s-bench-filtered-ids")) != null ? _a : [];
    currentBenchs = [...currentBenchs, ...Array.from(benchId)];
    (0, import_env.default)("s-bench-filtered-ids", currentBenchs);
  }
  static filtered() {
    var _a;
    return (_a = (0, import_env.default)("s-bench-filtered-ids")) != null ? _a : [];
  }
  static isBenchActive(benchId) {
    if (this.filtered().indexOf("*") !== -1)
      return true;
    for (let i = 0; i < this.filtered().length; i++) {
      const filteredId = this.filtered()[i];
      if ((0, import_minimatch.default)(benchId, filteredId))
        return true;
    }
  }
  static getBenchInstanceById(id) {
    const instance = this._benchInstancesById[id];
    if (!instance)
      throw new Error(`<red>[bench]</red> Sorry but the requested SBench instance with the id "<yellow>${id}</yellow>" does not exists... Make sure to initiate it correctly using "<cyan>SBench.start('${id}');</cyan>"`);
    return instance;
  }
  static start(id) {
    this._benchInstancesById[id] = new _SBench(id);
    const instance = this._benchInstancesById[id];
    return instance.start();
  }
  static step(id, stepId, description = "") {
    const instance = this.getBenchInstanceById(id);
    return instance.step(stepId, description);
  }
  static end(id, settings) {
    const instance = this.getBenchInstanceById(id);
    return instance.end(settings);
  }
  static log(id, settings) {
    const instance = this.getBenchInstanceById(id);
    return instance.log();
  }
  get benchSettings() {
    return this._settings.bench;
  }
  isActive() {
    return this.constructor.isBenchActive(this.metas.id);
  }
  start(settings) {
    if (!this.isActive())
      return this;
    const finalSettings = (0, import_deepMerge.default)(this.benchSettings, settings != null ? settings : {});
    this._steps.push({
      id: "start",
      type: "start",
      description: "",
      time: Date.now(),
      logs: [
        `<yellow>[bench.${this.metas.id}]</yellow> Starting bench session at <magenta>${(0, import_utcTime.default)()}</magenta>`
      ]
    });
    return this;
  }
  step(id, description = "") {
    if (!this.isActive())
      return this;
    const keys = Object.keys(this._steps);
    const lastTime = !keys.length ? this._startTime : this._steps[keys.pop()].time;
    const duration = Date.now() - lastTime;
    this._steps.push({
      id,
      type: "step",
      description,
      time: Date.now(),
      logs: [
        `<yellow>[bench.${this.metas.id}]</yellow> ${description ? `${description} | <cyan>${duration / 1e3}s</cyan>` : `Step "<yellow>${id}</yellow>" completed in <cyan>${duration / 1e3}s</cyan>`}`
      ]
    });
    return this;
  }
  end(settings) {
    if (!this.isActive())
      return this;
    const finalSettings = (0, import_deepMerge.default)(this.benchSettings, settings != null ? settings : {});
    const startTime = this._steps[0].time;
    this._steps.push({
      id: "end",
      type: "end",
      description: "",
      time: Date.now(),
      logs: [
        `<yellow>[bench.${this.metas.id}]</yellow> Ending bench session at <magenta>${(0, import_utcTime.default)()}</magenta>`,
        `<green>[bench.${this.metas.id}]</green> Complete bench session has taken <cyan>${(Date.now() - startTime) / 1e3}s</cyan>`
      ]
    });
    this.resolve(this);
    return this;
  }
  log(settings) {
    if (!this.isActive())
      return this;
    const finalSettings = (0, import_deepMerge.default)(this.benchSettings, settings != null ? settings : {});
    console.log(this.toString(finalSettings));
    return this;
  }
  toString(settings) {
    const finalSettings = (0, import_deepMerge.default)(this.benchSettings, settings != null ? settings : {});
    let logsAr = [
      "<magenta>-------------------- SBench --------------------</magenta>"
    ];
    if (finalSettings == null ? void 0 : finalSettings.title) {
      logsAr.push(`<yellow>[bench.${this.metas.id}]</yellow> ${finalSettings.title}`);
    }
    if (finalSettings == null ? void 0 : finalSettings.body) {
      logsAr.push(`<yellow>[bench.${this.metas.id}]</yellow> ${finalSettings.body}`);
    }
    Object.keys(this._steps).forEach((stepId) => {
      const stepObj = this._steps[stepId];
      logsAr = [...logsAr, ...stepObj.logs];
    });
    logsAr.push("<magenta>------------------------------------------------</magenta>");
    return logsAr.join("\n");
  }
};
let SBench = _SBench;
SBench._benchInstancesById = {};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
