function uncamelize(text, separator = "-") {
  let res = "";
  res = text.replace(/[A-Z]/g, function(letter) {
    return separator + letter.toLowerCase();
  });
  if (res.slice(0, 1) === separator)
    res = res.slice(1);
  return res;
}
var uncamelize_default = uncamelize;
export {
  uncamelize_default as default
};
