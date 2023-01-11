// import __SDashboard from '@coffeekraken/s-dashboard';

import __SPackEssentials from '@coffeekraken/s-pack-essentials';
import __STheme from '@coffeekraken/s-theme';

import { define as __sugarFeatureDefine } from '@coffeekraken/s-sugar-feature';

// import { define as __sFloatingFeature } from '@coffeekraken/s-floating-feature';
import { define as __sFormValidateFeature } from '@coffeekraken/s-form-validate-feature';
// import { define as __sInlineFeature } from '@coffeekraken/s-inline-feature';
// import { define as __sPageTransitionFeature } from '@coffeekraken/s-page-transition-feature';
// import { define as __sRefocusFeature } from '@coffeekraken/s-refocus-feature';
import __SFeature from '@coffeekraken/s-feature';
import { define as __sGoogleMapComponentDefine } from '@coffeekraken/s-google-map-component';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { define as __SSliderComponentDefine } from '@coffeekraken/s-slider-component';

// import __SCarpenterComponent, {
// define as __sCarpenterComponentDefine,
// } from '@coffeekraken/s-carpenter';

// Views related
const viewsRelated = import.meta.globEager('../views/**/*.ts');

// Init script
(async () => {
    // Set some features defaults
    __SFeature.setDefaultProps('*', {});

    // Set some components defaults
    __SLitComponent.setDefaultProps('*', {});

    // Init theme
    await __STheme.init({
        variant: 'dark',
        lod: {
            enabled: true,
            level: 3,
        },
    });

    // sugar feature
    document.body.setAttribute('s-sugar', 'true');
    __sugarFeatureDefine();

    // essentials
    __SPackEssentials();

    // features
    __sFormValidateFeature({});

    // Project related components
    // ...

    // Components
    __SSliderComponentDefine();
    __sGoogleMapComponentDefine();
    // __sCarpenterComponentDefine();

    // __SCarpenterComponent.create();

    // Dashboard
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
