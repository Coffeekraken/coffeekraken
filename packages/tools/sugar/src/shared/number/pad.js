function pad(number, width, character = "0") {
  number = number + "";
  return number.length >= width ? number : new Array(width - number.length + 1).join(character) + number;
}
var pad_default = pad;
export {
  pad_default as default
};
