import {
  __spreadValues,
  __toESM
} from "../../../../chunk-TD77TI6B.mjs";
import __SLog from "@coffeekraken/s-log";
import __SClass from "@coffeekraken/s-class";
import __SEnv from "@coffeekraken/s-env";
import __SPromise from "@coffeekraken/s-promise";
import __SugarConfig from "@coffeekraken/s-sugar-config";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __compression from "compression";
import __express from "express";
import __fs from "fs";
import __isPortFree from "@coffeekraken/sugar/node/network/utils/isPortFree";
import { createProxyMiddleware } from "http-proxy-middleware";
import __path from "path";
import __SFrontendServerStartParamsInterface from "./interface/SFrontendServerStartParamsInterface";
import __kill from "@coffeekraken/sugar/node/process/kill";
import __SDuration from "@coffeekraken/s-duration";
import __onProcessExit from "@coffeekraken/sugar/node/process/onProcessExit";
class SFrontendServer extends __SClass {
  constructor() {
    super();
  }
  start(params) {
    const finalParams = __SFrontendServerStartParamsInterface.apply(params);
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
      var _a;
      const express = __express();
      if (finalParams.prod || __SEnv.is("production")) {
        express.use(__compression());
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
      const frontendServerConfig = __SugarConfig.get("frontendServer");
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
          let module;
          try {
            module = await Promise.resolve().then(() => __toESM(require(moduleObj.path)));
          } catch (e) {
            console.log(e);
            throw new Error(`<red>${this.constructor.name}</red> Sorry but a module called "<yellow>startServer.${moduleId}</yellow>" has been registered but does not exists under "<cyan>${moduleObj.path}</cyan>"`);
          }
          await pipe(module.default(express, moduleObj.settings, frontendServerConfig));
        }
      }
      if (frontendServerConfig.proxy) {
        Object.keys(frontendServerConfig.proxy).forEach((proxyId) => {
          var _a2;
          const proxyObj = frontendServerConfig.proxy[proxyId];
          express.use(createProxyMiddleware(proxyObj.route, __spreadValues({
            logLevel: "silent"
          }, (_a2 = proxyObj.settings) != null ? _a2 : {})));
        });
      }
      if (frontendServerConfig.staticDirs) {
        Object.keys(frontendServerConfig.staticDirs).forEach((dir) => {
          const fsPath = frontendServerConfig.staticDirs[dir];
          emit("log", {
            value: `<cyan>[static]</cyan> Exposing static folder "<cyan>${__path.relative(process.cwd(), fsPath)}</cyan>" behind "<yellow>${dir}</yellow>" url`
          });
          express.use(dir, __express.static(fsPath));
        });
      }
      if (frontendServerConfig.middlewares) {
        for (let i = 0; i < Object.keys(frontendServerConfig.middlewares).length; i++) {
          const middlewareName = Object.keys(frontendServerConfig.middlewares)[i];
          const middlewareObj = frontendServerConfig.middlewares[middlewareName];
          if (!middlewareObj.path || __fs.existsSync(middlewareObj.path)) {
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
          const duration = new __SDuration();
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
              req = __deepMerge(req, routeObj.request);
            }
            return pipe(handlerFn(req, res, next));
          });
        });
      }
      if (!await __isPortFree(frontendServerConfig.port)) {
        emit("log", {
          value: `Port <yellow>${frontendServerConfig.port}</yellow> already in use. Try to kill it before continue...`
        });
        await __kill(`:${frontendServerConfig.port}`);
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
          type: __SLog.TYPE_VERBOSE,
          value: `Root directory: <cyan>${finalParams.rootDir}</cyan>`
        });
        emit("log", {
          type: __SLog.TYPE_VERBOSE,
          value: `Log level: <yellow>${finalParams.logLevel}</yellow>`
        });
      });
      __onProcessExit(() => {
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
export {
  SFrontendServer as default
};
