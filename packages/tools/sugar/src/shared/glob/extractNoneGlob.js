import __globParent from "glob-parent";
function extractNoneGlob(string) {
  const parent = __globParent(string);
  return parent;
}
var extractNoneGlob_default = extractNoneGlob;
export {
  extractNoneGlob_default as default
};
