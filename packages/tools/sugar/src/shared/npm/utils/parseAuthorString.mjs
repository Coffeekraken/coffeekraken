import "../../../../../../chunk-JETN4ZEY.mjs";
function parseAuthorString(string) {
  const reg = /(.*)\s?<(.*)>\s?\((.*)\)/gm;
  const matches = reg.exec(string.trim());
  const authorObj = {};
  if (matches) {
    if (matches[1]) {
      authorObj.name = matches[1].trim();
    }
    if (matches[2]) {
      authorObj.email = matches[2].trim();
    }
    if (matches[3]) {
      authorObj.url = matches[3].trim();
    }
  }
  return authorObj;
}
var parseAuthorString_default = parseAuthorString;
export {
  parseAuthorString_default as default
};
