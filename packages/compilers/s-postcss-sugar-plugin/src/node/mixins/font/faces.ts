import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';

class postcssSugarPluginFontFacesInterface extends __SInterface {
  static definition = {};
}

export interface IPostcssSugarPluginFontFacesParams {}

export { postcssSugarPluginFontFacesInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginFontFacesParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginFontFacesParams = {
    ...params
  };

  const vars: string[] = [];

  const fontsFamiliesObj = __theme().config('font.family');
  Object.keys(fontsFamiliesObj).forEach((fontName) => {
    const fontObj = fontsFamiliesObj[fontName];
    
    if (fontObj.import) {
      vars.push(`/**
        * @name               ${fontName}
        * @namespace          sugar.css.font
        * @type               CssFontFace
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
