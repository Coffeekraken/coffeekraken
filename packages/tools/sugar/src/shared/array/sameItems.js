var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var sameItems_exports = {};
__export(sameItems_exports, {
  default: () => sameItems
});
module.exports = __toCommonJS(sameItems_exports);
var import_md5 = __toESM(require("../crypt/md5"), 1);
var import_plainObject = __toESM(require("../is/plainObject"), 1);
var import_unique = __toESM(require("./unique"), 1);
function sameItems(...args) {
  var _a, _b, _c;
  const arrays = args.filter((arg) => Array.isArray(arg));
  const settings = __spreadValues({
    references: true,
    hash: true
  }, (_a = args.filter((arg) => (0, import_plainObject.default)(arg))[0]) != null ? _a : {});
  if (arrays.length > 2) {
    let newArray = arrays[0];
    arrays.forEach((currentArray) => {
      newArray = sameItems(newArray, currentArray, settings);
    });
    return (0, import_unique.default)(newArray);
  } else {
    const array1 = (_b = arrays[0]) != null ? _b : [], array2 = (_c = arrays[1]) != null ? _c : [];
    const sameArray = [];
    array1.forEach((array1Item) => {
      let array1ItemHash = array1Item;
      if (typeof array1Item !== "string" && settings.hash) {
        array1ItemHash = import_md5.default.encrypt(array1Item);
      }
      array2.forEach((array2Item) => {
        let array2ItemHash = array2Item;
        if (typeof array2Item !== "string" && settings.hash) {
          array2ItemHash = import_md5.default.encrypt(array2Item);
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
    return (0, import_unique.default)(sameArray);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
