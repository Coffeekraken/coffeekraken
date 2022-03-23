import "../../../../../../chunk-JETN4ZEY.mjs";
function getMethods(toCheck) {
  let props = [];
  let obj = toCheck;
  do {
    const _props = Object.getOwnPropertyNames(obj);
    if (_props.indexOf("__defineGetter__") !== -1)
      continue;
    props = props.concat(_props);
  } while (obj = Object.getPrototypeOf(obj));
  return props.sort().filter(function(e, i, arr) {
    if (e != arr[i + 1] && typeof toCheck[e] == "function")
      return true;
  });
}
var getMethods_default = getMethods;
export {
  getMethods_default as default
};
