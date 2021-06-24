import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginWidthClassesMixinInterface extends __SInterface {
}
postcssSugarPluginWidthClassesMixinInterface.definition = {};
export { postcssSugarPluginWidthClassesMixinInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    vars.push(`/**
    * @name            s-width:viewport
    * @namespace        sugar.css.width
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>viewport</yellow>" width to any HTMLElement
    * 
    * @example      html
    * <div class="s-container">
    *   <h1 class="s-typo:h1">Hello world</h1>
    *   <div class="s-width:viewport">
    *       <p class="s-typo:p">Something cool</p>
    *   </div>
    * </div>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .s-width--viewport {
        position: relative;
        left: 50%;
        width: 100vw;
        transform: translate(-50%);
   }`);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFJckQsTUFBTSw0Q0FBNkMsU0FBUSxZQUFZOztBQUM5RCx1REFBVSxHQUFHLEVBQUUsQ0FBQztBQUt6QixPQUFPLEVBQUUsNENBQTRDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFckUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxxQkFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXVCUCxDQUFDLENBQUM7SUFFTCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyJ9