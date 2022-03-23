import {
  __spreadValues
} from "../../../../../../chunk-PG3ZPS4G.mjs";
function inViewport(elm, settings = {}) {
  return new Promise((resolve) => {
    settings = __spreadValues({
      offset: "10px"
    }, settings);
    const observer = new IntersectionObserver((entries, observer2) => {
      if (!entries.length)
        return;
      const entry = entries[0];
      if (entry.intersectionRatio > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
      observer2.disconnect();
    }, {
      root: null,
      rootMargin: settings.offset,
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    });
    observer.observe(elm);
  });
}
var inViewport_default = inViewport;
export {
  inViewport_default as default
};
