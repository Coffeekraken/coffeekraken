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
var SStdio_exports = {};
__export(SStdio_exports, {
  default: () => SStdio
});
module.exports = __toCommonJS(SStdio_exports);
var import_s_class = __toESM(require("@coffeekraken/s-class"), 1);
var import_s_log = __toESM(require("@coffeekraken/s-log"), 1);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_objectHash = __toESM(require("@coffeekraken/sugar/shared/object/objectHash"), 1);
var import_SStdioSettingsInterface = __toESM(require("./interface/SStdioSettingsInterface"), 1);
const _SStdio = class extends import_s_class.default {
  constructor(id, sources, settings = {}) {
    super((0, import_deepMerge.default)({
      stdio: import_SStdioSettingsInterface.default.defaults()
    }, settings));
    this._logsBuffer = [];
    this._isDisplayed = false;
    this._id = "";
    this._isClearing = false;
    this._hashBuffer = [];
    this._id = id;
    this.sources = Array.isArray(sources) ? sources : [sources];
    if (this.constructor._instanciatedStdio[this.id]) {
      throw new Error(`<red>${this.constructor.name}</red> Sorry but a instance of the SStdio class already exists with the id "<yellow>${this.id}</yellow>"`);
    }
    this.constructor._instanciatedStdio[this.id] = this;
    this.sources.forEach((s) => {
      this.registerSource(s);
    });
  }
  static registerComponent(component, settings, as) {
    if (component.id === void 0 && as === null) {
      throw `Sorry but you try to register a component that does not have a built-in static "id" property and you don't have passed the "as" argument to override it...`;
    }
    if (!this.registeredComponents[this.name])
      this.registeredComponents[this.name] = {};
    this.registeredComponents[this.name][as || component.id || "default"] = {
      component,
      settings: settings || {},
      as
    };
  }
  static existingOrNew(id, sources, stdio = _SStdio.UI_BASIC, settings = {}) {
    if (this._instanciatedStdio[id])
      return this._instanciatedStdio[id];
    return this.new(id, sources, stdio, settings);
  }
  static new(id, sources, stdio, settings = {}) {
    return new Promise(async (resolve) => {
      const __new = (await Promise.resolve().then(() => __toESM(require("./new"), 1))).default;
      return __new(id, sources, stdio, settings);
    });
  }
  get stdioSettings() {
    return this._settings.stdio;
  }
  get id() {
    return this._id;
  }
  _logBuffer() {
    this._logsBuffer = this._logsBuffer.filter((log) => {
      this.log(log);
      return false;
    });
  }
  display() {
    this._isDisplayed = true;
    this._logBuffer();
  }
  hide() {
    this._isDisplayed = false;
  }
  registerSource(source, settings) {
    const set = (0, import_deepMerge.default)(this._settings.stdio || {}, settings != null ? settings : {});
    source.on("ask", async (askObj, metas, answer) => {
      askObj.metas = metas;
      const res = await this.ask(askObj);
      answer == null ? void 0 : answer(res);
    });
    source.on("log", (data, metas) => {
      if (data === void 0 || data === null)
        return;
      data.metas = metas;
      this.log(data);
    }, {
      filter: set.filter,
      processor: set.processor
    });
  }
  log(...logObj) {
    var _a;
    for (let i = 0; i < logObj.length; i++) {
      let log = logObj[i];
      if (!log.active)
        continue;
      if (!log.hash) {
        const hash = (0, import_objectHash.default)({ value: log.value, type: log.type });
        log.hash = hash;
      }
      if (this._hashBuffer.includes(log.hash))
        return;
      this._hashBuffer.push(log.hash);
      setTimeout(() => {
        this._hashBuffer.shift();
      }, 1e3);
      if (!this.isDisplayed() || this._isClearing) {
        this._logsBuffer.push(log);
        continue;
      }
      if (this._lastLogObj && this._lastLogObj.temp) {
        if (!this.clearLast || typeof this.clearLast !== "function")
          throw new Error(`You try to clear the last log but it does not implements the "<cyan>clearLast</cyan>" method`);
        (async () => {
          if (!this.clearLast)
            return;
          await this.clearLast();
          this._logBuffer();
        })();
      }
      if (log.clear === true) {
        this._isClearing = true;
        if (!this.clear || typeof this.clear !== "function")
          throw new Error(`You try to clear the "<yellow>${this.constructor.name}</yellow>" stdio but it does not implements the "<cyan>clear</cyan>" method`);
        (async () => {
          if (!this.clear)
            return;
          await this.clear();
          this._isClearing = false;
          this._logBuffer();
        })();
      } else {
      }
      let logType = log.type === "log" ? "default" : (_a = log.type) != null ? _a : "default";
      let componentObj = this.constructor.registeredComponents[this.constructor.name][logType];
      if (!componentObj) {
        if (import_s_log.default.isTypeEnabled([
          import_s_log.default.TYPE_VERBOSE,
          import_s_log.default.TYPE_VERBOSER
        ])) {
          this._log({
            type: import_s_log.default.TYPE_VERBOSE,
            metas: {},
            group: this.constructor.name,
            value: `The requested "<yellow>${log.type || "default"}</yellow>" component in the "<cyan>${this.constructor.name}</cyan>" stdio class does not exists...`
          }, {
            id: "default",
            render(logObj2) {
              return `\u26A0\uFE0F  ${logObj2.value}`;
            }
          });
        }
        componentObj = this.constructor.registeredComponents[this.constructor.name].default;
      }
      if (typeof componentObj.component.render !== "function") {
        throw new Error(`Your "<yellow>${componentObj.component.id}</yellow>" stdio "<cyan>${this.constructor.name}</cyan>" component does not expose the required function "<magenta>render</magenta>"`);
      }
      this._log(log, componentObj.component);
      this._lastLogObj = log;
    }
  }
  async ask(askObj) {
    let ask = (0, import_deepMerge.default)(this.stdioSettings.defaultAskObj, askObj);
    const answer = await this._ask(ask);
    return answer;
  }
  isDisplayed() {
    return this._isDisplayed;
  }
};
let SStdio = _SStdio;
SStdio._instanciatedStdio = {};
SStdio.registeredComponents = {};
SStdio.UI_BASIC = -1;
SStdio.UI_WEBSOCKET = "websocket";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
