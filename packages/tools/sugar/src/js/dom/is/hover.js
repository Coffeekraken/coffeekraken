function hover($elm) {
  return $elm.parentElement.querySelector(":hover") === $elm;
}
var hover_default = hover;
export {
  hover_default as default
};
