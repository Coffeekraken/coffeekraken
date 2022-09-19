import { define as __sActivateFeature } from '@coffeekraken/s-activate-feature';
// import { define as __sAppearFeature } from '@coffeekraken/s-appear-feature';
// import { define as __SCodeExampleWebcomponent } from '@coffeekraken/s-code-example-component';
// import { define as __SColorPickerComponent } from '@coffeekraken/s-color-picker-component';
// import { define as __SDatetimePickerComponent } from '@coffeekraken/s-datetime-picker-component';
import __SDepsFeature, {
  define as __sDepsFeatureDefine,
} from '@coffeekraken/s-deps-feature';
import __SFeature from '@coffeekraken/s-feature';
// import { define as __SFiltrableInputComponent } from '@coffeekraken/s-filtrable-input-component';
import { define as __sFloatingFeature } from '@coffeekraken/s-floating-feature';
import { define as __sFormValidateFeature } from '@coffeekraken/s-form-validate-feature';
import { define as __sInlineFeature } from '@coffeekraken/s-inline-feature';
import { define as __sPageTransitionFeature } from '@coffeekraken/s-page-transition-feature';
// import { define as __SRatingComponent } from '@coffeekraken/s-rating-component';
import { define as __sRefocusFeature } from '@coffeekraken/s-refocus-feature';
// import { define as __SScrollComponent } from '@coffeekraken/s-scroll-component';
import {
  define as __SSliderComponent,
  SSliderSlideableBehavior,
} from '@coffeekraken/s-slider-component';
import { define as __sSugarFeature } from '@coffeekraken/s-sugar-feature';
// import { define as __SThemeSwitcherComponent } from '@coffeekraken/s-theme-switcher-component';

import __SLitComponent from '@coffeekraken/s-lit-component';
// import { define as __SSidePanelWebcomponent } from '@coffeekraken/s-panel-component';
// import { define as __sParallaxFeature } from '@coffeekraken/s-parallax-feature';
// import { define as __SRangeWebcomponent } from '@coffeekraken/s-range-component';

// Components
// import { define as __CKBlobComponent } from './components/CkBlob';
import { define as __CKDiscoverComponent } from './components/CKDiscover';
import { define as __CKDiscoverTabedComponent } from './components/CKDiscoverTabed';
import { define as __CKDocSubNavComponent } from './components/CKDocSubNav/CKDocSubNav';
// import { define as __CkFallingStarsComponent } from './components/CkFallingStars';
// import { define as __CKRatingsComponent } from './components/CKRating';
import { define as __CKSearchComponent } from './components/CKSearch';
import { define as __CKSettingsComponent } from './components/CkSettings';
// import { define as __CKWelcomeRatingsComponent } from './components/CKWelcomeRatings';
// import __SDashboard from '@coffeekraken/s-dashboard';
import __STheme from '@coffeekraken/s-theme';

import {
  __querySelectorLive,
  __whenNearViewport,
} from '@coffeekraken/sugar/dom';

// import __SCssAnimation from '@coffeekraken/s-css-animation';

// @ts-ignore
const viewsRelated = import.meta.globEager('../views/**/*.ts');
// @ts-ignore
const forDocRelated = import.meta.globEager('./forDoc/**/*.ts');

// setup conductor
// __SConductor.setup({
//     log: true,
// });

async function asyncComponents() {
  // Code example
  const { define: __lazyDefineSCodeExample } = await import(
    '@coffeekraken/s-code-example-component/lazy'
  );
  __lazyDefineSCodeExample();

  // Clipboard copy
  const { define: __lazyDefineSClipboardCopy } = await import(
    '@coffeekraken/s-clipboard-copy-component/lazy'
  );
  __lazyDefineSClipboardCopy();

  // // Slider
  // const { define: __lazyDefineSSliderCopy } = await import(
  //     '@coffeekraken/s-slider-component/lazy'
  // );
  // __lazyDefineSSliderCopy();

  // Color picker
  const { define: __lazyDefineSColorPicker } = await import(
    '@coffeekraken/s-color-picker-component/lazy'
  );
  __lazyDefineSColorPicker();

  // Datetime picker
  const { define: __lazyDefineSDatetimePicker } = await import(
    '@coffeekraken/s-datetime-picker-component/lazy'
  );
  __lazyDefineSDatetimePicker();

  // Filtrable input
  const { define: __lazyDefineSFiltrableInput } = await import(
    '@coffeekraken/s-filtrable-input-component/lazy'
  );
  __lazyDefineSFiltrableInput();

  // Panel
  const { define: __lazyDefineSPanel } = await import(
    '@coffeekraken/s-panel-component/lazy'
  );
  __lazyDefineSPanel();

  // Range
  const { define: __lazyDefineSRange } = await import(
    '@coffeekraken/s-range-component/lazy'
  );
  __lazyDefineSRange();

  // Rating
  const { define: __lazyDefineSRating } = await import(
    '@coffeekraken/s-rating-component/lazy'
  );
  __lazyDefineSRating();

  // Scroll
  const { define: __lazyDefineSScroll } = await import(
    '@coffeekraken/s-scroll-component/lazy'
  );
  __lazyDefineSScroll();

  // Theme switcher
  const { define: __lazyDefineSThemeSwitcher } = await import(
    '@coffeekraken/s-theme-switcher-component/lazy'
  );
  __lazyDefineSThemeSwitcher();
}

