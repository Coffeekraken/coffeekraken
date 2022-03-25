import __SPromise from "@coffeekraken/s-promise";
function loadScript($script, cb = null) {
  return new __SPromise(({ resolve, reject, emit }) => {
    let done = false;
    $script.onload = handleLoad;
    $script.onreadystatechange = handleReadyStateChange;
    $script.onerror = handleError;
    function handleLoad() {
      if (!done) {
        done = true;
        if (cb)
          cb($script);
        resolve($script);
      }
    }
    function handleReadyStateChange() {
      let state;
      if (!done) {
        state = $script.readyState;
        if (state === "complete") {
          handleLoad();
        }
      }
    }
    function handleError(e) {
      if (!done) {
        done = true;
        reject(new Error(e));
      }
    }
  }, {
    id: "scriptLoaded"
  }).on("finally", () => {
    $script.onload = null;
    $script.onreadystatechange = null;
    $script.onerror = null;
  });
}
var scriptLoaded_default = loadScript;
export {
  scriptLoaded_default as default
};
