import {
  __spreadValues
} from "../../../../../chunk-JETN4ZEY.mjs";
import __get from "./get";
import __unquote from "../string/unquote";
var set_default = (obj, path, value, settings = {}) => {
  settings = __spreadValues({}, settings);
  if (!path || path === "" || path === ".") {
    obj = value;
    return;
  }
  path = path.replace(/\[(\w+)\]/g, ".[$1]");
  const a = __unquote(path).split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm).map((p) => __unquote(p));
  let o = obj;
  while (a.length - 1) {
    const n = a.shift();
    if (!(n in o)) {
      if (a[0].match(/^\[[0-9]+\]$/))
        o[n] = [];
      else
        o[n] = {};
    }
    o = o[n];
  }
  if (a[0].match(/^\[[0-9]+\]$/)) {
    if (!Array.isArray(o))
      o = [];
    o.push(value);
  } else {
    o[a[0]] = value;
  }
  return __get(obj, path);
};
export {
  set_default as default
};
