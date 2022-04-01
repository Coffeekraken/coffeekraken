import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __SPromise from "@coffeekraken/s-promise";
function imageLoaded($img, callback = null) {
  let imgLoadedHandler, imgErrorHandler;
  return new __SPromise(({ resolve, reject }) => {
    if ($img.hasAttribute("src") && $img.complete) {
      resolve($img);
      callback && callback($img);
    } else {
      imgLoadedHandler = (e) => {
        resolve($img);
        callback && callback($img);
      };
      $img.addEventListener("load", imgLoadedHandler);
      imgErrorHandler = (e) => {
        reject(e);
      };
      $img.addEventListener("error", imgErrorHandler);
    }
  }, {
    id: "imageLoaded"
  }).on("finally", () => {
    imgLoadedHandler && $img.removeEventListener("load", imgLoadedHandler);
    imgErrorHandler && $img.removeEventListener("error", imgErrorHandler);
  });
}
var imageLoaded_default = imageLoaded;
export {
  imageLoaded_default as default
};
