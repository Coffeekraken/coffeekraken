import "../../../../../../chunk-PG3ZPS4G.mjs";
const _links = {}, _stylesheets = {};
async function adoptStyleInShadowRoot($shadowRoot, $context = document) {
  const $links = $context.querySelectorAll('link[rel="stylesheet"]');
  if ($links && $shadowRoot) {
    Array.from($links).forEach(async ($link) => {
      $shadowRoot == null ? void 0 : $shadowRoot.appendChild($link.cloneNode());
    });
  }
  return true;
}
export {
  adoptStyleInShadowRoot as default
};
