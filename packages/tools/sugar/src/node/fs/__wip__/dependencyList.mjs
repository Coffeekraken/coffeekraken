import {
  __spreadValues
} from "../../../../../../chunk-TD77TI6B.mjs";
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
