import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
class postcssSugarPluginThemeWhenMixinInterface extends __SInterface {
}
postcssSugarPluginThemeWhenMixinInterface.definition = {
    variant: {
        type: 'String',
        default: __SSugarConfig.get('theme.variant'),
    },
    theme: {
        type: 'String',
        default: __SSugarConfig.get('theme.theme'),
    },
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
export default function ({ params, atRule, postcssApi, }) {
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    // console.log(finalParams);
    const container = new postcssApi.Rule({
        selectors: [
            `.s-theme--${finalParams.theme}-${finalParams.variant} &`,
            `&.s-theme--${finalParams.theme}-${finalParams.variant}`,
        ],
    });
    atRule.nodes.forEach((n) => {
        container.append(n.clone());
    });
    atRule.replaceWith(container);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndoZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFFMUQsTUFBTSx5Q0FBMEMsU0FBUSxZQUFZOztBQUN6RCxvREFBVSxHQUFHO0lBQ2hCLE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO0tBQy9DO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7S0FDN0M7Q0FDSixDQUFDO0FBRU4sT0FBTyxFQUFFLHlDQUF5QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBT2xFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsR0FLYjtJQUNHLE1BQU0sV0FBVyxHQUFHLGtCQUNiLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ3BCLENBQUM7SUFFRiw0QkFBNEI7SUFFNUIsTUFBTSxTQUFTLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQ2xDLFNBQVMsRUFBRTtZQUNQLGFBQWEsV0FBVyxDQUFDLEtBQUssSUFBSSxXQUFXLENBQUMsT0FBTyxJQUFJO1lBQ3pELGNBQWMsV0FBVyxDQUFDLEtBQUssSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFO1NBQzNEO0tBQ0osQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUN2QixTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNsQyxDQUFDIn0=