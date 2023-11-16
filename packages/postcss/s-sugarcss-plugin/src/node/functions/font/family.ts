import __SInterface from '@coffeekraken/s-interface';
import { __isValidCssUnitValue } from '@coffeekraken/sugar/css';

/**
 * @name          family
 * @as              s.font.family
 * @namespace     node.function.font
 * @type          PostcssFunction
 * @platform      postcss
 * @interface      ./family
 * @status        stable
 *
 * This function allows you to get a font family value depending on your theme config
 *
 * @param       {String}        name      The font name to get
 * @return      {Css}                   The corresponding css
 *
 * @snippet         s.font.family($1)
 *
 * @example       css
 * .my-element {
 *      font-family: s.font.family(code);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginFontFamilyInterface extends __SInterface {
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
export { SSugarcssPluginFontFamilyInterface as interface };

export interface ISSugarcssPluginFontFamilyParams {
    name: string;
}

export default function ({
    params,
}: {
    params: Partial<ISSugarcssPluginFontFamilyParams>;
}) {
    const finalParams: ISSugarcssPluginFontFamilyParams = {
        name: '',
        ...params,
    };

    const name = finalParams.name;

    if (__isValidCssUnitValue(name)) {
        return name;
    }

    return `s.theme(fontFamily.${name}.fontFamily)`;
}
