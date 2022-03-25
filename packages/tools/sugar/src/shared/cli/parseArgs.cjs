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
var parseArgs_exports = {};
__export(parseArgs_exports, {
  default: () => parseArgs
});
module.exports = __toCommonJS(parseArgs_exports);
var import_deepMerge = __toESM(require("../object/deepMerge"));
var import_parse = __toESM(require("../string/parse"));
var import_unquote = __toESM(require("../string/unquote"));
function parseArgs(string, settings = {}) {
  settings = (0, import_deepMerge.default)({
    throw: true,
    defaultObj: {},
    cast: true,
    valueQuote: void 0
  }, settings);
  string = string.trim();
  string = string.replace(/(["'`])--/gm, "$1--\xA7 --");
  let valueQuote = settings.valueQuote;
  if (!valueQuote) {
    for (let i = 0; i < string.length; i++) {
      const char = string[i];
      if (char === '"' || char === "`" || char === "'") {
        valueQuote = char;
        break;
      }
    }
    if (!valueQuote)
      valueQuote = '"';
  }
  let stringArray = [];
  let isFunctionStyle = false;
  if (string.match(/^\(/) && string.match(/\)$/)) {
    isFunctionStyle = true;
    string = string.slice(1, -1);
    let currentStr = "";
    let parenthesisCount = 0;
    let quotesCount = 0;
    for (let i = 0; i < string.length; i++) {
      const char = string[i];
      const previousChar = string[i - 1] || string[0];
      if (char === valueQuote && previousChar !== "\\" && !quotesCount) {
        quotesCount++;
      } else if (char === valueQuote && previousChar !== "\\" && quotesCount) {
        quotesCount--;
      }
      if (!quotesCount && char === "(") {
        parenthesisCount++;
      } else if (!quotesCount && char === ")") {
        parenthesisCount--;
      }
      if (char === ",") {
        if (quotesCount || parenthesisCount) {
          currentStr += char;
        } else {
          stringArray.push(currentStr.trim());
          currentStr = "";
        }
      } else {
        currentStr += char;
      }
    }
    if (parenthesisCount)
      currentStr += ")".repeat(parenthesisCount);
    stringArray.push(currentStr.trim());
  } else {
    let currentStr = "";
    let quotesCount = false;
    for (let i = 0; i < string.length; i++) {
      const char = string[i];
      const previousChar = string[i - 1] || string[0];
      if (char === valueQuote && previousChar !== "\\" && !quotesCount) {
        quotesCount = true;
      } else if (char === valueQuote && previousChar !== "\\" && quotesCount) {
        quotesCount = false;
      }
      if (char === " ") {
        if (quotesCount) {
          currentStr += char;
        } else {
          stringArray.push(currentStr.trim());
          currentStr = "";
        }
      } else {
        currentStr += char;
      }
    }
    stringArray.push(currentStr.trim());
  }
  stringArray = stringArray.map((item) => (0, import_unquote.default)(item));
  const argsObj = {};
  let currentArgName = void 0;
  let currentValue;
  stringArray = stringArray.forEach((part, i) => {
    if (!isFunctionStyle && !part.includes(" ") && (part.slice(0, 2) === "--" || part.slice(0, 1) === "-")) {
      if (currentValue === void 0 && currentArgName !== -1 && currentArgName && argsObj[currentArgName] === void 0) {
        argsObj[currentArgName] = true;
      }
      currentArgName = part.replace(/^[-]{1,2}/, "");
      if (argsObj[currentArgName] === void 0) {
        argsObj[currentArgName] = true;
      }
    } else {
      let value;
      if (part && typeof part === "string") {
        value = part.replace(/^\\\\\\`/, "").replace(/\\\\\\`$/, "").replace(/^'/, "").replace(/'$/, "").replace(/^"/, "").replace(/"$/, "");
        if (value.match(/^\$[a-zA-Z0-9-_]+\s?:.*/)) {
          const parts = part.split(":");
          currentArgName = parts[0].trim().replace(/^\$/, "");
          value = parts.slice(1).join(":").trim();
        }
      }
      currentValue = (0, import_parse.default)(value);
      if (typeof currentValue === "string") {
        currentValue = currentValue.replace("--\xA7 ", "");
      }
      if (currentArgName !== void 0) {
        if (argsObj[currentArgName] !== void 0 && argsObj[currentArgName] !== true) {
          if (!Array.isArray(argsObj[currentArgName])) {
            argsObj[currentArgName] = [argsObj[currentArgName]];
          }
          argsObj[currentArgName].push(currentValue);
        } else {
          argsObj[currentArgName] = currentValue;
        }
        currentValue = void 0;
        currentArgName = void 0;
      } else {
        argsObj[i] = currentValue;
      }
    }
  });
  Object.keys(argsObj).forEach((key) => {
    const value = argsObj[key];
    if (value === void 0)
      delete argsObj[key];
  });
  return argsObj;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
