var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
var firstDocblocksWithNamespaceInFolder_exports = {};
__export(firstDocblocksWithNamespaceInFolder_exports, {
  default: () => firstDocblockWithNamespaceInFolder
});
module.exports = __toCommonJS(firstDocblocksWithNamespaceInFolder_exports);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_find_in_files = __toESM(require("find-in-files"), 1);
var import_minimatch = __toESM(require("minimatch"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var import_filename = __toESM(require("@coffeekraken/sugar/node/fs/filename"), 1);
var import_extension = __toESM(require("@coffeekraken/sugar/node/fs/extension"), 1);
var import_SDocblock = __toESM(require("../../shared/SDocblock"), 1);
async function firstDocblockWithNamespaceInFolder(directory, settings = {}) {
  settings = (0, import_deepMerge.default)({
    exclude: "**/+(__tests__|__wip__)/**"
  }, settings);
  if (!import_fs.default.existsSync(directory))
    return {};
  const founded = await import_find_in_files.default.find(`@namespace`, directory);
  const namespaceObj = {};
  for (let i = 0; i < Object.keys(founded).length; i++) {
    const path = founded[Object.keys(founded)[i]];
    const relativePath = import_path.default.relative(directory, path);
    if ((0, import_minimatch.default)(relativePath, settings.exclude))
      return;
    const content = import_fs.default.readFileSync(path, "utf8");
    const docblocks = new import_SDocblock.default(content);
    await docblocks.parse();
    const docblock = docblocks.blocks[0] ? docblocks.blocks[0] : null;
    if (!docblock)
      return;
    delete docblock.object.raw;
    const name = docblock.object.name || (0, import_filename.default)(path).replace(`.${(0, import_extension.default)(path)}`, "");
    namespaceObj[docblock.object.namespace + "." + name] = __spreadProps(__spreadValues({}, docblock.object), {
      path: relativePath
    });
  }
  return namespaceObj;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
