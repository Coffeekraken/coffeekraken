import "../../../../../chunk-TD77TI6B.mjs";
import __isPath from "./isPath";
function folderPath(path, checkExistence = false) {
  if (checkExistence) {
    if (!__isPath(path, true))
      return false;
  }
  const parts = path.split("/");
  if (parts.length <= 1) {
    return "";
  }
  return parts.slice(0, -1).join("/");
}
var folderPath_default = folderPath;
export {
  folderPath_default as default
};
