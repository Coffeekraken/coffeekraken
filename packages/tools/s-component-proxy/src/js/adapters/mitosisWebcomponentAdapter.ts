import { __getExtendsStack } from '@coffeekraken/sugar/class';
import type { ISComponentProxyCreateSettings } from '../SComponentProxy';

export default {
    id: 'mitosisWebcomponent',
    test(component: any) {
        let isHtmlElement = false;
        try {
            const extendsStack = __getExtendsStack(component.default);
            isHtmlElement = Object.keys(extendsStack).includes('HTMLElement');
        } catch (e) {
            return false;
        }
        return component.define && isHtmlElement;
    },
    create(
        component: any,
        html: string,
        settings: Partial<ISComponentProxyCreateSettings>,
    ): any {
        const $root = settings.$root ?? document.body;
        component.define();
        $root.innerHTML = html;
        const $component = $root.children[0];
        return $component;
    },
    setProps($component: HTMLElement, props: any): void {
        for (let [prop, value] of Object.entries(props ?? {})) {
            if (value === undefined) {
                continue;
            }
            // @ts-ignore
            $component.props[prop] = value;
        }
        // @ts-ignore
        $component.update();
    },
};
