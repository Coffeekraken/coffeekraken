import '@coffeekraken/s-inline-svg-component';
import '@coffeekraken/s-activate-component';
import "@coffeekraken/s-filtrable-input-component";
import "@coffeekraken/s-request-component";
import __SCodeExampleComponent, { webcomponent as __SCodeExampleWebcomponent } from "@coffeekraken/s-code-example-component";
import "@coffeekraken/s-handlebars-component";
import __SComponentUtils from "@coffeekraken/s-component-utils";
import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';

// import { webcomponent as __docNavWebcomponent } from './components/docNav';

// generic
// import "./generic/docShortcut";

// __docNavWebcomponent();

__SComponentUtils.setDefaultProps('s-code-example', {
    toolbarPosition: 'nav',
    defaultStyle: true,
    mountWhen: 'inViewport',
    adoptStyles: ['main'],
    defaultStyleClasses: {
        main: 's-tabs'
    }
});

// webcomponents
__SCodeExampleWebcomponent();

// // features
// import __smoothScroll from '@coffeekraken/sugar/js/feature/smoothScroll';

// // features
// __smoothScroll({
//   scroll: {
//     offset: 188
//   }
// });

// document.addEventListener('scroll', (e) => {
//   if (document.body.scrollTop >= 10) {
//     document.body.classList.add('scrolled');
//   } else {
//     document.body.classList.remove('scrolled');
//   }
// });

// __expandPleasantCssClassnamesLive();