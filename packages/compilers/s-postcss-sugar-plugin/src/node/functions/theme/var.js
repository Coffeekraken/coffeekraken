// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          var
 * @namespace     node.function.theme
 * @type          PostcssFunction
 * @platform      postcss
 * @status        beta
 *
 * This function allows you to get a theme value using dot path like "font.family.default.font-family", etc...
 * Usually the best way to access theme config is to use dedicated functions/mixins like "sugar.margin", "sugar.font.family", etc...
 * This function make the same as using the `sugar.theme` one with the parameter `return`set to "var"
 *
 * @param       {String}        dotPath      The dot path to the theme config value you want back
 * @param       {Boolean}       [scalable=false]        Specify if you want to value back to be scalable. Work only for number config as well
 * @param       {Any}           [fallback=null]         Specify a fallback in case the variable does not resolve to any value
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *    font-family: sugar.theme(font.family.default.font-family);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginThemeInterface extends __SInterface {
    static get _definition() {
        return {
            dotPath: {
                type: 'String',
                required: true,
            },
            scalable: {
                type: 'Boolean',
                default: false,
            },
            fallback: {
                type: 'Boolean',
                default: true,
            },
        };
    }
}
export { postcssSugarPluginThemeInterface as interface };
export default function theme({ params, }) {
    const finalParams = Object.assign({}, params);
    if (finalParams.scalable) {
        return `sugar.scalable(${__STheme.cssVar(finalParams.dotPath, finalParams.fallback)})`;
    }
    else {
        return __STheme.cssVar(finalParams.dotPath, finalParams.fallback);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFFSCxNQUFNLGdDQUFpQyxTQUFRLFlBQVk7SUFDdkQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDRCxPQUFPLEVBQUUsZ0NBQWdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFRekQsTUFBTSxDQUFDLE9BQU8sVUFBVSxLQUFLLENBQUMsRUFDMUIsTUFBTSxHQUdUO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFFO1FBQ3RCLE9BQU8sa0JBQWtCLFFBQVEsQ0FBQyxNQUFNLENBQ3BDLFdBQVcsQ0FBQyxPQUFPLEVBQ25CLFdBQVcsQ0FBQyxRQUFRLENBQ3ZCLEdBQUcsQ0FBQztLQUNSO1NBQU07UUFDSCxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDckU7QUFDTCxDQUFDIn0=