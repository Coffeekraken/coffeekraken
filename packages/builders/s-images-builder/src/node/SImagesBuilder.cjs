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
var SImagesBuilder_exports = {};
__export(SImagesBuilder_exports, {
  default: () => SImagesBuilder
});
module.exports = __toCommonJS(SImagesBuilder_exports);
var import_s_builder = __toESM(require("@coffeekraken/s-builder"), 1);
var import_s_file = __toESM(require("@coffeekraken/s-file"), 1);
var import_s_glob = __toESM(require("@coffeekraken/s-glob"), 1);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
var import_ensureDirSync = __toESM(require("@coffeekraken/sugar/node/fs/ensureDirSync"), 1);
var import_folderPath = __toESM(require("@coffeekraken/sugar/node/fs/folderPath"), 1);
var import_removeSync = __toESM(require("@coffeekraken/sugar/node/fs/removeSync"), 1);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_image_size = __toESM(require("image-size"), 1);
var import_minimatch = __toESM(require("minimatch"), 1);
var import_packageRoot = __toESM(require("@coffeekraken/sugar/node/path/packageRoot"), 1);
var import_path = __toESM(require("path"), 1);
var import_s_duration = __toESM(require("@coffeekraken/s-duration"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_sharp = __toESM(require("sharp"), 1);
var import_s_log = __toESM(require("@coffeekraken/s-log"), 1);
var import_SImagesBuilderBuildParamsInterface = __toESM(require("./interface/SImagesBuilderBuildParamsInterface"), 1);
var import_copySync = __toESM(require("@coffeekraken/sugar/node/fs/copySync"), 1);
class SImagesBuilder extends import_s_builder.default {
  get imagesBuilderSettings() {
    return this._settings.imagesBuilder;
  }
  constructor(settings) {
    super((0, import_deepMerge.default)({
      imagesBuilder: {}
    }, settings != null ? settings : {}));
  }
  _build(params, settings) {
    return new import_s_promise.default(async ({ resolve, reject, emit }) => {
      var _a;
      const finalSettings = (0, import_deepMerge.default)({
        resolveGlob: {}
      }, this.imagesBuilderSettings, settings != null ? settings : {});
      params = import_SImagesBuilderBuildParamsInterface.default.apply(params != null ? params : {});
      if (params.clear) {
        (0, import_removeSync.default)(params.outDir);
        (0, import_ensureDirSync.default)(params.outDir);
      }
      const filesStack = {};
      const sourceStats = {
        bytes: 0
      };
      const buildedStats = {
        bytes: 0
      };
      const webpStats = {
        bytes: 0
      };
      emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: `<yellow>[build]</yellow> Starting images Build`
      });
      function printParams(paramsObj) {
        if (paramsObj.glob) {
          emit("log", {
            type: import_s_log.default.TYPE_INFO,
            value: `<yellow>\u25CB</yellow> Glob        : <yellow>${paramsObj.glob}</yellow>`
          });
        }
        if (paramsObj.inDir) {
          emit("log", {
            type: import_s_log.default.TYPE_INFO,
            value: `<yellow>\u25CB</yellow> Input       : <cyan>${import_path.default.relative(process.cwd(), paramsObj.inDir)}</cyan>`
          });
        }
        if (paramsObj.outDir) {
          emit("log", {
            type: import_s_log.default.TYPE_INFO,
            value: `<yellow>\u25CB</yellow> Output      : <cyan>${import_path.default.relative(process.cwd(), paramsObj.outDir)}</cyan>`
          });
        }
        if (paramsObj.quality) {
          emit("log", {
            type: import_s_log.default.TYPE_INFO,
            value: `<yellow>\u25CB</yellow> Quality     : <green>${paramsObj.quality}</green>`
          });
        }
        if (paramsObj.webp !== void 0) {
          emit("log", {
            type: import_s_log.default.TYPE_INFO,
            value: `<yellow>\u25CB</yellow> Webp        : ${paramsObj.webp ? "<green>true</green>" : "<red>false</red>"}`
          });
        }
        if (paramsObj.width || paramsObj.height) {
          emit("log", {
            type: import_s_log.default.TYPE_INFO,
            value: `<yellow>\u25CB</yellow> Size        : <yellow>${paramsObj.width ? paramsObj.width : "..."}/${paramsObj.height ? paramsObj.height : "..."}</yellow>`
          });
        }
        if (paramsObj.resolution) {
          emit("log", {
            type: import_s_log.default.TYPE_INFO,
            value: `<yellow>\u25CB</yellow> Resolution${paramsObj.resolution.length > 1 ? "s" : " "} : ${paramsObj.resolution.map((res) => {
              return `<magenta>${res}x</magenta>`;
            }).join(", ")}`
          });
        }
      }
      printParams(params);
      if (params.specificParams) {
        Object.keys(params.specificParams).forEach((glob) => {
          const customParamsObj = params.specificParams[glob];
          emit("log", {
            type: import_s_log.default.TYPE_INFO,
            value: `<cyan>[${glob}]</cyan> Specific params`
          });
          printParams(customParamsObj);
        });
      }
      await import_s_glob.default.resolve(`${params.inDir}/${params.glob}`, __spreadProps(__spreadValues({}, (_a = finalSettings.resolveGlob) != null ? _a : {}), {
        cwd: params.inDir
      })).forEach((file) => {
        sourceStats.bytes += file.stats.bytes;
        filesStack[file.path] = {
          source: file,
          builded: []
        };
      });
      for (let i = 0; i < Object.keys(filesStack).length; i++) {
        const path = Object.keys(filesStack)[i];
        let imgParams = Object.assign({}, params);
        const file = filesStack[path].source;
        const outPath = `${imgParams.outDir}/${file.relPath}`;
        if (!params.compressExts.includes(file.extension)) {
          emit("log", {
            clear: import_s_log.default.isTypeEnabled(import_s_log.default.TYPE_VERBOSE) ? false : true,
            type: import_s_log.default.TYPE_INFO,
            value: `<cyan>[copy]</cyan> Copying file "<cyan>${import_path.default.relative((0, import_packageRoot.default)(), file.path)}</cyan>" under "<magenta>${import_path.default.relative((0, import_packageRoot.default)(), outPath)}</magenta>"`
          });
          const duration = new import_s_duration.default();
          buildedStats.bytes += import_fs.default.statSync(file.path).size;
          webpStats.bytes += import_fs.default.statSync(file.path).size;
          (0, import_copySync.default)(file.path, outPath);
          emit("log", {
            clear: import_s_log.default.isTypeEnabled(import_s_log.default.TYPE_VERBOSE) ? false : true,
            type: import_s_log.default.TYPE_INFO,
            value: `<green>[copy]</green> File "<cyan>${import_path.default.relative((0, import_packageRoot.default)(), file.path)}</cyan>" copied <green>successfully</green> under "<magenta>${import_path.default.relative((0, import_packageRoot.default)(), outPath)}</magenta>" in <yellow>${duration.end().formatedDuration}</yellow>`
          });
          continue;
        } else {
          if (params.specificParams) {
            for (let l = 0; l < Object.keys(params.specificParams).length; l++) {
              const glob = Object.keys(params.specificParams)[l];
              const specificParams = params.specificParams[glob];
              if ((0, import_minimatch.default)(file.relPath, glob)) {
                imgParams = (0, import_deepMerge.default)(params, specificParams);
                imgParams.specific = true;
              }
            }
          }
          (0, import_removeSync.default)(outPath);
          (0, import_ensureDirSync.default)((0, import_folderPath.default)(outPath));
          const imageSize = (0, import_image_size.default)(file.path);
          const idealSize = imageSize;
          if (imgParams.width && idealSize.width > imgParams.width) {
            const percent = 100 / idealSize.width * imgParams.width;
            idealSize.width = imgParams.width;
            idealSize.height = Math.round(idealSize.height / 100 * percent);
          }
          if (imgParams.height && idealSize.height > imgParams.height) {
            const percent = 100 / idealSize.height * imgParams.height;
            idealSize.height = imgParams.height;
            idealSize.width = Math.round(idealSize.width / 100 * percent);
          }
          const imgsArray = [
            {
              size: idealSize,
              resolution: 1,
              outPath
            }
          ];
          for (let k = 0; k < imgParams.resolution.length; k++) {
            const resolution = imgParams.resolution[k];
            if (resolution === 1)
              continue;
            if (file.extension === "svg")
              continue;
            imgsArray.push({
              size: {
                width: idealSize.width * resolution,
                height: idealSize.height * resolution
              },
              resolution,
              outPath: outPath.replace(/\.([a-zA-Z]+)$/, `@${resolution}x.$1`)
            });
          }
          for (let j = 0; j < imgsArray.length; j++) {
            const imgObj = imgsArray[j];
            const outputFn = file.extension === "jpg" ? "jpeg" : file.extension;
            emit("log", {
              clear: import_s_log.default.isTypeEnabled(import_s_log.default.TYPE_VERBOSE) ? false : true,
              type: import_s_log.default.TYPE_INFO,
              value: `<yellow>[compress]</yellow> Compressing file "<cyan>${import_path.default.relative((0, import_packageRoot.default)(), file.path)}</cyan>" under "<magenta>${import_path.default.relative((0, import_packageRoot.default)(), imgObj.outPath)}</magenta>" ${imgParams.specific ? ` with <red>specific parameters</red>` : ""}`
            });
            const duration = new import_s_duration.default();
            const img = (0, import_sharp.default)(path);
            if (!img[outputFn]) {
              await img.resize(imgObj.size).toFile(imgObj.outPath);
              continue;
            }
            await img.resize(imgObj.size)[outputFn]({
              quality: params.quality
            }).toFile(imgObj.outPath);
            const buildedFile = import_s_file.default.new(imgObj.outPath);
            buildedStats.bytes += buildedFile.stats.bytes;
            filesStack[path].builded.push(buildedFile);
            emit("log", {
              clear: import_s_log.default.isTypeEnabled(import_s_log.default.TYPE_VERBOSE) ? false : true,
              type: import_s_log.default.TYPE_INFO,
              value: `<green>[compress]</green> File "<cyan>${import_path.default.relative((0, import_packageRoot.default)(), file.path)}</cyan>" compressed <green>successfully</green> under "<magenta>${import_path.default.relative((0, import_packageRoot.default)(), imgObj.outPath)}</magenta>" in <yellow>${duration.end().formatedDuration}</yellow>`
            });
            if (params.webp) {
              const webpDuration = new import_s_duration.default();
              const webpOutPath = imgObj.outPath.replace(/\.[a-zA-Z0-9]+/, ".webp");
              emit("log", {
                type: import_s_log.default.TYPE_VERBOSER,
                value: `<yellow>[webp]</yellow> Generatating webp version of file "<cyan>${import_path.default.relative((0, import_packageRoot.default)(), imgObj.outPath)}</cyan>"`
              });
              await (0, import_sharp.default)(path).resize(imgObj.size).webp({
                quality: params.quality
              }).toFile(webpOutPath);
              const webpFile = import_s_file.default.new(webpOutPath);
              webpStats.bytes += webpFile.stats.bytes;
              filesStack[path].builded.push(webpFile);
              emit("log", {
                type: import_s_log.default.TYPE_VERBOSER,
                value: `<green>[webp]</green> Webp generation of file "<cyan>${import_path.default.relative((0, import_packageRoot.default)(), imgObj.outPath)}</cyan>" finished <green>successfully</green> in <yellow>${webpDuration.end().formatedDuration}</yellow>`
              });
            }
          }
        }
      }
      const buildedGainedBytes = sourceStats.bytes - buildedStats.bytes, webpFromSourceGainedBytes = sourceStats.bytes - webpStats.bytes, webpFromBuildedGainedBytes = buildedStats.bytes - webpStats.bytes;
      const result = {
        source: {
          bytes: sourceStats.bytes.toFixed(2),
          kbytes: (sourceStats.bytes * 1e-3).toFixed(2),
          mbytes: (sourceStats.bytes * 1e-6).toFixed(2),
          gbytes: (sourceStats.bytes * 1e-8).toFixed(2)
        },
        builded: {
          fromSourceGain: {
            percentage: 100 - Math.round(100 / sourceStats.bytes * buildedStats.bytes),
            bytes: buildedGainedBytes.toFixed(2),
            kbytes: (buildedGainedBytes * 1e-3).toFixed(2),
            mbytes: (buildedGainedBytes * 1e-6).toFixed(2),
            gbytes: (buildedGainedBytes * 1e-8).toFixed(2)
          },
          bytes: buildedStats.bytes.toFixed(2),
          kbytes: (buildedStats.bytes * 1e-3).toFixed(2),
          mbytes: (buildedStats.bytes * 1e-6).toFixed(2),
          gbytes: (buildedStats.bytes * 1e-8).toFixed(2)
        },
        webp: {
          fromSourceGain: {
            percentage: 100 - Math.round(100 / sourceStats.bytes * webpStats.bytes),
            bytes: webpFromSourceGainedBytes.toFixed(2),
            kbytes: (webpFromSourceGainedBytes * 1e-3).toFixed(2),
            mbytes: (webpFromSourceGainedBytes * 1e-6).toFixed(2),
            gbytes: (webpFromSourceGainedBytes * 1e-8).toFixed(2)
          },
          fromBuildedGain: {
            percentage: 100 - Math.round(100 / buildedStats.bytes * webpStats.bytes),
            bytes: webpFromBuildedGainedBytes.toFixed(2),
            kbytes: (webpFromBuildedGainedBytes * 1e-3).toFixed(2),
            mbytes: (webpFromBuildedGainedBytes * 1e-6).toFixed(2),
            gbytes: (webpFromBuildedGainedBytes * 1e-8).toFixed(2)
          },
          bytes: webpStats.bytes.toFixed(2),
          kbytes: (webpStats.bytes * 1e-3).toFixed(2),
          mbytes: (webpStats.bytes * 1e-6).toFixed(2),
          gbytes: (webpStats.bytes * 1e-8).toFixed(2)
        },
        files: filesStack
      };
      emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: `<green>[success]</green> Images build success!`
      });
      emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: `<yellow>[source]</yellow>  Sources files : <yellow>${result.source.mbytes}mb</yellow>`
      });
      emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: `<yellow>[builded]</yellow> Builded files : <yellow>${result.builded.mbytes}mb</yellow>`
      });
      emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: `<white>                       </white> : <cyan>-${result.builded.fromSourceGain.percentage}%</cyan> from source`
      });
      if (params.webp) {
        emit("log", {
          type: import_s_log.default.TYPE_INFO,
          value: `<yellow>[webp]</yellow>    Webp files    : <yellow>${result.webp.mbytes}mb</yellow>`
        });
        emit("log", {
          type: import_s_log.default.TYPE_INFO,
          value: `<white>                       </white> : <cyan>-${result.webp.fromSourceGain.percentage}%</cyan> from source`
        });
        emit("log", {
          type: import_s_log.default.TYPE_INFO,
          value: `<white>                       </white> : <cyan>-${result.webp.fromBuildedGain.percentage}%</cyan> from builded`
        });
      }
      emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: `<cyan>[info]</cyan> Note that only images at resolution <magenta>1x</magenta> are used for stats...`
      });
      resolve(result);
    }, {
      metas: {
        id: this.constructor.name
      }
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
