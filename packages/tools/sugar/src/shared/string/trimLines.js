import __deepMerge from "../object/deepMerge";
function trimLines(string, settings = {}) {
  settings = __deepMerge({
    leftPadding: 0,
    rightPadding: 0,
    keepEmptyLines: true
  }, settings);
  string = string.split("\n").map((line) => {
    line = line.trim();
    if (!settings.keepEmptyLines) {
      if (line === "")
        return -1;
    }
    if (settings.leftPadding)
      line = `${" ".repeat(settings.leftPadding)}${line}`;
    if (settings.rightPadding)
      line = `${line}${" ".repeat(settings.rightPadding)}`;
    return line;
  }).filter((line) => line !== -1).join("\n");
  return string;
}
var trimLines_default = trimLines;
export {
  trimLines_default as default
};
