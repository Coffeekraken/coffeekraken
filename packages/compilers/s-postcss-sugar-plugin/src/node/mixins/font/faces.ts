import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           faces
 * @namespace      node.mixins.font
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the @font-face needed depending on the declared
 * fonts in the config.theme.font.family stack
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.font.faces;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginFontFacesInterface extends __SInterface {
    static definition = {};
}

export interface IPostcssSugarPluginFontFacesParams {}

export { postcssSugarPluginFontFacesInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginFontFacesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginFontFacesParams = {
        ...params,
    };

    const vars: string[] = [];

    const fontsFamiliesObj = __STheme.config('font.family');
    Object.keys(fontsFamiliesObj).forEach((fontName) => {
        const fontObj = fontsFamiliesObj[fontName];

        if (fontObj.import) {
            vars.push(`/**
        * @name               ${fontName}
        * @namespace          sugar.css.font
        * @type               CssFontFace
        * @platform           css
        * @status             beta
        * 
        * This declare the @font-face for the "<yellow>${fontName}</yellow> font family"
        * 
        * @since          2.0.0
        * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
        @import url("${fontObj.import}");
      `);
        }
    });

    replaceWith(vars);
}
