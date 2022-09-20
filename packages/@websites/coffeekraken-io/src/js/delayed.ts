// Components
// import { define as __sAppearFeature } from '@coffeekraken/s-appear-feature';
import { define as __SClipboardCopyComponent } from '@coffeekraken/s-clipboard-copy-component';
import { define as __SColorPickerComponent } from '@coffeekraken/s-color-picker-component';
import { define as __SDatetimePickerComponent } from '@coffeekraken/s-datetime-picker-component';
import { define as __SRatingComponent } from '@coffeekraken/s-rating-component';
import { define as __SScrollComponent } from '@coffeekraken/s-scroll-component';
import { define as __SThemeSwitcherComponent } from '@coffeekraken/s-theme-switcher-component';

// Features
import { define as __sFloatingFeature } from '@coffeekraken/s-floating-feature';
import { define as __sFormValidateFeature } from '@coffeekraken/s-form-validate-feature';
import { define as __sInlineFeature } from '@coffeekraken/s-inline-feature';
// import { define as __sParallaxFeature } from '@coffeekraken/s-parallax-feature';

// Website specific
import { define as __SRangeComponent } from '@coffeekraken/s-range-component';
// import { define as __CKBlobComponent } from './components/CkBlob';
import { define as __CKDiscoverComponent } from './components/CKDiscover';
import { define as __CKDiscoverTabedComponent } from './components/CKDiscoverTabed';
// import { define as __CKDocSubNavComponent } from './components/CKDocSubNav/CKDocSubNav';
// import { define as __CkFallingStarsComponent } from './components/CkFallingStars';
// import { define as __CKRatingsComponent } from './components/CKRating';
// import { define as __CKWelcomeRatingsComponent } from './components/CKWelcomeRatings';
// import __SDashboard from '@coffeekraken/s-dashboard';

(async () => {
  // Components
  // __CKRatingsComponent();
  __SClipboardCopyComponent();
  __SRatingComponent();
  __SColorPickerComponent();
  __SDatetimePickerComponent();
  __SScrollComponent();
  __SRangeComponent();
  __SThemeSwitcherComponent();

  // Features
  __sFloatingFeature();
  __sInlineFeature();
  // __sAppearFeature();
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

  // Website specific
  __CKDiscoverComponent();
  __CKDiscoverTabedComponent();
  // __CkFallingStarsComponent();
  // __CKWelcomeRatingsComponent();
})();
