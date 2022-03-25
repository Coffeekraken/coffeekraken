var __defProp = Object.defineProperty;
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
import __SClass from "@coffeekraken/s-class";
import __SDuration from "@coffeekraken/s-duration";
import __SPromise from "@coffeekraken/s-promise";
import __when from "@coffeekraken/sugar/js/dom/detect/when";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __uniqid from "@coffeekraken/sugar/shared/string/uniqid";
import __formatDuration from "@coffeekraken/sugar/shared/time/formatDuration";
import __SConductorSettingsInterface from "./interface/SConductorSettingsInterface";
const _SConductor = class extends __SClass {
  constructor(settings) {
    super(__deepMerge({
      conductor: __SConductorSettingsInterface.defaults()
    }, settings != null ? settings : {}));
    this._tasksStack = {};
    this._runningTasksStack = {};
    this._logTimeout = null;
    this._idleInterval = null;
    this._startTime = Date.now();
    this._idleInterval = setInterval(() => {
      this._checkIdle();
    }, this.conductorSettings.idleInterval);
  }
  static get defaultInstance() {
    if (this._defaultInstance)
      return this._defaultInstance;
    this._defaultInstance = new _SConductor({
      conductor: this._defaultInstanceSettings
    });
    return this._defaultInstance;
  }
  static when($elm, trigger, task) {
    return this.defaultInstance.when($elm, trigger, task);
  }
  static setup(settings) {
    if (this._defaultInstance) {
      throw new Error(`Sorry but you need to call the "SConductor.setup" method before all other static methods like "when"`);
    }
    this._defaultInstanceSettings = settings;
  }
  get conductorSettings() {
    return this._settings.conductor;
  }
  _checkIdle() {
    if (Object.keys(this._runningTasksStack).length) {
      return;
    }
    let taskToExecute;
    for (let [taskId, taskObj] of Object.entries(this._tasksStack)) {
      if (taskObj.triggers.includes("idle")) {
        taskToExecute = taskObj;
        break;
      }
    }
    if (taskToExecute) {
      this._executeTask(taskToExecute);
    } else if (!this._logTimeout && this.conductorSettings.log) {
      this._logTimeout = setTimeout(() => {
        console.log(`[SConductor] The conductor "${this.metas.id}" has been executed tasks during ${__formatDuration(Date.now() - this._startTime - this.conductorSettings.logTimeout)}`);
      }, this.conductorSettings.logTimeout);
    }
  }
  async _executeTask(taskObj) {
    this._runningTasksStack[taskObj.id] = taskObj;
    clearTimeout(this._logTimeout);
    taskObj.watchers.forEach((watcher) => {
      var _a;
      (_a = watcher.cancel) == null ? void 0 : _a.call(watcher);
    });
    const duration = new __SDuration();
    await taskObj.task();
    taskObj = __spreadValues(__spreadValues({
      resolved: true
    }, taskObj), duration.end());
    delete this._tasksStack[taskObj.id];
    delete this._runningTasksStack[taskObj.id];
    taskObj.resolve(taskObj);
    clearInterval(this._idleInterval);
    setTimeout(() => {
      this._checkIdle();
      this._idleInterval = setInterval(() => {
        this._checkIdle();
      }, this.conductorSettings.idleTimeout);
    }, 100);
    return taskObj;
  }
  _elementNeeded($elm = null, time) {
    if (!$elm) {
      throw new Error(`To use the "${time}" SConductor.when detector, you MUST pass an HTMLElement...`);
    }
  }
  when($elm, trigger, task) {
    return new __SPromise(async ({ resolve, reject }) => {
      if (!Array.isArray(trigger))
        trigger = trigger.split(",").map((t) => t.trim());
      const taskObj = {
        id: __uniqid(),
        registerTime: Date.now(),
        triggers: trigger,
        $elm,
        task,
        watchers: [],
        resolve
      };
      this._tasksStack[taskObj.id] = taskObj;
      await __when($elm, trigger, {});
      this._executeTask(taskObj);
    });
  }
};
let SConductor = _SConductor;
SConductor._defaultInstanceSettings = {};
export {
  SConductor as default
};
