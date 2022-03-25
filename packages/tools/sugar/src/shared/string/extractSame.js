function extractSame(string1, string2, multiple = false) {
  const extractedArray = [""];
  const chars = string1.split("");
  const chars2 = string2.split("");
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const char2 = chars2[i];
    if (i > chars2.length - 1)
      break;
    if (char === char2) {
      extractedArray[extractedArray.length - 1] += char;
    } else if (multiple) {
      if (extractedArray[extractedArray.length - 1] !== "")
        extractedArray.push("");
    } else {
      break;
    }
  }
  return multiple ? extractedArray : extractedArray[0];
}
var extractSame_default = extractSame;
export {
  extractSame_default as default
};
