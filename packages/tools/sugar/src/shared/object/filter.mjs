import "../../../../../chunk-JETN4ZEY.mjs";
function filter(object, filter2) {
  const result = {};
  Object.keys(object).forEach((propertyName) => {
    if (filter2(propertyName, object[propertyName])) {
      result[propertyName] = object[propertyName];
    }
  });
  return result;
}
var filter_default = filter;
export {
  filter_default as default
};
