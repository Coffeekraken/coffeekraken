import __get from "./get";
import __set from "./set";
var ensureExists_default = (obj, path, value = {}) => {
  const v = __get(obj, path);
  if (v === void 0) {
    __set(obj, path, value);
  }
};
export {
  ensureExists_default as default
};
