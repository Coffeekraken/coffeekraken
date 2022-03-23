import "../../../../../chunk-PG3ZPS4G.mjs";
import __upperFirst from "../../shared/string/upperFirst";
import __htmlTagToHtmlClassMap from "./htmlTagToHtmlClassMap";
function getHtmlClassFromTagName(tagName) {
  if (!tagName)
    return HTMLElement;
  const tagNameUpperFirst = __upperFirst(tagName);
  if (window[`HTML${tagNameUpperFirst}Element`])
    return window[`HTML${tagNameUpperFirst}Element`];
  if (__htmlTagToHtmlClassMap[tagName])
    return __htmlTagToHtmlClassMap[tagName];
  return window.HTMLElement;
}
var getHtmlClassFromTagName_default = getHtmlClassFromTagName;
export {
  getHtmlClassFromTagName_default as default
};
