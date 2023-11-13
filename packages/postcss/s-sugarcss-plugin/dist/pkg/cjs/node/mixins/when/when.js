"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name           active
 * @as              @s.when
 * @namespace      node.mixin.when
 * @type           PostcssMixin
 * @platform      postcss
 * @interface       ./when
 * @status        wip
 *
 * This mixin allows you to set some css applied only WHEN a specific "state" has been
 * reached.
 * Supported states are:
 * - mounted: When a sugar webcomponent has the "mounted" attribute
 * - active: When the element has the "active" class or the "active" attribute
 * - dark: When the prefered color scheme is dark
 * - light: When the prefered color scheme is light
 *
 * @param       {'mounted'|'active'|'dark'|'light'}         state           The state you want to target
 * @param       {'self'|'sibling'|'parent'|'ancestor'|'theme'}      [context='self']        The context of the when
 * @return        {Css}         The generated css
 *
 * @example        css
 * .myElement {
 *      display: none;
 *
 *      @s.when mounted {
 *          display: block;
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
exports.interface = SSugarcssPluginmountedMixinInterface;
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
            return atRule.replaceWith(new postcssApi.AtRule({
                name: 's.theme.when',
                params: 'dark',
                nodes: atRule.nodes,
            }));
        case 'light':
            return atRule.replaceWith(new postcssApi.AtRule({
                name: 's.theme.when',
                params: 'light',
                nodes: atRule.nodes,
            }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQ0c7QUFFSCxNQUFNLG9DQUFxQyxTQUFRLHFCQUFZO0lBQzNELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDO2dCQUM5QyxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDO2dCQUMxRCxPQUFPLEVBQUUsTUFBTTtnQkFDZixRQUFRLEVBQUUsSUFBSTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDZ0QseURBQVM7QUFNMUQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sVUFBVSxHQUtiO0lBQ0csTUFBTSxXQUFXLEdBQUcsZ0JBQ2hCLEtBQUssRUFBRSxTQUFTLEVBQ2hCLE9BQU8sRUFBRSxNQUFNLElBQ1osQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDO0lBRWIsUUFBUSxXQUFXLENBQUMsS0FBSyxFQUFFO1FBQ3ZCLEtBQUssU0FBUztZQUNWLElBQUksV0FBVyxDQUFDLE9BQU8sS0FBSyxRQUFRLEVBQUU7Z0JBQ2xDLFFBQVEsR0FBRywrQkFBK0IsQ0FBQzthQUM5QztpQkFBTSxJQUFJLFdBQVcsQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFFO2dCQUMzQyxRQUFRLEdBQUcsMkJBQTJCLENBQUM7YUFDMUM7aUJBQU0sSUFBSSxXQUFXLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRTtnQkFDMUMsUUFBUSxHQUFHLCtCQUErQixDQUFDO2FBQzlDO2lCQUFNO2dCQUNILFFBQVEsR0FBRyx1QkFBdUIsQ0FBQzthQUN0QztZQUNELE1BQU07UUFDVixLQUFLLFFBQVE7WUFDVCxJQUFJLFdBQVcsQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFO2dCQUNsQyxRQUFRLEdBQUcsNkJBQTZCLENBQUM7YUFDNUM7aUJBQU0sSUFBSSxXQUFXLENBQUMsT0FBTyxLQUFLLFVBQVUsRUFBRTtnQkFDM0MsUUFBUSxHQUFHLHlCQUF5QixDQUFDO2FBQ3hDO2lCQUFNLElBQUksV0FBVyxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7Z0JBQzFDLFFBQVEsR0FBRyw2QkFBNkIsQ0FBQzthQUM1QztpQkFBTTtnQkFDSCxRQUFRLEdBQUcscUJBQXFCLENBQUM7YUFDcEM7WUFDRCxNQUFNO1FBQ1YsS0FBSyxNQUFNO1lBQ1AsT0FBTyxNQUFNLENBQUMsV0FBVyxDQUNyQixJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUM7Z0JBQ2xCLElBQUksRUFBRSxjQUFjO2dCQUNwQixNQUFNLEVBQUUsTUFBTTtnQkFDZCxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7YUFDdEIsQ0FBQyxDQUNMLENBQUM7UUFDTixLQUFLLE9BQU87WUFDUixPQUFPLE1BQU0sQ0FBQyxXQUFXLENBQ3JCLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQztnQkFDbEIsSUFBSSxFQUFFLGNBQWM7Z0JBQ3BCLE1BQU0sRUFBRSxPQUFPO2dCQUNmLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSzthQUN0QixDQUFDLENBQ0wsQ0FBQztLQUNUO0lBRUQsTUFBTSxXQUFXLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQ3BDLFFBQVE7S0FDWCxDQUFDLENBQUM7SUFFSCxhQUFhO0lBQ2IsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMxQixXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNwQyxDQUFDO0FBcEVELDRCQW9FQyJ9