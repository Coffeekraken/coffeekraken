import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           classes
 * @namespace      node.mixins.opacity
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the margin helper classes like s-opacity:10, s-opacity:40, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.margin.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginOpacityClassesInterface extends __SInterface {
}
postcssSugarPluginOpacityClassesInterface.definition = {};
export { postcssSugarPluginOpacityClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    const opacityObj = __STheme.config('opacity');
    Object.keys(opacityObj).forEach((opacity) => {
        const opacityCls = `s-opacity:${opacity}`;
        vars.push(`/**
    * @name            ${opacityCls}
    * @namespace        sugar.css.opacity
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${opacity}</yellow>" opacity style around any HTMLElement
    * 
    * @example      html
    * <span class="${opacityCls}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${opacityCls.replace(':', '--')} {
        opacity: sugar.opacity(${opacity});
   }`);
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFFSCxNQUFNLHlDQUEwQyxTQUFRLFlBQVk7O0FBQ3pELG9EQUFVLEdBQUcsRUFBRSxDQUFDO0FBSzNCLE9BQU8sRUFBRSx5Q0FBeUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVsRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFOUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUN4QyxNQUFNLFVBQVUsR0FBRyxhQUFhLE9BQU8sRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7eUJBQ08sVUFBVTs7Ozs7O29EQU1pQixPQUFPOzs7cUJBR3RDLFVBQVU7Ozs7O01BS3pCLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQztpQ0FDRixPQUFPO0tBQ25DLENBQUMsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUMifQ==