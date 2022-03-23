import {
  __spreadValues
} from "../../../../../../chunk-PG3ZPS4G.mjs";
function whenOutOfViewport(elm, settings = {}) {
  return new Promise((resolve, reject) => {
    settings = __spreadValues({
      offset: "10px"
    }, settings);
    let isInViewport = false;
    const _cb = () => {
      if (!isInViewport) {
        observer.disconnect();
        resolve(elm);
      }
    };
    const observer = new IntersectionObserver((entries, observer2) => {
      if (!entries.length)
        return;
      const entry = entries[0];
      if (entry.intersectionRatio > 0) {
        isInViewport = true;
      } else {
        isInViewport = false;
      }
      _cb();
    }, {
      root: null,
      rootMargin: settings.offset,
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    });
    observer.observe(elm);
  });
}
var whenOutOfViewport_default = whenOutOfViewport;
export {
  whenOutOfViewport_default as default
};
