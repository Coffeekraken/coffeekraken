import __globParent from "glob-parent";
function extractGlob(string) {
  const parent = __globParent(string);
  let final = string.replace(parent, "");
  if (final.slice(0, 1) === "/")
    final = final.slice(1);
  return final;
}
var extractGlob_default = extractGlob;
export {
  extractGlob_default as default
};
