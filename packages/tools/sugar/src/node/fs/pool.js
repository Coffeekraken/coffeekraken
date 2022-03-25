var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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
import __SFile from "@coffeekraken/s-file";
import __SSugarConfig from "@coffeekraken/s-sugar-config";
import __SPromise from "@coffeekraken/s-promise";
import __chokidar from "chokidar";
import __fs from "fs";
import __expandGlob from "../../shared/glob/expandGlob";
import __deepMerge from "../../shared/object/deepMerge";
import __matchGlob from "../glob/matchGlob";
function pool(input, settings) {
  const filesStack = {};
  return new __SPromise(async ({ resolve, reject, emit, cancel, on }) => {
    var _a;
    await __SSugarConfig.load();
    const set = __deepMerge({
      SFile: true,
      cwd: process.cwd(),
      watch: false,
      chokidar: {},
      exclude: [],
      ignored: ["**/node_modules/**/*", "**/.git/**/*"]
    }, settings || {});
    set.chokidar.cwd = set.cwd;
    if (!Array.isArray(input))
      input = [input];
    input = input.map((i) => {
      var _a2;
      return (_a2 = i.path) != null ? _a2 : i;
    });
    const expandedGlobs = __expandGlob(input).map((l) => {
      return l.split(":")[0].replace(set.cwd + "/", "").replace(set.cwd, "");
    });
    const watcher = __chokidar.watch(expandedGlobs, __spreadProps(__spreadValues({}, set.chokidar), {
      ignored: [...set.ignored, ...(_a = set.exclude) != null ? _a : []]
    }));
    watcher.on("add", (path) => {
      if (filesStack[path] || !__fs.existsSync(`${set.cwd}/${path}`))
        return;
      if (!filesStack[path]) {
        if (set.SFile)
          filesStack[path] = __SFile.new(`${set.cwd}/${path}`);
        else
          filesStack[path] = path;
      }
      emit("add", filesStack[path]);
      emit("file", filesStack[path]);
    }).on("change", (path) => {
      if (!__fs.existsSync(`${set.cwd}/${path}`))
        return;
      if (!filesStack[path]) {
        if (set.SFile)
          filesStack[path] = __SFile.new(`${set.cwd}/${path}`);
        else
          filesStack[path] = path;
      }
      emit("update", filesStack[path]);
      emit("change", filesStack[path]);
      emit("file", filesStack[path]);
    }).on("unlink", (path) => {
      if (filesStack[path] && filesStack[path].path) {
        emit("unlink", filesStack[path].path);
      } else if (filesStack[path] && typeof filesStack[path] === "string") {
        emit("unlink", filesStack[path]);
      }
      delete filesStack[path];
    }).on("ready", () => {
      const files = watcher.getWatched();
      const filesPaths = [];
      const finalFiles = [];
      Object.keys(files).forEach((path) => {
        files[path].forEach((fileName) => {
          filesPaths.push(`${path}/${fileName}`);
        });
      });
      filesPaths.filter((filePath) => {
        return __matchGlob(filePath, input, {
          cwd: set.cwd
        });
      }).forEach((filePath) => {
        if (set.SFile)
          finalFiles.push(__SFile.new(`${set.cwd}/${filePath}`));
        else
          finalFiles.push(filePath);
        emit("file", finalFiles[finalFiles.length - 1]);
        filesStack[filePath] = finalFiles[finalFiles.length - 1];
      });
      emit("ready", finalFiles);
      if (finalFiles.length && !set.ignoreInitial) {
        emit("files", finalFiles);
      }
      if (!set.watch) {
        watcher.close();
        resolve(finalFiles);
      }
    }).on("cancel", () => {
      watcher.close();
    });
  }, {
    eventEmitter: {}
  });
}
var pool_default = pool;
export {
  pool_default as default
};
