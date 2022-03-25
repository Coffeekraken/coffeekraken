function autoCast(string) {
  if (typeof string !== "string")
    return string;
  if (string.substr(0, 1) === "'" && string.substr(-1) === "'") {
    return string.substr(1, string.length - 2);
  }
  const presumedNumber = parseFloat(string);
  if (!isNaN(presumedNumber)) {
    if (presumedNumber.toString() === string) {
      return presumedNumber;
    }
  }
  if (window[string]) {
    return string;
  }
  try {
    const obj = eval(`(${string})`);
    return obj;
  } catch (e) {
    return string;
  }
}
var autoCast_default = autoCast;
export {
  autoCast_default as default
};
