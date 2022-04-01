import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
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
