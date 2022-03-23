import {
  __spreadValues
} from "../../../../../../chunk-PG3ZPS4G.mjs";
import __SPromise from "@coffeekraken/s-promise";
function inViewportStatusChange($elm, settings) {
  let status = "out", observer, isInViewport = false;
  settings = __spreadValues({
    offset: "10px"
  }, settings != null ? settings : {});
  return new __SPromise(({ emit }) => {
    const _cb = () => {
      if (!isInViewport && status === "in") {
        status = "out";
        emit("leave", $elm);
      } else if (isInViewport && status === "out") {
        status = "in";
        emit("enter", $elm);
      }
    };
    observer = new IntersectionObserver((entries, observer2) => {
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
      threshold: [
        0,
        0.1,
        0.2,
        0.3,
        0.4,
        0.5,
        0.6,
        0.7,
        0.8,
        0.9,
        1
      ]
    });
    observer.observe($elm);
  }, {
    id: "inViewportStatisChange"
  }).on("cancel", () => {
    var _a;
    (_a = observer.disconnect) == null ? void 0 : _a.call(observer);
  });
}
var inViewportStatusChange_default = inViewportStatusChange;
export {
  inViewportStatusChange_default as default
};
