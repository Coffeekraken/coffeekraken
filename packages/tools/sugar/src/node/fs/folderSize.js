import __getSize from "get-folder-size";
import __filesize from "filesize";
function folderSize(folderPath, format = {}) {
  return new Promise((resolve, reject) => {
    __getSize(folderPath, (error, size) => {
      if (error)
        throw error;
      resolve(format === false ? size : __filesize(size, format));
    });
  });
}
var folderSize_default = folderSize;
export {
  folderSize_default as default
};
