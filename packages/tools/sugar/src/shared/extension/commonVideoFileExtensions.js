function commonProgrammingFileExtensions(withDot = false) {
  return ["3g2", "3gp", "avi", "flv", "h264", "m4v", "mkv", "mov", "mp4", "mpg", "mpeg", "rm", "swf", "vob", "wmv"].map((ext) => withDot ? `.${ext}` : ext);
}
export {
  commonProgrammingFileExtensions as default
};
