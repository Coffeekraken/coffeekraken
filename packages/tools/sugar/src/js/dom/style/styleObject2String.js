import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __uncamelize from "../../shared/string/uncamelize";
function styleObject2String(styleObj) {
  const propertiesArray = [];
  for (const key in styleObj) {
    const value = styleObj[key];
    if (value === void 0 || value === "") {
      delete styleObj[key];
    } else {
      propertiesArray.push(`${__uncamelize(key)}:${value};`);
    }
  }
  return propertiesArray.join(" ");
}
var styleObject2String_default = styleObject2String;
export {
  styleObject2String_default as default
};
