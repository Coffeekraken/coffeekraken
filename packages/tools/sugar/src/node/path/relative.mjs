import {
  __spreadValues
} from "../../../../../chunk-TD77TI6B.mjs";
import __isGlob from "../../shared/is/glob";
import __isPath from "../../shared/is/path";
import __path from "path";
import __packageRootDir from "./packageRootDir";
function relative(path, from = __packageRootDir(), settings = {}) {
  settings = __spreadValues({
    glob: true,
    absolute: true
  }, settings);
  const isArray = Array.isArray(path);
  if (!isArray)
    path = [path];
  path = path.map((p) => {
    if (__isGlob(p)) {
      if (settings.glob)
        return __path.relative(from, p);
      return p;
    } else if (__path.isAbsolute(p)) {
      if (settings.absolute)
        return __path.relative(from, p);
      return p;
    } else if (__isPath(p))
      return __path.relative(from, p);
    return p;
  });
  if (isArray)
    return path;
  return path[0];
}
var relative_default = relative;
export {
  relative_default as default
};
