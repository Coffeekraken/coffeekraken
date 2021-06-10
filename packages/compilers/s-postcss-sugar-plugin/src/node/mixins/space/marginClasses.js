import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
class postcssSugarPluginMarginClassesInterface extends __SInterface {
}
postcssSugarPluginMarginClassesInterface.definition = {};
export { postcssSugarPluginMarginClassesInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    const spacesObj = __theme().config('space');
    Object.keys(spacesObj).forEach((spaceName) => {
        // margins
        const clsMargin = `s-m--${spaceName}`;
        vars.push(`/**
    * @name            ${clsMargin}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" margin style around any HTMLElement
    * 
    * @example      html
    * <span class="${clsMargin}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMargin} {
        margin: sugar.space(${spaceName});
   }`);
        const clsMarginTop = `s-mt--${spaceName}`;
        vars.push(`/**
    * @name            ${clsMarginTop}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" top margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginTop}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMarginTop} {
        margin-top: sugar.space(${spaceName}) !important;
   }`);
        const clsMarginBottom = `s-mb--${spaceName}`;
        vars.push(`/**
    * @name            .${clsMarginBottom}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" bottom margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginBottom}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMarginBottom} {
        margin-bottom: sugar.space(${spaceName}) !important;
   }`);
        const clsMarginLeft = `s-ml--${spaceName}`;
        vars.push(`/**
    * @name            ${clsMarginLeft}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" left margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginLeft}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMarginLeft} {
        margin-left: sugar.space(${spaceName}) !important;
   }`);
        const clsMarginRight = `s-mr--${spaceName}`;
        vars.push(`/**
    * @name            .${clsMarginRight}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" right margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginRight}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMarginRight} {
        margin-right: sugar.space(${spaceName}) !important;
   }`);
        const clsMarginX = `s-mx--${spaceName}`;
        vars.push(`/**
    * @name            ${clsMarginX}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" left and right margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginX}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
     .${clsMarginX} {
        margin-left: sugar.space(${spaceName}) !important;
        margin-right: sugar.space(${spaceName}) !important;
   }`);
        const clsMarginY = `s-my--${spaceName}`;
        vars.push(`/**
    * @name            ${clsMarginY}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" top and bottom margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginY}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMarginY} {
        margin-top: sugar.space(${spaceName}) !important;
        margin-bottom: sugar.space(${spaceName}) !important;
   }`);
    });
    vars.push(`/**
    * @name            s-m--auto
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>auto</yellow>" margin style around any HTMLElement
    * 
    * @example      html
    * <span class="s-m--auto">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .s-m--auto {
        margin: auto;
   }`);
    vars.push(`/**
    * @name            s-mt--auto
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>auto</yellow>" margin style around any HTMLElement
    * 
    * @example      html
    * <span class="s-mt--auto">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .s-mt--auto {
        margin-top: auto;
   }`);
    vars.push(`/**
    * @name            s-mr--auto
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>auto</yellow>" margin style around any HTMLElement
    * 
    * @example      html
    * <span class="s-mr--auto">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .s-mr--auto {
        margin-right: auto;
   }`);
    vars.push(`/**
    * @name            s-mb--auto
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>auto</yellow>" margin style around any HTMLElement
    * 
    * @example      html
    * <span class="s-mb--auto">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .s-mb--auto {
        margin-bottom: auto;
   }`);
    vars.push(`/**
    * @name            s-left--auto
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>auto</yellow>" margin style around any HTMLElement
    * 
    * @example      html
    * <span class="s-left--auto">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .s-left--auto {
        margin-left: auto;
   }`);
    vars.push(`/**
    * @name            s-mx--auto
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>auto</yellow>" margin style around any HTMLElement
    * 
    * @example      html
    * <span class="s-mx--auto">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .s-mx--auto {
        margin-left: auto;
        margin-right: auto;
   }`);
    vars.push(`/**
    * @name            s-my--auto
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>auto</yellow>" margin style around any HTMLElement
    * 
    * @example      html
    * <span class="s-my--auto">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .s-my--auto {
        margin-top: auto;
        margin-bottom: auto;
   }`);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFyZ2luQ2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcmdpbkNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFHeEMsTUFBTSx3Q0FBeUMsU0FBUSxZQUFZOztBQUMxRCxtREFBVSxHQUFHLEVBQUUsQ0FBQztBQUt6QixPQUFPLEVBQUUsd0NBQXdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFakUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxxQkFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixNQUFNLFNBQVMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFNUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUMzQyxVQUFVO1FBQ1YsTUFBTSxTQUFTLEdBQUcsUUFBUSxTQUFTLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDO3lCQUNXLFNBQVM7Ozs7b0RBSWtCLFNBQVM7OztxQkFHeEMsU0FBUzs7Ozs7TUFLeEIsU0FBUzs4QkFDZSxTQUFTO0tBQ2xDLENBQUMsQ0FBQztRQUNILE1BQU0sWUFBWSxHQUFHLFNBQVMsU0FBUyxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzt5QkFDVyxZQUFZOzs7O29EQUllLFNBQVM7OztxQkFHeEMsWUFBWTs7Ozs7TUFLM0IsWUFBWTtrQ0FDZ0IsU0FBUztLQUN0QyxDQUFDLENBQUM7UUFDSCxNQUFNLGVBQWUsR0FBRyxTQUFTLFNBQVMsRUFBRSxDQUFDO1FBQzdDLElBQUksQ0FBQyxJQUFJLENBQUM7MEJBQ1ksZUFBZTs7OztvREFJVyxTQUFTOzs7cUJBR3hDLGVBQWU7Ozs7O01BSzlCLGVBQWU7cUNBQ2dCLFNBQVM7S0FDekMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxhQUFhLEdBQUcsU0FBUyxTQUFTLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDO3lCQUNXLGFBQWE7Ozs7b0RBSWMsU0FBUzs7O3FCQUd4QyxhQUFhOzs7OztNQUs1QixhQUFhO21DQUNnQixTQUFTO0tBQ3ZDLENBQUMsQ0FBQztRQUNILE1BQU0sY0FBYyxHQUFHLFNBQVMsU0FBUyxFQUFFLENBQUM7UUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQzswQkFDWSxjQUFjOzs7O29EQUlZLFNBQVM7OztxQkFHeEMsY0FBYzs7Ozs7TUFLN0IsY0FBYztvQ0FDZ0IsU0FBUztLQUN4QyxDQUFDLENBQUM7UUFDSCxNQUFNLFVBQVUsR0FBRyxTQUFTLFNBQVMsRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUM7eUJBQ1csVUFBVTs7OztvREFJaUIsU0FBUzs7O3FCQUd4QyxVQUFVOzs7OztRQUt2QixVQUFVO21DQUNpQixTQUFTO29DQUNSLFNBQVM7S0FDeEMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxVQUFVLEdBQUcsU0FBUyxTQUFTLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDO3lCQUNXLFVBQVU7Ozs7b0RBSWlCLFNBQVM7OztxQkFHeEMsVUFBVTs7Ozs7TUFLekIsVUFBVTtrQ0FDa0IsU0FBUztxQ0FDTixTQUFTO0tBQ3pDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0tBZVAsQ0FBQyxDQUFDO0lBRUosSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0tBZVIsQ0FBQyxDQUFDO0lBRUosSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0tBZVIsQ0FBQyxDQUFDO0lBRUosSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0tBZVIsQ0FBQyxDQUFDO0lBRUosSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0tBZVIsQ0FBQyxDQUFDO0lBRUosSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztLQWdCUixDQUFDLENBQUM7SUFFSixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0tBZ0JSLENBQUMsQ0FBQztJQUVMLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQixDQUFDIn0=