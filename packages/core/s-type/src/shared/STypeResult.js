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
var STypeResult_exports = {};
__export(STypeResult_exports, {
  default: () => STypeResult_default
});
module.exports = __toCommonJS(STypeResult_exports);
var import_node = __toESM(require("@coffeekraken/sugar/shared/is/node"), 1);
var import_toString = __toESM(require("@coffeekraken/sugar/shared/string/toString"), 1);
var import_parseHtml = __toESM(require("@coffeekraken/sugar/shared/console/parseHtml"), 1);
class STypeResult {
  get typeString() {
    return this._data.typeString;
  }
  get value() {
    return this._data.value;
  }
  get received() {
    return this._data.received;
  }
  get expected() {
    return this._data.expected;
  }
  get issues() {
    return this._data.issues;
  }
  get settings() {
    return this._data.settings;
  }
  constructor(data) {
    this._data = data;
  }
  hasIssues() {
    if (this._data)
      return true;
    return false;
  }
  toString() {
    if ((0, import_node.default)()) {
      return this.toConsole();
    } else {
      return `The method "toHtml" has not being integrated for now...`;
    }
  }
  toConsole() {
    const headerArray = [
      `<underline><magenta>${this._data.settings.name}</magenta></underline>`,
      "",
      "<underline>Received value</underline>",
      "",
      `${(0, import_toString.default)(this._data.value, {
        beautify: true
      })}`,
      ""
    ];
    const issuesArray = [];
    Object.keys(this._data.issues).forEach((ruleId) => {
      const issueObj = this._data.issues[ruleId];
      const message = [];
      if (issueObj.expected.type) {
        message.push(`- Expected "<yellow>${issueObj.expected.type}</yellow>"`);
      }
      if (issueObj.received.type) {
        message.push(`- Received "<red>${issueObj.received.type}</red>"`);
      }
      if (issueObj.message) {
        message.push(["<underline>Details:</underline>", issueObj.message].join("\n"));
      }
      issuesArray.push(message.join("\n"));
    });
    const settingsArray = [
      "",
      `<underline>Settings</underline>`,
      "",
      `${(0, import_toString.default)(this._data.settings, {
        beautify: true
      })}`
    ];
    return (0, import_parseHtml.default)(`
${headerArray.join("\n")}
${issuesArray.join("\n")}
${this.settings.verbose ? settingsArray.join("\n") : ""}
    `).trim();
  }
}
const Cls = STypeResult;
var STypeResult_default = STypeResult;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
