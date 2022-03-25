function commonProgrammingFileExtensions(withDot = false) {
  return ["asp", "c", "cgi", "cfm", "pl", "class", "cpp", "cs", "h", "java", "php", "py", "sh", "swift", "vb", "js", "jsp", "jsx", "css", "ts", "tsx", "rs", "dart"].map((ext) => withDot ? `.${ext}` : ext);
}
export {
  commonProgrammingFileExtensions as default
};
