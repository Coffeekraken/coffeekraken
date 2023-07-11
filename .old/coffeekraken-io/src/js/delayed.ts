// Components
// import { __define as __sAppearFeature } from '@coffeekraken/s-appear-feature';
import { __define as __SClipboardCopyComponent } from '@coffeekraken/s-clipboard-copy-component';
import { __define as __SColorPickerComponent } from '@coffeekraken/s-color-picker-component';
import { __define as __SDatetimePickerComponent } from '@coffeekraken/s-datetime-picker-component';
import { __define as __SRatingComponent } from '@coffeekraken/s-rating-component';
import { __define as __SScrollComponent } from '@coffeekraken/s-scroll-component';
import { __define as __SThemeSwitcherComponent } from '@coffeekraken/s-theme-switcher-component';

// Features
import { __define as __sFloatingFeature } from '@coffeekraken/s-floating-feature';
import { __define as __sFormValidateFeature } from '@coffeekraken/s-form-validate-feature';
import { __define as __sInlineFeature } from '@coffeekraken/s-inline-feature';
// import { __define as __sParallaxFeature } from '@coffeekraken/s-parallax-feature';

// Website specific
import { __define as __SRangeComponent } from '@coffeekraken/s-range-component';
// import { __define as __CKBlobComponent } from './components/CkBlob.js';
import { __define as __CKDiscoverComponent } from './components/CKDiscover.js';
import { __define as __CKDiscoverTabedComponent } from './components/CKDiscoverTabed.js';
// import { __define as __CKDocSubNavComponent } from './components/CKDocSubNav/CKDocSubNav.js';
// import { __define as __CkFallingStarsComponent } from './components/CkFallingStars.js';
// import { __define as __CKRatingsComponent } from './components/CKRating.js';
// import { __define as __CKWelcomeRatingsComponent } from './components/CKWelcomeRatings.js';
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
                    return helpers.message(
                        'Are you sure? Krakens are dangerous...',
                    );
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
