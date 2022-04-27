import { define as __sActivateFeature } from '@coffeekraken/s-activate-feature';
import { define as __SCodeExampleWebcomponent } from '@coffeekraken/s-code-example-component';
import { define as __SColorPickerWebcomponent } from '@coffeekraken/s-color-picker-component';
import { define as __SDatePickerWebcomponent } from '@coffeekraken/s-date-picker-component';
import { define as __SScrollToComponent } from '@coffeekraken/s-scroll-to-component';
import { define as __sFormValidateFeature } from '@coffeekraken/s-form-validate-feature';
import { define as __sRefocusFeature } from '@coffeekraken/s-refocus-feature';
import { define as __sSugarFeature } from '@coffeekraken/s-sugar-feature';
import { define as __sFloatingFeature } from '@coffeekraken/s-floating-feature';
import { define as __sPageTransitionFeature } from '@coffeekraken/s-page-transition-feature';
import {
    define as __SSliderComponent,
    SSliderSlideableBehavior,
} from '@coffeekraken/s-slider-component';

import __SLitComponent from '@coffeekraken/s-lit-component';
import { define as __sParallaxFeature } from '@coffeekraken/s-parallax-feature';
import { define as __SRangeWebcomponent } from '@coffeekraken/s-range-component';
import { define as __SSidePanelWebcomponent } from '@coffeekraken/s-panel-component';

import __wait from '@coffeekraken/sugar/shared/time/wait';
import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';

// features
import { define as __CKBlobComponent } from './components/CkBlob';
import { define as __CkFallingStarsComponent } from './components/CkFallingStars';
import { define as __CKDiscoverComponent } from './components/CKDiscover';
import { define as __CKSearchComponent } from './components/CKSearch';
import { define as __CKSettingsComponent } from './components/CkSettings';
import { define as __VersionSelector } from './components/VersionSelector';

// others
import __SConductor from '@coffeekraken/s-conductor';
import __krakenLogo from './generic/krakenLogo';

// @ts-ignore
const viewsRelated = import.meta.globEager('../views/**/*.ts');

// setup conductor
__SConductor.setup({
    log: true,
});

(async () => {
    __SLitComponent.setDefaultProps('*', {
        mountWhen: 'nearViewport',
    });
    __SLitComponent.setDefaultProps(['s-panel', 'ck-settings'], {
        mountWhen: 'direct',
    });
    __SLitComponent.setDefaultProps(['s-code-example'], {
        scrollToSettings: {
            offset: 100,
        },
    });

    // layout related
    __expandPleasantCssClassnamesLive();

    // features
    __sActivateFeature();
    // __sPageTransitionFeature();

    // internal components
    __VersionSelector();
    __CKSearchComponent();
    __CKBlobComponent();
    __CkFallingStarsComponent();

    // views related
    for (let [key, value] of Object.entries(viewsRelated)) {
        // @ts-ignore
        if (typeof value.default === 'function') value.default();
    }

    // components
    __CKDiscoverComponent();
    __CKSettingsComponent();
    __SCodeExampleWebcomponent();
    __SSidePanelWebcomponent();
    __SColorPickerWebcomponent();
    __SScrollToComponent();
    __SDatePickerWebcomponent();
    __SRangeWebcomponent();
    __SSliderComponent({
        availableBehaviors: {
            slideable: {
                class: SSliderSlideableBehavior,
                settings: {},
            },
        },
    });

    // features
    __sSugarFeature();
    __sFloatingFeature();
    __sRefocusFeature();
    __sParallaxFeature();
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

    // __krakenLogo();
})();
