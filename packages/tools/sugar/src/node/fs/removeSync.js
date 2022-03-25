import __fs from "fs-extra";
function removeSync(path) {
  return __fs.removeSync(path);
}
var removeSync_default = removeSync;
export {
  removeSync_default as default
};
