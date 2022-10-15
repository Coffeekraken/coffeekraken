import { __getExtendsStack } from '@coffeekraken/sugar/class';
import type {
    ISComponentProxyComponent,
    ISComponentProxyCreateSettings,
} from '../SComponentProxy';

export default {
    id: 'mitosisWebcomponent',
    test(component: ISComponentProxyComponent) {
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
        component: ISComponentProxyComponent,
        settings: Partial<ISComponentProxyCreateSettings>,
    ): any {
        const $root = settings.$root ?? document.body;
        component.define?.();
        $root.innerHTML = <string>component.metas?.preview ?? settings.html;
        const $component = $root.children[0];
        component.$element = $component;
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
