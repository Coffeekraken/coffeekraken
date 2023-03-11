"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
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
    var _a;
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    const vars = [
        `
        body:has(.s-viewport) {
            overflow: hidden;
        }
        .s-viewport {
            container-type: inline-size;
            container-name: ${(_a = s_theme_1.default.get('media.containerName')) !== null && _a !== void 0 ? _a : 'viewport'};
            height: 100vh;
            overflow-y: auto;
            overflow-x: hidden;
        }
        body:has(iframe.s-carpenter_editor-iframe) .s-viewport {
            @sugar.transition;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            border-left: solid 1px rgba(134, 134, 134, 0.3);
            border-right: solid 1px rgba(134, 134, 134, 0.3);
            @sugar.scrollbar(accent);
        }
    `,
    ];
    replaceWith(vars);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0MsTUFBTSx5Q0FBMEMsU0FBUSxxQkFBWTtJQUNoRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUNxRCw4REFBUztBQUUvRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkOztJQUNHLE1BQU0sV0FBVyxxQkFDVixDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUc7UUFDVDs7Ozs7OzhCQU9RLE1BQUEsaUJBQVEsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsbUNBQUksVUFDM0M7Ozs7Ozs7Ozs7Ozs7O0tBY1A7S0FDQSxDQUFDO0lBRUYsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUM7QUF4Q0QsNEJBd0NDIn0=