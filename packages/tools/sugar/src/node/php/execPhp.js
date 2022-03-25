var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import __childProcess from "child_process";
import __base64 from "@coffeekraken/sugar/shared/crypt/base64";
import __uniqid from "@coffeekraken/sugar/shared/string/uniqid";
import __packageTmpDir from "@coffeekraken/sugar/node/path/packageTmpDir";
import __writeJsonSync from "@coffeekraken/sugar/node/fs/writeJsonSync";
function execPhp(scriptPath, params, settings) {
  return new Promise((resolve, reject) => {
    settings = __spreadValues({
      encryptParams: false,
      paramsThroughFile: false
    }, settings != null ? settings : {});
    let paramsFilePath, paramsStr;
    if (settings.encryptParams) {
      paramsStr = __base64.encrypt(paramsStr);
    } else if (settings.paramsThroughFile) {
      paramsFilePath = `${__packageTmpDir()}/exec-php-${__uniqid()}.json`;
      __writeJsonSync(paramsFilePath, params);
    }
    const result = __childProcess.spawnSync(`php ${scriptPath} '${paramsFilePath != null ? paramsFilePath : paramsStr}'`, [], {
      shell: true
    });
    if (result.stderr.toString()) {
      return reject(result.stderr.toString());
    }
    resolve(result.stdout.toString());
  });
}
export {
  execPhp as default
};
