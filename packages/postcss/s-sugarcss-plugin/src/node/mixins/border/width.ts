import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          width
 * @as              @s.border.width
 * @namespace     node.mixin.border
 * @type          PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin allows you to apply a border width with a value coming
 * from the config.theme.border.width stack like 10, 20, etc...
 *
 * @param       {Number}      value     The border width value you want to apply like 10, 20, etc...
 * @return      {Css}                   The generated css
 *
 * @todo      Add multiple values support like @s.border.width(10);
 *
 * @snippet         @s.border.width($1)
 *
 * @example       css
 * .my-element {
 *    @s.border.width(10);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginBorderwidthMixinInterface extends __SInterface {
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

export interface ISSugarcssPluginBorderwidthMixinParams {
    width: string | number;
}

export { SSugarcssPluginBorderwidthMixinInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginBorderwidthMixinParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginBorderwidthMixinParams = {
        width: 0,
        ...params,
    };

    const vars = new CssVars();
    vars.code(`
        border-width: s.border.width(${finalParams.width});
    `);
    return vars;
}
