import {
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
import __writeFileSync from "./writeFileSync";
import __path from "path";
import __uniqid from "../../shared/string/uniqid";
import __packageTmpDir from "../path/packageTmpDir";
function writeTmpFileSync(data, settings = {}) {
  var _a;
  settings = __spreadValues({
    path: void 0
  }, settings);
  let path = __path.resolve(__packageTmpDir(), "files", (_a = settings.path) != null ? _a : __uniqid() + ".tmp");
  __writeFileSync(path, data);
  return path;
}
var writeTmpFileSync_default = writeTmpFileSync;
export {
  writeTmpFileSync_default as default
};
