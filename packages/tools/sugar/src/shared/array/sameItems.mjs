import {
  __spreadValues
} from "../../../../../chunk-JETN4ZEY.mjs";
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
