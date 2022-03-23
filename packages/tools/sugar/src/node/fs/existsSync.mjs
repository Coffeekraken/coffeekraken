import {
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
import __fs from "fs";
function existsSync(path, settings) {
  const set = __spreadValues({
    directory: true,
    file: true,
    symlink: true
  }, settings || {});
  let isSymlink = false, stats;
  try {
    stats = __fs.statSync(path);
    if (!stats)
      return false;
    isSymlink = stats.isSymbolicLink();
  } catch (e) {
    return false;
  }
  if (isSymlink && !set.symlink)
    return false;
  if (stats.isDirectory() && !set.directory)
    return false;
  if (stats.isFile() && !set.file)
    return false;
  return true;
}
export {
  existsSync as default
};
