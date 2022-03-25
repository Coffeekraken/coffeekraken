import scriptLoaded from "../scriptLoaded";
function appendScriptTag(src, $parent = document.body) {
  const $script = document.createElement("script");
  $script.src = src;
  $parent.appendChild($script);
  return scriptLoaded($script);
}
var appendScriptTag_default = appendScriptTag;
export {
  appendScriptTag_default as default
};
