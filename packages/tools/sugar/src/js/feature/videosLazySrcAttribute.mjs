import {
  __spreadValues
} from "../../../../../chunk-PG3ZPS4G.mjs";
import whenInViewport from "../dom/whenInViewport";
import querySelectorLive from "../dom/querySelectorLive";
function videoLazySrcAttribute(settings = {}) {
  settings = __spreadValues({
    offset: 50
  }, settings);
  querySelectorLive("video[lazy-src]:not([is])", ($videoElm) => {
    whenInViewport($videoElm, settings.offset).then(() => {
      $videoElm.setAttribute("src", $videoElm.getAttribute("lazy-src"));
    });
  });
}
var videosLazySrcAttribute_default = videoLazySrcAttribute;
export {
  videosLazySrcAttribute_default as default
};