(async () => {
  __SFeature.setDefaultProps('*', {
    mountWhen: 'nearViewport',
    // verbose: !__SEnv.is('devsCut'),
  });
  __SLitComponent.setDefaultProps('*', {
    mountWhen: 'nearViewport',
    // verbose: !__SEnv.is('devsCut'),
  });
  __SLitComponent.setDefaultProps(
    ['ck-search-input', 's-color-picker', 's-datetime-picker'],
    {
      mountWhen: 'interact',
      // verbose: !__SEnv.is('devsCut'),
    }
  );
  __SLitComponent.setDefaultProps(['s-panel', 'ck-settings'], {
    mountWhen: 'direct',
  });
  __SLitComponent.setDefaultProps(['s-code-example'], {
    scrollToSettings: {
      offset: 100,
    },
    responsive: {
      mobile: {
        lines: 5,
      },
    },
  });

  // assync components
  asyncComponents();

  __querySelectorLive('[s-template]', async ($template) => {
    await __whenNearViewport($template);
    const $content = $template.content;
    const $container = $content.children[0];

    $template.parentNode.insertBefore($content, $template);
    $container?.classList.add('s-template');
    $container?.classList.add('ready');
    $container?.setAttribute('ready', 'true');
    $template.remove();
  });

  // init theme
  __STheme.init({
    variant: 'dark',
  });

  [
    {
      sel: '.icon-card',
      css: 'iconCard',
    },
    {
      sel: 's-code-example',
      css: 'sCodeExample',
    },
    {
      sel: '.sidemenu',
      css: 'sidemenu',
    },
    {
      sel: '.code-example-section',
      css: 'codeExampleSection',
    },
    {
      sel: '.s-filtrable-input',
      css: 'sFiltrableInput',
    },
    {
      sel: 's-color-picker',
      css: 'sColorPicker',
    },
    {
      sel: 's-datetime-picker',
      css: 'sDatetimePicker',
    },
    {
      sel: 's-rating',
      css: 'sRating',
    },
    {
      sel: 's-slider',
      css: 'sSlider',
    },
    {
      sel: 's-theme-switcher',
      css: 'sThemeSwitcher',
    },
    {
      sel: '.s-plaform',
      css: 'sPlatform',
    },
  ].forEach((dep) => {
    __SDepsFeature.registerDeps(dep.sel, {
      css: dep.css,
    });
  });

  // features
  __sDepsFeatureDefine();
  __sActivateFeature();
  __sPageTransitionFeature();
  // __STemplateFeature();

  // components
  // __CKRatingsComponent();
  // __SCodeExampleWebcomponent();
  // __SFiltrableInputComponent();
  // __SSidePanelWebcomponent();
  // __SRatingComponent();
  // __SColorPickerComponent();
  // __SDatetimePickerComponent();
  // __SScrollComponent();
  // __SRangeWebcomponent();
  // __SThemeSwitcherComponent();
  __SSliderComponent({
    behaviors: {
      slideable: {
        class: SSliderSlideableBehavior,
        settings: {},
      },
    },
  });

  // features
  __sSugarFeature();
  __sFloatingFeature();
  // __sAppearFeature();
  __sRefocusFeature();
  __sInlineFeature();
  // __sParallaxFeature();
  __sFormValidateFeature({
    customValidations: {
      coffeekraken: (value, helpers) => {
        if (value === 'coffeekraken') {
          return helpers.message('Are you sure? Krakens are dangerous...');
        }
        return value;
      },
    },
  });

  // internal components
  // __VersionSelector();
  __CKSearchComponent();
  __CKDiscoverComponent();
  __CKDiscoverTabedComponent();
  __CKSettingsComponent();
  __CKDocSubNavComponent();
  // __CkFallingStarsComponent();
  // __CKWelcomeRatingsComponent();

  // dashboard
  // new __SDashboard({
  //     dashboard: {
  //         components: {
  //             's-dashboard-pages': {
  //                 onSelect: (page) => {
  //                     document.location.href = page.item.loc;
  //                 },
  //             },
  //         },
  //     },
  // });
})();
