import "../../../../../chunk-JETN4ZEY.mjs";
function extractValues(arrayOfObjects, keyName) {
  const finalArray = [];
  arrayOfObjects.forEach((object) => {
    if (object[keyName] === void 0)
      return;
    finalArray.push(object[keyName]);
  });
  return finalArray;
}
var extractValues_default = extractValues;
export {
  extractValues_default as default
};
