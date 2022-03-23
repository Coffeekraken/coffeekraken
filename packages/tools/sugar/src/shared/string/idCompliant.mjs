import {
  __spreadValues
} from "../../../../../chunk-JETN4ZEY.mjs";
import __simplifySpecialChars from "./simplifySpecialChars";
function idCompliant(str, settings) {
  settings = __spreadValues({
    exclude: []
  }, settings != null ? settings : {});
  str = str.replace(" ", "-");
  str = __simplifySpecialChars(str);
  const dict = {
    "/": "-",
    "@": "",
    ".": "-",
    ",": "-",
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
    "\xB0": "-",
    $: "-",
    "<": "-",
    ">": "-",
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
  str = str.replace(/[^a-zA-Z0-9]{1,999}$/, "");
  str = str.replace(/^[^a-zA-Z0-9]{1,999}/, "");
  str = str.toLowerCase();
  return str;
}
export {
  idCompliant as default
};
