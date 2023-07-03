// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
/**
 * @name          maxWidth
 * @as              sugar.container.width
 * @namespace     node.function.color
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./color
 * @status        beta
 *
 * This function allows you to get the max-width value of the nearest container either applied using
 * the `@sugar.container()` mixin, of by applying the `s-container:...` classes...
 *
 * @return      {Css}                   The corresponding css
 *
 * @snippet         sugar.container.width($1)
 *
 * @example       css
 * .my-element {
 *    max-width: sugar.container.width();
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginContainerMaxWidthInterface extends __SInterface {
    static get _definition() {
        return {
            type: {
                type: 'String',
                alias: 't',
            },
        };
    }
}
export { postcssSugarPluginContainerMaxWidthInterface as interface };
export default function width({ params, }) {
    const finalParams = Object.assign({}, params);
    if (!finalParams.type) {
        return `var(--s-container-max-width, var(--s-layout-container-default, 100%))`;
    }
    return `var(--s-layout-container-${finalParams.type}, var(--s-layout-container-default, 100%))`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFFSCxNQUFNLDRDQUE2QyxTQUFRLFlBQVk7SUFDbkUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSw0Q0FBNEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU1yRSxNQUFNLENBQUMsT0FBTyxVQUFVLEtBQUssQ0FBQyxFQUMxQixNQUFNLEdBR1Q7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTtRQUNuQixPQUFPLHVFQUF1RSxDQUFDO0tBQ2xGO0lBRUQsT0FBTyw0QkFBNEIsV0FBVyxDQUFDLElBQUksNENBQTRDLENBQUM7QUFDcEcsQ0FBQyJ9