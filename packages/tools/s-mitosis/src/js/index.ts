import { define as __sActivateFeature } from '@coffeekraken/s-activate-feature';
import { __querySelectorLive } from '@coffeekraken/sugar/dom';

(async () => {
    // features
    __sActivateFeature();

    __querySelectorLive('[component]', async ($app) => {
        const component = JSON.parse($app.getAttribute('component'));
        console.log(component);

        const componentImport = await import(component.path);

        switch (component.target) {
            case 'webcomponent':
                componentImport.define();
                $app.innerHTML = componentImport.preview;
                break;
        }
    });
})();
