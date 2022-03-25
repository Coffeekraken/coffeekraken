import __getStyleProperty from "../style/getStyleProperty";
function textWidth(source) {
  const elm = document.createElement("span");
  elm.style.whiteSpace = "nowrap";
  elm.style.position = "absolute";
  elm.style.visibility = "hidden";
  let text = source;
  if (source.tagName) {
    const tagName = source.tagName.toLowerCase();
    switch (tagName) {
      case "input":
      case "textarea":
        text = source.value;
        break;
      default:
        text = source.innerText;
        break;
    }
    const fs = __getStyleProperty(source, "font-size");
    const ff = __getStyleProperty(source, "font-family");
    const ls = __getStyleProperty(source, "letter-spacing");
    elm.style.fontSize = fs;
    elm.style.fontFamily = ff;
    elm.style.letterSpacing = ls;
  }
  text = text.replace(/ /g, "\xA0");
  elm.innerHTML = text;
  document.body.appendChild(elm);
  const width = elm.offsetWidth;
  document.body.removeChild(elm);
  return width;
}
var textWidth_default = textWidth;
export {
  textWidth_default as default
};
