import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           faces
 * @as              @s.font.faces
 * @namespace      node.mixin.font
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the @font-face needed depending on the declared
 * fonts in the config.theme.font.family stack
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.font.faces
 *
 * @example        css
 * @s.font.faces;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginFontFacesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface ISSugarcssPluginFontFacesParams {}

export { SSugarcssPluginFontFacesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginFontFacesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginFontFacesParams = {
        ...params,
    };

    const vars = new CssVars();

    const fontsFamiliesObj = __STheme.get('font.family');

    Object.keys(fontsFamiliesObj).forEach((fontName) => {
        const fontObj = fontsFamiliesObj[fontName];

        if (fontObj.import) {
            vars.comment(
                () => `/**
        * @name               ${fontName}
        * @namespace          sugar.style.font
        * @type               CssFontFace
        * @platform           css
        * @status             beta
        * 
        * This declare the @font-face for the "<yellow>${fontName}</yellow> font family"
        * 
        * @since          2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
            ).code(
                `
        @import url("${fontObj.import}");
      `,
                { type: 'CssClass' },
            );
        }
    });

    return vars;
}
