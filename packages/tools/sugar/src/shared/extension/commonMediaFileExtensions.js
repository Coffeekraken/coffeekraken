import __commonImageFileExtensions from "./commonImageFileExtensions";
import __commonVideoFileExtensions from "./commonVideoFileExtensions";
import __commonAudioFileExtensions from "./commonAudioFileExtensions";
import __unique from "../array/unique";
function commonMediaFileExtensions(withDot = false) {
  return __unique([
    ...__commonImageFileExtensions(false),
    ...__commonVideoFileExtensions(false),
    ...__commonAudioFileExtensions(false)
  ]).map((ext) => withDot ? `.${ext}` : ext);
}
export {
  commonMediaFileExtensions as default
};
