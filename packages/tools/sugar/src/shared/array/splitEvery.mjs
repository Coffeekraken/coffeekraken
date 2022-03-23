import "../../../../../chunk-JETN4ZEY.mjs";
function splitEvery(array, every) {
  let i, j;
  const finalArray = [];
  for (i = 0, j = array.length; i < j; i += every) {
    finalArray.push(array.slice(i, i + every));
  }
  return finalArray;
}
var splitEvery_default = splitEvery;
export {
  splitEvery_default as default
};
