import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           active
 * @namespace      node.mixins.when
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to set some css applied only WHEN a specific "state" has been
 * reached.
 * Supported states are:
 * - mounted: When a sugar webcomponent has the "mounted" attribute
 * - active: When the element has the "active" class or the "active" attribute
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * .myElement {
 *      display: none;
 *
 *      @sugar.when.mounted {
 *          display: block;
 *      }
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginmountedMixinInterface extends __SInterface {
    static get _definition() {
        return {
            state: {
                type: 'String',
                values: ['mounted', 'active'],
                required: true,
            },
            sibling: {
                type: 'Boolean',
                default: false,
            },
        };
    }
}
export { postcssSugarPluginmountedMixinInterface as interface };

export interface postcssSugarPluginmountedMixinParams {
    state: 'mounted' | 'active';
    sibling: boolean;
}
export default function ({
    params,
    atRule,
    postcssApi,
}: {
    params: Partial<postcssSugarPluginmountedMixinParams>;
    atRule: any;
    postcssApi: any;
}) {
    const finalParams = <postcssSugarPluginmountedMixinParams>{
        state: 'mounted',
        sibling: false,
        ...(params ?? {}),
    };

    let selector;

    switch (finalParams.state) {
        case 'mounted':
            if (finalParams.sibling) {
                selector = '*[mounted] &, *.mounted &';
            } else {
                selector = '&[mounted], &.mounted';
            }
            break;
        case 'active':
            if (finalParams.sibling) {
                selector = '*[active] &. *.active &';
            } else {
                selector = '&[active], &.active';
            }
            break;
    }

    const wrapperRule = new postcssApi.Rule({
        selector,
    });

    // @ts-ignore
    atRule.nodes.forEach((node) => {
        wrapperRule.append(node);
    });

    atRule.replaceWith(wrapperRule);
}
