import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
function nodeIndex(node) {
  let index = 0;
  while (node = node.previousElementSibling) {
    index++;
  }
  return index;
}
var nodeIndex_default = nodeIndex;
export {
  nodeIndex_default as default
};
