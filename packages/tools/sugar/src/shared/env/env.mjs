import "../../../../../chunk-JETN4ZEY.mjs";
import __isNode from "../is/node";
import __get from "../object/get";
import __set from "../object/set";
import __delete from "../object/delete";
import __parse from "../string/parse";
function env(dotPath, value) {
  if (!__isNode()) {
    if (!window.process)
      window.process = {};
    if (!window.process.env)
      window.process.env = {};
  }
  const targetObj = __isNode() ? global.process.env : window.process.env;
  if (value === -1) {
    __delete(targetObj, dotPath.toUpperCase());
  } else if (value !== void 0) {
    __set(targetObj, dotPath.toUpperCase(), __parse(value));
  }
  return __parse(__get(targetObj, dotPath.toUpperCase()));
}
var env_default = env;
export {
  env_default as default
};
