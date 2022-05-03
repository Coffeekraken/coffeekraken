import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          radius
 * @namespace     node.mixins.border
 * @type          PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to apply a border radius with a value coming
 * from the config.theme.border.radius stack like 10, 20, etc...
 *
 * @param       {Number}      value     The border radius value you want to apply like 10, 20, etc...
 * @return      {Css}                   The generated css
 *
 * @todo      Add multiple values support like @sugar.border.radius(10 20);
 *
 * @example       css
 * .my-element {
 *    @sugar.border.radius(10);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginBorderRadiusMixinInterface extends __SInterface {
    static get _definition() {
        return {
            radius: {
                type: 'Number|String',
                required: true,
                default: __STheme.get('border.radius.default'),
            },
        };
    }
}

export interface IPostcssSugarPluginBorderRadiusMixinParams {
    radius: string | number;
}

export { postcssSugarPluginBorderRadiusMixinInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginBorderRadiusMixinParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginBorderRadiusMixinParams = {
        radius: 0,
        ...params,
    };

    const vars = new CssVars(`
        border-radius: sugar.border.radius(${finalParams.radius});
    `);
    return vars;
}
