import "../../../../../chunk-PG3ZPS4G.mjs";
function decodeHtmlEntities(string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = string;
  return txt.value;
}
var decodeHtmlEntities_default = decodeHtmlEntities;
export {
  decodeHtmlEntities_default as default
};
