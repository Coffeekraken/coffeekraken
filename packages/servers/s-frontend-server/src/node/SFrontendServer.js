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
var SFrontendServer_exports = {};
__export(SFrontendServer_exports, {
  default: () => SFrontendServer
});
module.exports = __toCommonJS(SFrontendServer_exports);
var import_s_log = __toESM(require("@coffeekraken/s-log"), 1);
var import_s_class = __toESM(require("@coffeekraken/s-class"), 1);
var import_s_env = __toESM(require("@coffeekraken/s-env"), 1);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_compression = __toESM(require("compression"), 1);
var import_express = __toESM(require("express"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_isPortFree = __toESM(require("@coffeekraken/sugar/node/network/utils/isPortFree"), 1);
var import_http_proxy_middleware = require("http-proxy-middleware");
var import_path = __toESM(require("path"), 1);
var import_SFrontendServerStartParamsInterface = __toESM(require("./interface/SFrontendServerStartParamsInterface"), 1);
var import_kill = __toESM(require("@coffeekraken/sugar/node/process/kill"), 1);
var import_s_duration = __toESM(require("@coffeekraken/s-duration"), 1);
var import_onProcessExit = __toESM(require("@coffeekraken/sugar/node/process/onProcessExit"), 1);
class SFrontendServer extends import_s_class.default {
  constructor() {
    super();
  }
  start(params) {
    const finalParams = import_SFrontendServerStartParamsInterface.default.apply(params);
    return new import_s_promise.default(async ({ resolve, reject, emit, pipe }) => {
      var _a;
      const express = (0, import_express.default)();
      if (finalParams.prod || import_s_env.default.is("production")) {
        express.use((0, import_compression.default)());
      }
      setTimeout(() => {
        emit("info", {
          value: "COCO"
        });
      }, 3e3);
      const logLevelInt = [
        "silent",
        "error",
        "warn",
        "debug",
        "info",
        "verbose",
        "silly"
      ].indexOf(finalParams.logLevel);
      const frontendServerConfig = import_s_sugar_config.default.get("frontendServer");
      express.use((req, res, next) => {
        if (req.path.substr(-1) == "/" && req.path.length > 1) {
          const query = req.url.slice(req.path.length);
          res.redirect(301, req.path.slice(0, -1) + query);
        } else {
          next();
        }
      });
      if (frontendServerConfig.modules) {
        for (let i = 0; i < Object.keys(frontendServerConfig.modules).length; i++) {
          const moduleId = Object.keys(frontendServerConfig.modules)[i];
          const moduleObj = frontendServerConfig.modules[moduleId];
          let module2;
          try {
            module2 = await Promise.resolve().then(() => __toESM(require(moduleObj.path)));
          } catch (e) {
            console.log(e);
            throw new Error(`<red>${this.constructor.name}</red> Sorry but a module called "<yellow>startServer.${moduleId}</yellow>" has been registered but does not exists under "<cyan>${moduleObj.path}</cyan>"`);
          }
          await pipe(module2.default(express, moduleObj.settings, frontendServerConfig));
        }
      }
      if (frontendServerConfig.proxy) {
        Object.keys(frontendServerConfig.proxy).forEach((proxyId) => {
          var _a2;
          const proxyObj = frontendServerConfig.proxy[proxyId];
          express.use((0, import_http_proxy_middleware.createProxyMiddleware)(proxyObj.route, __spreadValues({
            logLevel: "silent"
          }, (_a2 = proxyObj.settings) != null ? _a2 : {})));
        });
      }
      if (frontendServerConfig.staticDirs) {
        Object.keys(frontendServerConfig.staticDirs).forEach((dir) => {
          const fsPath = frontendServerConfig.staticDirs[dir];
          emit("log", {
            value: `<cyan>[static]</cyan> Exposing static folder "<cyan>${import_path.default.relative(process.cwd(), fsPath)}</cyan>" behind "<yellow>${dir}</yellow>" url`
          });
          express.use(dir, import_express.default.static(fsPath));
        });
      }
      if (frontendServerConfig.middlewares) {
        for (let i = 0; i < Object.keys(frontendServerConfig.middlewares).length; i++) {
          const middlewareName = Object.keys(frontendServerConfig.middlewares)[i];
          const middlewareObj = frontendServerConfig.middlewares[middlewareName];
          if (!middlewareObj.path || import_fs.default.existsSync(middlewareObj.path)) {
            throw new Error(`<red>[${this.constructor.name}.start]</red> Sorry but the middleware named "<yellow>${middlewareName}</yellow>" seems to not exists or is missconfigured...`);
          }
          const { default: middlewareWrapperFn } = await Promise.resolve().then(() => __toESM(require(middlewareObj.path)));
          const middleware = middlewareWrapperFn((_a = middlewareObj.settings) != null ? _a : {});
          express.use((req, res, next) => {
            return pipe(middleware(req, res, next));
          });
        }
      }
      if (logLevelInt >= 4) {
        express.use((req, res, next) => {
          const duration = new import_s_duration.default();
          function afterResponse() {
            emit("log", {
              value: `<cyan>[request]</cyan> Request on "<cyan>${req.url}</cyan>" served in <yellow>${duration.end().formatedDuration}</yellow>`
            });
          }
          res.on("finish", afterResponse);
          next();
        });
      }
      if (frontendServerConfig.routes) {
        Object.keys(frontendServerConfig.routes).forEach(async (routeSlug) => {
          const routeObj = frontendServerConfig.routes[routeSlug];
          const handlerObj = frontendServerConfig.handlers[routeObj.handler];
          const handlerPath = handlerObj.path;
          if (!handlerPath) {
            return;
          }
          const { default: handlerFn } = await Promise.resolve().then(() => __toESM(require(handlerPath)));
          express.get(routeSlug, (req, res, next) => {
            if (routeObj.request) {
              req = (0, import_deepMerge.default)(req, routeObj.request);
            }
            return pipe(handlerFn(req, res, next));
          });
        });
      }
      if (!await (0, import_isPortFree.default)(frontendServerConfig.port)) {
        emit("log", {
          value: `Port <yellow>${frontendServerConfig.port}</yellow> already in use. Try to kill it before continue...`
        });
        await (0, import_kill.default)(`:${frontendServerConfig.port}`);
      }
      const server = express.listen(frontendServerConfig.port, () => {
        emit("log", {
          group: `s-frontend-server-${this.metas.id}`,
          value: `<yellow>Frontend server</yellow> started <green>successfully</green>`
        });
        emit("log", {
          group: `s-frontend-server-${this.metas.id}`,
          value: `<yellow>http://${finalParams.hostname}</yellow>:<cyan>${finalParams.port}</cyan>`
        });
        emit("log", {
          type: import_s_log.default.TYPE_VERBOSE,
          value: `Root directory: <cyan>${finalParams.rootDir}</cyan>`
        });
        emit("log", {
          type: import_s_log.default.TYPE_VERBOSE,
          value: `Log level: <yellow>${finalParams.logLevel}</yellow>`
        });
      });
      (0, import_onProcessExit.default)(() => {
        emit("log", {
          value: `<red>[kill]</red> Gracefully killing the frontend server...`
        });
        return new Promise((resolve2) => {
          server.close(() => {
            resolve2();
          });
        });
      });
    }, {
      eventEmitter: {
        bind: this
      }
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
