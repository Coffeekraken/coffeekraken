import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
class postcssSugarPluginPaddingClassesInterface extends __SInterface {
}
postcssSugarPluginPaddingClassesInterface.definition = {};
export { postcssSugarPluginPaddingClassesInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    const spacesObj = __theme().config('space');
    Object.keys(spacesObj).forEach((spaceName) => {
        // paddings
        const clsPadding = `s-pd--${spaceName}`;
        vars.push(`/**
    * @name            ${clsPadding}
    * @namespace        sugar.css.mixins.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<s-color="accent">${spaceName}</s-color>" padding style around any HTMLElement
    * 
    * @example      html
    * <span class="${clsPadding}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsPadding} {
        padding: sugar.space(${spaceName}) !important;
   }`);
        const clsPaddingTop = `s-pt--${spaceName}`;
        vars.push(`/**
    * @name            ${clsPaddingTop}
    * @namespace        sugar.css.mixins.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<s-color="accent">${spaceName}</s-color>" top padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsPaddingTop}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsPaddingTop} {
        padding-top: sugar.space(${spaceName}) !important;
   }`);
        const clsPaddingBottom = `s-pb--${spaceName}`;
        vars.push(`/**
    * @name            ${clsPaddingBottom}
    * @namespace        sugar.css.mixins.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<s-color="accent">${spaceName}</s-color>" bottom padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsPaddingBottom}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsPaddingBottom} {
        padding-bottom: sugar.space(${spaceName}) !important;
   }`);
        const clsPaddingLeft = `s-pl--${spaceName}`;
        vars.push(`/**
    * @name            .${clsPaddingLeft}
    * @namespace        sugar.css.mixins.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<s-color="accent">${spaceName}</s-color>" left padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsPaddingLeft}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsPaddingLeft} {
        padding-left: sugar.space(${spaceName}) !important;
   }`);
        const clsPaddingRight = `s-pr--${spaceName}`;
        vars.push(`/**
    * @name            ${clsPaddingRight}
    * @namespace        sugar.css.mixins.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<s-color="accent">${spaceName}</s-color>" right padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsPaddingRight}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsPaddingRight} {
        padding-right: sugar.space(${spaceName}) !important;
   }`);
        const clsPaddingX = `s-px--${spaceName}`;
        vars.push(`/**
    * @name            ${clsPaddingX}
    * @namespace        sugar.css.mixins.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<s-color="accent">${spaceName}</s-color>" left and right padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsPaddingX}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsPaddingX} {
        padding-left: sugar.space(${spaceName}) !important;
        padding-right: sugar.space(${spaceName}) !important;
   }`);
        const clsPaddingY = `s-py--${spaceName}`;
        vars.push(`/**
    * @name            ${clsPaddingY}
    * @namespace        sugar.css.mixins.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<s-color="accent">${spaceName}</s-color>" top and bottom padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsPaddingY}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsPaddingY} {
        padding-top: sugar.space(${spaceName}) !important;
        padding-bottom: sugar.space(${spaceName}) !important;
   }`);
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFkZGluZ0NsYXNzZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYWRkaW5nQ2xhc3Nlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLE9BQU8sTUFBTSxtQkFBbUIsQ0FBQztBQUV4QyxNQUFNLHlDQUEwQyxTQUFRLFlBQVk7O0FBQzNELG9EQUFVLEdBQUcsRUFBRSxDQUFDO0FBS3pCLE9BQU8sRUFBRSx5Q0FBeUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVsRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUtaO0lBQ0MsTUFBTSxXQUFXLHFCQUNaLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sU0FBUyxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUU1QyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQzNDLFdBQVc7UUFDWCxNQUFNLFVBQVUsR0FBRyxTQUFTLFNBQVMsRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUM7eUJBQ1csVUFBVTs7Ozs4REFJMkIsU0FBUzs7O3FCQUdsRCxVQUFVOzs7OztNQUt6QixVQUFVOytCQUNlLFNBQVM7S0FDbkMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxhQUFhLEdBQUcsU0FBUyxTQUFTLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDO3lCQUNXLGFBQWE7Ozs7OERBSXdCLFNBQVM7OztxQkFHbEQsYUFBYTs7Ozs7TUFLNUIsYUFBYTttQ0FDZ0IsU0FBUztLQUN2QyxDQUFDLENBQUM7UUFDSCxNQUFNLGdCQUFnQixHQUFHLFNBQVMsU0FBUyxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQzt5QkFDVyxnQkFBZ0I7Ozs7OERBSXFCLFNBQVM7OztxQkFHbEQsZ0JBQWdCOzs7OztNQUsvQixnQkFBZ0I7c0NBQ2dCLFNBQVM7S0FDMUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxjQUFjLEdBQUcsU0FBUyxTQUFTLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDOzBCQUNZLGNBQWM7Ozs7OERBSXNCLFNBQVM7OztxQkFHbEQsY0FBYzs7Ozs7TUFLN0IsY0FBYztvQ0FDZ0IsU0FBUztLQUN4QyxDQUFDLENBQUM7UUFDSCxNQUFNLGVBQWUsR0FBRyxTQUFTLFNBQVMsRUFBRSxDQUFDO1FBQzdDLElBQUksQ0FBQyxJQUFJLENBQUM7eUJBQ1csZUFBZTs7Ozs4REFJc0IsU0FBUzs7O3FCQUdsRCxlQUFlOzs7OztNQUs5QixlQUFlO3FDQUNnQixTQUFTO0tBQ3pDLENBQUMsQ0FBQztRQUNILE1BQU0sV0FBVyxHQUFHLFNBQVMsU0FBUyxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQzt5QkFDVyxXQUFXOzs7OzhEQUkwQixTQUFTOzs7cUJBR2xELFdBQVc7Ozs7O01BSzFCLFdBQVc7b0NBQ21CLFNBQVM7cUNBQ1IsU0FBUztLQUN6QyxDQUFDLENBQUM7UUFDSCxNQUFNLFdBQVcsR0FBRyxTQUFTLFNBQVMsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUM7eUJBQ1csV0FBVzs7Ozs4REFJMEIsU0FBUzs7O3FCQUdsRCxXQUFXOzs7OztNQUsxQixXQUFXO21DQUNrQixTQUFTO3NDQUNOLFNBQVM7S0FDMUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyJ9