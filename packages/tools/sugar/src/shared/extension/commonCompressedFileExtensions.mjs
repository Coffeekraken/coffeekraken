import "../../../../../chunk-JETN4ZEY.mjs";
function commonCompressedFileExtensions(withDot = false) {
  return ["7z", "arj", "deb", "pkg", "rar", "rpm", "tar.gz", "z", "zip"].map((ext) => withDot ? `.${ext}` : ext);
}
export {
  commonCompressedFileExtensions as default
};
