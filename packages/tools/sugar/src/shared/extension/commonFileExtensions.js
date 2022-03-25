import __commonAudioFileExtensions from "./commonAudioFileExtensions";
import __commonCompressedFileExtensions from "./commonCompressedFileExtensions";
import __commonDataFileExtensions from "./commonDataFileExtensions";
import __commonDiscFileExtensions from "./commonDiscFileExtensions";
import __commonEmailFileExtensions from "./commonEmailFileExtensions";
import __commonExecutableFileExtensions from "./commonExecutableFileExtensions";
import __commonFontFileExtensions from "./commonFontFileExtensions";
import __commonImageFileExtensions from "./commonImageFileExtensions";
import __commonMediaFileExtensions from "./commonMediaFileExtensions";
import __commonProgrammingFileExtensions from "./commonProgrammingFileExtensions";
import __commonTextFileExtensions from "./commonTextFileExtensions";
import __commonVideoFileExtensions from "./commonVideoFileExtensions";
import __commonWebFileExtensions from "./commonWebFileExtensions";
import __unique from "../array/unique";
function commonFileExtensions(types = ["audio", "compressed", "data", "disc", "email", "executable", "font", "image", "media", "programming", "text", "video", "web"], withDot = false) {
  return __unique([
    ...types.includes("audio") ? __commonAudioFileExtensions(false) : [],
    ...types.includes("compressed") ? __commonCompressedFileExtensions(false) : [],
    ...types.includes("data") ? __commonDataFileExtensions(false) : [],
    ...types.includes("disc") ? __commonDiscFileExtensions(false) : [],
    ...types.includes("email") ? __commonEmailFileExtensions(false) : [],
    ...types.includes("executable") ? __commonExecutableFileExtensions(false) : [],
    ...types.includes("font") ? __commonFontFileExtensions(false) : [],
    ...types.includes("image") ? __commonImageFileExtensions(false) : [],
    ...types.includes("media") ? __commonMediaFileExtensions(false) : [],
    ...types.includes("programming") ? __commonProgrammingFileExtensions(false) : [],
    ...types.includes("text") ? __commonTextFileExtensions(false) : [],
    ...types.includes("video") ? __commonVideoFileExtensions(false) : [],
    ...types.includes("web") ? __commonWebFileExtensions(false) : []
  ]).map((ext) => withDot ? `.${ext}` : ext);
}
export {
  commonFileExtensions as default
};
