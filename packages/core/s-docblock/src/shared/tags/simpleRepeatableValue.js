function simpleRepeatableValue(data, blockSettings) {
  data = Array.from(data);
  data = data.map((d) => {
    const val = new String(d.value);
    val.render = true;
    return val;
  });
  return data;
}
var simpleRepeatableValue_default = simpleRepeatableValue;
export {
  simpleRepeatableValue_default as default
};
