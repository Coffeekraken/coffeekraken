function ease(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}
var easeInOutCubic_default = ease;
export {
  easeInOutCubic_default as default
};
