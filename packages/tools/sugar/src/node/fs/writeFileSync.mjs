import "../../../../../chunk-TD77TI6B.mjs";
import __folderPath from "./folderPath";
import __ensureDirSync from "./ensureDirSync";
import __fs from "fs-extra";
function writeFileSync(path, data, options = {}) {
  const folderPath = __folderPath(path);
  __ensureDirSync(folderPath);
  return __fs.outputFileSync(path, data, options);
}
var writeFileSync_default = writeFileSync;
export {
  writeFileSync_default as default
};
