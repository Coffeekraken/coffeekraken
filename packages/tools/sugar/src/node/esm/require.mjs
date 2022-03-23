import "../../../../../chunk-TD77TI6B.mjs";
import __callsites from "callsites";
import __esm from "esm";
import { createRequire } from "module";
function require2(pkg) {
  var _a;
  let filePath = (_a = __callsites()[1].getFileName()) == null ? void 0 : _a.replace(/^file:\/\//, "");
  const rr = createRequire(filePath);
  const r = __esm({});
  const requiredPkg = rr(pkg);
  return requiredPkg;
}
export {
  require2 as default
};
