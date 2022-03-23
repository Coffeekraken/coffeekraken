import "../../../../../chunk-PG3ZPS4G.mjs";
import whenInViewport from "../dom/whenInViewport";
import querySelectorLive from "../dom/querySelectorLive";
import deepMerge from "../../shared/object/deepMerge";
function imagesLazySrcAttribute(settings = {}) {
  settings = deepMerge({
    offset: 50
  }, settings);
  querySelectorLive("img[lazy-src]:not([is])", ($imgElm) => {
    whenInViewport($imgElm, settings.offset).then(() => {
      $imgElm.setAttribute("src", $imgElm.getAttribute("lazy-src"));
    });
  });
}
var imagesLazySrcAttribute_default = imagesLazySrcAttribute;
export {
  imagesLazySrcAttribute_default as default
};
