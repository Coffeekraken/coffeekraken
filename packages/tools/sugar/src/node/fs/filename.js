import __extension from "./extension";
function filename(path, withExtension = true) {
  let filename2 = path.split("/").pop();
  if (!withExtension) {
    filename2 = filename2.replace(`.${__extension(filename2)}`, "");
  }
  return filename2;
}
var filename_default = filename;
export {
  filename_default as default
};
