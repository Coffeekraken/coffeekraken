import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           mounted
 * @as              @sugar.until.mounted
 * @namespace      node.mixin.until
 * @type           PostcssMixin
 * @interface   ./mounted
 * @platform      postcss
 * @status        wip
 *
 * This mixin allows you to set some css applied only UNTIL a specific "state" has been
 * reached.
 * Supported states are:
 * - mounted: When a sugar webcomponent has the "mounted" attribute
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * .myElement {
 *      display: block;
 *
 *      @sugar.until.mounted {
 *          display: none;
 *      }
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginmountedMixinInterface extends __SInterface {
    static get _definition() {
        return {
            state: {
                type: 'String',
                values: ['mounted'],
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
    state: 'mounted';
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
                selector = '*:not([mounted]):not(.mounted) &';
            } else {
                selector = '&:not([mounted]):not(.mounted)';
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
