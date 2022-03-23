import {
  __spreadValues
} from "../../../../../chunk-JETN4ZEY.mjs";
import __isPlainObject from "../is/plainObject";
function applyScope(object, scopes, settings) {
  settings = __spreadValues({
    deep: true,
    clone: false
  }, settings);
  function recursive(obj) {
    obj = Object.assign({}, obj);
    Object.keys(obj).forEach((prop) => {
      const value = obj[prop];
      if (prop.split("@").length === 2) {
        const scope = prop.split("@")[1], scopedProp = prop.split("@")[0];
        if (scopes.indexOf(scope) !== -1) {
          if (__isPlainObject(value) && !scopedProp) {
            Object.keys(value).forEach((valueProp) => {
              obj[valueProp] = value[valueProp];
            });
          } else if (__isPlainObject(value) && scopedProp) {
            if (!obj[scopedProp])
              obj[scopedProp] = value;
            else
              obj[scopedProp] = __spreadValues(__spreadValues({}, obj[scopedProp]), value);
          } else if (scopedProp) {
            obj[scopedProp] = value;
          }
        }
        delete obj[prop];
      }
    });
    let needRecursion = false;
    for (let i = 0; i < Object.keys(obj).length; i++) {
      const prop = Object.keys(obj)[i];
      if (prop.split("@").length === 2) {
        needRecursion = true;
        break;
      }
    }
    if (needRecursion) {
      obj = recursive(obj);
    }
    if (settings == null ? void 0 : settings.deep) {
      Object.keys(obj).forEach((prop) => {
        const value = obj[prop];
        if (__isPlainObject(value)) {
          obj[prop] = recursive(value);
        }
      });
    }
    return obj;
  }
  const newObj = recursive(object);
  return newObj;
}
export {
  applyScope as default
};
