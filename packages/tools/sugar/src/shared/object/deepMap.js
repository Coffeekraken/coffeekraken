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
