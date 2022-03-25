import __toRegex from "to-regex";
function dedupe(str, statement) {
  const reg = __toRegex(`(${statement})`, {
    contains: true,
    flags: "g"
  });
  return str.split(reg).reverse().filter(function(e, i, arr) {
    return arr.indexOf(e, i + 1) === -1;
  }).reverse().join("");
}
var dedupe_default = dedupe;
export {
  dedupe_default as default
};
