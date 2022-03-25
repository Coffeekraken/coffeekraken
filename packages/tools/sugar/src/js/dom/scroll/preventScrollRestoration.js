function preventScrollRestoration_default() {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
}
export {
  preventScrollRestoration_default as default
};
