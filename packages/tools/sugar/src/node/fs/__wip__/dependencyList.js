var __defProp = Object.defineProperty;
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
import __dependencyTree from "dependency-tree";
import __chokidar from "chokidar";
import __SPromise from "@coffeekraken/s-promise";
import __fs from "fs";
import __folderPath from "../folderPath";
import __minimatch from "minimatch";
function dependencyList(filePath, settings) {
  return new __SPromise(({ resolve, reject, emit }) => {
    const set = __spreadValues({
      watch: false,
      includeItself: false,
      ignoreInitial: false,
      exclude: []
    }, settings);
    function getList() {
      const list = __dependencyTree.toList({
        filename: filePath,
        directory: __folderPath(filePath),
        filter: (path) => {
          path = __fs.realpathSync(path);
          for (let i = 0; i < set.exclude.length; i++) {
            if (__minimatch(path, set.exclude[i]))
              return false;
          }
          return true;
        }
      }).map((p) => __fs.realpathSync(p)).filter((path) => {
        if (path === filePath && !set.includeItself)
          return false;
        return true;
      });
      return list;
    }
    if (set.watch) {
      let depWatcher;
      const watcher = __chokidar.watch(filePath, {}).on("change", () => {
        const list = getList();
        if (depWatcher)
          depWatcher.close();
        depWatcher = __chokidar.watch(list, {}).on("change", (path) => {
          emit("update", {
            path,
            list
          });
        });
        emit("update", {
          path: filePath,
          list: getList()
        });
      });
      if (!set.ignoreInitial) {
        emit("update", {
          path: filePath,
          list: getList()
        });
      }
    } else {
      resolve({
        path: filePath,
        list: getList()
      });
    }
  });
}
export {
  dependencyList as default
};
