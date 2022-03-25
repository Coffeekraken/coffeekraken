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
var matchGlob_exports = {};
__export(matchGlob_exports, {
  default: () => matchGlob
});
module.exports = __toCommonJS(matchGlob_exports);
var import_fs = __toESM(require("fs"));
var import_to_regex = __toESM(require("to-regex"));
var import_minimatch = __toESM(require("minimatch"));
var import_deepMerge = __toESM(require("../../shared/object/deepMerge"));
var import_directory = __toESM(require("../is/directory"));
var import_expandGlob = __toESM(require("../../shared/glob/expandGlob"));
var import_path = __toESM(require("path"));
function matchGlob(input, glob, settings) {
  var _a, _b;
  settings = (0, import_deepMerge.default)({
    cwd: (_a = settings == null ? void 0 : settings.cwd) != null ? _a : process.cwd(),
    symlinks: true,
    nodir: true
  }, settings != null ? settings : {});
  if (Array.isArray(glob)) {
    for (let i = 0; i < glob.length; i++) {
      if (matchGlob(input, glob[i], settings))
        return true;
    }
    return false;
  }
  const splits = glob.split(":");
  const pattern = splits[0].replace(`${settings.cwd}/`, "").replace(settings.cwd, "");
  const regex = splits[1];
  const fullFilePath = import_path.default.resolve((_b = settings.cwd) != null ? _b : "", input);
  const expandedGlobs = (0, import_expandGlob.default)(pattern);
  let hasMatch = false;
  for (let i = 0; i < expandedGlobs.length; i++) {
    const g = expandedGlobs[i];
    if ((0, import_minimatch.default)(input, g)) {
      hasMatch = true;
      break;
    }
  }
  if (!hasMatch)
    return false;
  if (!import_fs.default.existsSync(fullFilePath))
    return false;
  if (settings.nodir && (0, import_directory.default)(fullFilePath))
    return false;
  if (regex) {
    const fileContent = import_fs.default.readFileSync(fullFilePath, "utf8").toString();
    const regSplits = regex.split("/").splice(1);
    const regString = regSplits[0];
    const flags = regSplits[regSplits.length - 1];
    const searchReg = (0, import_to_regex.default)(regString, {
      flags
    });
    if (!fileContent.match(searchReg))
      return false;
  }
  return true;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
