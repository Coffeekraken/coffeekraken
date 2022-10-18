import React from 'react';
import { createRoot } from 'react-dom/client';

export default {
    id: 'react',
    test(component: any) {
        return component.metas?.type === 'react';
    },
    create(
        component: any,
        settings: Partial<ISComponentProxyCreateSettings>,
    ): any {
        console.log('create', component);

        const root = createRoot(settings.$root);

        root.render(React.createElement(component.default, {}, null));
        // const $root = settings.$root ?? document.body;
        // component.define();
        // $root.innerHTML = html;
        // const $component = $root.children[0];
        // return $component;
    },
    setProps($component: HTMLElement, props: any): void {
        // for (let [prop, value] of Object.entries(props ?? {})) {
        //     if (value === undefined) {
        //         continue;
        //     }
        //     // @ts-ignore
        //     $component.props[prop] = value;
        // }
        // // @ts-ignore
        // $component.update();
    },
};
