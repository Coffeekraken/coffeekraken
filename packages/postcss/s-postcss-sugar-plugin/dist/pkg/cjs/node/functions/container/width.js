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
        return `var(--s-container-max-width, var(--s-layout-container-default, 100%))`;
    }
    return `var(--s-layout-container-${finalParams.type}, var(--s-layout-container-default, 100%))`;
}
exports.default = width;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGNBQWM7QUFDZCw0RUFBcUQ7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBRUgsTUFBTSw0Q0FBNkMsU0FBUSxxQkFBWTtJQUNuRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ3dELGlFQUFTO0FBTWxFLFNBQXdCLEtBQUssQ0FBQyxFQUMxQixNQUFNLEdBR1Q7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTtRQUNuQixPQUFPLHVFQUF1RSxDQUFDO0tBQ2xGO0lBRUQsT0FBTyw0QkFBNEIsV0FBVyxDQUFDLElBQUksNENBQTRDLENBQUM7QUFDcEcsQ0FBQztBQWRELHdCQWNDIn0=