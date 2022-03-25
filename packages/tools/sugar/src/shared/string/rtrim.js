function rtrim(string, needle, trimResult = true) {
  if (string.substr(needle.length * -1) === needle) {
    if (trimResult) {
      return string.substr(0, string.length - needle.length).trim();
    } else {
      return string.substr(0, string.length - needle.length);
    }
  }
  return string;
}
var rtrim_default = rtrim;
export {
  rtrim_default as default
};
