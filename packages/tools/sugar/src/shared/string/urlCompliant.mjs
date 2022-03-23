import {
  __spreadValues
} from "../../../../../chunk-JETN4ZEY.mjs";
import __simplifySpecialChars from "./simplifySpecialChars";
function urlCompliant(str, settings) {
  settings = __spreadValues({
    exclude: []
  }, settings != null ? settings : {});
  str = str.replace(" ", "-");
  str = __simplifySpecialChars(str);
  const dict = {
    "\\": "-",
    "@": "",
    "(": "-",
    ")": "-",
    "[": "-",
    "]": "-",
    ",": "-",
    ":": "-"
  };
  settings.exclude.forEach((char) => {
    delete dict[char];
  });
  Object.keys(dict).forEach((char) => {
    str = str.split(char).join(dict[char]);
  });
  str = str.replace(/\.{2,999}/gm, ".");
  str = str.replace(/^-{1,999}/gm, "");
  str = str.replace(/-{1,999}$/gm, "");
  str = str.replace(/-{2,999}/gm, "-");
  return str;
}
export {
  urlCompliant as default
};
