import __SFront from '@coffeekraken/s-front';
import __SPackEssentials from '@coffeekraken/s-pack-essentials';

import __SFeature from '@coffeekraken/s-feature';
import __SLitComponent from '@coffeekraken/s-lit-component';

// Views related
const viewsRelated = import.meta.globEager('../views/**/*.ts');

// Init script
(async () => {
    // Set some features defaults
    __SFeature.setDefaultProps('*', {});

    // Set some components defaults
    __SLitComponent.setDefaultProps('*', {});

    // Front
    __SFront.init({});

    // Essentials
    __SPackEssentials();

    // Features
    // ...

    // Project related components
    // ...

    // Components
    // ...
})();
