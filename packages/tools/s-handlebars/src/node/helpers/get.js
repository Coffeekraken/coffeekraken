import __get from "@coffeekraken/sugar/shared/object/get";
function get(object, path, resolveDots = true, insidePath = null) {
  if (typeof insidePath !== "string")
    insidePath = null;
  let res;
  if (resolveDots) {
    res = __get(object, path);
  } else {
    res = object[path];
  }
  if (insidePath) {
    return __get(res, insidePath);
  }
  return res;
}
export {
  get as default
};
