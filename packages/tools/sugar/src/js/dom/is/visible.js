function visible(elm) {
  if (elm.nodeName.toLowerCase() === "script")
    return true;
  const style = window.getComputedStyle(elm, null), opacity = style["opacity"], visibility = style["visibility"], display = style["display"];
  return opacity !== "0" && display !== "none" && visibility !== "hidden";
}
window.__visible = visible;
var visible_default = visible;
export {
  visible_default as default
};
