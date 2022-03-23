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
var SDescriptorResult_exports = {};
__export(SDescriptorResult_exports, {
  default: () => SDescriptorResult_default
});
module.exports = __toCommonJS(SDescriptorResult_exports);
var import_s_class = __toESM(require("@coffeekraken/s-class"), 1);
var import_toString = __toESM(require("@coffeekraken/sugar/shared/string/toString"), 1);
var import_parseHtml = __toESM(require("@coffeekraken/sugar/shared/console/parseHtml"), 1);
var import_clone = __toESM(require("@coffeekraken/sugar/shared/object/clone"), 1);
var import_node = __toESM(require("@coffeekraken/sugar/shared/is/node"), 1);
class SDescriptorResult extends import_s_class.default {
  constructor(descriptor, value, descriptorSettings) {
    super({});
    this._issues = {};
    this._descriptor = descriptor;
    this._descriptorSettings = descriptorSettings;
    try {
      this._originalValue = (0, import_clone.default)(value, { deep: true });
    } catch (e) {
      this._originalValue = value;
    }
    this.value = value;
  }
  hasIssues() {
    return Object.keys(this._issues).length >= 1;
  }
  add(ruleResult) {
    if (!ruleResult.__ruleObj.id)
      return;
    this._issues[ruleResult.__ruleObj.id] = ruleResult;
  }
  toString() {
    if ((0, import_node.default)()) {
      return this.toConsole();
    } else {
      return this.toConsole();
    }
  }
  toConsole() {
    const headerArray = [
      `<underline><magenta>${this._descriptor.metas.name}</magenta></underline>`,
      "",
      `${(0, import_toString.default)(this.value, {
        beautify: true
      })}`,
      ""
    ];
    const issuesArray = [];
    Object.keys(this._issues).forEach((ruleId) => {
      const ruleResult = this._issues[ruleId];
      let message = "";
      if (ruleResult.__error && ruleResult.__error instanceof Error) {
        message = ruleResult.__error.message;
      } else if (ruleResult.__ruleObj.message !== void 0 && typeof ruleResult.__ruleObj.message === "function") {
        message = ruleResult.__ruleObj.message(ruleResult);
      } else if (ruleResult.__ruleObj.message !== void 0 && typeof ruleResult.__ruleObj.message === "string") {
        message = ruleResult.__ruleObj.message;
      }
      issuesArray.push(`-${typeof ruleResult.__propName === "string" ? ` [<magenta>${ruleResult.__propName}</magenta>]` : ""} <red>${ruleId}</red>: ${message}`);
    });
    const settingsArray = [
      "",
      `<underline>Settings</underline>`,
      "",
      `${(0, import_toString.default)(this._descriptorSettings, {
        beautify: true
      })}`
    ];
    return (0, import_parseHtml.default)(`
${headerArray.join("\n")}
${issuesArray.join("\n")}
${settingsArray.join("\n")}
    `).trim();
  }
}
const Cls = SDescriptorResult;
var SDescriptorResult_default = SDescriptorResult;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
