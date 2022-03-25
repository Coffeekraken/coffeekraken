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
var SEs6Import_exports = {};
__export(SEs6Import_exports, {
  default: () => SEs6Import
});
module.exports = __toCommonJS(SEs6Import_exports);
var import_parse_es6_imports = __toESM(require("parse-es6-imports"));
class SEs6Import {
  constructor(statement) {
    this.raw = null;
    this.path = null;
    this.default = null;
    this.star = null;
    this.named = [];
    const parsedStatement = (0, import_parse_es6_imports.default)(statement)[0];
    if (parsedStatement) {
      this.raw = statement;
      this.path = parsedStatement.fromModule;
      this.default = parsedStatement.defaultImport;
      this.star = parsedStatement.starImport;
      this.named = parsedStatement.namedImports.map((n) => {
        return {
          name: n.name,
          as: n.value
        };
      });
    }
  }
  static parseCode(code) {
    const reg = /^[\s]{0,999999}import\s[^\r\n;].*/gm;
    let matches = code.match(reg);
    if (!matches) {
      return [];
    }
    matches = matches.map((statement) => {
      return new SEs6Import(statement.trim());
    });
    return matches;
  }
  toString() {
    let string = "import ";
    if (this.star) {
      string += `* as ${this.star} `;
    }
    if (this.default) {
      string += `${this.default}`;
      if (this.named && this.named.length) {
        string += ", ";
      } else {
        string += " ";
      }
    }
    if (this.named && this.named.length) {
      string += "{ ";
      string += this.named.map((n) => {
        if (n.as) {
          return `${n.name} as ${n.as}`;
        } else {
          return n.name;
        }
      }).join(", ");
      string += " } ";
    }
    string += `from "${this.path}";`;
    return string;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
