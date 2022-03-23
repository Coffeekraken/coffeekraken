import "../../../../../../chunk-JETN4ZEY.mjs";
import __parseAuthorString from "./parseAuthorString";
function standardizeJson(json) {
  if (json.author && typeof json.author === "string") {
    json.author = __parseAuthorString(json.author);
  } else if (json.author && Array.isArray(json.author)) {
    json.author = json.author.map((string) => {
      if (typeof string === "string") {
        return __parseAuthorString(string);
      }
      return string;
    });
  }
  if (json.contributors && typeof json.contributors === "string") {
    json.contributors = __parseAuthorString(json.contributors);
  } else if (json.contributors && Array.isArray(json.contributors)) {
    json.contributors = json.contributors.map((string) => {
      if (typeof string === "string") {
        return __parseAuthorString(string);
      }
      return string;
    });
  }
  return json;
}
var standardizeJson_default = standardizeJson;
export {
  standardizeJson_default as default
};
