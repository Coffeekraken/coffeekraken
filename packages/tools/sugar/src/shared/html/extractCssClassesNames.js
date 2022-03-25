var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import __expandPleasantCssClassname from "./expandPleasantCssClassname";
function extractCssClassesNames(html, settings) {
  const finalSettings = __spreadValues({
    expandPleasantCssClassname: true,
    includeIds: false
  }, settings != null ? settings : {});
  let reg = /class="[a-zA-Z0-9_\-:@\s]+"/gm;
  if (finalSettings.includeIds) {
    reg = /(class|id)="[a-zA-Z0-9_\-:@\s]+"/gm;
  }
  const matches = html.match(reg);
  if (!matches)
    return [];
  let classesNames = [];
  matches.forEach((match) => {
    let classesStr = match.trim().replace('class="', "").replace('id="', "").replace('"', "");
    if (settings == null ? void 0 : settings.expandPleasantCssClassname) {
      classesStr = __expandPleasantCssClassname(classesStr);
    }
    classesNames = [...classesNames, ...classesStr.split(" ")].map((l) => l.trim());
  });
  return classesNames;
}
export {
  extractCssClassesNames as default
};
