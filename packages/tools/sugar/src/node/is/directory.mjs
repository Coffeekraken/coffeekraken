import "../../../../../chunk-TD77TI6B.mjs";
import __fs from "fs";
import __deepMerge from "../../shared/object/deepMerge";
function isDirectory(path, settings = {}) {
  settings = __deepMerge({
    symlink: true
  }, settings);
  let isMatching = __fs.existsSync(path);
  if (!isMatching)
    return false;
  if (settings.symlink && __fs.lstatSync(path).isSymbolicLink()) {
    const realPath = __fs.realpathSync(path);
    isMatching = isMatching && __fs.lstatSync(realPath).isDirectory();
  } else {
    isMatching = isMatching && __fs.lstatSync(path).isDirectory();
  }
  return isMatching;
}
var directory_default = isDirectory;
export {
  directory_default as default
};
