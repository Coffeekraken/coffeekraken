import "../../../../../../chunk-PG3ZPS4G.mjs";
function stripTags(html) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}
var stripTags_default = stripTags;
export {
  stripTags_default as default
};
