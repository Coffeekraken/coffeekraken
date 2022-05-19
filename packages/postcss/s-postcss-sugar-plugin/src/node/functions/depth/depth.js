// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          depth
 * @namespace     node.function.depth
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./depth
 * @status        beta
 *
 * This function allows you to get a depth (box-shadow) value depending on your theme config
 *
 * @param       {String}        depth      The depth to get
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *    box-shadow: sugar.depth(20);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginDepthFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            depth: {
                type: 'Number|String',
                required: true,
            },
        };
    }
}
export { postcssSugarPluginDepthFunctionInterface as interface };
export default function depth({ params, }) {
    const finalParams = Object.assign({}, params);
    // let intDepth = parseInt(finalParams.depth);
    // if (typeof finalParams.depth !== 'number' && finalParams.depth !== 'default') {
    //     return finalParams.depth;
    // } else {
    return __STheme.cssVar(`depth.${finalParams.depth}`, false);
    // }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxNQUFNLHdDQUF5QyxTQUFRLFlBQVk7SUFDL0QsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsZUFBZTtnQkFDckIsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsT0FBTyxFQUFFLHdDQUF3QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBTWpFLE1BQU0sQ0FBQyxPQUFPLFVBQVUsS0FBSyxDQUFDLEVBQzFCLE1BQU0sR0FHVDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLDhDQUE4QztJQUM5QyxrRkFBa0Y7SUFDbEYsZ0NBQWdDO0lBQ2hDLFdBQVc7SUFDWCxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxXQUFXLENBQUMsS0FBSyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDNUQsSUFBSTtBQUNSLENBQUMifQ==