import __uniqid from "@coffeekraken/sugar/shared/string/uniqid";
function clearTransmations($elm = document.body, settings) {
  const cls = `s-clear-transmations-${__uniqid()}`;
  $elm.classList.add(cls);
  const $tag = document.createElement("style");
  $tag.type = "text/css";
  $tag.innerHTML = `
        .${cls},
        .${cls}:before,
        .${cls}:after,
        .${cls} *,
        .${cls} *:before,
        .${cls} *:after {
            animation: none !important;
            transition: none !important;
        }
    `;
  document.head.appendChild($tag);
  function reset() {
    $elm.classList.remove(cls);
    $tag.remove();
  }
  if (settings == null ? void 0 : settings.timeout) {
    setTimeout(() => {
      reset();
    }, settings.timeout);
  }
  return reset;
}
export {
  clearTransmations as default
};
