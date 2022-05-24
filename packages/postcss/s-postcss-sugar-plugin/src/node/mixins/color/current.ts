import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginColorCurrentMixinInterface extends __SInterface {
    static get _definition() {
        return {
            color: {
                type: 'String',
                required: true,
            },
        };
    }
}
export { postcssSugarPluginColorCurrentMixinInterface as interface };

/**
 * @name           current
 * @namespace      node.mixin.color
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to (re)map the "current" color to another one you want like "accent", "success", etc...
 *
 * @param       {String}        color           The color you want to map on another one
 * @return      {Css}                     The generated remap css
 *
 * @example        css
 * .my-section {
 *      @sugar.color.current(accent);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IPostcssSugarPluginColorCurrentParams {
    color: string;
}

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginColorCurrentParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginColorCurrentParams = {
        color: '',
        ...params,
    };

    const vars = new CssVars(`
        @sugar.color.remap(current, ${finalParams.color});
    `);

    return vars;
}
