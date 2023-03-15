"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_frontspec_1 = __importDefault(require("@coffeekraken/s-frontspec"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SSpacesSelectorComponentInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SSpacesSelectorComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSpacesSelectorComponentInterface extends s_interface_1.default {
    static get _definition() {
        return {
            spaces: {
                type: 'Object',
                description: 'Specify the spaces you want as options. This object MUST contain two properties which are "margin" and "padding", which contains each every options you want as an object with "name" and "value" properties',
                required: true,
                get default() {
                    var _a, _b;
                    return {
                        margin: (_a = s_frontspec_1.default.get('margin')) !== null && _a !== void 0 ? _a : {},
                        padding: (_b = s_frontspec_1.default.get('padding')) !== null && _b !== void 0 ? _b : {},
                    };
                },
            },
            values: {
                type: 'Object',
                description: 'Specify the initial values for the selectors. MUST be an object with properties "paddingTop", "paddingLeft", "marginBottom", etc...',
                default: {},
            },
            valueProp: {
                type: 'String',
                description: 'Specify the space object propery to take as value',
                default: 'value',
            },
        };
    }
}
exports.default = SSpacesSelectorComponentInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFxQixpQ0FBa0MsU0FBUSxxQkFBWTtJQUN2RSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCw4TUFBOE07Z0JBQ2xOLFFBQVEsRUFBRSxJQUFJO2dCQUNkLElBQUksT0FBTzs7b0JBQ1AsT0FBTzt3QkFDSCxNQUFNLEVBQUUsTUFBQSxxQkFBWSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsbUNBQUksRUFBRTt3QkFDeEMsT0FBTyxFQUFFLE1BQUEscUJBQVksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLG1DQUFJLEVBQUU7cUJBQzdDLENBQUM7Z0JBQ04sQ0FBQzthQUNKO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCxxSUFBcUk7Z0JBQ3pJLE9BQU8sRUFBRSxFQUFFO2FBQ2Q7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUNQLG1EQUFtRDtnQkFDdkQsT0FBTyxFQUFFLE9BQU87YUFDbkI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBN0JELG9EQTZCQyJ9