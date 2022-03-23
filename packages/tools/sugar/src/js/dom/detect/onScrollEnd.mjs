import {
  __spreadValues
} from "../../../../../../chunk-PG3ZPS4G.mjs";
function onScrollEnd($elm, callback, settings) {
  const finalSettings = __spreadValues({
    offset: 20,
    once: false,
    times: -1
  }, settings != null ? settings : {});
  let isBody = false;
  let $scrollListenedElm = $elm;
  let $scrollHeightElm = $elm;
  if ($elm === window.document.body) {
    isBody = true;
    $scrollListenedElm = document;
    $scrollHeightElm = window.document.body;
  } else if ($elm === window.document) {
    isBody = true;
    $elm = window.document.body;
    $scrollHeightElm = window.document.body;
  }
  let active = true, count = 0;
  const internalCallback = (e) => {
    let fullHeight, viewportHeight, scrollTop;
    if (isBody) {
      viewportHeight = window.innerHeight;
      scrollTop = $scrollHeightElm.scrollTop;
      fullHeight = Math.max(window.document.body.scrollHeight, window.document.documentElement.scrollHeight, window.document.body.offsetHeight, window.document.documentElement.offsetHeight, window.document.body.clientHeight, window.document.documentElement.clientHeight);
    } else {
      viewportHeight = $scrollHeightElm.offsetHeight;
      scrollTop = $scrollHeightElm.scrollTop;
      fullHeight = $scrollHeightElm.scrollHeight;
    }
    if (active && scrollTop + viewportHeight >= fullHeight - finalSettings.offset) {
      callback();
      count++;
      if (finalSettings.once) {
        $scrollListenedElm.removeEventListener("scroll", internalCallback);
        active = false;
      } else if (finalSettings.times > 0 && count >= finalSettings.times) {
        $scrollListenedElm.removeEventListener("scroll", internalCallback);
        active = false;
      }
    } else if ($scrollHeightElm.offsetHeight + $scrollHeightElm.scrollTop < $scrollHeightElm.scrollHeight - finalSettings.offset) {
      active = true;
    }
  };
  $scrollListenedElm.addEventListener("scroll", internalCallback);
}
export {
  onScrollEnd as default
};
