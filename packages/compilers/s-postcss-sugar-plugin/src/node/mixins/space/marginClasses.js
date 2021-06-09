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
        const clsMargin = `s-m:${spaceName}`;
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
   [class*="${clsMargin}"] {
        margin: sugar.space(${spaceName});
   }`);
        const clsMarginTop = `s-mt:${spaceName}`;
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
   [class*="${clsMarginTop}"] {
        margin-top: sugar.space(${spaceName});
   }`);
        const clsMarginBottom = `s-mb:${spaceName}`;
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
   [class*="${clsMarginBottom}"] {
        margin-bottom: sugar.space(${spaceName});
   }`);
        const clsMarginLeft = `s-ml:${spaceName}`;
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
   [class*="${clsMarginLeft}"] {
        margin-left: sugar.space(${spaceName});
   }`);
        const clsMarginRight = `s-mr:${spaceName}`;
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
   [class*="${clsMarginRight}"] {
        margin-right: sugar.space(${spaceName});
   }`);
        const clsMarginX = `s-mx:${spaceName}`;
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
     [class*="${clsMarginX}"] {
        margin-left: sugar.space(${spaceName});
        margin-right: sugar.space(${spaceName});
   }`);
        const clsMarginY = `s-my:${spaceName}`;
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
   [class*="${clsMarginY}"] {
        margin-top: sugar.space(${spaceName});
        margin-bottom: sugar.space(${spaceName});
   }`);
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFyZ2luQ2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcmdpbkNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFHeEMsTUFBTSx3Q0FBeUMsU0FBUSxZQUFZOztBQUMxRCxtREFBVSxHQUFHLEVBQUUsQ0FBQztBQUt6QixPQUFPLEVBQUUsd0NBQXdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFakUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxxQkFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixNQUFNLFNBQVMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFNUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUMzQyxVQUFVO1FBQ1YsTUFBTSxTQUFTLEdBQUcsT0FBTyxTQUFTLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDO3lCQUNXLFNBQVM7Ozs7b0RBSWtCLFNBQVM7OztxQkFHeEMsU0FBUzs7Ozs7Y0FLaEIsU0FBUzs4QkFDTyxTQUFTO0tBQ2xDLENBQUMsQ0FBQztRQUNILE1BQU0sWUFBWSxHQUFHLFFBQVEsU0FBUyxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQzt5QkFDVyxZQUFZOzs7O29EQUllLFNBQVM7OztxQkFHeEMsWUFBWTs7Ozs7Y0FLbkIsWUFBWTtrQ0FDUSxTQUFTO0tBQ3RDLENBQUMsQ0FBQztRQUNILE1BQU0sZUFBZSxHQUFHLFFBQVEsU0FBUyxFQUFFLENBQUM7UUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQzswQkFDWSxlQUFlOzs7O29EQUlXLFNBQVM7OztxQkFHeEMsZUFBZTs7Ozs7Y0FLdEIsZUFBZTtxQ0FDUSxTQUFTO0tBQ3pDLENBQUMsQ0FBQztRQUNILE1BQU0sYUFBYSxHQUFHLFFBQVEsU0FBUyxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzt5QkFDVyxhQUFhOzs7O29EQUljLFNBQVM7OztxQkFHeEMsYUFBYTs7Ozs7Y0FLcEIsYUFBYTttQ0FDUSxTQUFTO0tBQ3ZDLENBQUMsQ0FBQztRQUNILE1BQU0sY0FBYyxHQUFHLFFBQVEsU0FBUyxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQzswQkFDWSxjQUFjOzs7O29EQUlZLFNBQVM7OztxQkFHeEMsY0FBYzs7Ozs7Y0FLckIsY0FBYztvQ0FDUSxTQUFTO0tBQ3hDLENBQUMsQ0FBQztRQUNILE1BQU0sVUFBVSxHQUFHLFFBQVEsU0FBUyxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQzt5QkFDVyxVQUFVOzs7O29EQUlpQixTQUFTOzs7cUJBR3hDLFVBQVU7Ozs7O2dCQUtmLFVBQVU7bUNBQ1MsU0FBUztvQ0FDUixTQUFTO0tBQ3hDLENBQUMsQ0FBQztRQUNILE1BQU0sVUFBVSxHQUFHLFFBQVEsU0FBUyxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQzt5QkFDVyxVQUFVOzs7O29EQUlpQixTQUFTOzs7cUJBR3hDLFVBQVU7Ozs7O2NBS2pCLFVBQVU7a0NBQ1UsU0FBUztxQ0FDTixTQUFTO0tBQ3pDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BCLENBQUMifQ==