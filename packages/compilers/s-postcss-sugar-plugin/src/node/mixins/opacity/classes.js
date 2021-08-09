import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
/**
 * @name           classes
 * @namespace      node.mixins.margin
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the margin helper classes like s-m:10, s-mr:40, etc...
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
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    const opacityObj = __theme().config('opacity');
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
    * <span class="${opacityCls.replace(':', '\:')}">Something cool</span>
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFFeEM7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFFSCxNQUFNLHlDQUEwQyxTQUFRLFlBQVk7O0FBQzNELG9EQUFVLEdBQUcsRUFBRSxDQUFDO0FBS3pCLE9BQU8sRUFBRSx5Q0FBeUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVsRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUtaO0lBQ0MsTUFBTSxXQUFXLHFCQUNaLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sVUFBVSxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUUvQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBRTFDLE1BQU0sVUFBVSxHQUFHLGFBQWEsT0FBTyxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzt5QkFDVyxVQUFVOzs7Ozs7b0RBTWlCLE9BQU87OztxQkFHdEMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUMsSUFBSSxDQUFDOzs7OztNQUszQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQyxJQUFJLENBQUM7aUNBQ0QsT0FBTztLQUNuQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQixDQUFDIn0=