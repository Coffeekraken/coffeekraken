function throttle(fn, threshhold) {
  threshhold || (threshhold = 250);
  let last;
  return function() {
    const context = this;
    const now = new Date(), args = arguments;
    if (!last || last <= now - threshhold) {
      last = now;
      fn.apply(context, args);
    }
  };
}
var throttle_default = throttle;
export {
  throttle_default as default
};
