import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          background
 * @as          sugar.wireframe.background
 * @namespace     node.function.wireframe
 * @type          PostcssFunction
 * @platform      postcss
 * @interface    ./background
 * @status        beta
 *
 * This function allows you to get a background value for your wireframe depending on your theme config
 *
 * @return      {Css}                   The corresponding css
 *
 * @snippet         sugar.wireframe.background
 *
 * @example       css
 * .my-element {
 *    background: sugar.wireframe.background();
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginWireframeBackgroundFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            variant: {
                type: 'String',
                values: ['light', 'dark'],
                default: 'light',
            },
        };
    }
}
export { postcssSugarPluginWireframeBackgroundFunctionInterface as interface };
export default function ({ params, }) {
    const finalParams = Object.assign({ variant: 'light' }, params);
    return __STheme.get(`wireframe.${finalParams.variant}.background`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBRUgsTUFBTSxzREFBdUQsU0FBUSxZQUFZO0lBQzdFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztnQkFDekIsT0FBTyxFQUFFLE9BQU87YUFDbkI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ0QsT0FBTyxFQUFFLHNEQUFzRCxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBTS9FLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxHQUdUO0lBQ0csTUFBTSxXQUFXLG1CQUNiLE9BQU8sRUFBRSxPQUFPLElBQ2IsTUFBTSxDQUNaLENBQUM7SUFDRixPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsYUFBYSxXQUFXLENBQUMsT0FBTyxhQUFhLENBQUMsQ0FBQztBQUN2RSxDQUFDIn0=