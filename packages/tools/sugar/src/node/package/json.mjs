import {
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
import __packageRoot from "./rootPath";
import __fs from "fs";
import __standardizeJson from "../../shared/npm/utils/standardizeJson";
const __packageJson = {};
function json(from = process.cwd(), settings) {
  return new Promise(async (resolve) => {
    const finalSettings = __spreadValues({
      highest: false,
      standardize: false
    }, settings != null ? settings : {});
    const hash = __objectHash(__spreadValues({
      from
    }, finalSettings));
    if (__packageJson[hash]) {
      return resolve(__packageJson[hash]);
    }
    const path = `${__packageRoot(from, finalSettings.highest)}/package.json`;
    if (!__fs.existsSync(path))
      return false;
    let json2 = __readJsonSync(path);
    if (finalSettings.standardize) {
      json2 = __standardizeJson(json2);
    }
    if (!__packageJson[hash])
      __packageJson[hash] = json2;
    resolve(json2);
  });
}
var json_default = json;
export {
  json_default as default
};
