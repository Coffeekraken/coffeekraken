import {
  __spreadValues
} from "../../../../../chunk-JETN4ZEY.mjs";
import __clone from "lodash.clone";
import __deepClone from "lodash.clonedeep";
function clone(object, settings = {}) {
  settings = __spreadValues({
    deep: false
  }, settings);
  if (settings.deep) {
    return __deepClone(object);
  }
  return __clone(object);
}
var clone_default = clone;
export {
  clone_default as default
};
