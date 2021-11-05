import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           size
 * @namespace      node.mixins.font
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate the css needed to apply a font-size depending on the font sizes
 * defines in the config.theme.font.size stack
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * .my-cool-element {
 *    \@sugar.font.size(20);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginFontSizeInterface extends __SInterface {
    static definition = {
        size: {
            type: 'String|Number',
            values: Object.keys(__STheme.config('font.size')),
            required: true,
        },
    };
}

export interface IPostcssSugarPluginFontFamilyParams {
    size: string | number;
}

export { postcssSugarPluginFontSizeInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginFontFamilyParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginFontFamilyParams = {
        size: 50,
        ...params,
    };

    const vars: string[] = [];
    vars.push(`font-size: sugar.font.size(${finalParams.size})`);

    return vars;
}
