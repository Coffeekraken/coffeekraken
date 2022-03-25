function commonDiscFileExtensions(withDot = false) {
  return ["bin", "dmg", "iso", "toast", "vcd"].map((ext) => withDot ? `.${ext}` : ext);
}
export {
  commonDiscFileExtensions as default
};
