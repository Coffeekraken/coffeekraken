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
var tagsMap_exports = {};
__export(tagsMap_exports, {
  default: () => tagsMap_default
});
module.exports = __toCommonJS(tagsMap_exports);
var import_chalk = __toESM(require("chalk"), 1);
import_chalk.default.level = 3;
const tagsMap = {
  black: (tag, content) => import_chalk.default.black(content),
  red: (tag, content) => import_chalk.default.red(content),
  green: (tag, content) => import_chalk.default.green(content),
  yellow: (tag, content) => import_chalk.default.yellow(content),
  blue: (tag, content) => import_chalk.default.blue(content),
  magenta: (tag, content) => import_chalk.default.magenta(content),
  cyan: (tag, content) => import_chalk.default.cyan(content),
  white: (tag, content) => import_chalk.default.white(content),
  grey: (tag, content) => import_chalk.default.grey(content),
  bgBlack: (tag, content) => import_chalk.default.bgBlack(content),
  bgRed: (tag, content) => import_chalk.default.bgRed(content),
  bgGreen: (tag, content) => import_chalk.default.bgGreen(content),
  bgYellow: (tag, content) => import_chalk.default.bgYellow(content),
  bgBlue: (tag, content) => import_chalk.default.bgBlue(content),
  bgMagenta: (tag, content) => import_chalk.default.bgMagenta(content),
  bgCyan: (tag, content) => import_chalk.default.bgCyan(content),
  bgWhite: (tag, content) => import_chalk.default.bgWhite(content),
  bold: (tag, content) => import_chalk.default.bold(content),
  dim: (tag, content) => import_chalk.default.dim(content),
  italic: (tag, content) => import_chalk.default.italic(content),
  underline: (tag, content) => import_chalk.default.underline(content),
  strike: (tag, content) => import_chalk.default.strike(content),
  h1: (tag, content) => {
    return import_chalk.default.underline(import_chalk.default.bold(content)) + "\n\n";
  },
  h2: (tag, content) => {
    return import_chalk.default.bold(content) + "\n";
  },
  date: (tag, content) => new Date().getDate().toString().padStart("0", 2) + "-" + (new Date().getMonth() + 1).toString().padStart("0", 2) + "-" + new Date().getFullYear().toString().padStart("0", 2),
  time: (tag, content) => new Date().getHours().toString().padStart("0", 2) + ":" + new Date().getMinutes().toString().padStart("0", 2) + ":" + new Date().getMinutes().toString().padStart("0", 2),
  day: (tag, content) => new Date().getDate().toString().padStart("0", 2),
  days: (tag, content) => new Date().getDate().toString().padStart("0", 2),
  month: (tag, content) => new Date().getMonth().toString().padStart("0", 2),
  months: (tag, content) => new Date().getMonth().toString().padStart("0", 2),
  year: (tag, content) => new Date().getFullYear().toString().padStart("0", 2),
  years: (tag, content) => new Date().getFullYear().toString().padStart("0", 2),
  hour: (tag, content) => new Date().getHours().toString().padStart("0", 2),
  hours: (tag, content) => new Date().getHours().toString().padStart("0", 2),
  minute: (tag, content) => new Date().getMinutes().toString().padStart("0", 2),
  minutes: (tag, content) => new Date().getMinutes().toString().padStart("0", 2),
  second: (tag, content) => new Date().getSeconds().toString().padStart("0", 2),
  seconds: (tag, content) => new Date().getSeconds().toString().padStart("0", 2),
  br: (tag, content) => "\n"
};
var tagsMap_default = tagsMap;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
