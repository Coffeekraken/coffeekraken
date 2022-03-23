import "../../../../../../chunk-PG3ZPS4G.mjs";
function preventScrollRestoration_default() {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
}
export {
  preventScrollRestoration_default as default
};
