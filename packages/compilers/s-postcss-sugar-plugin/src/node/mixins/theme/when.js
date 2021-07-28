import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginThemeWhenMixinInterface extends __SInterface {
}
postcssSugarPluginThemeWhenMixinInterface.definition = {
    theme: {
        type: 'String',
        required: true
    }
};
export { postcssSugarPluginThemeWhenMixinInterface as interface };
/**
 * @name           when
 * @namespace      mixins.rhythm
 * @type           Mixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to scope some css for a particular theme.
 * This will mainly scope your css under a class named ```.s-theme:{name}``` but it's
 * nice to use this mixin to make this easier and more modulable
 *
 * @return      {Css}         The generated css
 *
 * @example         postcss
 * .my-cool-element {
 *    \@sugar.theme.when(dark) {
 *      margin-bottom: 50px;
 *    }
 * }
 *
 * @example       html
 * <h1 class="my-cool-element">Hello world</h1>
 * <div class="s-theme\:dark">
 *     <h1 class="my-cool-element">Hello world</h1>
 * </div>
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, postcssApi }) {
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    const container = new postcssApi.Rule({
        selectors: [`.s-theme--${finalParams.theme} &`, `&.s-theme--${finalParams.theme}`]
    });
    atRule.nodes.forEach(n => {
        container.append(n.clone());
    });
    atRule.replaceWith(container);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndoZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFHckQsTUFBTSx5Q0FBMEMsU0FBUSxZQUFZOztBQUMzRCxvREFBVSxHQUFHO0lBQ2hCLEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDakI7Q0FDSixDQUFDO0FBRUosT0FBTyxFQUFFLHlDQUF5QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBTWxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsRUFLWDtJQUNDLE1BQU0sV0FBVyxHQUFHLGtCQUNmLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ2xCLENBQUM7SUFDRixNQUFNLFNBQVMsR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDcEMsU0FBUyxFQUFFLENBQUMsYUFBYSxXQUFXLENBQUMsS0FBSyxJQUFJLEVBQUUsY0FBYyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDbkYsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDdkIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUM5QixDQUFDLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDaEMsQ0FBQyJ9