import __resolvePackagePath from "resolve-package-path";
import __packageRoot from "../path/packageRoot";
function resolvePackagePath(pkg, baseDir = `${__packageRoot()}/node_modules`) {
  var _a;
  return (_a = __resolvePackagePath(pkg, baseDir)) == null ? void 0 : _a.replace(/\/package\.json$/, "");
}
export {
  resolvePackagePath as default
};
