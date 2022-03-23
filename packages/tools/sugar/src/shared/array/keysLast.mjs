import "../../../../../chunk-JETN4ZEY.mjs";
import uniq from "lodash/uniq";
function keysLast(array, keys) {
  keys = keys.filter((key) => {
    return array.indexOf(key) !== -1;
  });
  let res = [].concat(array).concat(keys);
  res = res.reverse();
  res = uniq(res);
  res = res.reverse();
  return res;
}
var keysLast_default = keysLast;
export {
  keysLast_default as default
};
