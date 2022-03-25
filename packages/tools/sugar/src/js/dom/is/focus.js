function focus($elm) {
  return $elm.parentElement.querySelector(":focus") === $elm;
}
var focus_default = focus;
export {
  focus_default as default
};
