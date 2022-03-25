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
var resolveGlob_exports = {};
__export(resolveGlob_exports, {
  default: () => resolveGlob
});
module.exports = __toCommonJS(resolveGlob_exports);
var import_s_file = __toESM(require("@coffeekraken/s-file"));
var import_fs = __toESM(require("fs"));
var import_glob = __toESM(require("glob"));
var import_path = __toESM(require("path"));
var import_expandGlob = __toESM(require("../../shared/glob/expandGlob"));
var import_deepMerge = __toESM(require("../../shared/object/deepMerge"));
var import_excludeGlobs = __toESM(require("../path/excludeGlobs"));
function resolveGlob(globs, settings = {}) {
  settings = (0, import_deepMerge.default)({
    cwd: settings.cwd || process.cwd(),
    symlinks: true,
    nodir: true,
    contentRegExp: void 0,
    SFile: true,
    exclude: [],
    defaultExcludes: true
  }, settings);
  const filesArray = [];
  if (!Array.isArray(globs))
    globs = [globs];
  for (let i = 0; i < globs.length; i++) {
    const glob = globs[i];
    let cwd = settings.cwd, globPattern, searchReg = settings.contentRegExp;
    if (import_fs.default.existsSync(glob)) {
      if (settings.SFile) {
        const sFile = import_s_file.default.new(glob, {
          file: {
            cwd
          }
        });
        filesArray.push(sFile);
      } else {
        filesArray.push(glob);
      }
      continue;
    }
    const splits = glob.split(":").map((split) => {
      return split.replace(`${cwd}/`, "").replace(cwd, "");
    });
    if (splits[1]) {
      const innerReg = splits[1].replace(/^\//, "").replace(/\/[a-zA-Z]{0,10}$/, "");
      let flags = splits[1].match(/\/[a-zA-Z]{1,10}$/g);
      if (flags) {
        flags = flags[0].replace("/", "");
      }
      searchReg = new RegExp(innerReg, flags != null ? flags : "");
    }
    globPattern = splits[0];
    globPattern = import_path.default.resolve(cwd, globPattern);
    const finalPatterns = (0, import_expandGlob.default)(globPattern);
    let pathes = [];
    finalPatterns.forEach((pattern) => {
      var _a;
      pathes = pathes.concat(import_glob.default.sync(pattern, __spreadValues({
        cwd,
        nodir: settings.nodir,
        dot: true,
        follow: settings.symlinks,
        ignore: [
          ...(_a = settings.exclude) != null ? _a : [],
          ...settings.defaultExcludes ? (0, import_excludeGlobs.default)() : []
        ]
      }, settings)));
    });
    if (searchReg) {
      pathes = pathes.filter((path) => {
        try {
          const content = import_fs.default.readFileSync(path, "utf8").toString();
          const matches = content.match(searchReg);
          if (matches && matches.length) {
            return true;
          }
          return false;
        } catch (e) {
          return false;
        }
      });
    }
    pathes.forEach((path) => {
      if (settings.SFile) {
        const sFile = import_s_file.default.new(path, {
          file: {
            cwd
          }
        });
        filesArray.push(sFile);
      } else {
        filesArray.push(path);
      }
    });
  }
  return filesArray;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
