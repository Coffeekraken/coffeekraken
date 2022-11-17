import __SPackEssentials from '@coffeekraken/s-pack-essentials';

import { define as __SCodeExampleComponentDefine } from '@coffeekraken/s-code-example-component';
import { define as __SColorPickerComponentDefine } from '@coffeekraken/s-color-picker-component';
import __SDashboard from '@coffeekraken/s-dashboard';
import { define as __SDatetimePickerComponentDefine } from '@coffeekraken/s-datetime-picker-component';
import { define as __SFiltrableInputComponentDefine } from '@coffeekraken/s-filtrable-input-component';
import { define as __SGoogleMapComponentDefine } from '@coffeekraken/s-google-map-component';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { define as __SSidePanelComponentDefine } from '@coffeekraken/s-panel-component';
import { define as __SRatingComponentDefine } from '@coffeekraken/s-rating-component';
import { define as __SThemeSwitcherComponentDefine } from '@coffeekraken/s-theme-switcher-component';

import __SFeature from '@coffeekraken/s-feature';
import { define as __SPageTransitionFeatureDefine } from '@coffeekraken/s-page-transition-feature';
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
  __SFeature.setDefaultProps(['s-form-validate'], {
    customValidations: {
      coffeekraken: (value, helpers) => {
        if (value === 'coffeekraken') {
          return helpers.message('Are you sure? Krakens are dangerous...');
        }
        return value;
      },
    },
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

  // essentials
  __SPackEssentials();

  // features
  __SPageTransitionFeatureDefine();
  __STemplateFeatureDefine();

  // components
  __SCodeExampleComponentDefine({
    cssDeps: ['global', '/dist/css/partials/sCodeExample.css'],
  });
  __SFiltrableInputComponentDefine();
  __SSidePanelComponentDefine();
  __SRatingComponentDefine();
  __SColorPickerComponentDefine();
  __SDatetimePickerComponentDefine();
  __SGoogleMapComponentDefine();
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
