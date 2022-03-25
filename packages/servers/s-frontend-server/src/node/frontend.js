var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
import __SugarConfig from "@coffeekraken/s-sugar-config";
import __deepMerge from "../../../shared/object/deepMerge";
import __fs from "fs";
import __path from "path";
import __SPromise from "@coffeekraken/s-promise";
import __express from "express";
import __trimLines from "../../../shared/string/trimLines";
import __extension from "../../fs/extension";
import __packageRootDir from "../../path/packageRootDir";
const fn = function(args = {}) {
  const settings = __deepMerge(__SugarConfig.get("frontend"), args);
  const app = __express();
  let server;
  return new __SPromise(async ({ resolve, reject, on, emit, pipe }) => {
    Object.keys(settings.staticDirs).forEach((path) => {
      const fsPath = settings.staticDirs[path];
      console.log(path, fsPath);
      app.use(path, __express.static(fsPath));
    });
    const middlewaresObj = settings.middlewares || {};
    for (const [key, middleware] of Object.entries(middlewaresObj)) {
      if (middleware.path.slice(-3) !== ".js")
        middleware.path += ".js";
      middleware.path = __path.resolve(middleware.path);
      if (!__fs.existsSync(middleware.path)) {
        return reject(`The express middleware "<yellow>${key}</yellow>" targeted at "<cyan>${middleware.path}</cyan>" does not exists...`);
      }
      const { default: middlewareData } = await Promise.resolve().then(() => __toESM(require(middleware.path)));
      app.use((middlewareData.default || middlewareData)(middleware.settings || {}));
    }
    Object.keys(settings.handlers).forEach(async (pageName) => {
      const handlerSettings = __deepMerge({
        log: true
      }, settings.handlers[pageName]);
      let handlerPath = handlerSettings.handler;
      if (handlerPath.slice(-3) !== ".js")
        handlerPath += ".js";
      if (!__fs.existsSync(handlerPath)) {
        emit("warn", {
          value: `Frontend handler "<cyan>${__path.relative(__packageRootDir(), handlerPath)}</cyan>" does not exists...`
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
          const reqPathExtension = __extension(req.path);
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
          value: __trimLines(`Your <yellow>Frontend Express</yellow> server is <green>up and running</green>:
              
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
export {
  frontend_default as default
};
