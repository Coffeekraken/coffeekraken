import {
  __spreadValues
} from "../../../../../chunk-JETN4ZEY.mjs";
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
