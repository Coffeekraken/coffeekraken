import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
class postcssSugarPluginPaddingClassesInterface extends __SInterface {
}
postcssSugarPluginPaddingClassesInterface.definition = {};
export { postcssSugarPluginPaddingClassesInterface as interface };
export default function ({ params, atRule, processNested }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    const spacesObj = __theme().config('space');
    Object.keys(spacesObj).forEach((spaceName) => {
        // paddings
        const clsPadding = `s-padding-${spaceName}`;
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
        padding: sugar.space(${spaceName});
   }`);
        const clsPaddingTop = `s-padding-top-${spaceName}`;
        vars.push(`/**
    * @name            .${clsPaddingTop}
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
        padding-top: sugar.space(${spaceName});
   }`);
        const clsPaddingBottom = `s-padding-bottom-${spaceName}`;
        vars.push(`/**
    * @name            .${clsPaddingBottom}
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
        padding-bottom: sugar.space(${spaceName});
   }`);
        const clsPaddingLeft = `s-padding-left-${spaceName}`;
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
        padding-left: sugar.space(${spaceName});
   }`);
        const clsPaddingRight = `s-padding-right-${spaceName}`;
        vars.push(`/**
    * @name            .${clsPaddingRight}
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
        padding-right: sugar.space(${spaceName});
   }`);
        const clsPaddingX = `s-padding-x-${spaceName}`;
        vars.push(`/**
    * @name            .${clsPaddingX}
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
        padding-left: sugar.space(${spaceName});
        padding-right: sugar.space(${spaceName});
   }`);
        const clsPaddingY = `s-padding-y-${spaceName}`;
        vars.push(`/**
    * @name            .${clsPaddingY}
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
        padding-top: sugar.space(${spaceName});
        padding-bottom: sugar.space(${spaceName});
   }`);
    });
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFkZGluZ0NsYXNzZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYWRkaW5nQ2xhc3Nlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLE9BQU8sTUFBTSxtQkFBbUIsQ0FBQztBQUV4QyxNQUFNLHlDQUEwQyxTQUFRLFlBQVk7O0FBQzNELG9EQUFVLEdBQUcsRUFBRSxDQUFDO0FBS3pCLE9BQU8sRUFBRSx5Q0FBeUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVsRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sYUFBYSxFQUtkO0lBQ0MsTUFBTSxXQUFXLHFCQUNaLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sU0FBUyxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUU1QyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQzNDLFdBQVc7UUFDWCxNQUFNLFVBQVUsR0FBRyxhQUFhLFNBQVMsRUFBRSxDQUFDO1FBQzVDLElBQUksQ0FBQyxJQUFJLENBQUM7eUJBQ1csVUFBVTs7Ozs4REFJMkIsU0FBUzs7O3FCQUdsRCxVQUFVOzs7OztNQUt6QixVQUFVOytCQUNlLFNBQVM7S0FDbkMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxhQUFhLEdBQUcsaUJBQWlCLFNBQVMsRUFBRSxDQUFDO1FBQ25ELElBQUksQ0FBQyxJQUFJLENBQUM7MEJBQ1ksYUFBYTs7Ozs4REFJdUIsU0FBUzs7O3FCQUdsRCxhQUFhOzs7OztNQUs1QixhQUFhO21DQUNnQixTQUFTO0tBQ3ZDLENBQUMsQ0FBQztRQUNILE1BQU0sZ0JBQWdCLEdBQUcsb0JBQW9CLFNBQVMsRUFBRSxDQUFDO1FBQ3pELElBQUksQ0FBQyxJQUFJLENBQUM7MEJBQ1ksZ0JBQWdCOzs7OzhEQUlvQixTQUFTOzs7cUJBR2xELGdCQUFnQjs7Ozs7TUFLL0IsZ0JBQWdCO3NDQUNnQixTQUFTO0tBQzFDLENBQUMsQ0FBQztRQUNILE1BQU0sY0FBYyxHQUFHLGtCQUFrQixTQUFTLEVBQUUsQ0FBQztRQUNyRCxJQUFJLENBQUMsSUFBSSxDQUFDOzBCQUNZLGNBQWM7Ozs7OERBSXNCLFNBQVM7OztxQkFHbEQsY0FBYzs7Ozs7TUFLN0IsY0FBYztvQ0FDZ0IsU0FBUztLQUN4QyxDQUFDLENBQUM7UUFDSCxNQUFNLGVBQWUsR0FBRyxtQkFBbUIsU0FBUyxFQUFFLENBQUM7UUFDdkQsSUFBSSxDQUFDLElBQUksQ0FBQzswQkFDWSxlQUFlOzs7OzhEQUlxQixTQUFTOzs7cUJBR2xELGVBQWU7Ozs7O01BSzlCLGVBQWU7cUNBQ2dCLFNBQVM7S0FDekMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxXQUFXLEdBQUcsZUFBZSxTQUFTLEVBQUUsQ0FBQztRQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDOzBCQUNZLFdBQVc7Ozs7OERBSXlCLFNBQVM7OztxQkFHbEQsV0FBVzs7Ozs7TUFLMUIsV0FBVztvQ0FDbUIsU0FBUztxQ0FDUixTQUFTO0tBQ3pDLENBQUMsQ0FBQztRQUNILE1BQU0sV0FBVyxHQUFHLGVBQWUsU0FBUyxFQUFFLENBQUM7UUFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQzswQkFDWSxXQUFXOzs7OzhEQUl5QixTQUFTOzs7cUJBR2xELFdBQVc7Ozs7O01BSzFCLFdBQVc7bUNBQ2tCLFNBQVM7c0NBQ04sU0FBUztLQUMxQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDIn0=