import {
  __spreadValues
} from "../../../../../../chunk-PG3ZPS4G.mjs";
import _map from "lodash/map";
function splitWords(elm, settings = {}) {
  settings = __spreadValues({
    tag: "span",
    class: "split-words"
  }, settings);
  _splitWords(elm, settings);
  return elm;
}
function _splitWords(elm, settings) {
  let string = elm._splitWordsOriginalString;
  if (!string) {
    string = elm.innerHTML;
    elm._splitWordsOriginalString = string;
  }
  elm.classList.add(settings.class);
  let words = string.match(/<\s*(\w+\b)(?:(?!<\s*\/\s*\1\b)[\s\S])*<\s*\/\s*\1\s*>|\S+/g);
  words = _map(words, (word) => {
    return `<${settings.tag} class="${settings.class}__word">${word}</${settings.tag}>`;
  }).join(" ");
  elm.innerHTML = words;
}
var splitWords_default = splitWords;
export {
  splitWords_default as default
};
