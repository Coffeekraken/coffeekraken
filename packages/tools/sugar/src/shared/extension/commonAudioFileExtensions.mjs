import "../../../../../chunk-JETN4ZEY.mjs";
function commonAudioFileExtensions(withDot = false) {
  return ["aif", "cda", "mid", "midi", "mp3", "mpa", "ogg", "wav", "wma", "wpl"].map((ext) => withDot ? `.${ext}` : ext);
}
export {
  commonAudioFileExtensions as default
};
