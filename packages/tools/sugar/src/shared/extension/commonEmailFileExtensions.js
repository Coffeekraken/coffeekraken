function commonEmailFileExtensions(withDot = false) {
  return ["email", "eml", "emix", "msg", "oft", "ost", "pst", "vcf"].map((ext) => withDot ? `.${ext}` : ext);
}
export {
  commonEmailFileExtensions as default
};
