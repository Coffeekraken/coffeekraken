import { createApp } from 'vue';

import type {
    ISComponentProxyComponent,
    ISComponentProxyCreateSettings,
} from '../SComponentProxy';

export default {
    id: 'vue3',
    test(component: ISComponentProxyComponent) {
        if (
            component.path?.match(/\.vue$/) ||
            component.metas?.type === 'vue3' ||
            component.target === 'vue3'
        ) {
            return true;
        }
        return false;
    },
    async load(component: ISComponentProxyComponent) {
        const imported = await import(component.path);
        component.default = imported.default;
        return imported;

        // return new Promise((resolve, reject) => {
        //     component.default = defineAsyncComponent(
        //         () => import(component.path),
        //     );
        //     resolve(component.default);
        // });
    },
    create(
        component: ISComponentProxyComponent,
        settings: Partial<ISComponentProxyCreateSettings>,
    ): any {
        console.log('create', component);

        const app = createApp({});
        app.component(component.tagName, component.default);
        const $root = settings.$root ?? document.body;
        // // $root.innerHTML = component.specs?.preview;
        app.mount($root);

        // const app = createApp(component.default);
        // const $component = $root.children[0];
        // component.$element = $component;
    },
    setProps(component: ISComponentProxyComponent, props: any): void {
        for (let [prop, value] of Object.entries(props ?? {})) {
            if (value === undefined) {
                continue;
            }
            // @ts-ignore
            component.$element.props[prop] = value;
        }
        // @ts-ignore
        component.$element.update();
    },
};
