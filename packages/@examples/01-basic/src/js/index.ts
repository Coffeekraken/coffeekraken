// import __SDashboard from '@coffeekraken/s-dashboard';
import __SFront from '@coffeekraken/s-front';
import __SPackEssentials from '@coffeekraken/s-pack-essentials';

import { define as __sugarFeatureDefine } from '@coffeekraken/s-sugar-feature';

import { define as __SSpacesSelectorComponentDefine } from '@coffeekraken/s-spaces-selector-component';

// import { define as __sFloatingFeature } from '@coffeekraken/s-floating-feature';
// import { define as __sInlineFeature } from '@coffeekraken/s-inline-feature';
// import { define as __sPageTransitionFeature } from '@coffeekraken/s-page-transition-feature';
// import { define as __sRefocusFeature } from '@coffeekraken/s-refocus-feature';
import __SFeature from '@coffeekraken/s-feature';
import { define as __sGoogleMapComponentDefine } from '@coffeekraken/s-google-map-component';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { define as __SSliderComponentDefine } from '@coffeekraken/s-slider-component';

// Views related
const viewsRelated = import.meta.globEager('../views/**/*.ts');

// Init script
(async () => {
    // Set some features defaults
    __SFeature.setDefaultProps('*', {});

    // Set some components defaults
    __SLitComponent.setDefaultProps('*', {});

    __SFront.init({});

    // sugar feature
    __sugarFeatureDefine();

    // essentials
    __SPackEssentials();

    // features

    // Project related components
    // ...

    // Components
    __SSliderComponentDefine();
    __sGoogleMapComponentDefine();
    // __sCarpenterComponentDefine();
    __SSpacesSelectorComponentDefine();

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
