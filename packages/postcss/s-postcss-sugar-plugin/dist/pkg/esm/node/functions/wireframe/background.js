import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          background
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxNQUFNLHNEQUF1RCxTQUFRLFlBQVk7SUFDN0UsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO2dCQUN6QixPQUFPLEVBQUUsT0FBTzthQUNuQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDRCxPQUFPLEVBQUUsc0RBQXNELElBQUksU0FBUyxFQUFFLENBQUM7QUFNL0UsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEdBR1Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsT0FBTyxFQUFFLE9BQU8sSUFDYixNQUFNLENBQ1osQ0FBQztJQUNGLE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxhQUFhLFdBQVcsQ0FBQyxPQUFPLGFBQWEsQ0FBQyxDQUFDO0FBQ3ZFLENBQUMifQ==