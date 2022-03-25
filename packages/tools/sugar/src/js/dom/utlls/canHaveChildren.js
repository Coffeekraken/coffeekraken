function canHaveChildren(element) {
  if (typeof element === "string") {
    element = document.createElement(element);
  } else if (!(element instanceof HTMLElement)) {
    throw `The element parameter can be either a string or an HTMLElement node reference... You've passed "${typeof element}"`;
  }
  if ("canHaveHTML" in element)
    return element.canHaveHTML;
  const tagName = element.tagName;
  const closeTag = `</${tagName}>`.toLowerCase();
  if (element.outerHTML.slice((tagName.length + 3) * -1) === closeTag)
    return true;
  return false;
}
var canHaveChildren_default = canHaveChildren;
export {
  canHaveChildren_default as default
};
