import "../../../../../../chunk-PG3ZPS4G.mjs";
import linkLoaded from "./linkLoaded";
function appendStylesheetLink(href) {
  const $link = document.createElement("link");
  $link.type = "text/css";
  $link.rel = "stylesheet";
  $link.href = href;
  document.head.appendChild($link);
  return linkLoaded($link);
}
var appendStylesheetLinkTag_default = appendStylesheetLink;
export {
  appendStylesheetLinkTag_default as default
};
