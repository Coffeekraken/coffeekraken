import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
function isEdge(ua = navigator.userAgent) {
  return ua.indexOf("Edg/") > -1;
}
var edge_default = isEdge;
export {
  edge_default as default
};
