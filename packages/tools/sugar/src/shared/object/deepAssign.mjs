import "../../../../../chunk-JETN4ZEY.mjs";
import __unique from "../array/unique";
import __isPlainObject from "../is/plainObject";
import __clone from "./clone";
function deepAssign(referenceObj, ...objects) {
  const settings = {
    array: false,
    object: true,
    cloneChilds: true
  };
  function merge(refObj, mixWithObj) {
    for (const key of Object.keys(mixWithObj)) {
      if (settings.array === true && Array.isArray(refObj[key]) && Array.isArray(mixWithObj[key])) {
        const newArray = __unique([...refObj[key], ...mixWithObj[key]]);
        refObj[key] = newArray;
        continue;
      }
      if (settings.object === true && __isPlainObject(refObj[key]) && __isPlainObject(mixWithObj[key])) {
        refObj[key] = merge(refObj[key], mixWithObj[key]);
        continue;
      }
      if (__isPlainObject(mixWithObj[key]) && settings.cloneChilds) {
        refObj[key] = __clone(mixWithObj[key], {
          deep: true
        });
      } else {
        refObj[key] = mixWithObj[key];
      }
    }
    return refObj;
  }
  const potentialSettingsObj = objects[objects.length - 1] || {};
  if (potentialSettingsObj.array && typeof potentialSettingsObj.array === "boolean" || potentialSettingsObj.object && typeof potentialSettingsObj.object === "boolean") {
    if (potentialSettingsObj.array !== void 0)
      settings.array = potentialSettingsObj.array;
    if (potentialSettingsObj.object !== void 0)
      settings.object = potentialSettingsObj.object;
    objects.pop();
  }
  for (let i = 0; i < objects.length; i++) {
    const toMergeObj = objects[i] || {};
    merge(referenceObj, toMergeObj);
  }
  return referenceObj;
}
export {
  deepAssign as default
};
