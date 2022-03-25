import __striptags from "striptags";
function striptags(html, allowedTags = "", tagReplacement = "") {
  return __striptags(html, allowedTags, tagReplacement);
}
var striptags_default = striptags;
export {
  striptags_default as default
};
