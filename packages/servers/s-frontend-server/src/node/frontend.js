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
var frontend_exports = {};
__export(frontend_exports, {
  default: () => frontend_default
});
module.exports = __toCommonJS(frontend_exports);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
var import_deepMerge = __toESM(require("../../../shared/object/deepMerge"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
var import_express = __toESM(require("express"), 1);
var import_trimLines = __toESM(require("../../../shared/string/trimLines"), 1);
var import_extension = __toESM(require("../../fs/extension"), 1);
var import_packageRootDir = __toESM(require("../../path/packageRootDir"), 1);
const fn = function(args = {}) {
  const settings = (0, import_deepMerge.default)(import_s_sugar_config.default.get("frontend"), args);
  const app = (0, import_express.default)();
  let server;
  return new import_s_promise.default(async ({ resolve, reject, on, emit, pipe }) => {
    Object.keys(settings.staticDirs).forEach((path) => {
      const fsPath = settings.staticDirs[path];
      console.log(path, fsPath);
      app.use(path, import_express.default.static(fsPath));
    });
    const middlewaresObj = settings.middlewares || {};
    for (const [key, middleware] of Object.entries(middlewaresObj)) {
      if (middleware.path.slice(-3) !== ".js")
        middleware.path += ".js";
      middleware.path = import_path.default.resolve(middleware.path);
      if (!import_fs.default.existsSync(middleware.path)) {
        return reject(`The express middleware "<yellow>${key}</yellow>" targeted at "<cyan>${middleware.path}</cyan>" does not exists...`);
      }
      const { default: middlewareData } = await Promise.resolve().then(() => __toESM(require(middleware.path)));
      app.use((middlewareData.default || middlewareData)(middleware.settings || {}));
    }
    Object.keys(settings.handlers).forEach(async (pageName) => {
      const handlerSettings = (0, import_deepMerge.default)({
        log: true
      }, settings.handlers[pageName]);
      let handlerPath = handlerSettings.handler;
      if (handlerPath.slice(-3) !== ".js")
        handlerPath += ".js";
      if (!import_fs.default.existsSync(handlerPath)) {
        emit("warn", {
          value: `Frontend handler "<cyan>${import_path.default.relative((0, import_packageRootDir.default)(), handlerPath)}</cyan>" does not exists...`
        });
      } else {
        let { default: handlerFn } = await Promise.resolve().then(() => __toESM(require(handlerPath)));
        handlerFn = handlerFn.default || handlerFn;
        const method = handlerSettings.method || "get";
        let slug = handlerSettings.slug || "*";
        const extension = handlerSettings.extension ? Array.isArray(handlerSettings.extension) ? Array.isArray(handlerSettings.extension) : [handlerSettings.extension] : null;
        if (slug !== "*") {
          slug = [`${slug}/*`, `${slug}`];
        }
        setTimeout(() => {
          emit("log", {
            value: `Handler <cyan>${pageName}</cyan> "<yellow>${method}:${slug}</yellow>" registered <green>successfully</green>`
          });
        }, 1e3);
        app[method](slug, async (req, res, next) => {
          const reqPathExtension = (0, import_extension.default)(req.path);
          if (extension) {
            if (extension.indexOf(reqPathExtension) === -1 && extension.indexOf("." + reqPathExtension) === -1) {
              return next();
            }
          }
          const handlerPromise = handlerFn(req, res, handlerSettings);
          pipe(handlerPromise);
        });
      }
    });
    server = app.listen(settings.port, settings.hostname, () => {
      setTimeout(() => {
        emit("notification", {
          type: "success",
          title: `frontendServer started`
        });
        emit("log", {
          type: "time"
        });
        emit("log", {
          type: "heading",
          mb: 1,
          value: (0, import_trimLines.default)(`Your <yellow>Frontend Express</yellow> server is <green>up and running</green>:
              
                - Hostname        : <yellow>${settings.hostname}</yellow>
                - Port            : <yellow>${settings.port}</yellow>
                - URL             : <cyan>http://${settings.hostname}:${settings.port}</cyan>`)
        });
      }, 0);
    }).on("error", (e) => {
      const string = e.toString();
      emit("notification", {
        type: "error",
        title: `frontendServer errpr`
      });
      reject(string);
    });
    on("finally", () => {
      server.close();
    });
  }, {
    id: "frontendServer"
  });
};
var frontend_default = fn;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
