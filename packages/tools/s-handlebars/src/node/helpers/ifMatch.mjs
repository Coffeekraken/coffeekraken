import "../../../../../chunk-TD77TI6B.mjs";
function ifMatch(str, regex, options) {
  if (str.match(new RegExp(regex)) !== null) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
}
export {
  ifMatch as default
};
