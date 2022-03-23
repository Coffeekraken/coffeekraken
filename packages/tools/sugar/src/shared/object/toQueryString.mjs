import "../../../../../chunk-JETN4ZEY.mjs";
function toQueryString(obj) {
  return "?" + Object.keys(obj).reduce(function(a, k) {
    a.push(k + "=" + encodeURIComponent(obj[k]));
    return a;
  }, []).join("&");
}
var toQueryString_default = toQueryString;
export {
  toQueryString_default as default
};
