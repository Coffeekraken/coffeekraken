import {
  __spreadValues
} from "../../../../../chunk-JETN4ZEY.mjs";
import __minimatch from "minimatch";
import __flatten from "./flatten";
import __deepize from "./deepize";
function getGlob(obj, glob, settings = {}) {
  settings = __spreadValues({
    deepize: true
  }, settings);
  const flat = __flatten(obj);
  const resultObj = {};
  Object.keys(flat).forEach((path) => {
    if (__minimatch(path, glob)) {
      resultObj[path] = flat[path];
    }
  });
  if (settings.deepize === true)
    return __deepize(resultObj);
  return resultObj;
}
export {
  getGlob as default
};
