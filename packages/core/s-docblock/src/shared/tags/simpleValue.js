function simpleValue(data, blockSettings) {
  if (data && data.value && typeof data.value === "string" && data.value.trim() === "") {
    return true;
  }
  const value = new String(data.value);
  value.render = true;
  return value;
}
var simpleValue_default = simpleValue;
export {
  simpleValue_default as default
};
