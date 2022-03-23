import "../../../../../chunk-JETN4ZEY.mjs";
function unquote(string, quotesToRemove = ['"', "'", "\u201D", "`"]) {
  string = string.trim();
  quotesToRemove.forEach((quote) => {
    if (string.substr(0, 1) === quote && string.substr(-1) === quote) {
      string = string.substr(1);
      string = string.substr(0, string.length - 1);
      return;
    }
  });
  return string;
}
var unquote_default = unquote;
export {
  unquote_default as default
};
