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
import __md5 from "../crypt/md5";
import __isPlainObject from "../is/plainObject";
import __unique from "./unique";
function sameItems(...args) {
  var _a, _b, _c;
  const arrays = args.filter((arg) => Array.isArray(arg));
  const settings = __spreadValues({
    references: true,
    hash: true
  }, (_a = args.filter((arg) => __isPlainObject(arg))[0]) != null ? _a : {});
  if (arrays.length > 2) {
    let newArray = arrays[0];
    arrays.forEach((currentArray) => {
      newArray = sameItems(newArray, currentArray, settings);
    });
    return __unique(newArray);
  } else {
    const array1 = (_b = arrays[0]) != null ? _b : [], array2 = (_c = arrays[1]) != null ? _c : [];
    const sameArray = [];
    array1.forEach((array1Item) => {
      let array1ItemHash = array1Item;
      if (typeof array1Item !== "string" && settings.hash) {
        array1ItemHash = __md5.encrypt(array1Item);
      }
      array2.forEach((array2Item) => {
        let array2ItemHash = array2Item;
        if (typeof array2Item !== "string" && settings.hash) {
          array2ItemHash = __md5.encrypt(array2Item);
          if (array1ItemHash === array2ItemHash) {
            sameArray.push(array1Item);
            return;
          }
        } else if (array1Item === array2Item) {
          sameArray.push(array1Item);
          return;
        }
      });
    });
    return __unique(sameArray);
  }
}
export {
  sameItems as default
};
