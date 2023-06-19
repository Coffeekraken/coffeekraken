import __SPackEssentials from '@coffeekraken/s-pack-essentials';

import __SFront from '@coffeekraken/s-front';

import { __define as __SCodeExampleComponentDefine } from '@coffeekraken/s-code-example-component';
import { __define as __SColorPickerComponentDefine } from '@coffeekraken/s-color-picker-component';
// import __SDashboard from '@coffeekraken/s-dashboard';
import { __define as __SDatetimePickerComponentDefine } from '@coffeekraken/s-datetime-picker-component';
import { __define as __SFiltrableInputComponentDefine } from '@coffeekraken/s-filtrable-input-component';
import { __define as __SGoogleMapComponentDefine } from '@coffeekraken/s-google-map-component';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { __define as __SSidePanelComponentDefine } from '@coffeekraken/s-panel-component';
import { __define as __SRatingComponentDefine } from '@coffeekraken/s-rating-component';
import { __define as __SSliderComponentDefine } from '@coffeekraken/s-slider-component';
import { __define as __SThemeSwitcherComponentDefine } from '@coffeekraken/s-theme-switcher-component';

import __SFeature from '@coffeekraken/s-feature';
// import { __define as __SGlitchFeatureDefine } from '@coffeekraken/s-glitch-feature';
import { __define as __SHighlightFeatureDefine } from '@coffeekraken/s-highlight-feature';
import { __define as __SLazyFeatureDefine } from '@coffeekraken/s-lazy-feature';
import { __define as __SPageTransitionFeatureDefine } from '@coffeekraken/s-page-transition-feature';
import { __define as __SParallaxFeatureDefine } from '@coffeekraken/s-parallax-feature';

// Website specific
import { __define as __CKDiscoverComponent } from './components/CKDiscover';
import { __define as __CKDiscoverTabedComponent } from './components/CKDiscoverTabed';
import { __define as __CKDiscoverWelcomeComponent } from './components/CKDiscoverWelcome';
import { __define as __CKDocSubNavDefine } from './components/CKDocSubNav';
import { __define as __CKSearchComponent } from './components/CKSearch';
import { __define as __CKSettingsComponent } from './components/CkSettings';
import { __define as __CKVersionSelector } from './components/CKVersionSelector';
// import { __define as __CKRatingsComponent } from './components/CKRating';
// import { __define as __CKWelcomeRatingsComponent } from './components/CKWelcomeRatings';

// import { __isMobile } from '@coffeekraken/sugar/is';

import { __querySelectorLive } from '@coffeekraken/sugar/dom';

// Libs

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
    __SFeature.setDefaultProps(['s-highlight'], {
        opacity: 0.3,
        lod: 4,
    });
    __SFeature.setDefaultProps('s-refocus', {
        trigger: ['event:actual', 'anchor', 'history'],
        offsetY: 400,
    });
    __SFeature.setDefaultProps(['s-parallax'], {
        lod: 3,
    });
    __SFeature.setDefaultProps(['s-form-validate'], {
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
    __SLitComponent.setDefaultProps('*', {
        mountWhen: 'nearViewport',
        // verbose: !__SEnv.is('devsCut'),
    });
    __SLitComponent.setDefaultProps(
        ['ck-search-input', 's-color-picker', 's-datetime-picker'],
        {
            mountWhen: 'interact',
            // verbose: !__SEnv.is('devsCut'),
        },
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

    __SFront.init({});

    // essentials
    __SPackEssentials();

    // features
    __SPageTransitionFeatureDefine();
    __SLazyFeatureDefine();
    __SParallaxFeatureDefine();
    __SHighlightFeatureDefine();
    // __SGlitchFeatureDefine();

    // components
    __SCodeExampleComponentDefine();
    __SSliderComponentDefine();
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
    __CKDiscoverWelcomeComponent();
    __CKDiscoverTabedComponent();
    __CKVersionSelector();
    __CKDocSubNavDefine();

    // dashboard
    // const dashboard = new __SDashboard({
    //   dashboard: {
    //     components: {
    //       's-dashboard-pages': {
    //         onSelect: (page) => {
    //           dashboard.close();
    //           document.dispatchEvent(
    //             new CustomEvent('location.href', {
    //               detail: page.item.loc,
    //               bubbles: true,
    //             })
    //           );
    //         },
    //       },
    //     },
    //   },
    // });

    // code example highlight
    __querySelectorLive('.s-code-example_content', ($elm) => {
        $elm.setAttribute('intensity', '0.3');
        $elm.setAttribute('s-highlight', 'light');
    });
})();
