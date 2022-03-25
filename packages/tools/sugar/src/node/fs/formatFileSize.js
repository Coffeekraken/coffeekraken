import __filesize from "filesize";
function formatFileSize(size, settings = {}) {
  return __filesize(size, settings);
}
var formatFileSize_default = formatFileSize;
export {
  formatFileSize_default as default
};
