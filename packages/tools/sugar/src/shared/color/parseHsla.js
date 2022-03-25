function parseHsl(hslaString) {
  hslaString = hslaString.toLowerCase();
  const string = hslaString.replace("hsla(", "").replace("hsl(", "").replace(")", "").replace(/\s/g, "");
  const array = string.split(",");
  return {
    h: parseFloat(array[0]),
    s: parseFloat(array[1]),
    l: parseFloat(array[2]),
    a: array[3] ? parseFloat(array[3]) : 1
  };
}
var parseHsla_default = parseHsl;
export {
  parseHsla_default as default
};
