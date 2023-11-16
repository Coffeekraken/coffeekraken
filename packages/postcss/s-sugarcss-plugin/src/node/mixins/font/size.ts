import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           size
 * @as          @s.font.size
 * @namespace      node.mixin.font
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate the css needed to apply a font-size depending on the font sizes
 * defines in the config.theme.font.size stack
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.font.size($1)
 *
 * @example        css
 * .my-cool-element {
 *    @s.font.size(20);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginFontSizeInterface extends __SInterface {
    static get _definition() {
        return {
            size: {
                type: 'String|Number',
                values: Object.keys(__STheme.current.get('fontSize')),
                required: true,
            },
        };
    }
}

export interface ISSugarcssPluginFontFamilyParams {
    size: string | number;
}

export { SSugarcssPluginFontSizeInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginFontFamilyParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginFontFamilyParams = {
        size: 50,
        ...params,
    };

    const vars: string[] = [];
    vars.push(`font-size: s.font.size(${finalParams.size})`);

    return vars;
}
