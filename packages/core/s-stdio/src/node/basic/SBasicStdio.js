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
var SBasicStdio_exports = {};
__export(SBasicStdio_exports, {
  default: () => SBasicStdio_default
});
module.exports = __toCommonJS(SBasicStdio_exports);
var import_s_log = __toESM(require("@coffeekraken/s-log"), 1);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
var import_countLines = __toESM(require("@coffeekraken/sugar/node/terminal/countLines"), 1);
var import_parseHtml = __toESM(require("@coffeekraken/sugar/shared/console/parseHtml"), 1);
var import_getColorFor = __toESM(require("@coffeekraken/sugar/shared/dev/color/getColorFor"), 1);
var import_clone = __toESM(require("@coffeekraken/sugar/shared/object/clone"), 1);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_stripAnsi = __toESM(require("@coffeekraken/sugar/shared/string/stripAnsi"), 1);
var import_upperFirst = __toESM(require("@coffeekraken/sugar/shared/string/upperFirst"), 1);
var __Enquirer = __toESM(require("enquirer"), 1);
var import_SStdio = __toESM(require("../../shared/SStdio"), 1);
var import_defaultBasicStdioComponent = __toESM(require("./components/defaultBasicStdioComponent"), 1);
var import_errorBasicStdioComponent = __toESM(require("./components/errorBasicStdioComponent"), 1);
class SBasicStdio extends import_SStdio.default {
  constructor(id, sources, settings) {
    super(id, sources, (0, import_deepMerge.default)({
      basicStdio: {}
    }, settings || {}));
    this._currentLogId = "";
    this._lastLogLinesCountStack = [];
    this._loggedGroups = {};
    this._logsStack = [];
    this.display();
  }
  get basicStdioSettings() {
    return this._settings.basicStdio;
  }
  clear() {
  }
  _getGroupObj(group, log = true) {
    var _a;
    let groupObj = this._loggedGroups[group];
    if (!groupObj || ((_a = this._lastLogObj) == null ? void 0 : _a.group) !== group) {
      groupObj = {
        color: (0, import_getColorFor.default)(group)
      };
      groupObj.prefix = (0, import_parseHtml.default)(`<${groupObj.color}>\u2588</${groupObj.color}>`);
      this._loggedGroups[group] = groupObj;
    }
    return groupObj;
  }
  _log(logObj, component) {
    var _a, _b, _c, _d, _e, _f;
    if (!logObj)
      return;
    if (!logObj.group) {
      if (logObj.metas.id === "SPromise") {
        logObj.group = "Global";
      } else {
        logObj.group = logObj.metas.id;
      }
    }
    const groupObj = this._getGroupObj(logObj.group);
    if (logObj.group !== ((_a = this._lastLogObj) == null ? void 0 : _a.group)) {
      console.log(groupObj.prefix);
      console.log(`<bg${(0, import_upperFirst.default)(groupObj.color)}><black> ${logObj.group} </black></bg${(0, import_upperFirst.default)(groupObj.color)}><${groupObj.color}>${"-".repeat(process.stdout.columns - 2 - ((_b = logObj.group) == null ? void 0 : _b.length))}</${groupObj.color}>`);
      console.log(groupObj.prefix);
    }
    if (logObj.clear && ((_c = this._lastLogObj) == null ? void 0 : _c.type) !== import_s_log.default.TYPE_WARN && ((_d = this._lastLogObj) == null ? void 0 : _d.type) !== import_s_log.default.TYPE_ERROR) {
      if (typeof logObj.clear === "number") {
        const toClear = this._lastLogLinesCountStack.slice(logObj.clear * -1).reduce((a, b) => a + b);
        process.stdout.moveCursor(0, toClear * -1);
        process.stdout.clearScreenDown();
      } else {
        process.stdout.moveCursor(0, this._lastLogLinesCountStack.slice(-1)[0] * -1);
        process.stdout.clearLine(1);
      }
    }
    let logLinesCount = 0;
    if ((_e = logObj.margin) == null ? void 0 : _e.top) {
      for (let i = 0; i < logObj.margin.top; i++) {
        console.log(`<${groupObj.color}>\u2588</${groupObj.color}>`);
      }
      logLinesCount += logObj.margin.top;
    }
    const log = `<${groupObj.color}>\u2588</${groupObj.color}>   ${(0, import_parseHtml.default)(component.render(logObj, this.basicStdioSettings))}`;
    logLinesCount += (0, import_countLines.default)(log);
    console.log(log);
    if ((_f = logObj.margin) == null ? void 0 : _f.bottom) {
      for (let i = 0; i < logObj.margin.bottom; i++) {
        console.log(`<${groupObj.color}>\u2588</${groupObj.color}>`);
      }
      logLinesCount += logObj.margin.top;
    }
    this._lastLogLinesCountStack.push(logLinesCount);
    this._lastLogObj = logObj;
  }
  _addPrefix(string) {
  }
  _removePrefix(string) {
  }
  _getPromptClass(BasePromptClass) {
    return class MyPrompt extends BasePromptClass {
      constructor(options) {
        super(__spreadProps(__spreadValues({}, options), {
          format(str) {
            var _a2, _b;
            if (typeof str !== "string")
              return str;
            return str.replace(`${(0, import_parseHtml.default)(`<${(_a2 = this.options.color) != null ? _a2 : "yellow"}>\u2588</${(_b = this.options.color) != null ? _b : "yellow"}>`)}`, "");
          }
        }));
        var _a;
        if (this.options.choices) {
          this.options.choices = (_a = this.options.choices) == null ? void 0 : _a.map((choice) => {
            var _a2, _b;
            return `${(0, import_parseHtml.default)(`<${(_a2 = this.options.color) != null ? _a2 : "yellow"}>\u2588</${(_b = this.options.color) != null ? _b : "yellow"}>`)} ${choice}`;
          });
        }
        this.symbols = this.symb((0, import_clone.default)(this.symbols, {
          deep: true
        }));
      }
      symb(obj) {
        var _a, _b;
        for (let [key, value] of Object.entries(obj)) {
          if ([
            "ellipsis",
            "ellipsisLarge",
            "ellipsisSmall",
            "question",
            "questionFull",
            "questionSmall",
            "pointerSmall"
          ].includes(key))
            continue;
          if (value === "\u203A")
            continue;
          if (value === "%")
            continue;
          if (typeof value !== "string") {
            obj[key] = this.symb(value);
            continue;
          }
          if (obj[key].includes("\u2588")) {
            obj[key] = (0, import_stripAnsi.default)(obj[key]);
            obj[key] = obj[key].replace(/█\s?/, "");
          }
          obj[key] = `${(0, import_parseHtml.default)(`<${(_a = this.options.color) != null ? _a : "yellow"}>\u2588</${(_b = this.options.color) != null ? _b : "yellow"}>`)} ${value}`;
        }
        return obj;
      }
    };
  }
  _ask(askObj) {
    return new import_s_promise.default(async ({ resolve, reject, emit }) => {
      let prompt, res;
      if (!askObj.group) {
        if (askObj.metas.id === "SPromise") {
          askObj.group = "Global";
        } else {
          askObj.group = askObj.metas.id;
        }
      }
      const groupObj = this._getGroupObj(askObj.group);
      switch (askObj.type) {
        case "select":
          prompt = new (this._getPromptClass(__Enquirer.default.Select))(__spreadProps(__spreadValues({}, askObj), {
            color: groupObj.color
          }));
          res = await prompt.run();
          break;
        case "autocomplete":
          prompt = new (this._getPromptClass(__Enquirer.default.AutoComplete))(__spreadProps(__spreadValues({}, askObj), {
            color: groupObj.color,
            choices: askObj.choices
          }));
          res = await prompt.run();
          break;
        case "confirm":
          prompt = new (this._getPromptClass(__Enquirer.default.Confirm))(__spreadProps(__spreadValues({}, askObj), {
            color: groupObj.color
          }));
          res = await prompt.run();
          break;
        case "form":
          prompt = new (this._getPromptClass(__Enquirer.default.Form))(__spreadProps(__spreadValues({}, askObj), {
            color: groupObj.color
          }));
          res = await prompt.run();
          break;
        case "input":
          prompt = new (this._getPromptClass(__Enquirer.default.Input))(__spreadProps(__spreadValues({}, askObj), {
            color: groupObj.color,
            validate(value) {
              if (!askObj.pattern)
                return true;
              const pattern = Array.isArray(askObj.pattern) ? askObj.pattern : [askObj.pattern];
              const reg = new RegExp(pattern[0], pattern[1]);
              return reg.test(value);
            }
          }));
          res = await prompt.run();
          break;
        case "secret":
          prompt = new (this._getPromptClass(__Enquirer.default.Secret))(__spreadProps(__spreadValues({}, askObj), {
            color: groupObj.color
          }));
          res = await prompt.run();
          break;
        case "list":
          prompt = new (this._getPromptClass(__Enquirer.default.List))(__spreadProps(__spreadValues({}, askObj), {
            color: groupObj.color
          }));
          res = await prompt.run();
          break;
        case "multiselect":
          prompt = new (this._getPromptClass(__Enquirer.default.MultiSelect))(__spreadProps(__spreadValues({}, askObj), {
            color: groupObj.color
          }));
          res = await prompt.run();
          break;
        case "number":
          prompt = new (this._getPromptClass(__Enquirer.default.NumberPrompt))(__spreadProps(__spreadValues({}, askObj), {
            color: groupObj.color
          }));
          res = await prompt.run();
          break;
        case "password":
          prompt = new (this._getPromptClass(__Enquirer.default.Password))(__spreadProps(__spreadValues({}, askObj), {
            color: groupObj.color
          }));
          res = await prompt.run();
          break;
        case "toggle":
          prompt = new (this._getPromptClass(__Enquirer.default.Toggle))(__spreadProps(__spreadValues({}, askObj), {
            color: groupObj.color
          }));
          res = await prompt.run();
          break;
        default:
          throw new Error(`Unknown ask type ${askObj.type}`);
          break;
      }
      if (typeof res === "string") {
        res = res.replace(groupObj.prefix, "").trim();
      }
      resolve(res);
    });
  }
}
SBasicStdio.registerComponent(import_defaultBasicStdioComponent.default);
SBasicStdio.registerComponent(import_errorBasicStdioComponent.default);
var SBasicStdio_default = SBasicStdio;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
