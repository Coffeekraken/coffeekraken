import { define as __sActivateFeature } from '@coffeekraken/s-activate-feature';
import __SComponentProxy from '@coffeekraken/s-component-proxy';
import { define as _sSpecsEditorComponentDefine } from '@coffeekraken/s-specs-editor-component/webcomponent';
import { __querySelectorLive } from '@coffeekraken/sugar/dom';

(async () => {
    // features
    __sActivateFeature();

    // components
    setTimeout(() => {
        _sSpecsEditorComponentDefine();
    }, 1000);

    __querySelectorLive('[component]', async ($app) => {
        const component = JSON.parse($app.getAttribute('component')),
            componentImport = await import(component.path),
            componentProxy = new __SComponentProxy(componentImport),
            $componentContainer = document.querySelector(
                `#component-${component.target}`,
            );

        componentProxy.create({
            $root: $app,
        });
        $componentContainer?.addEventListener('s-specs-editor.change', (e) => {
            componentProxy.setProps(e.detail);
        });
    });
})();
