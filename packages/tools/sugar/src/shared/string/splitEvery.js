import __countLine from "./countLine";
function splitEvery(text, every, splitWords = false) {
  if (splitWords) {
    const reg = new RegExp(`.{1,${every}}`, "g");
    return [...text.matchAll(reg)].map((o) => o[0]);
  } else {
    const reg = new RegExp(`(\\x1B[[0-9;]+m)|(\\x1B[39m])|(<[a-zA-Zs/]+>)`, "g");
    const chunks = text.split(reg).filter((m) => m != "" && m != null && m != void 0).map((item) => {
      return item.split(/(\s{1,99999999})/g);
    });
    let finalChunks = [];
    chunks.forEach((chunk) => {
      finalChunks = [...finalChunks, ...chunk];
    });
    let finalLines = [""];
    let lineCount = 0;
    let lastOpenedTag = null;
    finalChunks.forEach((item) => {
      if (!item)
        return;
      if (reg.test(item)) {
        if (item.substr(0, 2) !== "</" || item.substr(0, 4) !== "\x1B") {
          lastOpenedTag = item;
          if (item.substr(0, 1) !== "<") {
            lastOpenedTag = `\x1B${lastOpenedTag}`;
          }
        }
        finalLines[finalLines.length - 1] += item;
        return;
      }
      if (lineCount + item.length > every) {
        const toAdd = item.substr(0, every - lineCount - 1);
        finalLines[finalLines.length - 1] += toAdd;
        const rest = lastOpenedTag + item.replace(toAdd, "");
        const restLines = splitEvery(rest, every);
        finalLines = [...finalLines, ...restLines];
        lineCount = __countLine(finalLines[finalLines.length - 1]);
      } else {
        lineCount += item.length;
        finalLines[finalLines.length - 1] += item;
      }
    });
    return finalLines;
    const words = text.split(" ");
    let lines = [];
    let currentLine = "";
    words.forEach((word, i) => {
      if (currentLine.length + word.length <= every) {
        currentLine += word + " ";
        if (i === words.length - 1) {
          lines.push(currentLine);
        }
      } else if (i < words.length - 1) {
        lines.push(currentLine);
        currentLine = word + " ";
      } else {
        lines.push(currentLine);
        lines.push(word);
      }
    });
    lines = lines.map((l) => l.trim());
    lines = lines.filter((l) => l !== "");
    return lines;
  }
}
var splitEvery_default = splitEvery;
export {
  splitEvery_default as default
};
