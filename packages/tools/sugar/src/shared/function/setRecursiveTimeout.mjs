import "../../../../../chunk-JETN4ZEY.mjs";
function setRecursiveTimeout(fn, timeout, duration, spread = 0) {
  let idx = 0;
  let currentDuration = 0;
  let timeoutFn = null;
  (function tick() {
    fn(idx);
    currentDuration += timeout;
    idx++;
    if (!duration || duration === -1 || currentDuration < duration) {
      const spreadValue = -spread + Math.round(Math.random(spread * 2));
      timeoutFn = setTimeout(tick, timeout + spreadValue);
    }
  })();
  return function() {
    clearTimeout(timeoutFn);
  };
}
var setRecursiveTimeout_default = setRecursiveTimeout;
export {
  setRecursiveTimeout_default as default
};
