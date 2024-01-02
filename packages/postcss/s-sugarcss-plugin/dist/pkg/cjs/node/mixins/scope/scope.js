"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const array_1 = require("@coffeekraken/sugar/array");
class SSugarcssPluginScopeMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'String[]',
                    splitChars: [',', ' '],
                },
                description: 'Specify the scope(s) you want to generate for the enclosed mixins calls',
                required: true,
            },
        };
    }
}
exports.interface = SSugarcssPluginScopeMixinInterface;
/**
 * @name           scope
 * @as              @s.scope
 * @namespace      node.mixin.scope
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to set the "scope(s)" you want to all the called mixins that have a "$scope" parameter like `@s.ui.button`, `@s.ui.avatar`, etc...
 *
 * @return      {Css}         The generated css
 *
 * @snippet         @s.scope ($1) { $2 }
 * @s.scope $1 {
 *      $2
 * }
 *
 * @example        css
 * @s.scope bare {
 *      @s.ui.button;
 *      // etc...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, registerPostProcessor, replaceWith, sharedData, }) {
    const finalParams = Object.assign({ scope: [] }, (params !== null && params !== void 0 ? params : {}));
    atRule.name = 'media';
    atRule.params = `s-scope-${finalParams.scope.join(',')}`;
    registerPostProcessor((root) => {
        let currentRule = atRule.parent;
        while (currentRule && currentRule !== root) {
            if (!currentRule.name) {
                currentRule = currentRule.parent;
                continue;
            }
            if (currentRule.params.startsWith('s-scope-only-')) {
                const onlyArray = currentRule.params
                    .trim()
                    .replace('s-scope-only-', '')
                    .split(',');
                if (!(0, array_1.__intersection)(finalParams.scope, onlyArray).length) {
                    atRule.remove();
                }
            }
            else if (currentRule.params.startsWith('s-scope-exclude-')) {
                const excludeArray = currentRule.params
                    .trim()
                    .replace('s-scope-exclude-', '')
                    .split(',');
                if ((0, array_1.__intersection)(finalParams.scope, excludeArray).length) {
                    atRule.remove();
                }
            }
            currentRule = currentRule.parent;
        }
        atRule.replaceWith(atRule.nodes);
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxxREFBMkQ7QUFFM0QsTUFBTSxrQ0FBbUMsU0FBUSxxQkFBWTtJQUN6RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsVUFBVTtvQkFDaEIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsV0FBVyxFQUNQLHlFQUF5RTtnQkFDN0UsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQzhDLHVEQUFTO0FBTXhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBQ0gsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04scUJBQXFCLEVBQ3JCLFdBQVcsRUFDWCxVQUFVLEdBT2I7SUFDRyxNQUFNLFdBQVcsR0FBRyxnQkFDaEIsS0FBSyxFQUFFLEVBQUUsSUFDTixDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7SUFDdEIsTUFBTSxDQUFDLE1BQU0sR0FBRyxXQUFXLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7SUFFekQscUJBQXFCLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMzQixJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBRWhDLE9BQU8sV0FBVyxJQUFJLFdBQVcsS0FBSyxJQUFJLEVBQUU7WUFDeEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7Z0JBQ25CLFdBQVcsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO2dCQUNqQyxTQUFTO2FBQ1o7WUFDRCxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFO2dCQUNoRCxNQUFNLFNBQVMsR0FBRyxXQUFXLENBQUMsTUFBTTtxQkFDL0IsSUFBSSxFQUFFO3FCQUNOLE9BQU8sQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDO3FCQUM1QixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRWhCLElBQUksQ0FBQyxJQUFBLHNCQUFjLEVBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUU7b0JBQ3RELE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDbkI7YUFDSjtpQkFBTSxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7Z0JBQzFELE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxNQUFNO3FCQUNsQyxJQUFJLEVBQUU7cUJBQ04sT0FBTyxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQztxQkFDL0IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQixJQUFJLElBQUEsc0JBQWMsRUFBQyxXQUFXLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDLE1BQU0sRUFBRTtvQkFDeEQsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUNuQjthQUNKO1lBRUQsV0FBVyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7U0FDcEM7UUFFRCxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFyREQsNEJBcURDIn0=