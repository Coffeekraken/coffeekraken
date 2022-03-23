import {
  __spreadValues
} from "../../../../../chunk-JETN4ZEY.mjs";
import __unquote from "../string/unquote";
import __unique from "@coffeekraken/sugar/shared/array/unique";
function get(obj, path, settings = {}) {
  settings = __spreadValues({}, settings);
  if (obj[path] !== void 0)
    return obj[path];
  if (!path || path === "" || path === ".")
    return obj;
  path = path.replace(/\[(\w+)\]/g, ".$1");
  path = path.replace(/^\./, "");
  let potentialPaths = [path.replace(/\?/gm, "")];
  const parts = path.split(".");
  for (let i = parts.length - 1; i >= 0; i--) {
    const part = parts[i];
    if (part.match(/\?$/)) {
      const before = parts.slice(0, i);
      const after = parts.slice(i + 1);
      potentialPaths.push([...before, ...after].join("."));
      potentialPaths.push([...before, ...after.filter((a) => !a.match(/\?$/))].join("."));
    }
  }
  potentialPaths = __unique(potentialPaths.map((s) => s.replace(/\?/gm, "")));
  for (let i = 0; i < potentialPaths.length; i++) {
    const path2 = potentialPaths[i];
    const result = __get(obj, path2, settings);
    if (result !== void 0)
      return result;
  }
}
function __get(obj, path, settings = {}) {
  settings = __spreadValues({}, settings);
  if (obj[path] !== void 0)
    return obj[path];
  if (!path || path === "" || path === ".")
    return obj;
  const a = path.split(/(?!\B"[^"]*)\.(?![^"]*"\B)/gm).map((p) => __unquote(p));
  let o = obj;
  while (a.length) {
    const n = a.shift().replace(/\?$/, "");
    if (typeof o !== "object" || !(n in o)) {
      return;
    }
    o = o[n];
  }
  return o;
}
var get_default = get;
export {
  get_default as default
};
