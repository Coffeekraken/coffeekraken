// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          theme
 * @namespace     node.function.theme
 * @type          PostcssFunction
 * @platform      postcss
 * @status        beta
 *
 * This function allows you to get a theme value using dot path like "font.family.default.font-family", etc...
 * Usually the best way to access theme config is to use dedicated functions/mixins like "sugar.margin", "sugar.font.family", etc...
 *
 * @param       {String}        dotPath      The dot path to the theme config value you want back
 * @param       {Boolean}       [scalable=false]        Specify if you want to value back to be scalable. Work only for number config as well
 * @param       {'var'|'value'}     [return='var']      Specify if you want to get back a variable or the value directly. Note that you need to make sure a variable is outputed in your css to use the 'var'.
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
export { postcssSugarPluginThemeInterface as interface };
export default function theme({ params, }) {
    const finalParams = Object.assign({}, params);
    if (finalParams.return === 'var') {
        if (finalParams.scalable) {
            return `sugar.scalable(${__STheme.cssVar(finalParams.dotPath, finalParams.fallback)})`;
        }
        else {
            return __STheme.cssVar(finalParams.dotPath, finalParams.fallback);
        }
    }
    else {
        if (finalParams.scalable) {
            return `sugar.scalable(${__STheme.config(finalParams.dotPath)})`;
        }
        else {
            return __STheme.config(finalParams.dotPath);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBRUgsTUFBTSxnQ0FBaUMsU0FBUSxZQUFZO0lBQ3ZELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQztnQkFDeEIsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsT0FBTyxFQUFFLGdDQUFnQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBU3pELE1BQU0sQ0FBQyxPQUFPLFVBQVUsS0FBSyxDQUFDLEVBQzFCLE1BQU0sR0FHVDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLElBQUksV0FBVyxDQUFDLE1BQU0sS0FBSyxLQUFLLEVBQUU7UUFDOUIsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFFO1lBQ3RCLE9BQU8sa0JBQWtCLFFBQVEsQ0FBQyxNQUFNLENBQ3BDLFdBQVcsQ0FBQyxPQUFPLEVBQ25CLFdBQVcsQ0FBQyxRQUFRLENBQ3ZCLEdBQUcsQ0FBQztTQUNSO2FBQU07WUFDSCxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDckU7S0FDSjtTQUFNO1FBQ0gsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFFO1lBQ3RCLE9BQU8sa0JBQWtCLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7U0FDcEU7YUFBTTtZQUNILE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDL0M7S0FDSjtBQUNMLENBQUMifQ==