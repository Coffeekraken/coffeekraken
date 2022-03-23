import {
  __spreadProps,
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
import __SLog from "@coffeekraken/s-log";
import __SPromise from "@coffeekraken/s-promise";
import __countLines from "@coffeekraken/sugar/node/terminal/countLines";
import __parseHtml from "@coffeekraken/sugar/shared/console/parseHtml";
import __getColorFor from "@coffeekraken/sugar/shared/dev/color/getColorFor";
import __clone from "@coffeekraken/sugar/shared/object/clone";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __stripAnsi from "@coffeekraken/sugar/shared/string/stripAnsi";
import __upperFirst from "@coffeekraken/sugar/shared/string/upperFirst";
import * as __Enquirer from "enquirer";
import __SStdio from "../../shared/SStdio";
import __defaultBasicStdioComponent from "./components/defaultBasicStdioComponent";
import __errorBasicStdioComponent from "./components/errorBasicStdioComponent";
class SBasicStdio extends __SStdio {
  constructor(id, sources, settings) {
    super(id, sources, __deepMerge({
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
        color: __getColorFor(group)
      };
      groupObj.prefix = __parseHtml(`<${groupObj.color}>\u2588</${groupObj.color}>`);
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
      console.log(`<bg${__upperFirst(groupObj.color)}><black> ${logObj.group} </black></bg${__upperFirst(groupObj.color)}><${groupObj.color}>${"-".repeat(process.stdout.columns - 2 - ((_b = logObj.group) == null ? void 0 : _b.length))}</${groupObj.color}>`);
      console.log(groupObj.prefix);
    }
    if (logObj.clear && ((_c = this._lastLogObj) == null ? void 0 : _c.type) !== __SLog.TYPE_WARN && ((_d = this._lastLogObj) == null ? void 0 : _d.type) !== __SLog.TYPE_ERROR) {
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
    const log = `<${groupObj.color}>\u2588</${groupObj.color}>   ${__parseHtml(component.render(logObj, this.basicStdioSettings))}`;
    logLinesCount += __countLines(log);
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
            return str.replace(`${__parseHtml(`<${(_a2 = this.options.color) != null ? _a2 : "yellow"}>\u2588</${(_b = this.options.color) != null ? _b : "yellow"}>`)}`, "");
          }
        }));
        var _a;
        if (this.options.choices) {
          this.options.choices = (_a = this.options.choices) == null ? void 0 : _a.map((choice) => {
            var _a2, _b;
            return `${__parseHtml(`<${(_a2 = this.options.color) != null ? _a2 : "yellow"}>\u2588</${(_b = this.options.color) != null ? _b : "yellow"}>`)} ${choice}`;
          });
        }
        this.symbols = this.symb(__clone(this.symbols, {
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
            obj[key] = __stripAnsi(obj[key]);
            obj[key] = obj[key].replace(/█\s?/, "");
          }
          obj[key] = `${__parseHtml(`<${(_a = this.options.color) != null ? _a : "yellow"}>\u2588</${(_b = this.options.color) != null ? _b : "yellow"}>`)} ${value}`;
        }
        return obj;
      }
    };
  }
  _ask(askObj) {
    return new __SPromise(async ({ resolve, reject, emit }) => {
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
SBasicStdio.registerComponent(__defaultBasicStdioComponent);
SBasicStdio.registerComponent(__errorBasicStdioComponent);
var SBasicStdio_default = SBasicStdio;
export {
  SBasicStdio_default as default
};
