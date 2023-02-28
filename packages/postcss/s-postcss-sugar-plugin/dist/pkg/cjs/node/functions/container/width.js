"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
// @ts-nocheck
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name          maxWidth
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
class postcssSugarPluginContainerMaxWidthInterface extends s_interface_1.default {
    static get _definition() {
        return {
            type: {
                type: 'String',
                alias: 't',
            },
        };
    }
}
exports.interface = postcssSugarPluginContainerMaxWidthInterface;
function width({ params, }) {
    const finalParams = Object.assign({}, params);
    if (!finalParams.type) {
        return `var(--s-container-max-width, var(--s-theme-layout-container-default, 100%))`;
    }
    return `var(--s-theme-layout-container-${finalParams.type}, var(--s-theme-layout-container-default, 100%))`;
}
exports.default = width;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGNBQWM7QUFDZCw0RUFBcUQ7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFFSCxNQUFNLDRDQUE2QyxTQUFRLHFCQUFZO0lBQ25FLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDYjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDd0QsaUVBQVM7QUFNbEUsU0FBd0IsS0FBSyxDQUFDLEVBQzFCLE1BQU0sR0FHVDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO1FBQ25CLE9BQU8sNkVBQTZFLENBQUM7S0FDeEY7SUFFRCxPQUFPLGtDQUFrQyxXQUFXLENBQUMsSUFBSSxrREFBa0QsQ0FBQztBQUNoSCxDQUFDO0FBZEQsd0JBY0MifQ==