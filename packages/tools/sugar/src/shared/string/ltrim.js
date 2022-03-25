function ltrim(string, needle, trimResult = true) {
  if (string.substr(0, needle.length) === needle) {
    return trimResult ? string.substr(needle.length).trim() : string.substr(needle.length);
  }
  return string;
}
var ltrim_default = ltrim;
export {
  ltrim_default as default
};
