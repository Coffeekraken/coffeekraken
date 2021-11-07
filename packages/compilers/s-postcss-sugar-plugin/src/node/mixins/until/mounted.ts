import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           mounted
 * @namespace      node.mixins.until
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to set some css applied only UNTIL a specific "state" has been
 * reached.
 * Supported states are:
 * - mounted: When a sugar webcomponent has the "mounted" attribute
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * .myElement {
 *      display: block;
 *
 *      @sugar.until.mounted {
 *          display: none;
 *      }
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginmountedMixinInterface extends __SInterface {
    static get definition() {
        return (
            this.cached() ??
            this.cache({
                state: {
                    type: 'String',
                    values: ['mounted'],
                    required: true,
                },
                sibling: {
                    type: 'Boolean',
                    default: false,
                },
            })
        );
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
                selector = '*:not([mounted]) &';
            } else {
                selector = '&:not([mounted])';
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
