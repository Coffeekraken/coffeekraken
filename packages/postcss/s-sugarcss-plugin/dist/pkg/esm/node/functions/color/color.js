// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          color
 * @as            s.color
 * @namespace     node.function.color
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./color
 * @status        stable
 *
 * This function allows you to get a color value depending on your theme config.
 *
 * @param       {String}        color      The color to get
 * @param       {String}        [shade=null]      The color shade to get
 * @param       {String}        [modifier=null]     A color modifier like "--alpha 0.3 --saturate 20", etc...
 * @return      {Css}                   The corresponding css
 *
 * @snippet         s.color($1)
 *
 * @example       css
 * .my-element {
 *    color: s.color(accent);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class shadeNameInterface extends __SInterface {
    static get _definition() {
        return {
            saturate: {
                type: 'Number|String',
                default: 0,
            },
            desaturate: {
                type: 'Number',
                default: 0,
            },
            darken: {
                type: 'Number',
                default: 0,
            },
            lighten: {
                type: 'Number',
                default: 0,
            },
            spin: {
                type: 'Number',
                default: 0,
            },
            alpha: {
                type: 'Number',
                default: 1,
            },
        };
    }
}
class SSugarcssPluginColorInterface extends __SInterface {
    static get _definition() {
        return {
            color: {
                type: 'String',
                alias: 'c',
                required: true,
            },
            shade: {
                type: 'String',
                alias: 'v',
            },
            modifier: {
                type: 'String',
                alias: 'm',
            },
        };
    }
}
export { SSugarcssPluginColorInterface as interface };
export default function color({ params, }) {
    const finalParams = Object.assign({ color: '', shade: undefined, modifier: undefined }, params);
    // const colorObj = __STheme.resolveColor(
    //     finalParams.color,
    //     finalParams.shade,
    //     finalParams.modifier,
    //     {
    //         return: 'object',
    //     },
    // );
    return `${__STheme.resolveColor(finalParams.color, finalParams.shade, finalParams.modifier, {
        return: 'var',
    })}`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUVILE1BQU0sa0JBQW1CLFNBQVEsWUFBWTtJQUN6QyxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxlQUFlO2dCQUNyQixPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFFRCxNQUFNLDZCQUE4QixTQUFRLFlBQVk7SUFDcEQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRztnQkFDVixRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsT0FBTyxFQUFFLDZCQUE2QixJQUFJLFNBQVMsRUFBRSxDQUFDO0FBUXRELE1BQU0sQ0FBQyxPQUFPLFVBQVUsS0FBSyxDQUFDLEVBQzFCLE1BQU0sR0FHVDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsRUFBRSxFQUNULEtBQUssRUFBRSxTQUFTLEVBQ2hCLFFBQVEsRUFBRSxTQUFTLElBQ2hCLE1BQU0sQ0FDWixDQUFDO0lBRUYsMENBQTBDO0lBQzFDLHlCQUF5QjtJQUN6Qix5QkFBeUI7SUFDekIsNEJBQTRCO0lBQzVCLFFBQVE7SUFDUiw0QkFBNEI7SUFDNUIsU0FBUztJQUNULEtBQUs7SUFFTCxPQUFPLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FDM0IsV0FBVyxDQUFDLEtBQUssRUFDakIsV0FBVyxDQUFDLEtBQUssRUFDakIsV0FBVyxDQUFDLFFBQVEsRUFDcEI7UUFDSSxNQUFNLEVBQUUsS0FBSztLQUNoQixDQUNKLEVBQUUsQ0FBQztBQUNSLENBQUMifQ==