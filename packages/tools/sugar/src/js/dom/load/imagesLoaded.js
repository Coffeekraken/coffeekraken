import __imageLoaded from "./imageLoaded";
import __SPromise from "@coffeekraken/s-promise";
function imagesLoaded($imgs, cb = null) {
  return new __SPromise(({ resolve, reject, emit }) => {
    const promises = [], loadedImages = [];
    Array.from($imgs).forEach(($img) => {
      promises.push(__imageLoaded($img).then((_$img) => {
        loadedImages.push(_$img);
        emit("img.loaded", _$img);
        if (loadedImages.length === $imgs.length) {
          emit("loaded", loadedImages);
          if (cb)
            cb(loadedImages);
          resolve(loadedImages);
        }
      }).catch((error) => {
        reject(error);
      }));
    });
  });
}
var imagesLoaded_default = imagesLoaded;
export {
  imagesLoaded_default as default
};
