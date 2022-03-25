import __fs from "fs-extra";
function remove(path) {
  return __fs.remove(path);
}
var remove_default = remove;
export {
  remove_default as default
};
