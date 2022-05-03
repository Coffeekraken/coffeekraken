import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          width
 * @namespace     node.mixins.border
 * @type          PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to apply a border width with a value coming
 * from the config.theme.border.width stack like 10, 20, etc...
 *
 * @param       {Number}      value     The border width value you want to apply like 10, 20, etc...
 * @return      {Css}                   The generated css
 *
 * @todo      Add multiple values support like @sugar.border.width(10);
 *
 * @example       css
 * .my-element {
 *    @sugar.border.width(10);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginBorderwidthMixinInterface extends __SInterface {
    static get _definition() {
        return {
            width: {
                type: 'Number|String',
                required: true,
                default: __STheme.get('border.width.default'),
            },
        };
    }
}

export interface IPostcssSugarPluginBorderwidthMixinParams {
    width: string | number;
}

export { postcssSugarPluginBorderwidthMixinInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginBorderwidthMixinParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginBorderwidthMixinParams = {
        width: 0,
        ...params,
    };

    const vars = new CssVars(
        `border-width: sugar.border.width(${finalParams.width});`,
    );
    return vars;
}
