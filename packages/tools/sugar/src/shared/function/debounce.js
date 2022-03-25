function debounce(fn, delay) {
  let timer = null;
  return function() {
    const context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
}
var debounce_default = debounce;
export {
  debounce_default as default
};
