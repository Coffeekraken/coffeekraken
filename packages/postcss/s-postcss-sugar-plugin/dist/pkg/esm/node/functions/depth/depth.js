// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          depth
 * @as            sugar.depth
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
 * @snippet         sugar.depth($1)
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
    // try to get the padding with the pased
    const val = __STheme.getSafe(`depth.${finalParams.depth}`);
    if (val !== undefined) {
        finalParams.depth = val;
    }
    // 0 - 20 - 100 - ...
    if (`${finalParams.depth}`.match(/^[0-9]+$/)) {
        return __STheme.cssVar(`depth.${finalParams.depth}`);
    }
    // dotPath
    if (typeof finalParams.depth === 'string' &&
        finalParams.depth.match(/^[a-zA-Z0-9\.]+$/)) {
        return __STheme.cssVar(`depth.${__STheme.get(finalParams.depth)}`);
    }
    // passed string
    return finalParams.depth;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFFSCxNQUFNLHdDQUF5QyxTQUFRLFlBQVk7SUFDL0QsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsZUFBZTtnQkFDckIsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsT0FBTyxFQUFFLHdDQUF3QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBTWpFLE1BQU0sQ0FBQyxPQUFPLFVBQVUsS0FBSyxDQUFDLEVBQzFCLE1BQU0sR0FHVDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLHdDQUF3QztJQUN4QyxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDM0QsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO1FBQ25CLFdBQVcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO0tBQzNCO0lBRUQscUJBQXFCO0lBQ3JCLElBQUksR0FBRyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQzFDLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0tBQ3hEO0lBRUQsVUFBVTtJQUNWLElBQ0ksT0FBTyxXQUFXLENBQUMsS0FBSyxLQUFLLFFBQVE7UUFDckMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsRUFDN0M7UUFDRSxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDdEU7SUFFRCxnQkFBZ0I7SUFDaEIsT0FBTyxXQUFXLENBQUMsS0FBSyxDQUFDO0FBQzdCLENBQUMifQ==