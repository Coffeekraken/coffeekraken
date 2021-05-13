import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
class postcssSugarPluginFontFacesInterface extends __SInterface {
}
postcssSugarPluginFontFacesInterface.definition = {};
export { postcssSugarPluginFontFacesInterface as interface };
export default function ({ params, atRule, processNested }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
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
 ${fontObj.import
            ? `@import url("${fontObj.import}");`
            : `
 @font-face {
    ${Object.keys(fontObj)
                .map((prop) => {
                return `${prop}: ${fontObj[prop]};`;
            })
                .join('\n')}
 }
 `}
`);
    });
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmYWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLE9BQU8sTUFBTSxtQkFBbUIsQ0FBQztBQUV4QyxNQUFNLG9DQUFxQyxTQUFRLFlBQVk7O0FBQ3RELCtDQUFVLEdBQUcsRUFBRSxDQUFDO0FBS3pCLE9BQU8sRUFBRSxvQ0FBb0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUU3RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sYUFBYSxFQUtkO0lBQ0MsTUFBTSxXQUFXLHFCQUNaLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sZ0JBQWdCLEdBQUcsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3pELE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUNqRCxNQUFNLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDOzBCQUNZLFFBQVE7Ozs7bURBSWlCLFFBQVE7Ozs7O0dBTXhELE9BQU8sQ0FBQyxNQUFNO1lBQ1osQ0FBQyxDQUFDLGdCQUFnQixPQUFPLENBQUMsTUFBTSxLQUFLO1lBQ3JDLENBQUMsQ0FBQzs7TUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztpQkFDbkIsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ1osT0FBTyxHQUFHLElBQUksS0FBSyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUN0QyxDQUFDLENBQUM7aUJBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7RUFHaEI7Q0FDQSxDQUFDLENBQUM7SUFDRCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDIn0=