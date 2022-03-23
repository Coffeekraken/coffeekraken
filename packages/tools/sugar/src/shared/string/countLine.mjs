import "../../../../../chunk-JETN4ZEY.mjs";
import __deepMerge from "../object/deepMerge";
import __stripAnsi from "strip-ansi";
function countLine(line, count = {}) {
  count = __deepMerge({
    htmlTags: false,
    terminalSpecialChars: false,
    newLineChars: false
  }, count);
  let newLine = line;
  if (count.terminalSpecialChars === false) {
    newLine = __stripAnsi(newLine);
  }
  if (count.htmlTags === false) {
    newLine = newLine.replace(/<\/?[a-zA-Z0-9]+\s?\/?>/g, "");
  }
  if (count.newLineChars === false) {
    newLine = newLine.replace("\n", "");
  }
  return newLine.length;
}
var countLine_default = countLine;
export {
  countLine_default as default
};
