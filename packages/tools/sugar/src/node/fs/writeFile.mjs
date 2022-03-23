import "../../../../../chunk-TD77TI6B.mjs";
import __folderPath from "./folderPath";
import __ensureDirSync from "./ensureDirSync";
import __fs from "fs-extra";
function writeFile(path, data, options = {}) {
  return new Promise(async (resolve) => {
    const folderPath = __folderPath(path);
    __ensureDirSync(folderPath);
    await __fs.outputFile(path, data, options);
    resolve(path);
  });
}
var writeFile_default = writeFile;
export {
  writeFile_default as default
};
