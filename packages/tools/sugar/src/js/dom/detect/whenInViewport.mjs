import {
  __spreadValues
} from "../../../../../../chunk-PG3ZPS4G.mjs";
function whenInViewport(elm, settings = {}) {
  settings = __spreadValues({
    offset: "10px"
  }, settings);
  return new Promise((resolve) => {
    const options = {
      root: null,
      rootMargin: settings.offset,
      threshold: 1
    };
    function onChange(changes, observer2) {
      changes.forEach((change) => {
        var _a;
        if (change.intersectionRatio > 0) {
          (_a = observer2.disconnect) == null ? void 0 : _a.call(observer2);
          resolve(elm);
        }
      });
    }
    const observer = new IntersectionObserver(onChange, options);
    observer.observe(elm);
  });
}
var whenInViewport_default = whenInViewport;
export {
  whenInViewport_default as default
};
