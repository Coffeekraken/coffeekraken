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
var SVite_exports = {};
__export(SVite_exports, {
  default: () => SVite
});
module.exports = __toCommonJS(SVite_exports);
var import_s_class = __toESM(require("@coffeekraken/s-class"));
var import_s_duration = __toESM(require("@coffeekraken/s-duration"));
var import_s_file = __toESM(require("@coffeekraken/s-file"));
var import_s_promise = __toESM(require("@coffeekraken/s-promise"));
var import_s_riotjs_plugin_postcss_preprocessor = __toESM(require("@coffeekraken/s-riotjs-plugin-postcss-preprocessor"));
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"));
var import_writeFileSync = __toESM(require("@coffeekraken/sugar/node/fs/writeFileSync"));
var import_listNodeModulesPackages = __toESM(require("@coffeekraken/sugar/node/npm/utils/listNodeModulesPackages"));
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"));
var import_path = __toESM(require("path"));
var import_rollup_plugin_analyzer = __toESM(require("rollup-plugin-analyzer"));
var import_rollup_plugin_uglify = require("rollup-plugin-uglify");
var import_vite = require("vite");
var import_internalWatcherReloadPlugin = __toESM(require("./plugins/internalWatcherReloadPlugin"));
var import_rewritesPlugin = __toESM(require("./plugins/rewritesPlugin"));
var import_SViteStartParamsInterface = __toESM(require("./interface/SViteStartParamsInterface"));
var import_kill = __toESM(require("@coffeekraken/sugar/node/process/kill"));
var import_isPortFree = __toESM(require("@coffeekraken/sugar/node/network/utils/isPortFree"));
var import_SViteBuildParamsInterface = __toESM(require("./interface/SViteBuildParamsInterface"));
var import_s_log = __toESM(require("@coffeekraken/s-log"));
class SVite extends import_s_class.default {
  get viteSettings() {
    return this._settings.vite;
  }
  constructor(settings) {
    super((0, import_deepMerge.default)({
      vite: {}
    }, settings != null ? settings : {}));
    (0, import_s_riotjs_plugin_postcss_preprocessor.default)(import_s_sugar_config.default.get("postcss.plugins"));
  }
  start(params) {
    return new import_s_promise.default(async ({ resolve, reject, emit }) => {
      var _a, _b;
      const config = __spreadValues({
        configFile: false
      }, import_s_sugar_config.default.get("vite"));
      if (!config.plugins)
        config.plugins = [];
      config.plugins.unshift((0, import_rewritesPlugin.default)((_a = config.rewrites) != null ? _a : []));
      config.plugins.unshift((0, import_internalWatcherReloadPlugin.default)());
      const plugins = [];
      for (let i = 0; i < config.plugins.length; i++) {
        const p = config.plugins[i];
        if (typeof p === "string") {
          const { default: plug } = await Promise.resolve().then(() => __toESM(require(p)));
          plugins.push((_b = plug.default) != null ? _b : plug);
        } else {
          plugins.push(p);
        }
      }
      config.plugins = plugins;
      if (!await (0, import_isPortFree.default)(config.server.port)) {
        emit("log", {
          type: import_s_log.default.TYPE_WARN,
          value: `Port <yellow>${config.server.port}</yellow> already in use. Try to kill it before continue...`
        });
        await (0, import_kill.default)(`:${config.server.port}`);
      }
      const server = await (0, import_vite.createServer)(config);
      let listen;
      try {
        listen = await server.listen();
      } catch (e) {
        console.log("ERRROR", e);
      }
      emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: [
          `<yellow>Vite</yellow> server started <green>successfully</green>`
        ].join("\n")
      });
      emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: [
          `<yellow>http://${config.server.host}</yellow>:<cyan>${config.server.port}</cyan>`
        ].join("\n")
      });
    }, {
      metas: {
        id: this.metas.id
      }
    });
  }
  build(params) {
    return new import_s_promise.default(async ({ resolve, reject, emit, pipe }) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      const viteConfig = import_s_sugar_config.default.get("vite");
      const duration = new import_s_duration.default();
      const finalParams = import_SViteBuildParamsInterface.default.apply(params);
      const results = {};
      if (finalParams.lib && finalParams.type.indexOf("lib") === -1)
        finalParams.type = ["lib"];
      if (finalParams.bundle && finalParams.type.indexOf("bundle") === -1)
        finalParams.type = ["bundle"];
      for (let i = 0; i < finalParams.type.length; i++) {
        const buildType = finalParams.type[i];
        const buildParams = (0, import_deepMerge.default)(Object.assign(finalParams), {});
        if (buildType === "lib") {
          buildParams.minify = true;
        }
        if (buildParams.prod) {
          buildParams.minify = true;
        }
        const config = (0, import_deepMerge.default)(viteConfig, {
          logLevel: "silent",
          build: {
            watch: buildParams.watch ? {} : false,
            target: (_a = buildParams.target) != null ? _a : "modules",
            write: false,
            minify: buildParams.minify,
            cssCodeSplit: false,
            rollupOptions: {
              input: buildParams.input,
              external: [],
              plugins: [],
              output: {
                compact: true,
                manualChunks(id) {
                  return "index";
                }
              }
            }
          }
        });
        if (buildType.toLowerCase() !== "lib") {
          delete config.build.lib;
        }
        if (buildParams.minify) {
          config.build.rollupOptions.plugins.push((0, import_rollup_plugin_uglify.uglify)());
        }
        if (buildParams.analyze) {
          config.build.rollupOptions.plugins.push((0, import_rollup_plugin_analyzer.default)({
            limit: 10,
            summaryOnly: true
          }));
        }
        if (!config.plugins)
          config.plugins = [];
        config.plugins.unshift((0, import_rewritesPlugin.default)((_b = config.rewrites) != null ? _b : []));
        const plugins = [];
        for (let i2 = 0; i2 < config.plugins.length; i2++) {
          const p = config.plugins[i2];
          if (typeof p === "string") {
            const { default: plug } = await Promise.resolve().then(() => __toESM(require(p)));
            plugins.push((_c = plug.default) != null ? _c : plug);
          } else {
            plugins.push(p);
          }
        }
        config.plugins = plugins;
        if (buildParams.prod) {
          config.mode = "production";
        }
        if (buildType.toLowerCase() === "bundle") {
          config.build.target = (_d = buildParams.target) != null ? _d : "es2015";
        } else if (buildType.toLowerCase() === "lib") {
          config.build.target = (_e = buildParams.target) != null ? _e : "esnext";
        } else if (buildType.toLowerCase() === "module") {
          config.build.target = (_f = buildParams.target) != null ? _f : "modules";
        }
        if (buildType.toLowerCase() === "lib") {
          config.build.rollupOptions.external = [
            ...(_g = config.build.rollupOptions.external) != null ? _g : [],
            ...Object.keys((0, import_listNodeModulesPackages.default)({ monorepo: true })).filter((item) => {
              return !item.match(/^(\/|\.)/);
            }).map((item) => {
              return new RegExp(`^${item}`);
            })
          ];
        }
        let finalFormats = buildParams.format;
        if (!buildParams.format.length) {
          switch (buildType) {
            case "bundle":
              finalFormats = ["iife"];
              break;
            case "module":
            case "lib":
              finalFormats = ["es"];
              break;
          }
        }
        const outputs = [];
        let outputsFilenames = [];
        finalFormats.forEach((format) => {
          var _a2;
          outputs.push((0, import_deepMerge.default)(__spreadValues({
            dir: import_path.default.resolve(viteConfig.build.outDir),
            format
          }, (_a2 = config.build.rollupOptions.output) != null ? _a2 : {})));
          outputsFilenames.push(`${buildType === "bundle" ? "index" : buildType}.${format}.js`);
        });
        emit("log", {
          type: import_s_log.default.TYPE_INFO,
          value: `<yellow>[build]</yellow> Starting "<magenta>${buildType}</magenta>" build`
        });
        emit("log", {
          type: import_s_log.default.TYPE_INFO,
          value: `<yellow>\u25CB</yellow> Environment : ${buildParams.prod ? "<green>production</green>" : "<yellow>development</yellow>"}`
        });
        outputsFilenames.forEach((filename) => {
          emit("log", {
            type: import_s_log.default.TYPE_INFO,
            value: `<yellow>\u25CB</yellow> Output      : <cyan>${import_path.default.relative(process.cwd(), `${import_path.default.resolve(viteConfig.build.outDir)}/${filename}`)}</cyan>`
          });
        });
        emit("log", {
          type: import_s_log.default.TYPE_INFO,
          value: `<yellow>\u25CB</yellow> Type        : ${buildType.toLowerCase()}`
        });
        emit("log", {
          type: import_s_log.default.TYPE_INFO,
          value: `<yellow>\u25CB</yellow> Target      : ${config.build.target}`
        });
        emit("log", {
          type: import_s_log.default.TYPE_INFO,
          value: `<yellow>\u25CB</yellow> Format(s)   : ${finalFormats.join(",")}`
        });
        config.build.rollupOptions.output = outputs;
        const res = await (0, import_vite.build)(config);
        if (((_h = res.constructor) == null ? void 0 : _h.name) === "WatchEmitter") {
          res.on("change", async () => {
            emit("log", {
              type: import_s_log.default.TYPE_INFO,
              value: `<yellow>[watch]</yellow> Update detected. Re-building...`
            });
            await pipe(this.build(__spreadProps(__spreadValues({}, params), {
              watch: false,
              verbose: false
            })));
            emit("log", {
              type: import_s_log.default.TYPE_INFO,
              value: `<cyan>[watch]</cyan> Watching for changes...`
            });
          });
          await pipe(this.build(__spreadProps(__spreadValues({}, params), {
            watch: false,
            verbose: false
          })));
          emit("log", {
            type: import_s_log.default.TYPE_INFO,
            value: `<cyan>[watch]</cyan> Watching for changes...`
          });
          return;
        }
        let outCode = res[0].output[0].code;
        const cssVarMatches = outCode.match(/var\s[a-zA-Z0-9-_]+type_style[a-zA-Z0-9-_]+/gm);
        if (cssVarMatches) {
          cssVarMatches.forEach((match) => {
            const varName = match.replace(/var\s?/, "").trim();
            const injectCode = `
                var $style = document.querySelector('style#${varName}');
                if (!$style) {
                  $style = document.createElement('style');
                  $style.setAttribute('id', '${varName}');
                  $style.type = 'text/css';
                  $style.appendChild(document.createTextNode(${varName}));
                  document.head.appendChild($style);
                }
              `;
            outCode += injectCode;
            res[0].output[0].code = outCode;
          });
        }
        results[buildType] = res;
        if (!buildParams.noWrite) {
          res.forEach((bundleObj, i2) => {
            const output = bundleObj.output[0];
            const baseOutputConfig = outputs[i2], baseOutputFilenames = outputsFilenames[i2];
            (0, import_writeFileSync.default)(`${baseOutputConfig.dir}/${baseOutputFilenames}`, output.code);
            const file = new import_s_file.default(`${baseOutputConfig.dir}/${baseOutputFilenames}`);
            emit("log", {
              type: import_s_log.default.TYPE_INFO,
              value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`
            });
          });
        }
      }
      emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: `<green>[success]</green> Build completed <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`
      });
      resolve(results);
    }, {
      metas: {
        id: this.metas.id
      }
    });
  }
}
SVite.interfaces = {
  startParams: import_SViteStartParamsInterface.default
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
