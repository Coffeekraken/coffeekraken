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
var vite_config_exports = {};
__export(vite_config_exports, {
  default: () => vite_config_default,
  preprocess: () => preprocess
});
module.exports = __toCommonJS(vite_config_exports);
var import_path = __toESM(require("path"));
var import_dirname = __toESM(require("@coffeekraken/sugar/node/fs/dirname"));
var import_loadConfigFile = __toESM(require("@coffeekraken/sugar/node/config/loadConfigFile"));
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"));
async function preprocess(env, rawViteConfig, rawConfig) {
  var _a;
  const config = (_a = await (0, import_loadConfigFile.default)("vite.config.js")) != null ? _a : {};
  return (0, import_deepMerge.default)(rawViteConfig, config);
}
function vite_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    root: "[config.storage.package.rootDir]",
    base: "/",
    logLevel: "error",
    mode: "development",
    resolve: {
      alias: {
        static: "",
        vue: "vue/dist/vue.esm-bundler.js"
      }
    },
    plugins: [
      import_path.default.resolve(`${(0, import_dirname.default)()}/../node/plugins/sugarPlugin`),
      import_path.default.resolve(`${(0, import_dirname.default)()}/../node/plugins/postcssPlugin`)
    ],
    publicDir: "[config.storage.src.rootDir]/public",
    cacheDir: "[config.storage.package.cacheDir]/vite",
    clearScreen: false,
    optimizeDeps: {
      entries: ["index.html"]
    },
    build: {
      lib: {
        entry: "[config.storage.src.rootDir]/js/index.ts",
        name: "index"
      },
      outDir: "[config.storage.dist.jsDir]"
    },
    server: {
      host: "127.0.0.1",
      port: 3e3,
      hostname: "http://[config.vite.server.host]:[config.vite.server.port]",
      proxy: {
        "^(?:(?!\\.css|\\.ts|\\.js(?!on)|\\.tsx|\\.jsx|\\.mjs|@vite|\\.local|@fs|__vite_ping|index.html).)*$": {
          target: `http://localhost:8080`,
          changeOrigin: true
        },
        "/dist": {
          target: `http://localhost:3000`,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => {
            return path.replace(/\/dist\//, "/src/");
          }
        }
      }
    },
    css: {},
    rewrites: [
      import_path.default.resolve(`${(0, import_dirname.default)()}/../node/rewrites/handlebars`)
    ]
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  preprocess
});
