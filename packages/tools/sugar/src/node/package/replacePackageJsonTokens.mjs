import {
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
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
