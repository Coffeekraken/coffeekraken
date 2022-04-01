import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __htmlTagToHtmlClassMap from "./htmlTagToHtmlClassMap";
function getHtmlhtmlClassFromHtmlClass(htmlClass) {
  if (!htmlClass)
    return false;
  for (const key in __htmlTagToHtmlClassMap) {
    if (__htmlTagToHtmlClassMap[key] === htmlClass)
      return key;
  }
  return false;
}
var getTagNameFromHtmlClass_default = getHtmlhtmlClassFromHtmlClass;
export {
  getTagNameFromHtmlClass_default as default
};
