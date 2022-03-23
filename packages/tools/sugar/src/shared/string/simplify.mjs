import "../../../../../chunk-JETN4ZEY.mjs";
import __deepMerge from "../object/deepMerge";
function simplify(string, settings = {}) {
  settings = __deepMerge({
    specialChars: true,
    lowerCase: true,
    dashSpace: true,
    trim: true
  }, settings);
  if (string == null)
    return "";
  const map = {
    A: "\xC0|\xC1|\xC3|\xC2|\xC4",
    a: "\xE1|\xE0|\xE3|\xE2|\xE4",
    E: "\xC9|\xC8|\xCA|\xCB",
    e: "\xE9|\xE8|\xEA|\xEB",
    I: "\xCD|\xCC|\xCE|\xCF",
    i: "\xED|\xEC|\xEE|\xEF",
    O: "\xD3|\xD2|\xD4|\xD5|\xD6",
    o: "\xF3|\xF2|\xF4|\xF5|\xF6",
    U: "\xDA|\xD9|\xDB|\xDC|\xDC",
    u: "\xFA|\xF9|\xFB|\xFC|\xFC",
    C: "\xC7",
    c: "\xE7",
    N: "\xD1",
    n: "\xF1"
  };
  if (settings.dashSpace) {
    map[" "] = "_|-";
  }
  if (settings.lowerCase) {
    string = string.toLowerCase();
  }
  if (settings.specialChars) {
    for (const pattern in map) {
      string = string.replace(new RegExp(map[pattern], "g"), pattern);
    }
  }
  if (settings.trim)
    string = string.trim();
  return string;
}
var simplify_default = simplify;
export {
  simplify_default as default
};
