import {
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
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
