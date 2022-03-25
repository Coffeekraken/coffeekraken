function emptyNode(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
  return node;
}
var emptyNode_default = emptyNode;
export {
  emptyNode_default as default
};
