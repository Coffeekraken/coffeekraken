import {
  __spreadProps,
  __spreadValues,
  __toESM
} from "../../../../chunk-TD77TI6B.mjs";
import __SBuilder from "@coffeekraken/s-builder";
import __SFile from "@coffeekraken/s-file";
import __SGlob from "@coffeekraken/s-glob";
import __SPromise from "@coffeekraken/s-promise";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
import __writeFileSync from "@coffeekraken/sugar/node/fs/writeFileSync";
import __expandPleasantCssClassnames from "@coffeekraken/sugar/shared/html/expandPleasantCssClassnames";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __SLog from "@coffeekraken/s-log";
import __csso from "csso";
import __path from "path";
import __fs from "fs";
import __SPostcssBuilderBuildParamsInterface from "./interface/SPostcssBuilderBuildParamsInterface";
import __postcss from "postcss";
import { PurgeCSS } from "purgecss";
import __packageJson from "@coffeekraken/sugar/node/package/jsonSync";
import __resolvePackagePath from "@coffeekraken/sugar/node/esm/resolvePackagePath";
import __SDuration from "@coffeekraken/s-duration";
class SPostcssBuilder extends __SBuilder {
  get postcssBuilderSettings() {
    return this._settings.postcssBuilder;
  }
  constructor(settings) {
    super(__deepMerge({
      postcssBuilder: __spreadValues({}, __SSugarConfig.get("postcssBuilder"))
    }, settings != null ? settings : {}));
  }
  _build(params) {
    return new __SPromise(async ({ resolve, reject, emit }) => {
      var _a, _b;
      let finalCss;
      const defaultParams = __SPostcssBuilderBuildParamsInterface.defaults();
      if (params.prod) {
        params.minify = true;
        params.purge = true;
      }
      let src = params.input, from = void 0;
      try {
        src = __fs.readFileSync(params.input, "utf8").toString();
        from = params.input;
      } catch (e) {
      }
      emit("log", {
        type: __SLog.TYPE_INFO,
        value: `<yellow>[build]</yellow> Starting Postcss Build`
      });
      emit("log", {
        type: __SLog.TYPE_INFO,
        value: `<yellow>\u25CB</yellow> Environment : ${params.prod ? "<green>production</green>" : "<yellow>development</yellow>"}`
      });
      if (params.output) {
        emit("log", {
          type: __SLog.TYPE_INFO,
          value: `<yellow>\u25CB</yellow> Output      : <cyan>${__path.relative(process.cwd(), params.output)}</cyan>`
        });
      }
      if (params.saveDev && params.output) {
        emit("log", {
          type: __SLog.TYPE_INFO,
          value: `<yellow>\u25CB</yellow> Output dev  : <cyan>${__path.relative(process.cwd(), params.output.replace(/\.css/, ".dev.css"))}</cyan>`
        });
      }
      emit("log", {
        type: __SLog.TYPE_INFO,
        value: `<yellow>\u25CB</yellow> Minify      : ${params.minify ? "<green>true</green>" : "<red>false</red>"}`
      });
      emit("log", {
        type: __SLog.TYPE_INFO,
        value: `<yellow>\u25CB</yellow> Purge       : ${params.purge ? "<green>true</green>" : "<red>false</red>"}`
      });
      emit("log", {
        type: __SLog.TYPE_INFO,
        value: `<yellow>\u25CB</yellow> Plugins     :`
      });
      this.postcssBuilderSettings.postcss.plugins.forEach((pluginName) => {
        emit("log", {
          type: __SLog.TYPE_INFO,
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
      const compileDuration = new __SDuration();
      emit("log", {
        type: __SLog.TYPE_INFO,
        value: `<yellow>[postcss]</yellow> Compiling css...`
      });
      let result;
      result = await __postcss(plugins).process(src != null ? src : "", {
        from
      });
      if (!result.css) {
        throw new Error(`<red>[${this.constructor.name}.build]</red> Something went wrong...`);
      }
      emit("log", {
        type: __SLog.TYPE_INFO,
        value: `<green>[postcss]</green> Compiling dev css finished <green>successfully</green> in <yellow>${compileDuration.end().formatedDuration}</yellow>`
      });
      finalCss = result.css;
      if (params.saveDev && params.output) {
        __writeFileSync(params.output.replace(/\.css$/, ".dev.css"), finalCss);
        const file = new __SFile(params.output.replace(/\.css$/, ".dev.css"));
        emit("log", {
          type: __SLog.TYPE_INFO,
          value: `<green>[save]</green> Dev file "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`
        });
      }
      const purgeDuration = new __SDuration();
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
          type: __SLog.TYPE_INFO,
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
          type: __SLog.TYPE_INFO,
          value: `<yellow>[purge]</yellow> Searching for "<cyan>.spec.js</cyan>" files to grab "<magenta>purgecss</magenta>" special configs`
        });
        const packageJson = __packageJson();
        if (packageJson.dependencies) {
          for (let packageName of Object.keys(packageJson.dependencies)) {
            try {
              const packagePath = __resolvePackagePath(packageName);
              if (!packagePath)
                continue;
              const specsFiles = __SGlob.resolve(`${packagePath}/**/*.spec.js`);
              for (let file of specsFiles) {
                try {
                  if (!__fs.existsSync(file.path))
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
        const srcJsFiles = __SGlob.resolve(`${__SSugarConfig.get("storage.src.jsDir")}/**/*.spec.js`);
        for (let file of srcJsFiles) {
          try {
            if (!__fs.existsSync(file.path))
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
              contentObj.raw = __expandPleasantCssClassnames(contentObj.raw);
            }
            content.push(contentObj);
          }
        });
        const files = __SGlob.resolve(globs);
        files.forEach((file) => {
          content.push({
            extension: file.extension,
            raw: __expandPleasantCssClassnames(file.content)
          });
        });
        emit("log", {
          type: __SLog.TYPE_INFO,
          value: `<yellow>[purge]</yellow> Purging final css...`
        });
        const purgeCssResult = await new PurgeCSS().purge(__spreadProps(__spreadValues({}, purgeCssSettings), {
          content,
          css: [
            {
              raw: finalCss
            }
          ]
        }));
        emit("log", {
          type: __SLog.TYPE_INFO,
          value: `<green>[purge]</green> Purging final css finished <green>successfully</green> in <yellow>${purgeDuration.end().formatedDuration}</yellow>`
        });
        finalCss = purgeCssResult[0].css;
      }
      if (params.minify) {
        const minifyDuration = new __SDuration();
        emit("log", {
          type: __SLog.TYPE_INFO,
          value: `<yellow>[minify]</yellow> Minifiying css...`
        });
        finalCss = __csso.minify(finalCss, {
          restructure: true
        }).css;
        emit("log", {
          type: __SLog.TYPE_INFO,
          value: `<green>[minify]</green> Minifiying final css finished <green>successfully</green> in <yellow>${minifyDuration.end().formatedDuration}</yellow>`
        });
      }
      if (params.output) {
        __writeFileSync(params.output, finalCss);
        const file = new __SFile(params.output);
        emit("log", {
          type: __SLog.TYPE_INFO,
          value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`
        });
      }
      const res = {
        outputFile: params.output ? __SFile.new(params.output) : void 0,
        css: finalCss,
        map: null
      };
      if (from)
        res.inputFile = __SFile.new(from);
      resolve(res);
    }, {
      metas: {
        id: this.constructor.name
      }
    });
  }
}
export {
  SPostcssBuilder as default
};
