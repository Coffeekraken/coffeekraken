import {
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
import __packageRoot from "./rootPath";
import __fs from "fs";
import __readJsonSync from "../fs/readJsonSync";
import __standardizeJson from "../../shared/npm/utils/standardizeJson";
import __objectHash from "../../shared/object/objectHash";
let __packageJson = {};
function jsonSync(from = process.cwd(), settings) {
  const finalSettings = __spreadValues({
    highest: false,
    standardize: false
  }, settings != null ? settings : {});
  const hash = __objectHash(__spreadValues({
    from
  }, finalSettings));
  if (__packageJson[hash]) {
    return __packageJson[hash];
  }
  const path = `${__packageRoot(from, finalSettings.highest)}/package.json`;
  if (!__fs.existsSync(path))
    return false;
  let json = __readJsonSync(path);
  if (finalSettings.standardize) {
    json = __standardizeJson(json);
  }
  if (!__packageJson[hash])
    __packageJson[hash] = json;
  return json;
}
var jsonSync_default = jsonSync;
export {
  jsonSync_default as default
};
