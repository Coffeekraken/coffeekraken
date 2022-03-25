function isMmddyyyyDate(date) {
  return /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d\d\d\d$/.test(date);
}
var mmddyyyyDate_default = isMmddyyyyDate;
export {
  mmddyyyyDate_default as default
};
