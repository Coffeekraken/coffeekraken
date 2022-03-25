import __SCache from "@coffeekraken/s-cache";
import __SFile from "@coffeekraken/s-file";
import __SPromise from "@coffeekraken/s-promise";
import __fs from "fs";
import __path from "path";
import __md5 from "../../shared/crypt/md5";
import __deepMerge from "../../shared/object/deepMerge";
import __packageRootDir from "../path/packageRootDir";
import __extractImport from "./extractImport";
function dependencyTree(filePath, settings) {
  return new __SPromise(async ({ resolve, reject, emit }) => {
    const set = __deepMerge({
      deep: false,
      cache: false
    }, settings || {});
    const logPath = __path.relative(__packageRootDir(), filePath);
    if (!__fs.existsSync(filePath)) {
      throw new Error(`dependencyTree: Sorry but the filePath passed "<cyan>${filePath}</cyan>" seems to not exists...`);
    }
    let packageJsonMtimeMs = -1, fileMtimeMs = __fs.statSync(filePath).mtimeMs;
    const packageJsonPath = `${__packageRootDir()}/package.json`;
    if (__fs.existsSync(packageJsonPath)) {
      packageJsonMtimeMs = __fs.statSync(packageJsonPath).mtimeMs;
    }
    const cache = new __SCache("dependency-tree");
    const integrity = __md5.encrypt({
      packageJsonMtimeMs,
      fileMtimeMs
    });
    if (set.cache) {
      emit("log", {
        group: `s-dependency-tree`,
        value: `<yellow>[cache]</yellow> Checking cache for file "<cyan>${logPath}</cyan>"...`
      });
      const cachedValue = await cache.get(filePath);
      if (cachedValue) {
        if (cachedValue.integrity === integrity) {
          emit("log", {
            group: `s-dependency-tree`,
            value: `<green>[cache]</green> Cache validated for file "<cyan>${logPath}</cyan>"`
          });
          return resolve(cachedValue.tree);
        }
      }
    }
    emit("log", {
      group: `s-dependency-tree`,
      value: `<yellow>[generate]</yellow> Generating dependency tree for file "<cyan>${logPath}</cyan>"...`
    });
    const tree = {};
    const file = __SFile.new(filePath);
    const imports = __extractImport(file.content);
    emit("log", {
      group: `s-dependency-tree`,
      value: `<green>[generated]</green> Dependency tree generated <green>successfully</green> for file "<cyan>${logPath}</cyan>"`
    });
    if (set.cache) {
      emit("log", {
        group: `s-dependency-tree`,
        value: `<yellow>[cache]</yellow> Caching dependency tree for file "<cyan>${logPath}</cyan>"...`
      });
      await cache.set(filePath, {
        tree,
        integrity
      });
    }
    resolve(tree);
  });
}
export {
  dependencyTree as default
};
