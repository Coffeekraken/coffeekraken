import __SFront from '@coffeekraken/s-front';
import __SPackEssentials from '@coffeekraken/s-pack-essentials';

import { __reloadStylesheets } from '@coffeekraken/sugar/dom';

import __SFeature from '@coffeekraken/s-feature';
import __SLitComponent from '@coffeekraken/s-lit-component';

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
