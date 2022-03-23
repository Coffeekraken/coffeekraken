import "../../../../../chunk-JETN4ZEY.mjs";
import uniq from "lodash/uniq";
function keysFirst(array, keys) {
  keys = keys.filter((key) => {
    return array.indexOf(key) !== -1;
  });
  const empty = [];
  let res = empty.concat(keys).concat(array);
  res = uniq(res);
  return res;
}
var keysFirst_default = keysFirst;
export {
  keysFirst_default as default
};
