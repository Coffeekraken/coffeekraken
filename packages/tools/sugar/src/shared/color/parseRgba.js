function parseRgba(rgbaString) {
  rgbaString = rgbaString.toLowerCase();
  const string = rgbaString.replace("rgba(", "").replace("rgb(", "").replace(")", "").replace(/\s/g, "");
  const array = string.split(",");
  return {
    r: parseInt(array[0]),
    g: parseInt(array[1]),
    b: parseInt(array[2]),
    a: array[3] ? parseInt(array[3]) : 1
  };
}
var parseRgba_default = parseRgba;
export {
  parseRgba_default as default
};
