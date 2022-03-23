import "../../../../../../chunk-PG3ZPS4G.mjs";
function appendStyleTag(css, $parent = document.head || document.getElementsByTagName("head")[0]) {
  const $style = document.createElement("style");
  if ($style.styleSheet) {
    $style.styleSheet.cssText = css;
  } else {
    $style.appendChild(document.createTextNode(css));
  }
  $parent.appendChild($style);
  return $style;
}
var appendStyleTag_default = appendStyleTag;
export {
  appendStyleTag_default as default
};
