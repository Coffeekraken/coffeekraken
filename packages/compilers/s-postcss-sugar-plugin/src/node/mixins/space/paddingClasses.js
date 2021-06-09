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
        const clsPadding = `s-pd:${spaceName}`;
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
   [class*="${clsPadding}"] {
        padding: sugar.space(${spaceName});
   }`);
        const clsPaddingTop = `s-pt:${spaceName}`;
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
   [class*="${clsPaddingTop}"] {
        padding-top: sugar.space(${spaceName});
   }`);
        const clsPaddingBottom = `s-pb:${spaceName}`;
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
   [class*="${clsPaddingBottom}"] {
        padding-bottom: sugar.space(${spaceName});
   }`);
        const clsPaddingLeft = `s-pl:${spaceName}`;
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
   [class*="${clsPaddingLeft}"] {
        padding-left: sugar.space(${spaceName});
   }`);
        const clsPaddingRight = `s-pr:${spaceName}`;
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
   [class*="${clsPaddingRight}"] {
        padding-right: sugar.space(${spaceName});
   }`);
        const clsPaddingX = `s-px:${spaceName}`;
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
   [class*="${clsPaddingX}"] {
        padding-left: sugar.space(${spaceName});
        padding-right: sugar.space(${spaceName});
   }`);
        const clsPaddingY = `s-py:${spaceName}`;
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
   [class*="${clsPaddingY}"] {
        padding-top: sugar.space(${spaceName});
        padding-bottom: sugar.space(${spaceName});
   }`);
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFkZGluZ0NsYXNzZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYWRkaW5nQ2xhc3Nlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLE9BQU8sTUFBTSxtQkFBbUIsQ0FBQztBQUV4QyxNQUFNLHlDQUEwQyxTQUFRLFlBQVk7O0FBQzNELG9EQUFVLEdBQUcsRUFBRSxDQUFDO0FBS3pCLE9BQU8sRUFBRSx5Q0FBeUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVsRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUtaO0lBQ0MsTUFBTSxXQUFXLHFCQUNaLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sU0FBUyxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUU1QyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQzNDLFdBQVc7UUFDWCxNQUFNLFVBQVUsR0FBRyxRQUFRLFNBQVMsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUM7eUJBQ1csVUFBVTs7Ozs4REFJMkIsU0FBUzs7O3FCQUdsRCxVQUFVOzs7OztjQUtqQixVQUFVOytCQUNPLFNBQVM7S0FDbkMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxhQUFhLEdBQUcsUUFBUSxTQUFTLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDO3lCQUNXLGFBQWE7Ozs7OERBSXdCLFNBQVM7OztxQkFHbEQsYUFBYTs7Ozs7Y0FLcEIsYUFBYTttQ0FDUSxTQUFTO0tBQ3ZDLENBQUMsQ0FBQztRQUNILE1BQU0sZ0JBQWdCLEdBQUcsUUFBUSxTQUFTLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDO3lCQUNXLGdCQUFnQjs7Ozs4REFJcUIsU0FBUzs7O3FCQUdsRCxnQkFBZ0I7Ozs7O2NBS3ZCLGdCQUFnQjtzQ0FDUSxTQUFTO0tBQzFDLENBQUMsQ0FBQztRQUNILE1BQU0sY0FBYyxHQUFHLFFBQVEsU0FBUyxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQzswQkFDWSxjQUFjOzs7OzhEQUlzQixTQUFTOzs7cUJBR2xELGNBQWM7Ozs7O2NBS3JCLGNBQWM7b0NBQ1EsU0FBUztLQUN4QyxDQUFDLENBQUM7UUFDSCxNQUFNLGVBQWUsR0FBRyxRQUFRLFNBQVMsRUFBRSxDQUFDO1FBQzVDLElBQUksQ0FBQyxJQUFJLENBQUM7eUJBQ1csZUFBZTs7Ozs4REFJc0IsU0FBUzs7O3FCQUdsRCxlQUFlOzs7OztjQUt0QixlQUFlO3FDQUNRLFNBQVM7S0FDekMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxXQUFXLEdBQUcsUUFBUSxTQUFTLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDO3lCQUNXLFdBQVc7Ozs7OERBSTBCLFNBQVM7OztxQkFHbEQsV0FBVzs7Ozs7Y0FLbEIsV0FBVztvQ0FDVyxTQUFTO3FDQUNSLFNBQVM7S0FDekMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxXQUFXLEdBQUcsUUFBUSxTQUFTLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDO3lCQUNXLFdBQVc7Ozs7OERBSTBCLFNBQVM7OztxQkFHbEQsV0FBVzs7Ozs7Y0FLbEIsV0FBVzttQ0FDVSxTQUFTO3NDQUNOLFNBQVM7S0FDMUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyJ9