import __replacePathTokens from "../path/replacePathTokens";
import __replacePackageJsonTokens from "../package/replacePackageJsonTokens";
function replaceTokens(string) {
  string = __replacePathTokens(string);
  string = __replacePackageJsonTokens(string);
  return string;
}
export {
  replaceTokens as default
};
