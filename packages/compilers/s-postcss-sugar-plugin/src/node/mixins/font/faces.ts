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
  processNested
}: {
  params: Partial<IPostcssSugarPluginFontFacesParams>;
  atRule: any;
  processNested: Function;
}) {
  const finalParams: IPostcssSugarPluginFontFacesParams = {
    ...params
  };

  const vars: string[] = [];

  const fontsFamiliesObj = __theme().config('font.family');
  Object.keys(fontsFamiliesObj).forEach((fontName) => {
    const fontObj = fontsFamiliesObj[fontName];
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
 ${
   fontObj.import
     ? `@import url("${fontObj.import}");`
     : `
 @font-face {
    ${Object.keys(fontObj)
      .map((prop) => {
        return `${prop}: ${fontObj[prop]};`;
      })
      .join('\n')}
 }
 `
 }
`);
  });

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
