import "../../../../../../../chunk-PG3ZPS4G.mjs";
import __uniqid from "../../../shared/string/uniqid";
import __parseArgs from "../../../shared/string/parseArgs";
import __querySelectorLive from "../../dom/querySelectorLive";
var slide_default = (() => {
  __querySelectorLive("[slide-in]", ($item) => {
    const uniqClass = `slide-in-${__uniqid()}`;
    $item.classList.add(uniqClass);
    const slideInValue = $item.getAttribute("slide-in");
    const args = __parseArgs(slideInValue, {
      x: 'Number -x --x "0"',
      y: 'Number -y --y "0"',
      duration: 'Number -d --duration "500"',
      delay: 'Number --delay "0"',
      when: 'String -w --when "inViewport"'
    });
    const css = `
      [slide-in].${uniqClass} {
        opacity: 0;
        transform: translate(${args.x.value || 0}px, ${args.y.value || 0}px);

      }
    `;
    const cssIn = `
      [slide-in].${uniqClass}.in {
        transition: all ${args.duration.value / 1e3 || "0.5"}s;
        opacity: 1;
        transform: translate(0, 0);
      }
    `;
    document.head.innerHTML += `
      <style id="${uniqClass}">
        ${css}
      </style>
    `;
    setTimeout(() => {
      document.head.innerHTML += `
        <style id="${uniqClass}-in">
          ${cssIn}
        </style>
      `;
    }, 100);
    setTimeout(() => {
      $item.classList.add("in");
    }, args.delay.value);
    setTimeout(() => {
      const $style = document.querySelector(`style#${uniqClass}`);
      if ($style)
        $style.parentNode.removeChild($style);
      const $styleIn = document.querySelector(`style#${uniqClass}-in`);
      if ($styleIn)
        $styleIn.parentNode.removeChild($styleIn);
    }, args.delay.value + args.duration.value);
  });
})();
export {
  slide_default as default
};
