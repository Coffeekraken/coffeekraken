function isYyyymmddDate(date) {
  return /^\d{4}[\-\/\s\.]?((((0[13578])|(1[02]))[\-\/\s\.]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\-\/\s\.]?(([0-2][0-9])|(30)))|(02[\-\/\s\.]?[0-2][0-9]))$/.test(date);
}
var yyyymmddDate_default = isYyyymmddDate;
export {
  yyyymmddDate_default as default
};
