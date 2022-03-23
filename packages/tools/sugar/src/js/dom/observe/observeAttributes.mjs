import {
  __spreadValues
} from "../../../../../../chunk-PG3ZPS4G.mjs";
import __SPromise from "@coffeekraken/s-promise";
function observeAttributes(target, settings = {}) {
  return new __SPromise(({ emit }) => {
    const mutationObserver2 = new MutationObserver((mutations) => {
      let mutedAttrs = {};
      mutations.forEach((mutation) => {
        if (!mutedAttrs[mutation.attributeName]) {
          emit("then", mutation);
          mutedAttrs[mutation.attributeName] = true;
        }
      });
      mutedAttrs = {};
    });
    mutationObserver2.observe(target, __spreadValues({
      attributes: true
    }, settings));
  }, {
    id: "observeAttributes"
  }).on("finally", () => {
    mutationObserver.disconnect();
  });
}
var observeAttributes_default = observeAttributes;
export {
  observeAttributes_default as default
};
