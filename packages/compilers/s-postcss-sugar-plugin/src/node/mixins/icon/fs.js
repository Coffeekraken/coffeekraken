var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
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
var fs_exports = {};
__export(fs_exports, {
  default: () => fs_default,
  interface: () => postcssSugarPluginIconFsMixinInterface
});
module.exports = __toCommonJS(fs_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_packageRoot = __toESM(require("@coffeekraken/sugar/node/path/packageRoot"));
var import_filename = __toESM(require("@coffeekraken/sugar/node/fs/filename"));
class postcssSugarPluginIconFsMixinInterface extends import_s_interface.default {
  static get _definition() {
    return {
      path: {
        type: "String",
        required: true
      },
      as: {
        type: "String",
        required: false
      }
    };
  }
}
function fs_default({
  params,
  atRule,
  replaceWith,
  sourcePath,
  sharedData
}) {
  const finalParams = __spreadValues({
    path: "",
    as: ""
  }, params);
  if (!sharedData.icons) {
    sharedData.icons = [];
  }
  let as = finalParams.as;
  if (!as)
    as = (0, import_filename.default)(finalParams.path.split(".").slice(0, -1).join("."));
  const potentialFilePathFromRoot = import_path.default.resolve((0, import_packageRoot.default)(), finalParams.path);
  const potentialFilePathFromFile = import_path.default.resolve(sourcePath, finalParams.path);
  if (import_fs.default.existsSync(potentialFilePathFromFile)) {
    sharedData.icons.push({
      path: potentialFilePathFromFile,
      as
    });
  } else if (import_fs.default.existsSync(potentialFilePathFromRoot)) {
    sharedData.icons.push({
      path: potentialFilePathFromRoot,
      as
    });
  } else {
    throw new Error(`<red>[sugar.css.mixins.icon.fs]</red> Sorry but it seems that the requested icon "<cyan>${finalParams.path}</cyan>" does not exists on the filesystem`);
  }
  replaceWith([]);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
