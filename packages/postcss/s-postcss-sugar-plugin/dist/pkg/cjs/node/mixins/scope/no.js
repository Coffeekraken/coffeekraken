"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssSugarPluginScopeNoMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {
            scopes: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                required: true,
            },
        };
    }
}
exports.interface = postcssSugarPluginScopeNoMixinInterface;
/**
 * @name           no
 * @namespace      node.mixin.scope
 * @type           PostcssMixin
 * @platform        css
 * @status        beta
 *
 * This mixin allows you to exclude some scope(s) from the generated css.
 * Scopes are usually "bare" or/and "lnf" (look and feel).
 * This is usefull for example if you want all the classes to apply bare styling
 * without any look and feel that you handle by yourself.
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example        css
 * \@sugar.scope.no(lnf) {
 *      // ...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
const _noScopesStack = [];
function default_1({ params, sharedData, atRule, replaceWith, postcssApi, }) {
    const finalParams = Object.assign({ scopes: [] }, (params !== null && params !== void 0 ? params : {}));
    // _noScopesStack.push(finalParams.scopes.join(','));
    // sharedData.noScopes = finalParams.scopes;
    // console.log(finalParams);
    // atRule.replaceWith(atRule.nodes);
    // console.log('RESTORE');
    // _noScopesStack.pop();
    // if (_noScopesStack.length) {
    //     // @ts-ignore
    //     sharedData.noScopes = _noScopesStack.slice(-1).split(',');
    // } else {
    //     sharedData.noScopes = [];
    // }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUdyRCxNQUFNLHVDQUF3QyxTQUFRLHFCQUFZO0lBQzlELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxRQUFRLEVBQUUsSUFBSTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDbUQsNERBQVM7QUFNN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILE1BQU0sY0FBYyxHQUFhLEVBQUUsQ0FBQztBQUNwQyxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLFVBQVUsRUFDVixNQUFNLEVBQ04sV0FBVyxFQUNYLFVBQVUsR0FPYjtJQUNHLE1BQU0sV0FBVyxHQUFHLGdCQUNoQixNQUFNLEVBQUUsRUFBRSxJQUNQLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ3BCLENBQUM7SUFFRixxREFBcUQ7SUFDckQsNENBQTRDO0lBRTVDLDRCQUE0QjtJQUM1QixvQ0FBb0M7SUFFcEMsMEJBQTBCO0lBQzFCLHdCQUF3QjtJQUN4QiwrQkFBK0I7SUFDL0Isb0JBQW9CO0lBQ3BCLGlFQUFpRTtJQUNqRSxXQUFXO0lBQ1gsZ0NBQWdDO0lBQ2hDLElBQUk7QUFDUixDQUFDO0FBaENELDRCQWdDQyJ9