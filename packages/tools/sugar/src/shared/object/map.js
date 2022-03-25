function map(object, processor) {
  for (let i = 0; i < Object.keys(object).length; i++) {
    const prop = Object.keys(object)[i];
    const res = processor({
      value: object[prop],
      key: prop,
      prop,
      i,
      idx: i
    });
    if (res === -1)
      delete object[prop];
    else
      object[prop] = res;
  }
  return object;
}
var map_default = map;
export {
  map_default as default
};
