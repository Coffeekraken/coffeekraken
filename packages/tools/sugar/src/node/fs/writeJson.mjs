import "../../../../../chunk-TD77TI6B.mjs";
import __folderPath from "./folderPath";
import __ensureDirSync from "./ensureDirSync";
import __fs from "fs";
import __stringify from "../../shared/json/stringify";
function writeJson(path, data, options = {}) {
  const folderPath = __folderPath(path);
  __ensureDirSync(folderPath);
  const jsonStr = __stringify(data, null, 4);
  return __fs.writeFile(path, jsonStr);
}
var writeJson_default = writeJson;
export {
  writeJson_default as default
};
