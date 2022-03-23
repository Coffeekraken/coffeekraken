import {
  __spreadValues
} from "../../../../../../chunk-PG3ZPS4G.mjs";
import _map from "lodash/map";
function _decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}
function splitLetters(elm, settings = {}) {
  settings = __spreadValues({
    tag: "span",
    class: "s-split-litters"
  }, settings);
  let string = elm._splitLettersOriginalString;
  if (!string) {
    string = elm.innerHTML;
    elm._splitLettersOriginalString = string;
  }
  elm.classList.add(settings.class);
  let words = string.match(/<\s*(\w+\b)(?:(?!<\s*\/\s*\1\b)[\s\S])*<\s*\/\s*\1\s*>|\S+/g);
  words = _map(words, (word) => {
    return `<${settings.tag} style="white-space:nowrap">${word}</${settings.tag}>`;
  }).join(" ");
  let letters = _decodeHtml(words).split("");
  let hasTagOpened = false;
  letters = _map(letters, (letter) => {
    if (letter === "<")
      hasTagOpened = true;
    else if (letter === ">") {
      hasTagOpened = false;
      return letter;
    }
    if (hasTagOpened)
      return letter;
    if (letter === " ")
      letter = "&nbsp;";
    return `<${settings.tag} class="${settings.class}__letter-container"><${settings.tag} class="${settings.class}__letter">${letter}</${settings.tag}></${settings.tag}>`;
  });
  elm.innerHTML = letters.join("");
  return elm;
}
var splitLetters_default = splitLetters;
export {
  splitLetters_default as default
};
