import '@coffeekraken/s-inline-svg-component';
import '@coffeekraken/s-activate-component';
import "@coffeekraken/s-filtrable-input-component";
import "@coffeekraken/s-request-component";
import "@coffeekraken/s-code-example-component";
import "@coffeekraken/s-opengraph-viewer-component";
// import "@coffeekraken/s-handlebars-component";
import __SComponentUtils from "@coffeekraken/s-component-utils";
import __querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive';

import './components/docNav.riot';

// generic
import "./generic/docShortcut";

// features
import __smoothScroll from '@coffeekraken/sugar/js/feature/smoothScroll';

// features
__smoothScroll({
  scroll: {
    offset: 188
  }
});

document.addEventListener('scroll', (e) => {
  if (document.body.scrollTop >= 10) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }
});

__SComponentUtils.setDefaultProps('s-code-example', {
    toolbarPosition: 'nav',
    defaultStyle: true,
    defaultStyleClasses: {
        main: 's-tabs'
    }
});

__querySelectorLive('[class*="s-"][class*=":"]', ($elm) => {

   $elm.getAttribute('class').split(' ').forEach((cls) => {
  
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

