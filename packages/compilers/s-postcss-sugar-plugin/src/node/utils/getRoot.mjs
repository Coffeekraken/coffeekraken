import "../../../../../chunk-TD77TI6B.mjs";
function getRoot(node) {
  if (node.parent && node.parent.type !== "root")
    return getRoot(node.parent);
  else if (node.parent && node.parent.type === "root")
    return node.parent;
  return node;
}
export {
  getRoot as default
};
