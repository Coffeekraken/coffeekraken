import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __strToHtml from "../../shared/string/strToHtml";
function processString(string) {
  return string.replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&nbsp;/g, " ");
}
function processNodeElm(elm) {
  switch (elm.tagName.toLowerCase()) {
    case "script":
      return __strToHtml(elm.innerHTML);
      break;
    case "template":
      return document.importNode(elm.content, true);
      break;
    default:
      return elm;
      break;
  }
}
function toDomNodes(source) {
  if (source.tagName) {
    return processNodeElm(source);
  }
  if (typeof source === "string")
    source = source.trim();
  if (typeof source === "string" && source.substr(0, 1) === "<" && source.substr(-1) === ">") {
    return __strToHtml(source);
  }
  if (typeof source === "string") {
    const tpl = document.querySelector(source);
    if (!tpl)
      return;
    return processNodeElm(tpl);
  }
}
var toDomNodes_default = toDomNodes;
export {
  toDomNodes_default as default
};
