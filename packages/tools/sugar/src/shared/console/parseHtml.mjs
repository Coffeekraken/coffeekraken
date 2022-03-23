import "../../../../../chunk-JETN4ZEY.mjs";
import __tagsMap from "./html/tagsMap";
import __replaceTags from "../html/replaceTags";
function parseHtml(message) {
  let isArray = false;
  if (Array.isArray(message)) {
    isArray = true;
  } else {
    message = [message];
  }
  message = message.map((m) => {
    return __replaceTags(m, __tagsMap);
  });
  if (isArray)
    return message;
  return message[0];
}
var parseHtml_default = parseHtml;
export {
  parseHtml_default as default
};
