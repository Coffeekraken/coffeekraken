import {
  __toESM
} from "../../../../../chunk-TD77TI6B.mjs";
import __SFile from "@coffeekraken/s-file";
import __SugarConfig from "@coffeekraken/s-sugar-config";
var registerSFileClasses_default = () => {
  const map = __SugarConfig.get("fs.sFileClassesMap");
  Object.keys(map).forEach(async (key) => {
    const { default: cls } = await Promise.resolve().then(() => __toESM(require(map[key])));
    key.split(",").map((l) => l.trim()).forEach((pattern) => {
      __SFile.registerClass(pattern, cls);
    });
  });
};
export {
  registerSFileClasses_default as default
};
