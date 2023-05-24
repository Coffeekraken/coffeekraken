"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name                SDocComponentInterface
 * @namespace           js.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe parameters of the SDocComponent
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SDocComponentInterface extends s_interface_1.default {
    static get _definition() {
        return {
            endpoints: {
                type: 'Object',
                description: 'Specify the doc endpoints url',
                default: s_sugar_config_1.default.get('doc.endpoints'),
            },
        };
    }
}
exports.default = SDocComponentInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGtGQUEwRDtBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFxQixzQkFBdUIsU0FBUSxxQkFBWTtJQUM1RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSwrQkFBK0I7Z0JBQzVDLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7YUFDL0M7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBVkQseUNBVUMifQ==