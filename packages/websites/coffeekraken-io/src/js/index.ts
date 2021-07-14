import '@coffeekraken/s-inline-svg-component';
import '@coffeekraken/s-activate-component';
import "@coffeekraken/s-filtrable-input-component";
import "@coffeekraken/s-request-component";
import { define as __SCodeExampleComponentDefine } from "@coffeekraken/s-code-example-component";
import "@coffeekraken/s-handlebars-component";
import __SComponentUtils from "@coffeekraken/s-component-utils";
import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';

import './components/docNav.riot';

// generic
import "./generic/docShortcut";

// webcomponents
__SCodeExampleComponentDefine();

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

__expandPleasantCssClassnamesLive();