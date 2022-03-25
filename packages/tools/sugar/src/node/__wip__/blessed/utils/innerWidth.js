import __blessed from "blessed";
function innerWidth(component) {
  var _a, _b;
  if (!(component instanceof __blessed.box))
    return -1;
  if (!component && !component.parent)
    return -1;
  return component.width - (((_a = component.padding) == null ? void 0 : _a.left) || 0) - (((_b = component.padding) == null ? void 0 : _b.right) || 0);
}
export {
  innerWidth as default
};
