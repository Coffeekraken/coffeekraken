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
var SLog_exports = {};
__export(SLog_exports, {
  default: () => SLog
});
module.exports = __toCommonJS(SLog_exports);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
const _SLog = class {
  static filter(types) {
    this._filteredTypes = types;
  }
  static clearFilters() {
    this._filteredTypes = [];
  }
  static setDefaultLogObj(logObj) {
    this._defaultLogObj = logObj;
  }
  static isTypeEnabled(types) {
    if (!Array.isArray(types))
      types = [types];
    for (const type of types) {
      if (!this._filteredTypes.includes(type))
        return false;
    }
    return true;
  }
  constructor(logObj) {
    var _a;
    if (!(logObj == null ? void 0 : logObj.value) && !logObj._logObj) {
      throw new Error(`<red>[${this.constructor.name}]</red> Sorry but you cannot instanciate a new SLog without a "<yellow>value</yellow>" property...`);
    }
    this._logObj = (0, import_deepMerge.default)({
      type: _SLog.TYPE_LOG,
      timestamp: Date.now(),
      decorators: true,
      time: false
    }, this.constructor._defaultLogObj, (_a = logObj._logObj) != null ? _a : logObj);
  }
  get value() {
    return this._logObj.value;
  }
  set value(value) {
    this._logObj.value = value;
  }
  get type() {
    return this._logObj.type;
  }
  get active() {
    if (!this._logObj.type)
      return true;
    if (!this.constructor._filteredTypes.includes(this._logObj.type))
      return false;
    return true;
  }
  get decorators() {
    return this._logObj.decorators;
  }
  set decorators(value) {
    this._logObj.decorators = value;
  }
  get time() {
    return this._logObj.time;
  }
  get timestamp() {
    return this._logObj.timestamp;
  }
  get clear() {
    return this._logObj.clear;
  }
  get margin() {
    var _a;
    return (_a = this._logObj.margin) != null ? _a : {
      top: 0,
      bottom: 0
    };
  }
  get temp() {
    return this._logObj.temp;
  }
  get as() {
    return this._logObj.as;
  }
};
let SLog = _SLog;
SLog.TYPE_LOG = "log";
SLog.TYPE_INFO = "info";
SLog.TYPE_WARN = "warn";
SLog.TYPE_ERROR = "error";
SLog.TYPE_VERBOSE = "verbose";
SLog.TYPE_VERBOSER = "verboser";
SLog.TYPE_DECORATOR = "decorator";
SLog.TYPE_SUMMARY = "summary";
SLog.TYPE_CHILD_PROCESS = "child_process";
SLog.TYPES = [
  _SLog.TYPE_LOG,
  _SLog.TYPE_INFO,
  _SLog.TYPE_WARN,
  _SLog.TYPE_ERROR,
  _SLog.TYPE_VERBOSE,
  _SLog.TYPE_VERBOSER,
  _SLog.TYPE_SUMMARY,
  _SLog.TYPE_DECORATOR,
  _SLog.TYPE_CHILD_PROCESS
];
SLog.PRESET_SILENT = [];
SLog.PRESET_DEFAULT = [
  _SLog.TYPE_LOG,
  _SLog.TYPE_INFO,
  _SLog.TYPE_WARN,
  _SLog.TYPE_ERROR,
  _SLog.TYPE_SUMMARY,
  _SLog.TYPE_DECORATOR,
  _SLog.TYPE_CHILD_PROCESS
];
SLog.PRESET_WARN = [
  _SLog.TYPE_WARN,
  _SLog.TYPE_ERROR,
  _SLog.TYPE_CHILD_PROCESS
];
SLog.PRESET_ERROR = [
  _SLog.TYPE_ERROR,
  _SLog.TYPE_CHILD_PROCESS
];
SLog.PRESET_VERBOSE = [
  _SLog.TYPE_LOG,
  _SLog.TYPE_INFO,
  _SLog.TYPE_WARN,
  _SLog.TYPE_ERROR,
  _SLog.TYPE_VERBOSE,
  _SLog.TYPE_DECORATOR,
  _SLog.TYPE_SUMMARY,
  _SLog.TYPE_CHILD_PROCESS
];
SLog.PRESET_VERBOSER = [
  _SLog.TYPE_LOG,
  _SLog.TYPE_INFO,
  _SLog.TYPE_WARN,
  _SLog.TYPE_ERROR,
  _SLog.TYPE_VERBOSE,
  _SLog.TYPE_VERBOSER,
  _SLog.TYPE_DECORATOR,
  _SLog.TYPE_SUMMARY,
  _SLog.TYPE_CHILD_PROCESS
];
SLog.PRESETS = [
  "silent",
  "default",
  "warn",
  "error",
  "verbose",
  "verboser"
];
SLog._filteredTypes = [];
SLog._defaultLogObj = {};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
