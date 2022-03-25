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
var SFaviconBuilder_exports = {};
__export(SFaviconBuilder_exports, {
  default: () => SFaviconBuilder
});
module.exports = __toCommonJS(SFaviconBuilder_exports);
var import_s_builder = __toESM(require("@coffeekraken/s-builder"), 1);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_SFaviconBuilderBuildParamsInterface = __toESM(require("./interface/SFaviconBuilderBuildParamsInterface"), 1);
var import_favicons = __toESM(require("favicons"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_s_log = __toESM(require("@coffeekraken/s-log"), 1);
var import_path = __toESM(require("path"), 1);
var import_packageRoot = __toESM(require("@coffeekraken/sugar/node/path/packageRoot"), 1);
var import_writeFileSync = __toESM(require("@coffeekraken/sugar/node/fs/writeFileSync"), 1);
var import_jsonSync = __toESM(require("@coffeekraken/sugar/node/package/jsonSync"), 1);
class SFaviconBuilder extends import_s_builder.default {
  get faviconBuilderSettings() {
    return this._settings.faviconBuilder;
  }
  constructor(settings) {
    super((0, import_deepMerge.default)({
      faviconBuilder: {}
    }, settings != null ? settings : {}));
  }
  _build(params, settings) {
    return new import_s_promise.default(async ({ resolve, reject, emit }) => {
      var _a, _b, _c;
      params = import_SFaviconBuilderBuildParamsInterface.default.apply(params != null ? params : {});
      const packageJson = (0, import_jsonSync.default)(process.cwd(), {
        standardize: true
      });
      const finalSettings = (0, import_deepMerge.default)({
        path: `/${import_path.default.relative((0, import_packageRoot.default)(), params.outDir)}`,
        appName: packageJson.name,
        appShortName: packageJson.name,
        appDescription: packageJson.description,
        developerName: (_a = packageJson.author) == null ? void 0 : _a.name,
        developerURL: (_b = packageJson.author) == null ? void 0 : _b.url,
        dir: "auto",
        lang: "en-US",
        background: "#fff",
        theme_color: "#fff",
        appleStatusBarStyle: "black-translucent",
        display: "standalone",
        orientation: "any",
        scope: "/",
        start_url: "/?homescreen=1",
        version: "1.0",
        logging: false,
        pixel_art: false,
        loadManifestWithCredentials: false,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: true,
          favicons: true,
          firefox: true,
          windows: true,
          yandex: true
        }
      }, this.faviconBuilderSettings, settings != null ? settings : {}, (_c = params.settings) != null ? _c : {});
      if (!import_fs.default.existsSync(params.input)) {
        throw new Error(`The input favicon file "<cyan>${params.input}</cyan>" does not exists...`);
      }
      emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: `<yellow>[favicon]</yellow> Start generating your favicon files...`
      });
      (0, import_favicons.default)(params.input, finalSettings, (error, response) => {
        if (error) {
          return reject(error.message);
        }
        response.images.forEach((imageObj) => {
          emit("log", {
            type: import_s_log.default.TYPE_INFO,
            value: `<yellow>[favicon]</yellow> Saving file "<cyan>${import_path.default.relative((0, import_packageRoot.default)(), params.outDir)}/${imageObj.name}</cyan>"`
          });
          (0, import_writeFileSync.default)(`${params.outDir}/${imageObj.name}`, imageObj.contents);
        });
        response.files.forEach((fileObj) => {
          emit("log", {
            type: import_s_log.default.TYPE_INFO,
            value: `<yellow>[favicon]</yellow> Saving file "<cyan>${import_path.default.relative((0, import_packageRoot.default)(), params.outDir)}/${fileObj.name}</cyan>"`
          });
          (0, import_writeFileSync.default)(`${params.outDir}/${fileObj.name}`, fileObj.contents);
        });
        emit("log", {
          type: import_s_log.default.TYPE_INFO,
          value: `<yellow>[favicon]</yellow> Saving file "<cyan>${import_path.default.relative((0, import_packageRoot.default)(), params.outDir)}/favicon.html</cyan>"`
        });
        (0, import_writeFileSync.default)(`${params.outDir}/favicon.html`, response.html.join("\n"));
        resolve();
      });
    }, {
      metas: {
        id: this.constructor.name
      }
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
