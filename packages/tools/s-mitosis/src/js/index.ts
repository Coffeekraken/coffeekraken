import { define as __sActivateFeature } from '@coffeekraken/s-activate-feature';
import { define as _sSpecsEditorComponentDefine } from '@coffeekraken/s-specs-editor-component/webcomponent';
import { __querySelectorLive } from '@coffeekraken/sugar/dom';

(async () => {
    // features
    __sActivateFeature();

    // components
    _sSpecsEditorComponentDefine();

    __querySelectorLive('[component]', async ($app) => {
        const component = JSON.parse($app.getAttribute('component'));
        const componentImport = await import(component.path);

        const $componentContainer = document.querySelector(
            `#component-${component.target}`,
        );

        switch (component.target) {
            case 'webcomponent':
                componentImport.define();
                $app.innerHTML = componentImport.metas?.preview;

                let $component = $app.children[0],
                    componentTagName = $component.tagName;

                $componentContainer?.addEventListener(
                    's-specs-editor.change',
                    (e) => {
                        const updatedProp = e.detail;

                        // const prop = e.detail;
                        // if (typeof prop.value === 'boolean') {
                        //     if (prop.value) {
                        //         $component.setAttribute(prop.id, 'true');
                        //     } else {
                        //         $component.removeAttribute(prop.id);
                        //     }
                        // } else {
                        //     if (!prop.value) {
                        //         $component.removeAttribute(prop.id);
                        //     } else {
                        //         $component.setAttribute(prop.id, prop.value);
                        //     }
                        // }

                        $component.remove();

                        const domParser = new DOMParser();
                        const $dom = domParser.parseFromString(
                            componentImport.metas.preview,
                            'text/html',
                        );
                        $component = $dom.body.children[0];

                        for (let [prop, value] of Object.entries(
                            component.specs.props,
                        )) {
                            if (prop === updatedProp.id) {
                                console.log(prop, value);
                            }
                        }

                        $app.appendChild();

                        console.log('Updated', e.detail);
                    },
                );

                break;
        }
    });
})();
