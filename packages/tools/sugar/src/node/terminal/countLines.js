import __countLine from "../../shared/string/countLine";
function countLines(string) {
  let currentCount = 0;
  let lines = string.split("\n");
  lines.forEach((line) => {
    const lineCount = __countLine(line);
    currentCount += Math.ceil(lineCount / process.stdout.columns);
  });
  return currentCount;
}
var countLines_default = countLines;
export {
  countLines_default as default
};
