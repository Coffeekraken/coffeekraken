import __SFeature from '@coffeekraken/s-feature';
import __SFront from '@coffeekraken/s-front';
import __SLitComponent from '@coffeekraken/s-lit-component';
import __SPackEssentials from '@coffeekraken/s-pack-essentials';
import { __reloadStylesheets } from '@coffeekraken/sugar/dom';

// Views related
const viewsRelated = import.meta.globEager('../views/**/*.ts');

// Hot stylesheet reloading
if (import.meta.hot) {
    import.meta.hot.on('sugar.update.css', (data) => {
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

    // Init front (theme, etc...)
    __SFront.init({});

    // Essentials
    __SPackEssentials();

    // Features
    // ...

    // Components
    // ...
})();
