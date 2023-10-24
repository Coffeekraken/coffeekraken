import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           removeProps
 * @as              @s.utils.removeProps
 * @namespace      node.mixin.utils
 * @type           PostcssMixin
 * @platform      postcss
 * @interface       ./removeProps
 * @status        beta
 *
 * This mixin allows you to remove some properties from the enclosed css.
 * It can be simply a declaration name like "padding-inline", or a group of declarations that starts/ends
 * with something like to "^padding", "radius$".
 *
 * @param           {String}              props           The properties you want to remove separated by a comma
 * @return        {Css}         The generated css
 *
 * @snippet         @s.utils.removeProps
 * @s.utils.removeProps '$1' {
 *      $2
 * }
 *
 * @example        css
 * @s.utils.removeProps('^padding, left$') {
 *      @s.ui.button.classes;
 *      /* and css you want... * /
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUtilsRemovePropsMixinInterface extends __SInterface {
    static get _definition() {
        return {
            props: {
                type: 'String',
                required: true,
            },
        };
    }
}
export { postcssSugarPluginUtilsRemovePropsMixinInterface as interface };

export interface postcssSugarPluginUtilsRemovePropsMixinParams {
    props: string;
}
export default function ({
    params,
    atRule,
    getRoot,
    settings,
    postcssApi,
}: {
    params: Partial<postcssSugarPluginUtilsRemovePropsMixinParams>;
    atRule: any;
    getRoot: Function;
    settings: any;
    postcssApi: any;
}) {
    const finalParams = <postcssSugarPluginUtilsRemovePropsMixinParams>{
        props: '',
        ...(params ?? {}),
    };

    // all the process is made in the postProcessors/10-utilsRemoveProps.ts file
}
