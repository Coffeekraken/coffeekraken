import "../../../../../chunk-JETN4ZEY.mjs";
import __commonProgrammingFileExtensions from "./commonProgrammingFileExtensions";
function commonTextFileExtensions(withDot = false) {
  return ["txt", "htm", "html", "md", "json", "csv", "rss", "xhtml", ...__commonProgrammingFileExtensions(withDot)].map((ext) => withDot ? `.${ext}` : ext);
}
export {
  commonTextFileExtensions as default
};
