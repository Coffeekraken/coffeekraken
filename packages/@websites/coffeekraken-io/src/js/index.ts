import { define as __sActivateFeature } from '@coffeekraken/s-activate-feature';
import { define as __sAppearFeature } from '@coffeekraken/s-appear-feature';
import { define as __SCodeExampleWebcomponent } from '@coffeekraken/s-code-example-component';
import { define as __SColorPickerComponent } from '@coffeekraken/s-color-picker-component';
import { define as __SDatetimePickerComponent } from '@coffeekraken/s-datetime-picker-component';
import __SDepsFeature, {
  define as __sDepsFeatureDefine,
} from '@coffeekraken/s-deps-feature';
import __SFeature from '@coffeekraken/s-feature';
import { define as __SFiltrableInputComponent } from '@coffeekraken/s-filtrable-input-component';
import { define as __sFloatingFeature } from '@coffeekraken/s-floating-feature';
import { define as __sFormValidateFeature } from '@coffeekraken/s-form-validate-feature';
import { define as __sInlineFeature } from '@coffeekraken/s-inline-feature';
import { define as __sPageTransitionFeature } from '@coffeekraken/s-page-transition-feature';
import { define as __SRatingComponent } from '@coffeekraken/s-rating-component';
import { define as __sRefocusFeature } from '@coffeekraken/s-refocus-feature';
import { define as __SScrollComponent } from '@coffeekraken/s-scroll-component';
import {
  define as __SSliderComponent,
  SSliderSlideableBehavior,
} from '@coffeekraken/s-slider-component';
import { define as __sSugarFeature } from '@coffeekraken/s-sugar-feature';
import { define as __SThemeSwitcherComponent } from '@coffeekraken/s-theme-switcher-component';

import __SLitComponent from '@coffeekraken/s-lit-component';
import { define as __SSidePanelWebcomponent } from '@coffeekraken/s-panel-component';
// import { define as __sParallaxFeature } from '@coffeekraken/s-parallax-feature';
import { define as __SRangeWebcomponent } from '@coffeekraken/s-range-component';

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
import __SEnv from '@coffeekraken/s-env';
import __STheme from '@coffeekraken/s-theme';

// import __SCssAnimation from '@coffeekraken/s-css-animation';

// @ts-ignore
const viewsRelated = import.meta.globEager('../views/**/*.ts');
// @ts-ignore
const forDocRelated = import.meta.globEager('./forDoc/**/*.ts');

// setup conductor
// __SConductor.setup({
//     log: true,
// });

(async () => {
  __SFeature.setDefaultProps('*', {
    // mountWhen: 'nearViewport',
    verbose: !__SEnv.is('devsCut'),
  });
  __SLitComponent.setDefaultProps('*', {
    // mountWhen: 'nearViewport',
    verbose: !__SEnv.is('devsCut'),
  });
  __SLitComponent.setDefaultProps(['s-panel', 'ck-settings'], {
    // mountWhen: 'direct',
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
  __SCodeExampleWebcomponent();
  __SFiltrableInputComponent();
  __SSidePanelWebcomponent();
  __SRatingComponent();
  __SColorPickerComponent();
  __SDatetimePickerComponent();
  __SScrollComponent();
  __SRangeWebcomponent();
  __SThemeSwitcherComponent();
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
  __sAppearFeature();
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
