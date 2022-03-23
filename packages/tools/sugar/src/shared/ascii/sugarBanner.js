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
var sugarBanner_exports = {};
__export(sugarBanner_exports, {
  default: () => sugarBanner_default
});
module.exports = __toCommonJS(sugarBanner_exports);
var import_deepMerge = __toESM(require("../object/deepMerge"), 1);
function sugarBanner(settings = {}) {
  settings = (0, import_deepMerge.default)({
    version: "",
    borders: true,
    marginLeft: 2,
    paddingTop: 0,
    paddingBottom: 0
  }, settings);
  let version = "";
  if (settings.version)
    version = `<white>${settings.version}</white>`;
  const value = [
    `<yellow>${settings.borders ? "\u2588" : ""}${" ".repeat(settings.marginLeft)}  ____                           </yellow>`,
    `<yellow>${settings.borders ? "\u2588" : ""}${" ".repeat(settings.marginLeft)}/ ____|</yellow><white>Coffee<magenta>kraken</magenta></white><yellow> __ _ _ __   </yellow>`,
    `<yellow>${settings.borders ? "\u2588" : ""}${" ".repeat(settings.marginLeft)}\\___ \\| | | |/ _\` |/ _\` | \`__|  </yellow>`,
    `<yellow>${settings.borders ? "\u2588" : ""}${" ".repeat(settings.marginLeft)} ___) | |_| | (_| | (_| | |       </yellow>`,
    `<yellow>${settings.borders ? "\u2588" : ""}${" ".repeat(settings.marginLeft)}|____/ \\__,_|\\__, |\\__,_|_|</yellow> ${version}    `,
    `<yellow>${settings.borders ? "\u2588" : ""}</yellow><white>${" ".repeat(settings.marginLeft)}             </white><yellow>|___/</yellow>`
  ].map((line) => {
    return line;
  });
  if (settings.paddingTop) {
    for (let i = 0; i < settings.paddingTop; i++) {
      value.unshift(`<yellow>${settings.borders ? "\u2588" : ""}${" ".repeat(settings.marginLeft)}</yellow>`);
    }
  }
  if (settings.paddingBottom) {
    for (let i = 0; i < settings.paddingBottom; i++) {
      value.push(`<yellow>${settings.borders ? "\u2588" : ""}${" ".repeat(settings.marginLeft)}</yellow>`);
    }
  }
  return value.join("\n");
}
var sugarBanner_default = sugarBanner;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
