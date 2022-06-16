import { define as __sActivateFeature } from '@coffeekraken/s-activate-feature';
import { define as __SCodeExampleWebcomponent } from '@coffeekraken/s-code-example-component';
import { define as __SColorPickerWebcomponent } from '@coffeekraken/s-color-picker-component';
import { define as __SFiltrableInputComponent } from '@coffeekraken/s-filtrable-input-component';
import { define as __SDatePickerWebcomponent } from '@coffeekraken/s-date-picker-component';
import { define as __SScrollComponent } from '@coffeekraken/s-scroll-component';
import { define as __sFormValidateFeature } from '@coffeekraken/s-form-validate-feature';
import { define as __sRefocusFeature } from '@coffeekraken/s-refocus-feature';
import { define as __sSugarFeature } from '@coffeekraken/s-sugar-feature';
import { define as __sFloatingFeature } from '@coffeekraken/s-floating-feature';
import { define as __sPageTransitionFeature } from '@coffeekraken/s-page-transition-feature';
import {
    define as __SSliderComponent,
    SSliderSlideableBehavior,
    SSliderCssAnimationBehavior,
} from '@coffeekraken/s-slider-component';

import __SLitComponent from '@coffeekraken/s-lit-component';
// import { define as __sParallaxFeature } from '@coffeekraken/s-parallax-feature';
import { define as __SRangeWebcomponent } from '@coffeekraken/s-range-component';
import { define as __SSidePanelWebcomponent } from '@coffeekraken/s-panel-component';

import __wait from '@coffeekraken/sugar/shared/time/wait';
import __expandPleasantCssClassnamesLive from '@coffeekraken/sugar/js/html/expandPleasantCssClassnamesLive';

// Components
import { define as __CKBlobComponent } from './components/CkBlob';
import { define as __CkFallingStarsComponent } from './components/CkFallingStars';
import { define as __CKDiscoverComponent } from './components/CKDiscover';
import { define as __CKSearchComponent } from './components/CKSearch';
import { define as __CKSettingsComponent } from './components/CkSettings';
import { define as __VersionSelector } from './components/VersionSelector';
import { define as __CKDocSubNavComponent } from './components/CKDocSubNav/CKDocSubNav';

// others
import __SDashboard from '@coffeekraken/s-dashboard';
import __STheme from '@coffeekraken/s-theme';
import __SConductor from '@coffeekraken/s-conductor';

// import __SCssAnimation from '@coffeekraken/s-css-animation';

import __querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive';

// @ts-ignore
const viewsRelated = import.meta.globEager('../views/**/*.ts');
// @ts-ignore
const forDocRelated = import.meta.globEager('./forDoc/**/*.ts');

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

    // init theme
    __STheme.init();

    // layout related
    __expandPleasantCssClassnamesLive();

    // features
    __sActivateFeature();
    __sPageTransitionFeature();

    // internal components
    __VersionSelector();
    __CKSearchComponent();
    __CKBlobComponent();
    __CkFallingStarsComponent();

    // components
    __CKDiscoverComponent();
    __CKSettingsComponent();
    __CKDocSubNavComponent();
    __SCodeExampleWebcomponent();
    __SFiltrableInputComponent();
    __SSidePanelWebcomponent();
    // __SColorPickerWebcomponent();
    __SScrollComponent();
    // __SDatePickerWebcomponent();
    __SRangeWebcomponent();
    __SSliderComponent({
        behaviors: {
            slideable: {
                class: SSliderSlideableBehavior,
                settings: {},
            },
            cssAnimation: {
                class: SSliderCssAnimationBehavior,
                settings: {},
            },
        },
    });

    // features
    __sSugarFeature();
    __sFloatingFeature();
    __sRefocusFeature();
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

    // dashboard
    new __SDashboard({
        dashboard: {
            components: {
                's-dashboard-pages': {
                    onSelect: (page) => {
                        document.location.href = page.item.loc;
                    },
                },
            },
        },
    });
})();
