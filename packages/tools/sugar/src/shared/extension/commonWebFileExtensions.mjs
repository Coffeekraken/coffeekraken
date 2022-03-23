import "../../../../../chunk-JETN4ZEY.mjs";
function commonWebFileExtensions(withDot = false) {
  return ["asp", "cer", "cfm", "cgi", "pl", "css", "htm", "html", "js", "jsp", "part", "php", "py", "rss", "xhtml"].map((ext) => withDot ? `.${ext}` : ext);
}
export {
  commonWebFileExtensions as default
};
