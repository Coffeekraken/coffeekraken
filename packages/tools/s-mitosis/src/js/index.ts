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
        const component = JSON.parse($app.getAttribute('component'));
        const componentProxy = new __SComponentProxy(component);
        // const componentImport = await componentProxy.load();

        if (component.target !== 'vue') {
            return;
        }

        const componentImport = await componentProxy.load();

        // $componentContainer = document.querySelector(
        //     `#component-${component.target}`,
        // );

        console.log('create', component);

        // const app = createApp({
        //     data() {
        //         return {};
        //     },
        //     template: component.specs.preview,
        //     // render() {
        //     //     return `
        //     //         <div v-html=>Hello !!!</div>
        //     //     `;
        //     // },
        // });
        // const $root = $app ?? document.body;
        // app.component('s-slider', componentImport.default);
        // app.mount($root);

        componentProxy.create({
            $root: $app,
        });
        // $componentContainer?.addEventListener('s-specs-editor.change', (e) => {
        //     componentProxy.setProps(e.detail);
        // });
    });
})();
