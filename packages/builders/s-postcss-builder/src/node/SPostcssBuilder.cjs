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
var SPostcssBuilder_exports = {};
__export(SPostcssBuilder_exports, {
  default: () => SPostcssBuilder
});
module.exports = __toCommonJS(SPostcssBuilder_exports);
var import_s_builder = __toESM(require("@coffeekraken/s-builder"), 1);
var import_s_file = __toESM(require("@coffeekraken/s-file"), 1);
var import_s_glob = __toESM(require("@coffeekraken/s-glob"), 1);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
var import_writeFileSync = __toESM(require("@coffeekraken/sugar/node/fs/writeFileSync"), 1);
var import_expandPleasantCssClassnames = __toESM(require("@coffeekraken/sugar/shared/html/expandPleasantCssClassnames"), 1);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_s_log = __toESM(require("@coffeekraken/s-log"), 1);
var import_csso = __toESM(require("csso"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_SPostcssBuilderBuildParamsInterface = __toESM(require("./interface/SPostcssBuilderBuildParamsInterface"), 1);
var import_postcss = __toESM(require("postcss"), 1);
var import_purgecss = require("purgecss");
var import_jsonSync = __toESM(require("@coffeekraken/sugar/node/package/jsonSync"), 1);
var import_resolvePackagePath = __toESM(require("@coffeekraken/sugar/node/esm/resolvePackagePath"), 1);
var import_s_duration = __toESM(require("@coffeekraken/s-duration"), 1);
class SPostcssBuilder extends import_s_builder.default {
  get postcssBuilderSettings() {
    return this._settings.postcssBuilder;
  }
  constructor(settings) {
    super((0, import_deepMerge.default)({
      postcssBuilder: __spreadValues({}, import_s_sugar_config.default.get("postcssBuilder"))
    }, settings != null ? settings : {}));
  }
  _build(params) {
    return new import_s_promise.default(async ({ resolve, reject, emit }) => {
      var _a, _b;
      let finalCss;
      const defaultParams = import_SPostcssBuilderBuildParamsInterface.default.defaults();
      if (params.prod) {
        params.minify = true;
        params.purge = true;
      }
      let src = params.input, from = void 0;
      try {
        src = import_fs.default.readFileSync(params.input, "utf8").toString();
        from = params.input;
      } catch (e) {
      }
      emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: `<yellow>[build]</yellow> Starting Postcss Build`
      });
      emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: `<yellow>\u25CB</yellow> Environment : ${params.prod ? "<green>production</green>" : "<yellow>development</yellow>"}`
      });
      if (params.output) {
        emit("log", {
          type: import_s_log.default.TYPE_INFO,
          value: `<yellow>\u25CB</yellow> Output      : <cyan>${import_path.default.relative(process.cwd(), params.output)}</cyan>`
        });
      }
      if (params.saveDev && params.output) {
        emit("log", {
          type: import_s_log.default.TYPE_INFO,
          value: `<yellow>\u25CB</yellow> Output dev  : <cyan>${import_path.default.relative(process.cwd(), params.output.replace(/\.css/, ".dev.css"))}</cyan>`
        });
      }
      emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: `<yellow>\u25CB</yellow> Minify      : ${params.minify ? "<green>true</green>" : "<red>false</red>"}`
      });
      emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: `<yellow>\u25CB</yellow> Purge       : ${params.purge ? "<green>true</green>" : "<red>false</red>"}`
      });
      emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: `<yellow>\u25CB</yellow> Plugins     :`
      });
      this.postcssBuilderSettings.postcss.plugins.forEach((pluginName) => {
        emit("log", {
          type: import_s_log.default.TYPE_INFO,
          value: `<yellow>|------------</yellow> : ${pluginName}`
        });
      });
      const plugins = [];
      for (let i = 0; i < this.postcssBuilderSettings.postcss.plugins.length; i++) {
        const p = this.postcssBuilderSettings.postcss.plugins[i];
        if (typeof p === "string") {
          const { default: plugin } = await Promise.resolve().then(() => __toESM(require(p)));
          const fn = (_a = plugin.default) != null ? _a : plugin;
          const options = (_b = this.postcssBuilderSettings.postcss.pluginsOptions[p]) != null ? _b : {};
          plugins.push(fn(__spreadValues({
            target: params.prod ? "prod" : "dev"
          }, options)));
        } else {
          plugins.push(p);
        }
      }
      const compileDuration = new import_s_duration.default();
      emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: `<yellow>[postcss]</yellow> Compiling css...`
      });
      let result;
      result = await (0, import_postcss.default)(plugins).process(src != null ? src : "", {
        from
      });
      if (!result.css) {
        throw new Error(`<red>[${this.constructor.name}.build]</red> Something went wrong...`);
      }
      emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: `<green>[postcss]</green> Compiling dev css finished <green>successfully</green> in <yellow>${compileDuration.end().formatedDuration}</yellow>`
      });
      finalCss = result.css;
      if (params.saveDev && params.output) {
        (0, import_writeFileSync.default)(params.output.replace(/\.css$/, ".dev.css"), finalCss);
        const file = new import_s_file.default(params.output.replace(/\.css$/, ".dev.css"));
        emit("log", {
          type: import_s_log.default.TYPE_INFO,
          value: `<green>[save]</green> Dev file "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`
        });
      }
      const purgeDuration = new import_s_duration.default();
      if (params.purge) {
        let mergePurgecssSettings = function(purgecss) {
          if (!purgecss.safelist)
            return;
          if (Array.isArray(purgecss.safelist)) {
            purgeCssSettings.safelist.standard = [
              ...purgeCssSettings.safelist.standard,
              ...purgecss.safelist
            ];
          } else {
            if (Array.isArray(purgecss.safelist.standard)) {
              purgeCssSettings.safelist.standard = [
                ...purgeCssSettings.safelist.standard,
                ...purgecss.safelist.standard
              ];
            }
            if (Array.isArray(purgecss.safelist.deep)) {
              purgeCssSettings.safelist.deep = [
                ...purgeCssSettings.safelist.deep,
                ...purgecss.safelist.deep
              ];
            }
            if (Array.isArray(purgecss.safelist.greedy)) {
              purgeCssSettings.safelist.greedy = [
                ...purgeCssSettings.safelist.greedy,
                ...purgecss.safelist.greedy
              ];
            }
            if (Array.isArray(purgecss.safelist.keyframes)) {
              purgeCssSettings.safelist.keyframes = [
                ...purgeCssSettings.safelist.keyframes,
                ...purgecss.safelist.keyframes
              ];
            }
            if (Array.isArray(purgecss.safelist.variables)) {
              purgeCssSettings.safelist.variables = [
                ...purgeCssSettings.safelist.variables,
                ...purgecss.safelist.variables
              ];
            }
          }
        };
        emit("log", {
          type: import_s_log.default.TYPE_INFO,
          value: `<green>[purge]</green> Purging unused css`
        });
        const purgeCssSettings = __spreadProps(__spreadValues({}, this.postcssBuilderSettings.purgecss), {
          safelist: {
            standard: [],
            deep: [],
            greedy: [],
            keyframes: [],
            variables: []
          }
        });
        const content = [];
        const globs = [];
        emit("log", {
          type: import_s_log.default.TYPE_INFO,
          value: `<yellow>[purge]</yellow> Searching for "<cyan>.spec.js</cyan>" files to grab "<magenta>purgecss</magenta>" special configs`
        });
        const packageJson = (0, import_jsonSync.default)();
        if (packageJson.dependencies) {
          for (let packageName of Object.keys(packageJson.dependencies)) {
            try {
              const packagePath = (0, import_resolvePackagePath.default)(packageName);
              if (!packagePath)
                continue;
              const specsFiles = import_s_glob.default.resolve(`${packagePath}/**/*.spec.js`);
              for (let file of specsFiles) {
                try {
                  if (!import_fs.default.existsSync(file.path))
                    continue;
                  const purgecss = (await Promise.resolve().then(() => __toESM(require(file.path)))).purgecss;
                  mergePurgecssSettings(purgecss);
                } catch (e) {
                }
              }
            } catch (e) {
            }
          }
        }
        const srcJsFiles = import_s_glob.default.resolve(`${import_s_sugar_config.default.get("storage.src.jsDir")}/**/*.spec.js`);
        for (let file of srcJsFiles) {
          try {
            if (!import_fs.default.existsSync(file.path))
              continue;
            const purgecss = (await Promise.resolve().then(() => __toESM(require(file.path)))).purgecss;
            mergePurgecssSettings(purgecss);
          } catch (e) {
          }
        }
        this.postcssBuilderSettings.purgecss.content.forEach((contentObj) => {
          if (typeof contentObj === "string") {
            globs.push(contentObj);
          } else {
            if (contentObj.raw) {
              contentObj.raw = (0, import_expandPleasantCssClassnames.default)(contentObj.raw);
            }
            content.push(contentObj);
          }
        });
        const files = import_s_glob.default.resolve(globs);
        files.forEach((file) => {
          content.push({
            extension: file.extension,
            raw: (0, import_expandPleasantCssClassnames.default)(file.content)
          });
        });
        emit("log", {
          type: import_s_log.default.TYPE_INFO,
          value: `<yellow>[purge]</yellow> Purging final css...`
        });
        const purgeCssResult = await new import_purgecss.PurgeCSS().purge(__spreadProps(__spreadValues({}, purgeCssSettings), {
          content,
          css: [
            {
              raw: finalCss
            }
          ]
        }));
        emit("log", {
          type: import_s_log.default.TYPE_INFO,
          value: `<green>[purge]</green> Purging final css finished <green>successfully</green> in <yellow>${purgeDuration.end().formatedDuration}</yellow>`
        });
        finalCss = purgeCssResult[0].css;
      }
      if (params.minify) {
        const minifyDuration = new import_s_duration.default();
        emit("log", {
          type: import_s_log.default.TYPE_INFO,
          value: `<yellow>[minify]</yellow> Minifiying css...`
        });
        finalCss = import_csso.default.minify(finalCss, {
          restructure: true
        }).css;
        emit("log", {
          type: import_s_log.default.TYPE_INFO,
          value: `<green>[minify]</green> Minifiying final css finished <green>successfully</green> in <yellow>${minifyDuration.end().formatedDuration}</yellow>`
        });
      }
      if (params.output) {
        (0, import_writeFileSync.default)(params.output, finalCss);
        const file = new import_s_file.default(params.output);
        emit("log", {
          type: import_s_log.default.TYPE_INFO,
          value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`
        });
      }
      const res = {
        outputFile: params.output ? import_s_file.default.new(params.output) : void 0,
        css: finalCss,
        map: null
      };
      if (from)
        res.inputFile = import_s_file.default.new(from);
      resolve(res);
    }, {
      metas: {
        id: this.constructor.name
      }
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
