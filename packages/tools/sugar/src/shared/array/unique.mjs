import "../../../../../chunk-JETN4ZEY.mjs";
function unique(array) {
  const a = array.concat();
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j])
        a.splice(j--, 1);
    }
  }
  return a;
}
var unique_default = unique;
export {
  unique_default as default
};
