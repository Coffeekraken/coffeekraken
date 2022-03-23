import {
  __spreadProps,
  __spreadValues,
  __toESM
} from "../../../../chunk-TD77TI6B.mjs";
import __SClass from "@coffeekraken/s-class";
import __SDuration from "@coffeekraken/s-duration";
import __SFile from "@coffeekraken/s-file";
import __SPromise from "@coffeekraken/s-promise";
import __sRiotjsPluginPostcssPreprocessor from "@coffeekraken/s-riotjs-plugin-postcss-preprocessor";
import __SugarConfig from "@coffeekraken/s-sugar-config";
import __writeFileSync from "@coffeekraken/sugar/node/fs/writeFileSync";
import __listNodeModulesPackages from "@coffeekraken/sugar/node/npm/utils/listNodeModulesPackages";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __path from "path";
import __rollupAnalyzerPlugin from "rollup-plugin-analyzer";
import { uglify as __uglifyPlugin } from "rollup-plugin-uglify";
import { build as __viteBuild, createServer as __viteServer } from "vite";
import __sInternalWatcherReloadVitePlugin from "./plugins/internalWatcherReloadPlugin";
import __rewritesPlugin from "./plugins/rewritesPlugin";
import __SViteStartParamsInterface from "./interface/SViteStartParamsInterface";
import __kill from "@coffeekraken/sugar/node/process/kill";
import __isPortFree from "@coffeekraken/sugar/node/network/utils/isPortFree";
import __SViteBuildParamsInterface from "./interface/SViteBuildParamsInterface";
import __SLog from "@coffeekraken/s-log";
class SVite extends __SClass {
  get viteSettings() {
    return this._settings.vite;
  }
  constructor(settings) {
    super(__deepMerge({
      vite: {}
    }, settings != null ? settings : {}));
    __sRiotjsPluginPostcssPreprocessor(__SugarConfig.get("postcss.plugins"));
  }
  start(params) {
    return new __SPromise(async ({ resolve, reject, emit }) => {
      var _a, _b;
      const config = __spreadValues({
        configFile: false
      }, __SugarConfig.get("vite"));
      if (!config.plugins)
        config.plugins = [];
      config.plugins.unshift(__rewritesPlugin((_a = config.rewrites) != null ? _a : []));
      config.plugins.unshift(__sInternalWatcherReloadVitePlugin());
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
      if (!await __isPortFree(config.server.port)) {
        emit("log", {
          type: __SLog.TYPE_WARN,
          value: `Port <yellow>${config.server.port}</yellow> already in use. Try to kill it before continue...`
        });
        await __kill(`:${config.server.port}`);
      }
      const server = await __viteServer(config);
      let listen;
      try {
        listen = await server.listen();
      } catch (e) {
        console.log("ERRROR", e);
      }
      emit("log", {
        type: __SLog.TYPE_INFO,
        value: [
          `<yellow>Vite</yellow> server started <green>successfully</green>`
        ].join("\n")
      });
      emit("log", {
        type: __SLog.TYPE_INFO,
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
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      const viteConfig = __SugarConfig.get("vite");
      const duration = new __SDuration();
      const finalParams = __SViteBuildParamsInterface.apply(params);
      const results = {};
      if (finalParams.lib && finalParams.type.indexOf("lib") === -1)
        finalParams.type = ["lib"];
      if (finalParams.bundle && finalParams.type.indexOf("bundle") === -1)
        finalParams.type = ["bundle"];
      for (let i = 0; i < finalParams.type.length; i++) {
        const buildType = finalParams.type[i];
        const buildParams = __deepMerge(Object.assign(finalParams), {});
        if (buildType === "lib") {
          buildParams.minify = true;
        }
        if (buildParams.prod) {
          buildParams.minify = true;
        }
        const config = __deepMerge(viteConfig, {
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
          config.build.rollupOptions.plugins.push(__uglifyPlugin());
        }
        if (buildParams.analyze) {
          config.build.rollupOptions.plugins.push(__rollupAnalyzerPlugin({
            limit: 10,
            summaryOnly: true
          }));
        }
        if (!config.plugins)
          config.plugins = [];
        config.plugins.unshift(__rewritesPlugin((_b = config.rewrites) != null ? _b : []));
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
            ...Object.keys(__listNodeModulesPackages({ monorepo: true })).filter((item) => {
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
          outputs.push(__deepMerge(__spreadValues({
            dir: __path.resolve(viteConfig.build.outDir),
            format
          }, (_a2 = config.build.rollupOptions.output) != null ? _a2 : {})));
          outputsFilenames.push(`${buildType === "bundle" ? "index" : buildType}.${format}.js`);
        });
        emit("log", {
          type: __SLog.TYPE_INFO,
          value: `<yellow>[build]</yellow> Starting "<magenta>${buildType}</magenta>" build`
        });
        emit("log", {
          type: __SLog.TYPE_INFO,
          value: `<yellow>\u25CB</yellow> Environment : ${buildParams.prod ? "<green>production</green>" : "<yellow>development</yellow>"}`
        });
        outputsFilenames.forEach((filename) => {
          emit("log", {
            type: __SLog.TYPE_INFO,
            value: `<yellow>\u25CB</yellow> Output      : <cyan>${__path.relative(process.cwd(), `${__path.resolve(viteConfig.build.outDir)}/${filename}`)}</cyan>`
          });
        });
        emit("log", {
          type: __SLog.TYPE_INFO,
          value: `<yellow>\u25CB</yellow> Type        : ${buildType.toLowerCase()}`
        });
        emit("log", {
          type: __SLog.TYPE_INFO,
          value: `<yellow>\u25CB</yellow> Target      : ${config.build.target}`
        });
        emit("log", {
          type: __SLog.TYPE_INFO,
          value: `<yellow>\u25CB</yellow> Format(s)   : ${finalFormats.join(",")}`
        });
        config.build.rollupOptions.output = outputs;
        const res = await __viteBuild(config);
        if (((_h = res.constructor) == null ? void 0 : _h.name) === "WatchEmitter") {
          res.on("change", async () => {
            emit("log", {
              type: __SLog.TYPE_INFO,
              value: `<yellow>[watch]</yellow> Update detected. Re-building...`
            });
            await pipe(this.build(__spreadProps(__spreadValues({}, params), {
              watch: false,
              verbose: false
            })));
            emit("log", {
              type: __SLog.TYPE_INFO,
              value: `<cyan>[watch]</cyan> Watching for changes...`
            });
          });
          await pipe(this.build(__spreadProps(__spreadValues({}, params), {
            watch: false,
            verbose: false
          })));
          emit("log", {
            type: __SLog.TYPE_INFO,
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
            __writeFileSync(`${baseOutputConfig.dir}/${baseOutputFilenames}`, output.code);
            const file = new __SFile(`${baseOutputConfig.dir}/${baseOutputFilenames}`);
            emit("log", {
              type: __SLog.TYPE_INFO,
              value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`
            });
          });
        }
      }
      emit("log", {
        type: __SLog.TYPE_INFO,
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
  startParams: __SViteStartParamsInterface
};
export {
  SVite as default
};
