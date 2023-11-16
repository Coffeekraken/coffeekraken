import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          radius
 * @as              @s.border.radius
 * @namespace     node.mixin.border
 * @type          PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin allows you to apply a border radius with a value coming
 * from the config.theme.border.radius stack like 10, 20, etc...
 *
 * @param       {Number}      value     The border radius value you want to apply like 10, 20, etc...
 * @return      {Css}                   The generated css
 *
 * @todo      Add multiple values support like @s.border.radius(10 20);
 *
 * @snippet         @s.border.radius($1)
 *
 * @example       css
 * .my-element {
 *    @s.border.radius(10);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginBorderRadiusMixinInterface extends __SInterface {
    static get _definition() {
        return {
            radius: {
                type: 'Number|String',
                required: true,
                default: __STheme.current.get('borderRadius.default'),
            },
        };
    }
}

export interface ISSugarcssPluginBorderRadiusMixinParams {
    radius: string | number;
}

export { SSugarcssPluginBorderRadiusMixinInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginBorderRadiusMixinParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginBorderRadiusMixinParams = {
        radius: 0,
        ...params,
    };

    const vars = new CssVars();
    vars.code(`border-radius: s.border.radius(${finalParams.radius});`);
    return vars;
}
