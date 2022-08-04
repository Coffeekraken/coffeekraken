"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SKitchenListParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the SKitchen.list method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SKitchenListParamsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            recipe: {
                description: 'Specify a recipe you want to list details for',
                type: 'String',
                alias: 'r',
            },
            ingredients: {
                description: 'Specify if you want to list the available ingredients in your kitchen',
                type: 'Boolean',
                default: false,
                alias: 'i',
            },
        };
    }
}
exports.default = SKitchenListParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQU0sMkJBQTRCLFNBQVEscUJBQVk7SUFDbEQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixXQUFXLEVBQUUsK0NBQStDO2dCQUM1RCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsV0FBVyxFQUFFO2dCQUNULFdBQVcsRUFDUCx1RUFBdUU7Z0JBQzNFLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBRUQsa0JBQWUsMkJBQTJCLENBQUMifQ==