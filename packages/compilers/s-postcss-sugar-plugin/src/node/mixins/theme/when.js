import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
class postcssSugarPluginThemeWhenMixinInterface extends __SInterface {
}
postcssSugarPluginThemeWhenMixinInterface.definition = {
    variant: {
        type: 'String',
        required: true,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndoZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsT0FBTyxjQUFjLE1BQU0sOEJBQThCLENBQUM7QUFFMUQsTUFBTSx5Q0FBMEMsU0FBUSxZQUFZOztBQUN6RCxvREFBVSxHQUFHO0lBQ2hCLE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsY0FBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7S0FDL0M7SUFDRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztLQUM3QztDQUNKLENBQUM7QUFFTixPQUFPLEVBQUUseUNBQXlDLElBQUksU0FBUyxFQUFFLENBQUM7QUFPbEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sVUFBVSxHQUtiO0lBQ0csTUFBTSxXQUFXLEdBQUcsa0JBQ2IsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUNGLE1BQU0sU0FBUyxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQztRQUNsQyxTQUFTLEVBQUU7WUFDUCxhQUFhLFdBQVcsQ0FBQyxLQUFLLElBQUksV0FBVyxDQUFDLE9BQU8sSUFBSTtZQUN6RCxjQUFjLFdBQVcsQ0FBQyxLQUFLLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRTtTQUMzRDtLQUNKLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDdkIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbEMsQ0FBQyJ9