function sort(object, sort2) {
  const keys = Object.keys(object);
  const sortedKeys = keys.sort((a, b) => {
    return sort2(object[a], object[b]);
  });
  const resultObj = {};
  sortedKeys.forEach((k) => {
    resultObj[k] = object[k];
  });
  return resultObj;
}
var sort_default = sort;
export {
  sort_default as default
};
