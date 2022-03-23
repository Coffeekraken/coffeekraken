import "../../../../../chunk-TD77TI6B.mjs";
import __fs from "fs";
function isSymlink(path) {
  return __fs.existsSync(path) && __fs.lstatSync(path).isSymbolicLink();
}
var symlink_default = isSymlink;
export {
  symlink_default as default
};
