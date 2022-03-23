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
var SMarkdownBuilder_exports = {};
__export(SMarkdownBuilder_exports, {
  default: () => SMarkdownBuilder
});
module.exports = __toCommonJS(SMarkdownBuilder_exports);
var import_s_builder = __toESM(require("@coffeekraken/s-builder"), 1);
var import_s_docmap = __toESM(require("@coffeekraken/s-docmap"), 1);
var import_s_file = __toESM(require("@coffeekraken/s-file"), 1);
var import_s_glob = __toESM(require("@coffeekraken/s-glob"), 1);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
var import_extension = __toESM(require("@coffeekraken/sugar/node/fs/extension"), 1);
var import_folderPath = __toESM(require("@coffeekraken/sugar/node/fs/folderPath"), 1);
var import_writeFileSync = __toESM(require("@coffeekraken/sugar/node/fs/writeFileSync"), 1);
var import_writeTmpFileSync = __toESM(require("@coffeekraken/sugar/node/fs/writeTmpFileSync"), 1);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_flatten = __toESM(require("@coffeekraken/sugar/shared/object/flatten"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_handlebars = __toESM(require("handlebars"), 1);
var import_s_handlebars = require("@coffeekraken/s-handlebars");
var import_marked = __toESM(require("marked"), 1);
var import_path = __toESM(require("path"), 1);
var import_jsonSync = __toESM(require("@coffeekraken/sugar/node/package/jsonSync"), 1);
var import_SMarkdownBuilderBuildParamsInterface = __toESM(require("./interface/SMarkdownBuilderBuildParamsInterface"), 1);
var import_s_log = __toESM(require("@coffeekraken/s-log"), 1);
class SMarkdownBuilder extends import_s_builder.default {
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
    super((0, import_deepMerge.default)({
      markdownBuilder: __spreadValues({}, import_s_sugar_config.default.get("markdownBuilder"))
    }, settings != null ? settings : {}));
    const config = import_s_sugar_config.default.get("markdownBuilder");
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
      return new import_s_promise.default(async ({ resolve, reject, emit, pipe }) => {
        const buildedPresets = {};
        for (let i = 0; i < params.preset.length; i++) {
          const preset = params.preset[i];
          emit("log", {
            type: import_s_log.default.TYPE_INFO,
            value: `<cyan>[preset]</cyan> Start "<yellow>${preset}</yellow>" preset markdown build`
          });
          const newParams = (0, import_deepMerge.default)(import_SMarkdownBuilderBuildParamsInterface.default.defaults(), import_s_sugar_config.default.get(`markdownBuilder.presets.${preset}`));
          const buildPromise = this._build(newParams);
          pipe(buildPromise);
          buildedPresets[preset] = await buildPromise;
        }
        resolve(buildedPresets);
      });
    } else {
      return new import_s_promise.default(async ({ resolve, reject, emit }) => {
        var _a, _b, _c, _d, _e;
        const handlebars = import_handlebars.default.create();
        (0, import_s_handlebars.registerHelpers)(handlebars);
        const finalParams = (0, import_deepMerge.default)(import_SMarkdownBuilderBuildParamsInterface.default.defaults(), params != null ? params : {});
        const buildedFiles = [];
        if (finalParams.inRaw) {
          finalParams.inPath = (0, import_writeTmpFileSync.default)(finalParams.inRaw);
          delete finalParams.inRaw;
        }
        if (finalParams.inPath) {
          finalParams.inDir = (0, import_folderPath.default)(finalParams.inPath);
          finalParams.glob = import_path.default.relative(finalParams.inDir, finalParams.inPath);
          delete finalParams.inPath;
        }
        Object.keys((_a = this.constructor._registeredLayouts) != null ? _a : []).forEach((layoutName) => {
          var _a2;
          if (!((_a2 = this.constructor._registeredLayouts[layoutName]) == null ? void 0 : _a2[finalParams.target])) {
            throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the requested layout "<yellow>${layoutName}</yellow>" does not have a "<cyan>${finalParams.target}</cyan>" target option...`);
          }
          const layoutStr = import_fs.default.readFileSync(this.constructor._registeredLayouts[layoutName][finalParams.target], "utf8").toString();
          handlebars.registerPartial(`layout-${layoutName}`, layoutStr);
        });
        Object.keys((_b = this.constructor._registeredSections) != null ? _b : []).forEach((sectionName) => {
          var _a2;
          if (!((_a2 = this.constructor._registeredSections[sectionName]) == null ? void 0 : _a2[finalParams.target])) {
            throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the requested section "<yellow>${sectionName}</yellow>" does not have a "<cyan>${finalParams.target}</cyan>" target option...`);
          }
          const sectionStr = import_fs.default.readFileSync(this.constructor._registeredSections[sectionName][finalParams.target], "utf8").toString();
          handlebars.registerPartial(`section-${sectionName}`, sectionStr);
        });
        Object.keys((_c = this.constructor._registeredPartials) != null ? _c : []).forEach((partialName) => {
          var _a2;
          if (!((_a2 = this.constructor._registeredPartials[partialName]) == null ? void 0 : _a2[finalParams.target])) {
            throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the requested partial "<yellow>${partialName}</yellow>" does not have a "<cyan>${finalParams.target}</cyan>" target option...`);
          }
          const partialStr = import_fs.default.readFileSync(this.constructor._registeredPartials[partialName][finalParams.target], "utf8").toString();
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
        if (import_fs.default.existsSync(path)) {
          sourceObj.inputStr = import_path.default.relative(process.cwd(), path);
          sourceObj.files.push(path);
        } else if (import_s_glob.default.isGlob(path)) {
          sourceObj.inputStr = import_path.default.relative(process.cwd(), path);
          sourceObj.files = import_s_glob.default.resolve(path, {
            SFile: false
          });
        } else {
          throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the passed argument "<yellow>${path}</yellow>" does not resolve to any file on your system...`);
        }
        if (sourceObj.outDir) {
          sourceObj.outputStr = import_path.default.relative(process.cwd(), sourceObj.outDir) || ".";
        }
        emit("log", {
          type: import_s_log.default.TYPE_INFO,
          value: `<yellow>[build]</yellow> Starting markdown Build`
        });
        emit("log", {
          type: import_s_log.default.TYPE_INFO,
          value: `<yellow>\u25CB</yellow> Input       : <cyan>${sourceObj.inputStr}</cyan>`
        });
        if (sourceObj.outputStr) {
          emit("log", {
            type: import_s_log.default.TYPE_INFO,
            value: `<yellow>\u25CB</yellow> Output      : <cyan>${sourceObj.outputStr}</cyan>`
          });
        }
        const docmap = await new import_s_docmap.default().read();
        const viewData = {
          config: import_s_sugar_config.default.get("."),
          flatConfig: (0, import_flatten.default)(import_s_sugar_config.default.get(".")),
          settings: this.markdownBuilderSettings,
          params,
          packageJson: (0, import_jsonSync.default)(finalParams.inDir),
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
          if ((0, import_extension.default)(filePath) === "js") {
            const fn = (await Promise.resolve().then(() => __toESM(require(filePath)))).default;
            buildObj.data = fn(viewData);
          } else {
            buildObj.data = import_fs.default.readFileSync(filePath, "utf8").toString();
          }
          if (sourceObj.outPath) {
            buildObj.output = sourceObj.outPath;
          } else if (sourceObj.inDir && sourceObj.outDir) {
            buildObj.output = `${sourceObj.outDir}/${import_path.default.relative(sourceObj.inDir, filePath)}`;
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
            const transformerStr = import_fs.default.readFileSync(transformerObj[finalParams.target], "utf8").toString();
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
            currentTransformedString = (0, import_marked.default)(currentTransformedString, {});
          }
          protectedTagsMatches == null ? void 0 : protectedTagsMatches.forEach((match, i) => {
            currentTransformedString = currentTransformedString.replace(`{match:${i}}`, match);
          });
          if (finalParams.save) {
            (0, import_writeFileSync.default)(buildObj.output, currentTransformedString);
            const file = new import_s_file.default(buildObj.output);
            emit("log", {
              value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`
            });
          }
          const res = {
            inputFile: import_s_file.default.new(filePath),
            outputFile: finalParams.save ? import_s_file.default.new(buildObj.output) : void 0,
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
SMarkdownBuilder.marked = import_marked.default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
