"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name           active
 * @namespace      node.mixin.when
 * @type           PostcssMixin
 * @platform      postcss
 * @interface       ./when
 * @status        beta
 *
 * This mixin allows you to set some css applied only WHEN a specific "state" has been
 * reached.
 * Supported states are:
 * - mounted: When a sugar webcomponent has the "mounted" attribute
 * - active: When the element has the "active" class or the "active" attribute
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * .myElement {
 *      display: none;
 *
 *      @sugar.when.mounted {
 *          display: block;
 *      }
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginmountedMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {
            state: {
                type: 'String',
                values: ['mounted', 'active', 'dark', 'light'],
                required: true,
            },
            context: {
                type: 'String',
                values: ['self', 'sibling', 'parent', 'ancestor', 'theme'],
                default: 'self',
                required: true,
            },
        };
    }
}
exports.interface = postcssSugarPluginmountedMixinInterface;
function default_1({ params, atRule, postcssApi, }) {
    const finalParams = Object.assign({ state: 'mounted', context: 'self' }, (params !== null && params !== void 0 ? params : {}));
    let selector;
    switch (finalParams.state) {
        case 'mounted':
            if (finalParams.context === 'parent') {
                selector = '*[mounted] > &, *.mounted > &';
            }
            else if (finalParams.context === 'ancestor') {
                selector = '*[mounted] &, *.mounted &';
            }
            else if (finalParams.context === 'sibling') {
                selector = '*[mounted] + &, *.mounted + &';
            }
            else {
                selector = '&[mounted], &.mounted';
            }
            break;
        case 'active':
            if (finalParams.context === 'parent') {
                selector = '*[active] > &. *.active > &';
            }
            else if (finalParams.context === 'ancestor') {
                selector = '*[active] &. *.active &';
            }
            else if (finalParams.context === 'sibling') {
                selector = '*[active] + &. *.active + &';
            }
            else {
                selector = '&[active], &.active';
            }
            break;
        case 'dark':
            selector = `@media (prefers-color-scheme: dark)`;
            break;
        case 'light':
            selector = `@media (prefers-color-scheme: light)`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBRUgsTUFBTSx1Q0FBd0MsU0FBUSxxQkFBWTtJQUM5RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQztnQkFDOUMsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQztnQkFDMUQsT0FBTyxFQUFFLE1BQU07Z0JBQ2YsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ21ELDREQUFTO0FBTTdELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsR0FLYjtJQUNHLE1BQU0sV0FBVyxHQUFHLGdCQUNoQixLQUFLLEVBQUUsU0FBUyxFQUNoQixPQUFPLEVBQUUsTUFBTSxJQUNaLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ3BCLENBQUM7SUFFRixJQUFJLFFBQVEsQ0FBQztJQUViLFFBQVEsV0FBVyxDQUFDLEtBQUssRUFBRTtRQUN2QixLQUFLLFNBQVM7WUFDVixJQUFJLFdBQVcsQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFO2dCQUNsQyxRQUFRLEdBQUcsK0JBQStCLENBQUM7YUFDOUM7aUJBQU0sSUFBSSxXQUFXLENBQUMsT0FBTyxLQUFLLFVBQVUsRUFBRTtnQkFDM0MsUUFBUSxHQUFHLDJCQUEyQixDQUFDO2FBQzFDO2lCQUFNLElBQUksV0FBVyxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7Z0JBQzFDLFFBQVEsR0FBRywrQkFBK0IsQ0FBQzthQUM5QztpQkFBTTtnQkFDSCxRQUFRLEdBQUcsdUJBQXVCLENBQUM7YUFDdEM7WUFDRCxNQUFNO1FBQ1YsS0FBSyxRQUFRO1lBQ1QsSUFBSSxXQUFXLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBRTtnQkFDbEMsUUFBUSxHQUFHLDZCQUE2QixDQUFDO2FBQzVDO2lCQUFNLElBQUksV0FBVyxDQUFDLE9BQU8sS0FBSyxVQUFVLEVBQUU7Z0JBQzNDLFFBQVEsR0FBRyx5QkFBeUIsQ0FBQzthQUN4QztpQkFBTSxJQUFJLFdBQVcsQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUFFO2dCQUMxQyxRQUFRLEdBQUcsNkJBQTZCLENBQUM7YUFDNUM7aUJBQU07Z0JBQ0gsUUFBUSxHQUFHLHFCQUFxQixDQUFDO2FBQ3BDO1lBQ0QsTUFBTTtRQUNWLEtBQUssTUFBTTtZQUNQLFFBQVEsR0FBRyxxQ0FBcUMsQ0FBQztZQUNqRCxNQUFNO1FBQ1YsS0FBSyxPQUFPO1lBQ1IsUUFBUSxHQUFHLHNDQUFzQyxDQUFDO1lBQ2xELE1BQU07S0FDYjtJQUVELE1BQU0sV0FBVyxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQztRQUNwQyxRQUFRO0tBQ1gsQ0FBQyxDQUFDO0lBRUgsYUFBYTtJQUNiLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDMUIsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDcEMsQ0FBQztBQTFERCw0QkEwREMifQ==