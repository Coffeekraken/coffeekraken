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
}
postcssSugarPluginFontFacesInterface.definition = {};
export { postcssSugarPluginFontFacesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
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
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmYWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFNLG9DQUFxQyxTQUFRLFlBQVk7O0FBQ3BELCtDQUFVLEdBQUcsRUFBRSxDQUFDO0FBSzNCLE9BQU8sRUFBRSxvQ0FBb0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUU3RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN4RCxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDL0MsTUFBTSxPQUFPLEdBQUcsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFM0MsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUM7Z0NBQ1UsUUFBUTs7Ozs7O3lEQU1pQixRQUFROzs7Ozt1QkFLMUMsT0FBTyxDQUFDLE1BQU07T0FDOUIsQ0FBQyxDQUFDO1NBQ0E7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==