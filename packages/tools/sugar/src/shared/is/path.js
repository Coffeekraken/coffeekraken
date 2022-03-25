import __isValidPath from "is-valid-path";
function path(path2) {
  if (!__isValidPath(path2))
    return false;
  return true;
}
var path_default = path;
export {
  path_default as default
};
