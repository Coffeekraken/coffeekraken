"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssSugarPluginScopeExcludeMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'String[]',
                    splitChars: [',', ' '],
                },
                description: "Specify the scope(s) you don't want to generate for the enclosed mixins calls",
                required: true,
            },
        };
    }
}
exports.interface = postcssSugarPluginScopeExcludeMixinInterface;
/**
 * @name           exclude
 * @as              @sugar.scope
 * @namespace      node.mixin.scope
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to set the "scope(s)" you dont't want to all the called mixins that have a "$scope" parameter like `@sugar.ui.button`, `@sugar.ui.avatar`, etc...
 *
 * @return      {Css}         The generated css
 *
 * @snippet         @sugar.scope.exclude ($1) { $2 }
 * \@sugar.scope.exclude $1 {
 *      $2
 * }
 *
 * @example        css
 * \@sugar.scope.exclude lnf {
 *      §sugar.ui.button;
 *      // etc...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, registerPostProcessor, replaceWith, }) {
    const finalParams = Object.assign({ scope: [] }, (params !== null && params !== void 0 ? params : {}));
    registerPostProcessor((root) => {
        root.walkAtRules(/sugar\.scope/, (at) => {
            at.replaceWith(at.nodes);
        });
    });
    atRule.walkAtRules((n) => {
        // console.log('d', n.name);
        if (n.type !== 'atrule' || !n.name.startsWith('sugar.')) {
            return;
        }
        // save the unwanted scope(s) inside the atRule.
        // this will be handled by the postcssSugarPlugin main file
        // to compute the final "scope" param to pass
        n._scopeExclude = finalParams.scope;
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCxNQUFNLDRDQUE2QyxTQUFRLHFCQUFZO0lBQ25FLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxVQUFVO29CQUNoQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxXQUFXLEVBQ1AsK0VBQStFO2dCQUNuRixRQUFRLEVBQUUsSUFBSTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDd0QsaUVBQVM7QUFNbEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Qkc7QUFDSCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixxQkFBcUIsRUFDckIsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLEdBQUcsZ0JBQ2hCLEtBQUssRUFBRSxFQUFFLElBQ04sQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUVGLHFCQUFxQixDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDM0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRTtZQUNwQyxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3JCLDRCQUE0QjtRQUM1QixJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDckQsT0FBTztTQUNWO1FBQ0QsZ0RBQWdEO1FBQ2hELDJEQUEyRDtRQUMzRCw2Q0FBNkM7UUFDN0MsQ0FBQyxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDO0lBQ3hDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQWhDRCw0QkFnQ0MifQ==