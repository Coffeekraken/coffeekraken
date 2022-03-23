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
var dependencyList_exports = {};
__export(dependencyList_exports, {
  default: () => dependencyList
});
module.exports = __toCommonJS(dependencyList_exports);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
var import_deepMap = __toESM(require("../../shared/object/deepMap"), 1);
var import_dependencyTree = __toESM(require("./dependencyTree"), 1);
function dependencyList(filePath, settings) {
  return new import_s_promise.default(async ({ resolve, pipe }) => {
    const tree = await pipe((0, import_dependencyTree.default)(filePath, settings));
    const list = [];
    (0, import_deepMap.default)(tree, ({ prop, value }) => {
      if (list.indexOf(prop) === -1)
        list.push(prop);
      return value;
    }, {
      processObjects: true
    });
    resolve(list);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
