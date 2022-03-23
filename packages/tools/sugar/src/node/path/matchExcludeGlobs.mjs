import "../../../../../chunk-TD77TI6B.mjs";
import __minimatch from "minimatch";
import __excludeGlobs from "./excludeGlobs";
function matchExcludeGlobs(path) {
  const excludeGlobs = __excludeGlobs();
  for (let i = 0; i < excludeGlobs.length; i++) {
    if (__minimatch(excludeGlobs[i], path))
      return true;
  }
  return false;
}
export {
  matchExcludeGlobs as default
};
