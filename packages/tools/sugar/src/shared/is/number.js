function isNumber(source) {
  return !isNaN(parseFloat(source)) && isFinite(source);
}
var number_default = isNumber;
export {
  number_default as default
};
