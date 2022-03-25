import __fs from "fs-extra";
function copy(src, dest) {
  return __fs.copy(src, dest);
}
var copy_default = copy;
export {
  copy_default as default
};
