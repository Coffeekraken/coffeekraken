import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           active
 * @as              @sugar.when
 * @namespace      node.mixin.when
 * @type           PostcssMixin
 * @platform      postcss
 * @interface       ./when
 * @status        wip
 *
 * This mixin allows you to set some css applied only WHEN a specific "state" has been
 * reached.
 * Supported states are:
 * - mounted: When a sugar webcomponent has the "mounted" attribute
 * - active: When the element has the "active" class or the "active" attribute
 * - dark: When the prefered color scheme is dark
 * - light: When the prefered color scheme is light
 *
 * @param       {'mounted'|'active'|'dark'|'light'}         state           The state you want to target
 * @param       {'self'|'sibling'|'parent'|'ancestor'|'theme'}      [context='self']        The context of the when
 * @return        {Css}         The generated css
 *
 * @example        css
 * .myElement {
 *      display: none;
 *
 *      @sugar.when mounted {
 *          display: block;
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
                values: ['mounted', 'active', 'dark', 'light'],
                required: true,
            },
            context: {
                type: 'String',
                values: ['self', 'sibling', 'parent', 'ancestor', 'theme'],
                default: 'self',
                required: true,
            },
        };
    }
}
export { postcssSugarPluginmountedMixinInterface as interface };

export interface postcssSugarPluginmountedMixinParams {
    state: 'mounted' | 'active' | 'dark' | 'light';
    context: 'self' | 'sibling' | 'parent' | 'ancestor' | 'theme';
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
        context: 'self',
        ...(params ?? {}),
    };

    let selector;

    switch (finalParams.state) {
        case 'mounted':
            if (finalParams.context === 'parent') {
                selector = '*[mounted] > &, *.mounted > &';
            } else if (finalParams.context === 'ancestor') {
                selector = '*[mounted] &, *.mounted &';
            } else if (finalParams.context === 'sibling') {
                selector = '*[mounted] + &, *.mounted + &';
            } else {
                selector = '&[mounted], &.mounted';
            }
            break;
        case 'active':
            if (finalParams.context === 'parent') {
                selector = '*[active] > &. *.active > &';
            } else if (finalParams.context === 'ancestor') {
                selector = '*[active] &. *.active &';
            } else if (finalParams.context === 'sibling') {
                selector = '*[active] + &. *.active + &';
            } else {
                selector = '&[active], &.active';
            }
            break;
        case 'dark':
            selector = `@media (prefers-color-scheme: dark)`;
            break;
        case 'light':
            selector = `@media (prefers-color-scheme: light)`;
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
