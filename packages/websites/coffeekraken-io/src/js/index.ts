import '@coffeekraken/s-inline-svg-component';
import '@coffeekraken/s-activate-component';
import "@coffeekraken/s-filtrable-input-component";
import "@coffeekraken/s-request-component";
import "@coffeekraken/s-code-example-component";
import "@coffeekraken/s-opengraph-viewer-component";
import __SComponentUtils from "@coffeekraken/s-component-utils";
import __querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive';

// generic
import "./generic/docShortcut";

// features
import __smoothScroll from '@coffeekraken/sugar/js/feature/smoothScroll';

// features
__smoothScroll({
  scroll: {
    offset: 150
  }
});

__SComponentUtils.setDefaultProps('s-code-example', {
    toolbarPosition: 'nav',
    defaultStyle: true,
    defaultStyleClasses: {
        main: 's-tabs s-tabs--gradient'
    }
});

__querySelectorLive('[class*="s-"][class*=":"]', ($elm) => {
   $elm.classList.forEach((cls) => {
    
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

