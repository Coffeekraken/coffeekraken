"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssSugarPluginMediaInitMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssSugarPluginMediaInitMixinInterface;
/**
 * @name           init
 * @namespace      node.mixin.media
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin initialize the media environment that make use of container queries instead of
 * traditional media queries. For that we need to add the "container" property onto the ".s-viewport"
 * element that contains the whole website as well as on the body to make sure it works everywere.
 *
 * @snippet         @sugar.media.init
 *
 * @example        css
 * \@sugar.media.init;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    // const vars = [
    //     `
    //     body:has(.s-viewport) {
    //         overflow: hidden;
    //     }
    //     .s-viewport {
    //         container-type: inline-size;
    //         container-name: ${
    //             __STheme.get('media.containerName') ?? 'viewport'
    //         };
    //         height: 100vh;
    //         overflow-y: auto;
    //         overflow-x: hidden;
    //     }
    //     body:has(iframe.s-carpenter_editor-iframe) .s-viewport {
    //         @sugar.transition;
    //         position: relative;
    //         left: 50%;
    //         transform: translateX(-50%);
    //         border-left: solid 1px rgba(134, 134, 134, 0.3);
    //         border-right: solid 1px rgba(134, 134, 134, 0.3);
    //         @sugar.scrollbar(accent);
    //     }
    // `,
    // ];
    replaceWith('');
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCxNQUFNLHlDQUEwQyxTQUFRLHFCQUFZO0lBQ2hFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBQ3FELDhEQUFTO0FBRS9EOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcscUJBQ1YsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUVGLGlCQUFpQjtJQUNqQixRQUFRO0lBQ1IsOEJBQThCO0lBQzlCLDRCQUE0QjtJQUM1QixRQUFRO0lBQ1Isb0JBQW9CO0lBQ3BCLHVDQUF1QztJQUN2Qyw2QkFBNkI7SUFDN0IsZ0VBQWdFO0lBQ2hFLGFBQWE7SUFDYix5QkFBeUI7SUFDekIsNEJBQTRCO0lBQzVCLDhCQUE4QjtJQUM5QixRQUFRO0lBQ1IsK0RBQStEO0lBQy9ELDZCQUE2QjtJQUM3Qiw4QkFBOEI7SUFDOUIscUJBQXFCO0lBQ3JCLHVDQUF1QztJQUN2QywyREFBMkQ7SUFDM0QsNERBQTREO0lBQzVELG9DQUFvQztJQUNwQyxRQUFRO0lBQ1IsS0FBSztJQUNMLEtBQUs7SUFFTCxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDcEIsQ0FBQztBQXhDRCw0QkF3Q0MifQ==