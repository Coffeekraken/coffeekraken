import {
  __spreadValues
} from "../../../../../../chunk-PG3ZPS4G.mjs";
import __SPromise from "@coffeekraken/s-promise";
function observeMutations($target, settings = {}) {
  settings = __spreadValues({
    attributes: true,
    childList: false,
    subtree: false
  }, settings);
  let mutationObserver;
  return new __SPromise(({ emit }) => {
    mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        emit("then", mutation);
      });
    });
    mutationObserver.observe($target, settings);
  }, {
    id: "observeMutations"
  }).on("finally", () => {
    mutationObserver && mutationObserver.disconnect();
  });
}
var observeMutations_default = observeMutations;
export {
  observeMutations_default as default
};
