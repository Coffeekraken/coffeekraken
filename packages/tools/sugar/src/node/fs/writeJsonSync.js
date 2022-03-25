import __folderPath from "./folderPath";
import __ensureDirSync from "./ensureDirSync";
import __fs from "fs";
import __stringify from "../../shared/json/stringify";
function writeJsonSync(path, data, options = {}) {
  const folderPath = __folderPath(path);
  __ensureDirSync(folderPath);
  const jsonStr = __stringify(data, null, 4);
  __fs.writeFileSync(path, jsonStr);
}
var writeJsonSync_default = writeJsonSync;
export {
  writeJsonSync_default as default
};
