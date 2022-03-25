function commonExecutableFileExtensions(withDot = false) {
  return ["apk", "bat", "bin", "cgi", "pi", "com", "exe", "gadget", "jsr", "msi", "py", "wsf"].map((ext) => withDot ? `.${ext}` : ext);
}
export {
  commonExecutableFileExtensions as default
};
