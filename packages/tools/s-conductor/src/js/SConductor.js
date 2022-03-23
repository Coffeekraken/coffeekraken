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
var SConductor_exports = {};
__export(SConductor_exports, {
  default: () => SConductor
});
module.exports = __toCommonJS(SConductor_exports);
var import_s_class = __toESM(require("@coffeekraken/s-class"), 1);
var import_s_duration = __toESM(require("@coffeekraken/s-duration"), 1);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
var import_when = __toESM(require("@coffeekraken/sugar/js/dom/detect/when"), 1);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_uniqid = __toESM(require("@coffeekraken/sugar/shared/string/uniqid"), 1);
var import_formatDuration = __toESM(require("@coffeekraken/sugar/shared/time/formatDuration"), 1);
var import_SConductorSettingsInterface = __toESM(require("./interface/SConductorSettingsInterface"), 1);
const _SConductor = class extends import_s_class.default {
  constructor(settings) {
    super((0, import_deepMerge.default)({
      conductor: import_SConductorSettingsInterface.default.defaults()
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
        console.log(`[SConductor] The conductor "${this.metas.id}" has been executed tasks during ${(0, import_formatDuration.default)(Date.now() - this._startTime - this.conductorSettings.logTimeout)}`);
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
    const duration = new import_s_duration.default();
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
    return new import_s_promise.default(async ({ resolve, reject }) => {
      if (!Array.isArray(trigger))
        trigger = trigger.split(",").map((t) => t.trim());
      const taskObj = {
        id: (0, import_uniqid.default)(),
        registerTime: Date.now(),
        triggers: trigger,
        $elm,
        task,
        watchers: [],
        resolve
      };
      this._tasksStack[taskObj.id] = taskObj;
      await (0, import_when.default)($elm, trigger, {});
      this._executeTask(taskObj);
    });
  }
};
let SConductor = _SConductor;
SConductor._defaultInstanceSettings = {};
