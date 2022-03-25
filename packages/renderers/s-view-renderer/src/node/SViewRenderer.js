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
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
import __SClass from "@coffeekraken/s-class";
import __SDuration from "@coffeekraken/s-duration";
import __SFile from "@coffeekraken/s-file";
import __SPromise from "@coffeekraken/s-promise";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
import __dirname from "@coffeekraken/sugar/node/fs/dirname";
import __unique from "@coffeekraken/sugar/shared/array/unique";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __fs from "fs";
import __glob from "glob";
import __path from "path";
import __SViewRendererSettingsInterface from "./interface/SViewRendererSettingsInterface";
const _SViewRenderer = class extends __SClass {
  constructor(viewPath, settings) {
    super(__deepMerge({
      viewRenderer: __SViewRendererSettingsInterface.defaults()
    }, settings || {}));
    this._viewPath = "";
    (async () => {
      const defaultEngines = __SSugarConfig.get("viewRenderer.engines") || [];
      for (let i = 0; i < defaultEngines.length; i++) {
        const path = defaultEngines[i];
        const { default: EngineClass } = await Promise.resolve().then(() => __toESM(require(path)));
        EngineClass.extensions.forEach((ext) => {
          _SViewRenderer.registerEngine(EngineClass, ext);
        });
      }
      const defaultDataHandlers = __SSugarConfig.get("viewRenderer.dataHandlers") || [];
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
        if (__path.isAbsolute(viewPath)) {
          if (__fs.existsSync(viewPath)) {
            this._viewPath = viewPath;
          }
        } else if (!viewPath.match(/\//gm)) {
          for (let i = 0; i < this.viewRendererSettings.rootDirs.length; i++) {
            const rootDir = this.viewRendererSettings.rootDirs[i];
            const potentialViewPath = `${rootDir}/${viewPath.split(".").join("/")}.[!data]*`;
            const matches = __glob.sync(potentialViewPath);
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
          if (__fs.existsSync(`${viewPathWithoutExtension}.data.${extension}`)) {
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
      ...__SSugarConfig.get("viewRenderer.rootDirs"),
      __path.resolve(__dirname(), "../php/views/blade")
    ];
  }
  static getRootDirs(rootDirs = []) {
    return __unique([
      ...Array.isArray(rootDirs) ? rootDirs : [rootDirs],
      ..._SViewRenderer.defaultRootDirs
    ]);
  }
  static render(viewPath, data = null, settings) {
    return new __SPromise(async ({ resolve, reject }) => {
      var _a, _b;
      const viewInstance = new _SViewRenderer(viewPath, __deepMerge({
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
    const viewsDirs = __SSugarConfig.get("viewRenderer.rootDirs");
    for (let i = 0; i < viewsDirs.length; i++) {
      const viewsDir = viewsDirs[i];
      let path = `${viewsDir}/${viewPath}`;
      if (__path.isAbsolute(viewPath)) {
        path = viewPath;
      }
      let finalViewPath, viewType;
      if (__fs.existsSync(path)) {
        finalViewPath = path;
        const fileName = path.split("/").slice(-1).join("");
        viewType = fileName.split(".").slice(1).join(".");
      } else {
        for (let i2 = 0; i2 < Object.keys(_SViewRenderer.engines).length; i2++) {
          const engineExt = Object.keys(_SViewRenderer.engines)[i2];
          if (__fs.existsSync(`${path}.${engineExt}`)) {
            finalViewPath = `${path}.${engineExt}`;
            viewType = engineExt;
            break;
          }
        }
      }
      if (!finalViewPath)
        continue;
      const infoObj = __SFile.new(finalViewPath);
      return infoObj.toObject();
    }
    return void 0;
  }
  get viewRendererSettings() {
    return this._settings.viewRenderer;
  }
  render(data = {}, settings) {
    return new __SPromise(async ({ resolve, reject }) => {
      var _a, _b, _c;
      const viewRendererSettings = Object.assign({}, __deepMerge(this.viewRendererSettings, settings || {}));
      data = __deepMerge(viewRendererSettings.defaultData, data);
      const duration = new __SDuration();
      if (this._DataHandlerClass && this._dataFilePath) {
        const gettedData = await this._DataHandlerClass.handle(this._dataFilePath);
        if (gettedData)
          data = __deepMerge(gettedData, data);
      }
      const engineSettings = __deepMerge((_b = (_a = this._EngineClass.interface) == null ? void 0 : _a.defaults()) != null ? _b : {}, (_c = viewRendererSettings.enginesSettings[this._EngineClass.id]) != null ? _c : {});
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
export {
  SViewRenderer_default as default
};
