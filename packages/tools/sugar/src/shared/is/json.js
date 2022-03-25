function isJson(value) {
  try {
    const res = JSON.parse(value);
    if (Object.keys(res).length)
      return true;
    return false;
  } catch (e) {
    return false;
  }
  return true;
}
var json_default = isJson;
export {
  json_default as default
};
