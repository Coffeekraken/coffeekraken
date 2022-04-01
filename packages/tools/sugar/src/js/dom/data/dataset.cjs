import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
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
var dataset_exports = {};
__export(dataset_exports, {
  default: () => dataset_default
});
module.exports = __toCommonJS(dataset_exports);
var import_uncamelize = __toESM(require("../../../shared/string/uncamelize"), 1);
var import_autoCast = __toESM(require("../../../shared/string/autoCast"), 1);
var import_toString = __toESM(require("../../../shared/string/toString"), 1);
function dataset($elm, key, value = null) {
  if (!$elm.getAttribute)
    return;
  if (!value) {
    const v = $elm.dataset[key] || $elm.getAttribute("data-" + (0, import_uncamelize.default)(key));
    return (0, import_autoCast.default)(v);
  } else {
    const dataset2 = $elm.dataset;
    if (dataset2) {
      $elm.dataset[key] = (0, import_toString.default)(value);
    } else {
      $elm.setAttribute("data-" + (0, import_uncamelize.default)(key), (0, import_toString.default)(value));
    }
    return $elm;
  }
}
var dataset_default = dataset;
