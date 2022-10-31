import { define as __SClipboardCopyComponentDefine } from '@coffeekraken/s-clipboard-copy-component';
import { define as __sInlineFeatureDefine } from '@coffeekraken/s-inline-feature';

import { define as __SCodeExampleComponentDefine } from '@coffeekraken/s-code-example-component';
import { define as __SColorPickerComponentDefine } from '@coffeekraken/s-color-picker-component';
import __SDashboard from '@coffeekraken/s-dashboard';
import { define as __SDatetimePickerComponentDefine } from '@coffeekraken/s-datetime-picker-component';
import { define as __SFiltrableInputComponentDefine } from '@coffeekraken/s-filtrable-input-component';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { define as __SSidePanelComponentDefine } from '@coffeekraken/s-panel-component';
import { define as __SRangeComponentDefine } from '@coffeekraken/s-range-component';
import { define as __SRatingComponentDefine } from '@coffeekraken/s-rating-component';
import { define as __SScrollComponentDefine } from '@coffeekraken/s-scroll-component';
import {
  define as __SSliderComponentDefine,
  SSliderSlideableBehavior,
} from '@coffeekraken/s-slider-component';
import { define as __SThemeSwitcherComponentDefine } from '@coffeekraken/s-theme-switcher-component';

import { define as __SActivateFeatureDefine } from '@coffeekraken/s-activate-feature';
import { define as __SDepsFeatureDefine } from '@coffeekraken/s-deps-feature';
import __SFeature from '@coffeekraken/s-feature';
import { define as __SFloatingFeatureDefube } from '@coffeekraken/s-floating-feature';
import { define as __SFormValidateFeatureDefine } from '@coffeekraken/s-form-validate-feature';
import { define as __SPageTransitionFeatureDefine } from '@coffeekraken/s-page-transition-feature';
import { define as __SRefocusFeatureDefine } from '@coffeekraken/s-refocus-feature';
import { define as __SSugarFeatureDefine } from '@coffeekraken/s-sugar-feature';
import { define as __STemplateFeatureDefine } from '@coffeekraken/s-template-feature';

// Website specific
import { define as __CKDiscoverComponent } from './components/CKDiscover';
import { define as __CKDiscoverTabedComponent } from './components/CKDiscoverTabed';
import { define as __CKSearchComponent } from './components/CKSearch';
import { define as __CKSettingsComponent } from './components/CkSettings';
// import { define as __CKRatingsComponent } from './components/CKRating';
// import { define as __CKWelcomeRatingsComponent } from './components/CKWelcomeRatings';

// Libs
import __STheme from '@coffeekraken/s-theme';

// Views specific
// @ts-ignore
const viewsRelated = import.meta.globEager('../views/**/*.ts');

// For doc specific
// @ts-ignore
const forDocRelated = import.meta.globEager('./forDoc/**/*.ts');

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

  // init theme
  __STheme.init({
    variant: 'dark',
  });

  // dependencies
  // [
  //   {
  //     sel: '.icon-card',
  //     css: 'iconCard',
  //   },
  //   {
  //     sel: 's-code-example',
  //     css: 'sCodeExample',
  //   },
  //   {
  //     sel: '.sidemenu',
  //     css: 'sidemenu',
  //   },
  //   {
  //     sel: '.code-example-section',
  //     css: 'codeExampleSection',
  //   },
  //   {
  //     sel: '.s-filtrable-input',
  //     css: 'sFiltrableInput',
  //   },
  //   {
  //     sel: 's-color-picker',
  //     css: 'sColorPicker',
  //   },
  //   {
  //     sel: 's-datetime-picker',
  //     css: 'sDatetimePicker',
  //   },
  //   {
  //     sel: 's-rating',
  //     css: 'sRating',
  //   },
  //   {
  //     sel: 's-slider',
  //     css: 'sSlider',
  //   },
  //   {
  //     sel: 's-theme-switcher',
  //     css: 'sThemeSwitcher',
  //   },
  //   {
  //     sel: '.s-platform',
  //     css: 'sPlatform',
  //   },
  // ].forEach((dep) => {
  //   __SDepsFeature.registerDeps(dep.sel, {
  //     css: dep.css,
  //   });
  // });

  // features
  __SDepsFeatureDefine();
  __SActivateFeatureDefine();
  __SPageTransitionFeatureDefine();
  __STemplateFeatureDefine();
  __SFloatingFeatureDefube();
  __SFormValidateFeatureDefine({
    customValidations: {
      coffeekraken: (value, helpers) => {
        if (value === 'coffeekraken') {
          return helpers.message('Are you sure? Krakens are dangerous...');
        }
        return value;
      },
    },
  });
  __SSugarFeatureDefine();
  __SRefocusFeatureDefine();
  __sInlineFeatureDefine();

  // components
  __SCodeExampleComponentDefine({
    cssDeps: ['global', '/dist/css/partials/sCodeExample.css'],
  });
  __SFiltrableInputComponentDefine();
  __SSidePanelComponentDefine();
  __SSliderComponentDefine({
    behaviors: {
      slideable: {
        class: SSliderSlideableBehavior,
        settings: {},
      },
    },
  });
  __SClipboardCopyComponentDefine();
  __SRatingComponentDefine();
  __SColorPickerComponentDefine();
  __SDatetimePickerComponentDefine();
  __SScrollComponentDefine();
  __SRangeComponentDefine();
  __SThemeSwitcherComponentDefine();

  // Website specific
  // __CKRatingsComponent();
  // __CKWelcomeRatingsComponent();
  __CKSearchComponent();
  __CKSettingsComponent();
  __CKDiscoverComponent();
  __CKDiscoverTabedComponent();

  // dashboard
  const dashboard = new __SDashboard({
    dashboard: {
      components: {
        's-dashboard-pages': {
          onSelect: (page) => {
            dashboard.close();
            document.dispatchEvent(
              new CustomEvent('location.href', {
                detail: page.item.loc,
                bubbles: true,
              })
            );
          },
        },
      },
    },
  });
})();
