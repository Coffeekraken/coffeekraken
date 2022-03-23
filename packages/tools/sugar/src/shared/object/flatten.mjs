import {
  __spreadProps,
  __spreadValues
} from "../../../../../chunk-JETN4ZEY.mjs";
import __isPlain from "../is/plainObject";
function flatten(object, settings = {}) {
  const toReturn = {};
  if (!Array.isArray(object) && !__isPlain(object))
    return object;
  settings = __spreadValues({
    separator: ".",
    array: false,
    quoteSeparatedProperties: true,
    quoteCharacter: '"',
    excludeProps: [],
    keepLastIntact: false
  }, settings);
  for (const key in object) {
    if (object[key] === void 0)
      continue;
    if (object[key] === null) {
      toReturn[key] = null;
      continue;
    }
    if (settings.excludeProps.indexOf(key) !== -1) {
      toReturn[key] = object[key];
      continue;
    }
    if (Array.isArray(object[key]) && settings.array || (!Array.isArray(object[key]) && typeof object[key]) == "object") {
      const isArray = Array.isArray(object[key]);
      const flatObject = flatten(object[key], __spreadProps(__spreadValues({}, settings), {
        keepLastIntact: false
      }));
      for (const x in flatObject) {
        if (flatObject[x] === void 0)
          continue;
        if (isArray) {
          toReturn[`${key}[${x}]`] = flatObject[x];
        } else {
          const part = key;
          if (settings.quoteSeparatedProperties && part.includes(settings.separator)) {
            toReturn[`${settings.quoteCharacter}${key}${settings.quoteCharacter}` + settings.separator + x] = flatObject[x];
          } else {
            toReturn[key + settings.separator + x] = flatObject[x];
          }
        }
      }
      continue;
    }
    toReturn[key] = object[key];
  }
  return toReturn;
}
var flatten_default = flatten;
export {
  flatten_default as default
};
