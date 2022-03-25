import __deepMerge from "../object/deepMerge";
import __countLine from "./countLine";
function crop(text, length, settings = {}) {
  settings = __deepMerge({
    chars: "...",
    splitWords: false
  }, settings);
  text = text.replace(/\s/gm, "\xAF");
  const splitReg = /(<([^>]+)>|\S|\s)/gm;
  const parts = text.split(splitReg).filter((c) => {
    return c !== void 0 && c !== " " && c !== "" && (c.length === 1 || c.match(/^</));
  }).map((c) => {
    if (c === "\xAF")
      return " ";
    return c;
  });
  let result = "";
  let currentWord = "";
  let currentLength = 0;
  const openedHtmlTagsArray = [];
  for (let i = 0; i < parts.length; i++) {
    const c = parts[i];
    if (c.length === 1) {
      if (settings.splitWords) {
        if (currentLength + 1 + settings.chars.length <= length) {
          result += c;
          currentLength += 1;
        } else {
          result += settings.chars;
          currentLength += settings.chars.length;
          break;
        }
      } else {
        if (c !== " ") {
          currentWord += c;
        } else {
          if (__countLine(result) + __countLine(currentWord) + __countLine(settings.chars) <= length) {
            result += currentWord;
          } else {
            result = result.trim();
            result += settings.chars;
            break;
          }
          result += " ";
          currentWord = "";
        }
      }
    } else {
      if (currentWord !== "") {
        result += currentWord;
        currentWord = "";
      }
      const closingHtmlTagMatch = c.match(/^<\//);
      const openingHtmlTagMatch = c.match(/^<[a-zA-Z]+.*>$/);
      const singleHtmlTagMatch = c.match(/^<[a-zA-Z]+.*\/>$/);
      if (singleHtmlTagMatch) {
        result += singleHtmlTagMatch.input;
      } else if (closingHtmlTagMatch) {
        const tagName = closingHtmlTagMatch.input.match(/^<\/(.*)>$/)[1];
        if (openedHtmlTagsArray.indexOf(tagName) !== -1) {
          result += closingHtmlTagMatch.input;
          openedHtmlTagsArray.splice(openedHtmlTagsArray.indexOf(tagName), 1);
        }
      } else if (openingHtmlTagMatch) {
        const tagName = openingHtmlTagMatch.input.match(/^<([a-zA-Z]+).*>$/)[1];
        result += openingHtmlTagMatch.input;
        openedHtmlTagsArray.push(tagName);
      }
    }
  }
  openedHtmlTagsArray.forEach((tag) => {
    result += `</${tag}>`;
  });
  return result;
}
var crop_default = crop;
export {
  crop_default as default
};
