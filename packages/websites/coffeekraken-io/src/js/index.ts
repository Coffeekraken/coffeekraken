import '@coffeekraken/s-inline-svg-component';
import '@coffeekraken/s-activate-component';
import "@coffeekraken/s-filtrable-input-component";
import "@coffeekraken/s-request-component";
import __SComponentUtils from "@coffeekraken/s-component-utils";
import __querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive';

__SComponentUtils.setDefaultProps('s-filtrable-input', {
    noItemText: 'Yplop'
});


const start = Date.now();

__querySelectorLive('[class*="s-"][class*=":"]', ($elm) => {
  Array.from($elm.classList).forEach((cls) => {
    if (!cls.includes(':')) return;
    const parts = cls.split(":");
    const startCls = parts[0];
    $elm.classList.add(startCls);
    parts.forEach((p, i) => {
      if (i <= 0) return;
      $elm.classList.add(`${startCls}--${p}`);
    });
    $elm.classList.remove(cls);
  });
});

console.log("coco", Date.now() - start);

