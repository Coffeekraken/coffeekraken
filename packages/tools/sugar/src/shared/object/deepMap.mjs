import {
  __spreadValues
} from "../../../../../chunk-JETN4ZEY.mjs";
import __isPlainObject from "../is/plainObject";
import __deepMerge from "../object/deepMerge";
import __isClassInstance from "../is/classInstance";
function deepMap(objectOrArray, processor, settings = {}, _path = []) {
  settings = __deepMerge({
    classInstances: false,
    array: true,
    privateProps: false,
    cloneFirst: true
  }, settings);
  const isArray = Array.isArray(objectOrArray);
  let newObject = isArray ? [] : settings.cloneFirst ? Object.assign({}, objectOrArray) : objectOrArray;
  Object.keys(objectOrArray).forEach((prop) => {
    if (!settings.privateProps && prop.match(/^_/))
      return;
    if (__isPlainObject(objectOrArray[prop]) || __isClassInstance(objectOrArray[prop]) && settings.classInstances || Array.isArray(objectOrArray[prop]) && settings.array) {
      const res2 = deepMap(objectOrArray[prop], processor, settings, [
        ..._path,
        prop
      ]);
      if (isArray) {
        newObject.push(res2);
      } else {
        if (prop === "..." && __isPlainObject(res2)) {
          newObject = __spreadValues(__spreadValues({}, newObject), res2);
        } else {
          newObject[prop] = res2;
        }
      }
      return;
    }
    const res = processor({
      object: objectOrArray,
      prop,
      value: objectOrArray[prop],
      path: [..._path, prop].join(".")
    });
    if (res === -1) {
      delete objectOrArray[prop];
      return;
    }
    if (isArray)
      newObject.push(res);
    else {
      if (prop === "..." && __isPlainObject(res)) {
        newObject = __spreadValues(__spreadValues({}, newObject), res);
      } else {
        newObject[prop] = res;
      }
    }
  });
  return newObject;
}
var deepMap_default = deepMap;
export {
  deepMap_default as default
};
