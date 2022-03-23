import {
  __spreadValues,
  __toESM
} from "../../../../../chunk-TD77TI6B.mjs";
import __packageRoot from "../path/packageRoot";
import __path from "path";
import __yaml from "yaml";
import __fs from "fs";
async function loadConfigFile(filePath, settings) {
  const finalSettings = __spreadValues({
    rootDir: __packageRoot(),
    throw: false
  }, settings != null ? settings : {});
  const filePathArray = Array.isArray(filePath) ? filePath : [filePath];
  let finalFilePath;
  for (let i = 0; i < filePathArray.length; i++) {
    if (__fs.existsSync(__path.resolve(finalSettings.rootDir, filePathArray[i]))) {
      finalFilePath = filePathArray[i];
      break;
    }
  }
  if (finalSettings.throw && !finalFilePath) {
    throw new Error(`Sorry but none of the passed config files "${filePathArray.join(",")}" does exists...`);
  } else if (!finalFilePath)
    return;
  const extension = finalFilePath.split(".").pop();
  switch (extension) {
    case "js":
    case "json":
      return (await Promise.resolve().then(() => __toESM(require(__path.resolve(finalSettings.rootDir, finalFilePath))))).default;
      break;
    case "yml":
      const str = __fs.readFileSync(__path.resolve(finalSettings.rootDir, finalFilePath), "utf8").toString();
      return __yaml.parse(str);
      break;
  }
}
export {
  loadConfigFile as default
};
