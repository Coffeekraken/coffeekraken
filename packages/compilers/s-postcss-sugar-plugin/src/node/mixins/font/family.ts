import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           family
 * @namespace      node.mixin.font
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate the css needed to apply a particular font in your css.
 * The font parameter accept any defined font family from the
 * config.theme.font.family stack
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * .my-cool-element {
 *    \@sugar.font.family(title);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginFontFamilyInterface extends __SInterface {
    static get _definition() {
        return {
            font: {
                type: 'String',
                values: Object.keys(__STheme.get('font.family')),
                required: true,
            },
        };
    }
}

export interface IPostcssSugarPluginFontFamilyParams {
    font: string;
}

export { postcssSugarPluginFontFamilyInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginFontFamilyParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginFontFamilyParams = {
        font: 'default',
        ...params,
    };

    const vars = new CssVars();

    const fontFamilyObj = __STheme.get(`font.family.${finalParams.font}`);

    Object.keys(fontFamilyObj).forEach((prop) => {
        switch (prop) {
            case 'font-family':
            case 'font-weight':
            case 'font-style':
                vars.code(
                    `${prop}: var(${`--s-theme-font-family-${finalParams.font}-${prop}`}, ${
                        fontFamilyObj[prop]
                    });`,
                );
                break;
            default:
                break;
        }
    });

    return vars;
}
