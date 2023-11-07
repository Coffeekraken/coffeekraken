"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name           mounted
 * @as              @s.until.mounted
 * @namespace      node.mixin.until
 * @type           PostcssMixin
 * @interface   ./mounted
 * @platform      postcss
 * @status        wip
 *
 * This mixin allows you to set some css applied only UNTIL a specific "state" has been
 * reached.
 * Supported states are:
 * - mounted: When a sugar webcomponent has the "mounted" attribute
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * .myElement {
 *      display: block;
 *
 *      @s.until.mounted {
 *          display: none;
 *      }
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginmountedMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {
            state: {
                type: 'String',
                values: ['mounted'],
                required: true,
            },
            sibling: {
                type: 'Boolean',
                default: false,
            },
        };
    }
}
exports.interface = SSugarcssPluginmountedMixinInterface;
function default_1({ params, atRule, postcssApi, }) {
    const finalParams = Object.assign({ state: 'mounted', sibling: false }, (params !== null && params !== void 0 ? params : {}));
    let selector;
    switch (finalParams.state) {
        case 'mounted':
            if (finalParams.sibling) {
                selector = '*:not([mounted]):not(.mounted) &';
            }
            else {
                selector = '&:not([mounted]):not(.mounted)';
            }
            break;
    }
    const wrapperRule = new postcssApi.Rule({
        selector,
    });
    // @ts-ignore
    atRule.nodes.forEach((node) => {
        wrapperRule.append(node);
    });
    atRule.replaceWith(wrapperRule);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBRUgsTUFBTSxvQ0FBcUMsU0FBUSxxQkFBWTtJQUMzRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDbkIsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ2dELHlEQUFTO0FBTTFELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsR0FLYjtJQUNHLE1BQU0sV0FBVyxHQUFHLGdCQUNoQixLQUFLLEVBQUUsU0FBUyxFQUNoQixPQUFPLEVBQUUsS0FBSyxJQUNYLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ3BCLENBQUM7SUFFRixJQUFJLFFBQVEsQ0FBQztJQUViLFFBQVEsV0FBVyxDQUFDLEtBQUssRUFBRTtRQUN2QixLQUFLLFNBQVM7WUFDVixJQUFJLFdBQVcsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3JCLFFBQVEsR0FBRyxrQ0FBa0MsQ0FBQzthQUNqRDtpQkFBTTtnQkFDSCxRQUFRLEdBQUcsZ0NBQWdDLENBQUM7YUFDL0M7WUFDRCxNQUFNO0tBQ2I7SUFFRCxNQUFNLFdBQVcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDcEMsUUFBUTtLQUNYLENBQUMsQ0FBQztJQUVILGFBQWE7SUFDYixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzFCLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUFyQ0QsNEJBcUNDIn0=