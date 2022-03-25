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
var frontendServer_config_exports = {};
__export(frontendServer_config_exports, {
  default: () => frontendServer_config_default
});
module.exports = __toCommonJS(frontendServer_config_exports);
var import_dirname = __toESM(require("@coffeekraken/sugar/node/fs/dirname"));
function frontendServer_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    port: env.env === "production" ? 9090 : 8080,
    hostname: "127.0.0.1",
    rootDir: `[config.storage.package.rootDir]`,
    staticDirs: {
      "/dist": env.env === "production" ? `[config.storage.dist.rootDir]` : `[config.storage.src.rootDir]`
    },
    viewsDir: `[config.storage.src.rootDir]/views`,
    logLevel: "info",
    proxy: {},
    middlewares: {
      bench: {
        description: `Track how many times take a request`,
        path: `${(0, import_dirname.default)()}/../node/middleware/benchMiddleware`,
        settings: {}
      },
      request: {
        description: `Inject the "request" object for views`,
        path: `${(0, import_dirname.default)()}/../node/middleware/requestMiddleware`,
        settings: {}
      },
      env: {
        description: `Inject an "env" object for the views`,
        path: `${(0, import_dirname.default)()}/../node/middleware/envMiddleware`,
        settings: {}
      },
      packageJson: {
        description: `Inject a "packageJson" object for the views`,
        path: `${(0, import_dirname.default)()}/../node/middleware/packageJsonMiddleware`,
        settings: {}
      }
    },
    modules: {
      docmap: {
        description: 'This module gives you access to a "docmap" object in the views',
        path: `${(0, import_dirname.default)()}/../node/modules/docmap/docmap`,
        settings: {}
      },
      redirect: {
        description: "This module allows you to make redirections depending on requested path",
        path: `${(0, import_dirname.default)()}/../node/modules/redirect/redirect`,
        settings: {}
      },
      styleguide: {
        description: "This module handle the /styleguide/... views display",
        path: `${(0, import_dirname.default)()}/../node/modules/styleguide/styleguide`,
        settings: {}
      },
      config: {
        description: 'This module gives you access to a "config" and a "configFiles" object into the views',
        path: `${(0, import_dirname.default)()}/../node/modules/config/config`,
        settings: {}
      },
      frontspec: {
        description: 'This module gives you access to a "frontspec" object into the views',
        path: `${(0, import_dirname.default)()}/../node/modules/frontspec/frontspec`,
        settings: {}
      },
      api: {
        description: "This module handle the /api/... views display",
        path: `${(0, import_dirname.default)()}/../node/modules/api/api`,
        settings: {}
      },
      view: {
        description: "This module handle the /view/... views display",
        path: `${(0, import_dirname.default)()}/../node/modules/view/view`,
        settings: {
          slug: "/view/*",
          indexView: "index"
        }
      }
    },
    routes: {
      "/": {
        handler: "view"
      },
      "/docmap.json": {
        handler: "docmap"
      }
    },
    handlers: {
      doc: {
        description: `Display some documentation sourced from markdown files`,
        path: `${(0, import_dirname.default)()}/../node/handlers/doc`
      },
      markdown: {
        description: `Display some documentation sourced from markdown files`,
        path: `${(0, import_dirname.default)()}/../node/handlers/markdown`
      },
      docmap: {
        description: `Serve some docmap item(s) depending on request`,
        path: `${(0, import_dirname.default)()}/../node/handlers/docmap`
      }
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
