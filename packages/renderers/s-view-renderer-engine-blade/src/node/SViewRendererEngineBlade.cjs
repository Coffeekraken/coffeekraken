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
var SViewRendererEngineBlade_exports = {};
__export(SViewRendererEngineBlade_exports, {
  default: () => SViewRendererEngineBlade
});
module.exports = __toCommonJS(SViewRendererEngineBlade_exports);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
var import_dirname = __toESM(require("@coffeekraken/sugar/node/fs/dirname"), 1);
var import_execPhp = __toESM(require("@coffeekraken/sugar/node/php/execPhp"), 1);
var import_unique = __toESM(require("@coffeekraken/sugar/shared/array/unique"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var import_SViewRendererEngineBladeSettingsInterface = __toESM(require("./interface/SViewRendererEngineBladeSettingsInterface"), 1);
class SViewRendererEngineBlade {
  constructor(settings) {
    this.settings = {};
    this.settings = settings != null ? settings : {};
  }
  render(viewPath, data = {}, viewRendererSettings) {
    return new import_s_promise.default(({ resolve, reject, emit }) => {
      if (!import_fs.default.existsSync(viewPath)) {
        return reject(`It seems that the view you passed "<cyan>${viewPath}</cyan>" does not exists...`);
      }
      if (!import_fs.default.existsSync(viewRendererSettings.cacheDir)) {
        import_fs.default.mkdirSync(viewRendererSettings.cacheDir, { recursive: true });
      }
      let viewDotPath = viewPath;
      (0, import_unique.default)([...viewRendererSettings.rootDirs]).forEach((path) => {
        viewDotPath = viewDotPath.replace(`${path}/`, "");
      });
      viewDotPath = viewDotPath.split("/").join(".").replace(".blade.php", "");
      resolve((0, import_execPhp.default)(import_path.default.resolve((0, import_dirname.default)(), "../php/compile.php"), {
        rootDirs: (0, import_unique.default)([...viewRendererSettings.rootDirs]),
        viewDotPath,
        data,
        cacheDir: viewRendererSettings.cacheDir
      }, {
        paramsThroughFile: true
      }));
    }, {
      eventEmitter: {
        bind: this
      }
    });
  }
}
SViewRendererEngineBlade.id = "blade";
SViewRendererEngineBlade.extensions = ["blade.php"];
SViewRendererEngineBlade.settingsInterface = import_SViewRendererEngineBladeSettingsInterface.default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
