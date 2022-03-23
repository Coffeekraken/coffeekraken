import "../../../../../chunk-PG3ZPS4G.mjs";
import __querySelectorLive from "@coffeekraken/sugar/js/dom/query/querySelectorLive";
function krakenLogo_default() {
  const maxOffset = 6;
  function krakenLogo($elm) {
    let isHover = false, hoverTimeout;
    const $squareItems = $elm.querySelectorAll(".kraken-logo > path");
    $squareItems.forEach(($item) => {
      $item.style.transition = "transform 0.1s cubic-bezier(0.700, 0.000, 0.305, 0.995)";
    });
    function anim() {
      $squareItems.forEach(($squareItem) => {
        const offsetX = maxOffset * -1 + Math.random() * (maxOffset * 2), offsetY = maxOffset * -1 + Math.random() * (maxOffset * 2);
        $squareItem.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
      if (isHover) {
        hoverTimeout = setTimeout(anim, Math.random() * 100);
      }
    }
    function hover() {
      if (isHover)
        return;
      isHover = true;
      anim();
    }
    function out() {
      clearTimeout(hoverTimeout);
      isHover = false;
      $squareItems.forEach(($squareItem) => {
        $squareItem.style.transform = `translate(0px, 0px)`;
      });
    }
    $elm.addEventListener("mouseover", hover);
    $elm.addEventListener("mouseout", out);
  }
  __querySelectorLive("[s-kraken-logo]", krakenLogo);
}
export {
  krakenLogo_default as default
};
