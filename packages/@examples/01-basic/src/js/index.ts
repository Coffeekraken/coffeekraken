

// import __SDashboard from '@coffeekraken/s-dashboard';

import __SFront from '@coffeekraken/s-front';
import __SPackEssentials from '@coffeekraken/s-pack-essentials';

import { define as __sugarFeatureDefine } from '@coffeekraken/s-sugar-feature';



import { __reloadStylesheets } from '@coffeekraken/sugar/dom';

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

if (import.meta.hot) {
    import.meta.hot.on('sugar.update.css', (data) => {
        console.log('RELOAD', data);
        // perform custom update
        __reloadStylesheets();
    });
}

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
