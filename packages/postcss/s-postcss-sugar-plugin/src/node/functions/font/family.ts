import __SInterface from '@coffeekraken/s-interface';
import { __isValidCssUnitValue } from '@coffeekraken/sugar/css';

/**
 * @name          family
 * @namespace     node.function.font
 * @type          PostcssFunction
 * @platform      postcss
 * @interface      ./family
 * @status        beta
 *
 * This function allows you to get a font family value depending on your theme config
 *
 * @param       {String}        name      The font name to get
 * @return      {Css}                   The corresponding css
 *
 * @snippet         sugar.font.family($1)
 * 
 * @example       css
 * .my-element {
 *      font-family: sugar.font.family(code);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginFontFamilyInterface extends __SInterface {
    static get _definition() {
        return {
            name: {
                type: 'String',
                required: true,
                alias: 'n',
            },
        };
    }
}
export { postcssSugarPluginFontFamilyInterface as interface };

export interface IPostcssSugarPluginFontFamilyParams {
    name: string;
}

export default function ({
    params,
}: {
    params: Partial<IPostcssSugarPluginFontFamilyParams>;
}) {
    const finalParams: IPostcssSugarPluginFontFamilyParams = {
        name: '',
        ...params,
    };

    const name = finalParams.name;

    if (__isValidCssUnitValue(name)) {
        return name;
    }

    return `sugar.theme(font.family.${name}.fontFamily)`;
}
