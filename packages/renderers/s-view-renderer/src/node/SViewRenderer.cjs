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
var SViewRenderer_exports = {};
__export(SViewRenderer_exports, {
  default: () => SViewRenderer_default
});
module.exports = __toCommonJS(SViewRenderer_exports);
var import_s_class = __toESM(require("@coffeekraken/s-class"));
var import_s_duration = __toESM(require("@coffeekraken/s-duration"));
var import_s_file = __toESM(require("@coffeekraken/s-file"));
var import_s_promise = __toESM(require("@coffeekraken/s-promise"));
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"));
var import_dirname = __toESM(require("@coffeekraken/sugar/node/fs/dirname"));
var import_unique = __toESM(require("@coffeekraken/sugar/shared/array/unique"));
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"));
var import_fs = __toESM(require("fs"));
var import_glob = __toESM(require("glob"));
var import_path = __toESM(require("path"));
var import_SViewRendererSettingsInterface = __toESM(require("./interface/SViewRendererSettingsInterface"));
const _SViewRenderer = class extends import_s_class.default {
  constructor(viewPath, settings) {
    super((0, import_deepMerge.default)({
      viewRenderer: import_SViewRendererSettingsInterface.default.defaults()
    }, settings || {}));
    this._viewPath = "";
    (async () => {
      const defaultEngines = import_s_sugar_config.default.get("viewRenderer.engines") || [];
      for (let i = 0; i < defaultEngines.length; i++) {
        const path = defaultEngines[i];
        const { default: EngineClass } = await Promise.resolve().then(() => __toESM(require(path)));
        EngineClass.extensions.forEach((ext) => {
          _SViewRenderer.registerEngine(EngineClass, ext);
        });
      }
      const defaultDataHandlers = import_s_sugar_config.default.get("viewRenderer.dataHandlers") || [];
      for (let i = 0; i < defaultDataHandlers.length; i++) {
        const path = defaultDataHandlers[i];
        const { default: DataHandlerClass } = await Promise.resolve().then(() => __toESM(require(path)));
        DataHandlerClass.extensions.forEach((ext) => {
          _SViewRenderer.registerDataHandler(DataHandlerClass, ext);
        });
      }
      Object.keys(_SViewRenderer.engines).forEach((ext) => {
        viewPath = viewPath.replace(`.${ext}`, "");
      });
      if (viewPath.split(" ").length === 1 && viewPath.trim() === viewPath) {
        if (import_path.default.isAbsolute(viewPath)) {
          if (import_fs.default.existsSync(viewPath)) {
            this._viewPath = viewPath;
          }
        } else if (!viewPath.match(/\//gm)) {
          for (let i = 0; i < this.viewRendererSettings.rootDirs.length; i++) {
            const rootDir = this.viewRendererSettings.rootDirs[i];
            const potentialViewPath = `${rootDir}/${viewPath.split(".").join("/")}.[!data]*`;
            const matches = import_glob.default.sync(potentialViewPath);
            if (matches && matches.length) {
              this._viewPath = matches[0];
              break;
            }
          }
        }
      } else {
      }
      if (this._viewPath) {
        for (let i = 0; i < Object.keys(_SViewRenderer.engines).length; i++) {
          const engineExt = Object.keys(_SViewRenderer.engines)[i];
          const reg = new RegExp(`${engineExt}$`);
          if (reg.test(this._viewPath)) {
            this._viewExt = engineExt;
            this._EngineClass = _SViewRenderer.engines[engineExt];
            break;
          }
        }
      }
      if (this._viewPath) {
        const viewPathWithoutExtension = this._viewPath.replace(`.${this._viewExt}`, "");
        Object.keys(_SViewRenderer.dataHandlers).forEach((extension) => {
          if (this._DataHandlerClass)
            return;
          if (import_fs.default.existsSync(`${viewPathWithoutExtension}.data.${extension}`)) {
            this._dataFilePath = `${viewPathWithoutExtension}.data.${extension}`;
            this._DataHandlerClass = _SViewRenderer.dataHandlers[extension];
          }
        });
      }
    })();
    this._originalViewPath = viewPath;
    this.viewRendererSettings.rootDirs = this.constructor.getRootDirs(this.viewRendererSettings.rootDirs || []);
  }
  static get defaultRootDirs() {
    return [
      ...import_s_sugar_config.default.get("viewRenderer.rootDirs"),
      import_path.default.resolve((0, import_dirname.default)(), "../php/views/blade")
    ];
  }
  static getRootDirs(rootDirs = []) {
    return (0, import_unique.default)([
      ...Array.isArray(rootDirs) ? rootDirs : [rootDirs],
      ..._SViewRenderer.defaultRootDirs
    ]);
  }
  static render(viewPath, data = null, settings) {
    return new import_s_promise.default(async ({ resolve, reject }) => {
      var _a, _b;
      const viewInstance = new _SViewRenderer(viewPath, (0, import_deepMerge.default)({
        viewRenderer: {}
      }, settings != null ? settings : {}));
      let resultObj;
      try {
        resultObj = await viewInstance.render(data, (_a = settings == null ? void 0 : settings.viewRenderer) != null ? _a : {});
        resultObj.status = 200;
        return resolve(__spreadValues({}, resultObj));
      } catch (e) {
        const errorViewInstance = new _SViewRenderer("pages.501", __spreadValues({}, settings));
        resultObj = await errorViewInstance.render(__spreadProps(__spreadValues({}, data), {
          error: e
        }), (_b = settings == null ? void 0 : settings.viewRenderer) != null ? _b : {});
        resultObj.status = 501;
        return reject(__spreadValues({}, resultObj));
      }
    });
  }
  static registerEngine(EngineClass, extensions) {
    const exts = Array.isArray(extensions) ? extensions : extensions == null ? void 0 : extensions.split(",").map((l) => l.trim());
    exts == null ? void 0 : exts.forEach((ext) => {
      if (_SViewRenderer.engines[ext])
        return;
      _SViewRenderer.engines[ext] = EngineClass;
    });
  }
  static registerDataHandler(DataHandlerClass, extensions) {
    const exts = Array.isArray(extensions) ? extensions : extensions.split(",").map((l) => l.trim());
    exts.forEach((extension) => {
      if (_SViewRenderer.dataHandlers[extension])
        return;
      _SViewRenderer.dataHandlers[extension] = DataHandlerClass;
    });
  }
  static getViewMetas(viewPath) {
    const viewsDirs = import_s_sugar_config.default.get("viewRenderer.rootDirs");
    for (let i = 0; i < viewsDirs.length; i++) {
      const viewsDir = viewsDirs[i];
      let path = `${viewsDir}/${viewPath}`;
      if (import_path.default.isAbsolute(viewPath)) {
        path = viewPath;
      }
      let finalViewPath, viewType;
      if (import_fs.default.existsSync(path)) {
        finalViewPath = path;
        const fileName = path.split("/").slice(-1).join("");
        viewType = fileName.split(".").slice(1).join(".");
      } else {
        for (let i2 = 0; i2 < Object.keys(_SViewRenderer.engines).length; i2++) {
          const engineExt = Object.keys(_SViewRenderer.engines)[i2];
          if (import_fs.default.existsSync(`${path}.${engineExt}`)) {
            finalViewPath = `${path}.${engineExt}`;
            viewType = engineExt;
            break;
          }
        }
      }
      if (!finalViewPath)
        continue;
      const infoObj = import_s_file.default.new(finalViewPath);
      return infoObj.toObject();
    }
    return void 0;
  }
  get viewRendererSettings() {
    return this._settings.viewRenderer;
  }
  render(data = {}, settings) {
    return new import_s_promise.default(async ({ resolve, reject }) => {
      var _a, _b, _c;
      const viewRendererSettings = Object.assign({}, (0, import_deepMerge.default)(this.viewRendererSettings, settings || {}));
      data = (0, import_deepMerge.default)(viewRendererSettings.defaultData, data);
      const duration = new import_s_duration.default();
      if (this._DataHandlerClass && this._dataFilePath) {
        const gettedData = await this._DataHandlerClass.handle(this._dataFilePath);
        if (gettedData)
          data = (0, import_deepMerge.default)(gettedData, data);
      }
      const engineSettings = (0, import_deepMerge.default)((_b = (_a = this._EngineClass.interface) == null ? void 0 : _a.defaults()) != null ? _b : {}, (_c = viewRendererSettings.enginesSettings[this._EngineClass.id]) != null ? _c : {});
      if (this._EngineClass) {
        const rendererInstance = new this._EngineClass(engineSettings);
        const renderPromise = rendererInstance.render(this._viewPath, data, viewRendererSettings);
        const result = await renderPromise;
        if (renderPromise.isRejected()) {
          const resObj2 = __spreadValues({
            view: _SViewRenderer.getViewMetas(this._viewPath)
          }, duration.end());
          return reject(resObj2);
        }
        const resObj = __spreadProps(__spreadValues({
          view: _SViewRenderer.getViewMetas(this._viewPath)
        }, duration.end()), {
          value: result
        });
        resolve(resObj);
      }
    });
  }
};
let SViewRenderer = _SViewRenderer;
SViewRenderer.engines = {};
SViewRenderer.dataHandlers = {};
var SViewRenderer_default = SViewRenderer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
