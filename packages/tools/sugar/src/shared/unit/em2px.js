function em2px(em, $elm = document.documentElement) {
  return em * parseFloat(getComputedStyle($elm).fontSize || "16px");
}
var em2px_default = em2px;
export {
  em2px_default as default
};
