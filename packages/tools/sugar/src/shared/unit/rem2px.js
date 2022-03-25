function rem2px(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize || "16px");
}
var rem2px_default = rem2px;
export {
  rem2px_default as default
};
