import "../../../../chunk-JETN4ZEY.mjs";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __SPromise from "@coffeekraken/s-promise";
import __utcTime from "@coffeekraken/sugar/shared/date/utcTime";
import __env from "@coffeekraken/sugar/shared/env/env";
import __minimatch from "minimatch";
const _SBench = class extends __SPromise {
  constructor(id, settings) {
    super(__deepMerge({
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
    let currentBenchs = (_a = __env("s-bench-filtered-ids")) != null ? _a : [];
    currentBenchs = [...currentBenchs, ...Array.from(benchId)];
    __env("s-bench-filtered-ids", currentBenchs);
  }
  static filtered() {
    var _a;
    return (_a = __env("s-bench-filtered-ids")) != null ? _a : [];
  }
  static isBenchActive(benchId) {
    if (this.filtered().indexOf("*") !== -1)
      return true;
    for (let i = 0; i < this.filtered().length; i++) {
      const filteredId = this.filtered()[i];
      if (__minimatch(benchId, filteredId))
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
    const finalSettings = __deepMerge(this.benchSettings, settings != null ? settings : {});
    this._steps.push({
      id: "start",
      type: "start",
      description: "",
      time: Date.now(),
      logs: [
        `<yellow>[bench.${this.metas.id}]</yellow> Starting bench session at <magenta>${__utcTime()}</magenta>`
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
    const finalSettings = __deepMerge(this.benchSettings, settings != null ? settings : {});
    const startTime = this._steps[0].time;
    this._steps.push({
      id: "end",
      type: "end",
      description: "",
      time: Date.now(),
      logs: [
        `<yellow>[bench.${this.metas.id}]</yellow> Ending bench session at <magenta>${__utcTime()}</magenta>`,
        `<green>[bench.${this.metas.id}]</green> Complete bench session has taken <cyan>${(Date.now() - startTime) / 1e3}s</cyan>`
      ]
    });
    this.resolve(this);
    return this;
  }
  log(settings) {
    if (!this.isActive())
      return this;
    const finalSettings = __deepMerge(this.benchSettings, settings != null ? settings : {});
    console.log(this.toString(finalSettings));
    return this;
  }
  toString(settings) {
    const finalSettings = __deepMerge(this.benchSettings, settings != null ? settings : {});
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
export {
  SBench as default
};
