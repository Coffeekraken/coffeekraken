import "../../../../../chunk-JETN4ZEY.mjs";
import __set from "./set";
function del(object, dotPath) {
  const parentDotPath = dotPath.split(".").slice(0, -1).join(".");
  if (!dotPath || dotPath === "" || dotPath === ".")
    return object;
  dotPath = dotPath.replace(/\[(\w+)\]/g, ".$1");
  dotPath = dotPath.replace(/^\./, "");
  const a = dotPath.split(".");
  let o = object;
  while (a.length) {
    const n = a.shift();
    if (a.length < 1) {
      if (Array.isArray(o)) {
        const valueToDelete = o[n];
        o = o.filter((v) => {
          return v !== valueToDelete;
        });
      } else {
        delete o[n];
      }
      __set(object, parentDotPath, o);
    } else {
      o = o[n];
    }
  }
  return object;
}
var delete_default = del;
export {
  delete_default as default
};
