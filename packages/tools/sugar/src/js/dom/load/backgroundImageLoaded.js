import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import __getStyleProperty from "../style/getStyleProperty";
import __imageLoaded from "./imageLoaded";
import __unquote from "../../../shared/string/unquote";
import __SPromise from "@coffeekraken/s-promise";
function backgroundImageLoaded($elm, cb = null) {
  let isCancelled = false, $img;
  const promise = new __SPromise(({ resolve, reject, emit }) => {
    const backgroundImage = __getStyleProperty($elm, "background-image");
    const matches = backgroundImage.match(/.*url\((.*)\).*/);
    if (!matches || !matches[1]) {
      reject("No background image url found...");
      return;
    }
    const url = __unquote(matches[1]);
    $img = new Image();
    $img.src = url;
    __imageLoaded($img).then(() => {
      if (!isCancelled) {
        if (cb)
          cb($elm);
        resolve($elm);
      }
    });
  }, {
    id: "backgroundImageLoaded"
  }).on("finally", () => {
    isCancelled = true;
  });
  promise.__$img = $img;
  return promise;
}
var backgroundImageLoaded_default = backgroundImageLoaded;
export {
  backgroundImageLoaded_default as default
};
