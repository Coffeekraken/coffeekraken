import "../../../../../chunk-TD77TI6B.mjs";
import __isValidPath from "is-valid-path";
import __fs from "fs";
function isPath(path, checkExistence = false) {
  if (typeof path !== "string")
    return false;
  if (path.trim() === "")
    return false;
  if (path.split("\n").length > 1)
    return false;
  if (!path.includes("/")) {
    if (!path.includes("."))
      return false;
  }
  if (!__isValidPath(path))
    return false;
  if (checkExistence) {
    if (!__fs.existsSync(path))
      return false;
  }
  return true;
}
var isPath_default = isPath;
export {
  isPath_default as default
};
