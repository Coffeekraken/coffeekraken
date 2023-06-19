// import __SDashboard from '@coffeekraken/s-dashboard';
import __SFront from '@coffeekraken/s-front';
import __SPackEssentials from '@coffeekraken/s-pack-essentials';

import { __define as __sugarFeatureDefine } from '@coffeekraken/s-sugar-feature/lazy';

import { __define as __SSpacesSelectorComponentDefine } from '@coffeekraken/s-spaces-selector-component/lazy';

// import { __define as __sFloatingFeature } from '@coffeekraken/s-floating-feature';
// import { __define as __sInlineFeature } from '@coffeekraken/s-inline-feature';
// import { __define as __sPageTransitionFeature } from '@coffeekraken/s-page-transition-feature';
// import { __define as __sRefocusFeature } from '@coffeekraken/s-refocus-feature';
import __SFeature from '@coffeekraken/s-feature';
import { __define as __sGoogleMapComponentDefine } from '@coffeekraken/s-google-map-component/lazy';
import __SLitComponent from '@coffeekraken/s-lit-component';
import { __define as __SSliderComponentDefine } from '@coffeekraken/s-slider-component/lazy';

import { __define as __sCarpenterComponentDefine } from '@coffeekraken/s-carpenter';

// Views related
const viewsRelated = import.meta.globEager('../views/**/*.ts');

// Init script
(async () => {
    if (document.querySelector('s-carpenter')) {
        __sCarpenterComponentDefine({
            autoInit: true,
            escape: true,
            features: {
                page: {
                    create: true,
                    save: true,
                },
                node: {
                    delete: true,
                    insert: true,
                },
                scopes: true,
            },
        });
        return;
    }

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
