// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          theme
 * @as          s.theme
 * @namespace     node.function.theme
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./theme
 * @status        beta
 *
 * This function allows you to get a theme value using dot path like "font.family.fontFamily", etc...
 * Usually the best way to access theme config is to use dedicated functions/mixins like "sugar.margin", "sugar.font.family", etc...
 *
 * @param       {String}        dotPath      The dot path to the theme config value you want back
 * @param       {Boolean}       [scalable=false]        Specify if you want to value back to be scalable. Work only for number config as well
 * @param       {'var'|'value'}     [return='var']      Specify if you want to get back a variable or the value directly. Note that you need to make sure a variable is outputed in your css to use the 'var'.
 * @param       {Any}           [fallback=null]         Specify a fallback in case the variable does not resolve to any value
 * @return      {Css}                   The corresponding css
 *
 * @snippet         s.theme($1)
 *
 * @example       css
 * .my-element {
 *    font-family: s.theme(font.family.fontFamily);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginThemeInterface extends __SInterface {
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
            return: {
                type: 'String',
                values: ['var', 'value'],
                default: 'var',
            },
            fallback: {
                type: 'Boolean',
                default: true,
            },
        };
    }
}
export { SSugarcssPluginThemeInterface as interface };
export default function theme({ params, }) {
    const finalParams = Object.assign({}, params);
    if (finalParams.return === 'var') {
        if (finalParams.scalable) {
            return `s.scalable(${__STheme.cssVar(finalParams.dotPath, finalParams.fallback)})`;
        }
        else {
            return __STheme.cssVar(finalParams.dotPath, finalParams.fallback);
        }
    }
    else {
        if (finalParams.scalable) {
            return `s.scalable(${__STheme.get(finalParams.dotPath)})`;
        }
        else {
            return __STheme.get(finalParams.dotPath);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBRUgsTUFBTSw2QkFBOEIsU0FBUSxZQUFZO0lBQ3BELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQztnQkFDeEIsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsT0FBTyxFQUFFLDZCQUE2QixJQUFJLFNBQVMsRUFBRSxDQUFDO0FBU3RELE1BQU0sQ0FBQyxPQUFPLFVBQVUsS0FBSyxDQUFDLEVBQzFCLE1BQU0sR0FHVDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLElBQUksV0FBVyxDQUFDLE1BQU0sS0FBSyxLQUFLLEVBQUU7UUFDOUIsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFFO1lBQ3RCLE9BQU8sY0FBYyxRQUFRLENBQUMsTUFBTSxDQUNoQyxXQUFXLENBQUMsT0FBTyxFQUNuQixXQUFXLENBQUMsUUFBUSxDQUN2QixHQUFHLENBQUM7U0FDUjthQUFNO1lBQ0gsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3JFO0tBQ0o7U0FBTTtRQUNILElBQUksV0FBVyxDQUFDLFFBQVEsRUFBRTtZQUN0QixPQUFPLGNBQWMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztTQUM3RDthQUFNO1lBQ0gsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM1QztLQUNKO0FBQ0wsQ0FBQyJ9