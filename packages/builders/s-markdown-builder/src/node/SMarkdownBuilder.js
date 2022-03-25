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
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
import __SBuilder from "@coffeekraken/s-builder";
import __SDocmap from "@coffeekraken/s-docmap";
import __SFile from "@coffeekraken/s-file";
import __SGlob from "@coffeekraken/s-glob";
import __SPromise from "@coffeekraken/s-promise";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
import __extension from "@coffeekraken/sugar/node/fs/extension";
import __folderPath from "@coffeekraken/sugar/node/fs/folderPath";
import __writeFileSync from "@coffeekraken/sugar/node/fs/writeFileSync";
import __writeTmpFileSync from "@coffeekraken/sugar/node/fs/writeTmpFileSync";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __flatten from "@coffeekraken/sugar/shared/object/flatten";
import __fs from "fs";
import __handlebars from "handlebars";
import { registerHelpers } from "@coffeekraken/s-handlebars";
import __marked from "marked";
import __path from "path";
import __packageJson from "@coffeekraken/sugar/node/package/jsonSync";
import __SMarkdownBuilderBuildParamsInterface from "./interface/SMarkdownBuilderBuildParamsInterface";
import __SLog from "@coffeekraken/s-log";
class SMarkdownBuilder extends __SBuilder {
  static registerTransformer(name, transformerPath) {
    this._registeredTransformers[name] = transformerPath;
  }
  static registerHelper(name, helperPath) {
    this._registeredHelpers[name] = helperPath;
  }
  static registerLayout(name, layout) {
    this._registeredLayouts[name] = __spreadValues({}, layout);
  }
  static registerPartial(name, partial) {
    this._registeredPartials[name] = partial;
  }
  static registerSection(name, section) {
    this._registeredSections[name] = __spreadValues({}, section);
  }
  get markdownBuilderSettings() {
    return this._settings.markdownBuilder;
  }
  constructor(settings) {
    super(__deepMerge({
      markdownBuilder: __spreadValues({}, __SSugarConfig.get("markdownBuilder"))
    }, settings != null ? settings : {}));
    const config = __SSugarConfig.get("markdownBuilder");
    if (config.transformers) {
      Object.keys(config.transformers).forEach((transformerName) => {
        const transformerPath = config.transformers[transformerName];
        this.constructor.registerTransformer(transformerName, transformerPath);
      });
    }
    if (config.helpers) {
      Object.keys(config.helpers).forEach((helperName) => {
        const helperPath = config.helpers[helperName];
        this.constructor.registerHelper(helperName, helperPath);
      });
    }
    if (config.layouts) {
      Object.keys(config.layouts).forEach((layoutName) => {
        const layoutObj = config.layouts[layoutName];
        this.constructor.registerLayout(layoutName, layoutObj);
      });
    }
    if (config.sections) {
      Object.keys(config.sections).forEach((sectionName) => {
        const sectionObj = config.sections[sectionName];
        this.constructor.registerSection(sectionName, sectionObj);
      });
    }
    if (config.partials) {
      Object.keys(config.partials).forEach((partialName) => {
        const partialObj = config.partials[partialName];
        this.constructor.registerPartial(partialName, partialObj);
      });
    }
  }
  _build(params) {
    if (params.preset && params.preset.length) {
      return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
        const buildedPresets = {};
        for (let i = 0; i < params.preset.length; i++) {
          const preset = params.preset[i];
          emit("log", {
            type: __SLog.TYPE_INFO,
            value: `<cyan>[preset]</cyan> Start "<yellow>${preset}</yellow>" preset markdown build`
          });
          const newParams = __deepMerge(__SMarkdownBuilderBuildParamsInterface.defaults(), __SSugarConfig.get(`markdownBuilder.presets.${preset}`));
          const buildPromise = this._build(newParams);
          pipe(buildPromise);
          buildedPresets[preset] = await buildPromise;
        }
        resolve(buildedPresets);
      });
    } else {
      return new __SPromise(async ({ resolve, reject, emit }) => {
        var _a, _b, _c, _d, _e;
        const handlebars = __handlebars.create();
        registerHelpers(handlebars);
        const finalParams = __deepMerge(__SMarkdownBuilderBuildParamsInterface.defaults(), params != null ? params : {});
        const buildedFiles = [];
        if (finalParams.inRaw) {
          finalParams.inPath = __writeTmpFileSync(finalParams.inRaw);
          delete finalParams.inRaw;
        }
        if (finalParams.inPath) {
          finalParams.inDir = __folderPath(finalParams.inPath);
          finalParams.glob = __path.relative(finalParams.inDir, finalParams.inPath);
          delete finalParams.inPath;
        }
        Object.keys((_a = this.constructor._registeredLayouts) != null ? _a : []).forEach((layoutName) => {
          var _a2;
          if (!((_a2 = this.constructor._registeredLayouts[layoutName]) == null ? void 0 : _a2[finalParams.target])) {
            throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the requested layout "<yellow>${layoutName}</yellow>" does not have a "<cyan>${finalParams.target}</cyan>" target option...`);
          }
          const layoutStr = __fs.readFileSync(this.constructor._registeredLayouts[layoutName][finalParams.target], "utf8").toString();
          handlebars.registerPartial(`layout-${layoutName}`, layoutStr);
        });
        Object.keys((_b = this.constructor._registeredSections) != null ? _b : []).forEach((sectionName) => {
          var _a2;
          if (!((_a2 = this.constructor._registeredSections[sectionName]) == null ? void 0 : _a2[finalParams.target])) {
            throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the requested section "<yellow>${sectionName}</yellow>" does not have a "<cyan>${finalParams.target}</cyan>" target option...`);
          }
          const sectionStr = __fs.readFileSync(this.constructor._registeredSections[sectionName][finalParams.target], "utf8").toString();
          handlebars.registerPartial(`section-${sectionName}`, sectionStr);
        });
        Object.keys((_c = this.constructor._registeredPartials) != null ? _c : []).forEach((partialName) => {
          var _a2;
          if (!((_a2 = this.constructor._registeredPartials[partialName]) == null ? void 0 : _a2[finalParams.target])) {
            throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the requested partial "<yellow>${partialName}</yellow>" does not have a "<cyan>${finalParams.target}</cyan>" target option...`);
          }
          const partialStr = __fs.readFileSync(this.constructor._registeredPartials[partialName][finalParams.target], "utf8").toString();
          handlebars.registerPartial(partialName, partialStr);
        });
        for (let i = 0; i < Object.keys((_d = this.constructor._registeredHelpers) != null ? _d : []).length; i++) {
          const helperName = Object.keys((_e = this.constructor._registeredHelpers) != null ? _e : [])[i];
          const helperFn = (await Promise.resolve().then(() => __toESM(require(this.constructor._registeredHelpers[helperName])))).default;
          handlebars.registerHelper(helperName, helperFn);
        }
        if (finalParams.save && !finalParams.outPath && !finalParams.outDir) {
          throw new Error(`<red>[${this.constructor.name}]</red> The param "<yellow>save</yellow>" MUST be used alongside the params "<yellow>outPath</yellow>" or "<yellow>outDir</yellow>"`);
        }
        if (finalParams.inDir && !finalParams.glob) {
          throw new Error(`<red>[${this.constructor.name}]</red> The param "<yellow>inDir</yellow>" MUST be used alongside the param "<yellow>glob</yellow>"`);
        }
        if (finalParams.save && (finalParams.outDir && !finalParams.inDir || !finalParams.outDir && finalParams.inDir)) {
          throw new Error(`<red>[${this.constructor.name}]</red> The param "<yellow>outDir</yellow>" MUST be used alongside the params "<yellow>inDir</yellow>" and "<yellow>glob</yellow>"`);
        }
        let path = `${finalParams.inDir}/${finalParams.glob}`;
        const sourceObj = {
          inputStr: "",
          outputStr: "",
          files: [],
          inDir: finalParams.inDir,
          outDir: finalParams.outDir,
          outPath: finalParams.outPath
        };
        if (__fs.existsSync(path)) {
          sourceObj.inputStr = __path.relative(process.cwd(), path);
          sourceObj.files.push(path);
        } else if (__SGlob.isGlob(path)) {
          sourceObj.inputStr = __path.relative(process.cwd(), path);
          sourceObj.files = __SGlob.resolve(path, {
            SFile: false
          });
        } else {
          throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the passed argument "<yellow>${path}</yellow>" does not resolve to any file on your system...`);
        }
        if (sourceObj.outDir) {
          sourceObj.outputStr = __path.relative(process.cwd(), sourceObj.outDir) || ".";
        }
        emit("log", {
          type: __SLog.TYPE_INFO,
          value: `<yellow>[build]</yellow> Starting markdown Build`
        });
        emit("log", {
          type: __SLog.TYPE_INFO,
          value: `<yellow>\u25CB</yellow> Input       : <cyan>${sourceObj.inputStr}</cyan>`
        });
        if (sourceObj.outputStr) {
          emit("log", {
            type: __SLog.TYPE_INFO,
            value: `<yellow>\u25CB</yellow> Output      : <cyan>${sourceObj.outputStr}</cyan>`
          });
        }
        const docmap = await new __SDocmap().read();
        const viewData = {
          config: __SSugarConfig.get("."),
          flatConfig: __flatten(__SSugarConfig.get(".")),
          settings: this.markdownBuilderSettings,
          params,
          packageJson: __packageJson(finalParams.inDir),
          docMenu: docmap.menu,
          docmap,
          time: {
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            day: new Date().getDay()
          }
        };
        if (!sourceObj.files.length) {
          return reject();
        }
        for (let j = 0; j < sourceObj.files.length; j++) {
          const filePath = sourceObj.files[j];
          const buildObj = {
            data: "",
            output: ""
          };
          if (__extension(filePath) === "js") {
            const fn = (await Promise.resolve().then(() => __toESM(require(filePath)))).default;
            buildObj.data = fn(viewData);
          } else {
            buildObj.data = __fs.readFileSync(filePath, "utf8").toString();
          }
          if (sourceObj.outPath) {
            buildObj.output = sourceObj.outPath;
          } else if (sourceObj.inDir && sourceObj.outDir) {
            buildObj.output = `${sourceObj.outDir}/${__path.relative(sourceObj.inDir, filePath)}`;
          }
          let currentTransformedString = buildObj.data;
          const tplFn = handlebars.compile(currentTransformedString);
          currentTransformedString = tplFn(viewData);
          for (let [transformerId, transformerObj] of Object.entries(this.constructor._registeredTransformers)) {
            if (!transformerObj[finalParams.target])
              return;
            const matches = [
              ...currentTransformedString.matchAll(transformerObj.match)
            ];
            if (!matches.length)
              continue;
            const transformerStr = __fs.readFileSync(transformerObj[finalParams.target], "utf8").toString();
            const tplFn2 = handlebars.compile(transformerStr);
            for (let i = 0; i < matches.length; i++) {
              const match = matches[i];
              let preprocessedData = match;
              if (transformerObj.preprocessor) {
                const preprocessorFn = await Promise.resolve().then(() => __toESM(require(transformerObj.preprocessor)));
                preprocessedData = await preprocessorFn.default(match);
              }
              const result = tplFn2({
                data: preprocessedData
              });
              currentTransformedString = currentTransformedString.replace(match[0], result);
            }
          }
          let protectedTagsMatches = [];
          finalParams.protectedTags.forEach((tag) => {
            const tagReg = new RegExp(`<${tag}[^>]*>[\\w\\W\\n]+?(?=<\\/${tag}>)<\\/${tag}>`, "gm");
            const tagMatches = currentTransformedString.match(tagReg);
            if (tagMatches) {
              protectedTagsMatches = [
                ...protectedTagsMatches,
                ...tagMatches
              ];
            }
          });
          protectedTagsMatches == null ? void 0 : protectedTagsMatches.forEach((match, i) => {
            currentTransformedString = currentTransformedString.replace(match, `{match:${i}}`);
          });
          if (finalParams.target === "html") {
            currentTransformedString = __marked(currentTransformedString, {});
          }
          protectedTagsMatches == null ? void 0 : protectedTagsMatches.forEach((match, i) => {
            currentTransformedString = currentTransformedString.replace(`{match:${i}}`, match);
          });
          if (finalParams.save) {
            __writeFileSync(buildObj.output, currentTransformedString);
            const file = new __SFile(buildObj.output);
            emit("log", {
              value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`
            });
          }
          const res = {
            inputFile: __SFile.new(filePath),
            outputFile: finalParams.save ? __SFile.new(buildObj.output) : void 0,
            code: currentTransformedString
          };
          buildedFiles.push(res);
        }
        resolve(buildedFiles);
      }, {
        metas: {
          id: this.constructor.name
        }
      });
    }
  }
}
SMarkdownBuilder._registeredHelpers = {};
SMarkdownBuilder._registeredLayouts = {};
SMarkdownBuilder._registeredPartials = {};
SMarkdownBuilder._registeredSections = {};
SMarkdownBuilder._registeredTransformers = {};
SMarkdownBuilder.marked = __marked;
export {
  SMarkdownBuilder as default
};
