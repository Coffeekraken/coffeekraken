import {
  __spreadValues
} from "../../../../../chunk-JETN4ZEY.mjs";
import __SType from "@coffeekraken/s-type";
function ofType(value, typeString, settings = {}) {
  settings = __spreadValues({
    verbose: false
  }, settings);
  const typeInstance = new __SType(typeString, settings);
  const res = typeInstance.is(value);
  return res;
}
var ofType_default = ofType;
export {
  ofType_default as default
};
