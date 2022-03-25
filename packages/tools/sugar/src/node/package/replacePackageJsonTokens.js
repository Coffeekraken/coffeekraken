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
import __packageJson from "./jsonSync";
import __flatten from "../../shared/object/flatten";
function replacePackageJsonTokens(string, settings) {
  const set = __spreadValues({}, settings);
  const tokensMatches = string.match(/%packageJson\.[a-zA-Z0-9\.]+;?/gm);
  if (!tokensMatches)
    return string;
  const packageJson = __packageJson();
  const flatPackageJson = __flatten(packageJson, {
    array: true
  });
  tokensMatches.forEach((match) => {
    const dotPath = match.replace(/^%packageJson\./, "").replace(/;$/, "");
    const value = flatPackageJson[dotPath];
    if (value === void 0)
      return;
    string = string.replaceAll(match, value);
  });
  return string;
}
export {
  replacePackageJsonTokens as default
};
