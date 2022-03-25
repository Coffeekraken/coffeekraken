import __fs from "fs";
import __deepMerge from "../../shared/object/deepMerge";
function isFile(path, settings = {}) {
  settings = __deepMerge({
    symlink: true
  }, settings);
  let isMatching = __fs.existsSync(path);
  if (!isMatching)
    return false;
  if (settings.symlink && __fs.lstatSync(path).isSymbolicLink()) {
    const realPath = __fs.realpathSync(path);
    isMatching = isMatching && __fs.lstatSync(realPath).isFile();
  } else {
    isMatching = isMatching && __fs.lstatSync(path).isFile();
  }
  return isMatching;
}
var file_default = isFile;
export {
  file_default as default
};
