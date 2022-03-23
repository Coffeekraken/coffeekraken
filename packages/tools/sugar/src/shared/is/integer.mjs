import "../../../../../chunk-JETN4ZEY.mjs";
function isInteger(data) {
  return typeof data === "number" && !isNaN(data) && function(x) {
    return (x | 0) === x;
  }(parseFloat(data));
}
var integer_default = isInteger;
export {
  integer_default as default
};
