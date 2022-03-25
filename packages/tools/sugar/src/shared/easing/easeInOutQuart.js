function ease(t) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
}
var easeInOutQuart_default = ease;
export {
  easeInOutQuart_default as default
};
