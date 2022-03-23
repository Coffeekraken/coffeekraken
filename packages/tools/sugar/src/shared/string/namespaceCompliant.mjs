import {
  __spreadValues
} from "../../../../../chunk-JETN4ZEY.mjs";
import __simplifySpecialChars from "./simplifySpecialChars";
function namespaceCompliant(str, settings) {
  settings = __spreadValues({
    exclude: []
  }, settings != null ? settings : {});
  str = str.replace(/\s{1,9999999999999999}/gm, "-");
  str = __simplifySpecialChars(str);
  const dict = {
    "\\": "-",
    "(": "-",
    ")": "-",
    "{": "-",
    "}": "-",
    "[": "-",
    "]": "-",
    "=": "-",
    "?": "-",
    "!": "-",
    "&": "-",
    "%": "-",
    "*": "-",
    '"': "-",
    "'": "-",
    "`": "-",
    "+": "-",
    "/": ".",
    "\xB0": "-",
    $: "-",
    "<": "-",
    ">": "-",
    ",": "-",
    ":": "-",
    "#": "-"
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
  str = str.replace(/[^a-zA-Z0-9@]{1,999}$/, "");
  str = str.replace(/^[^a-zA-Z0-9@]{1,999}/, "");
  return str;
}
export {
  namespaceCompliant as default
};
