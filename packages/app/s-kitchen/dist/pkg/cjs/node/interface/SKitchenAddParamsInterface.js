"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SKitchenAddParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the SKitchen.add method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SKitchenAddParamsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            ingredients: {
                description: 'Specify one or more ingredient(s) you want to add to your project',
                type: {
                    type: 'Array<String>',
                    splitChars: [','],
                },
                values: [
                    'frontspec',
                    'manifest',
                    'favicon',
                    'postcss',
                    'sugarJson',
                    'sugar',
                    'readme',
                ],
                required: true,
                alias: 'i',
            },
        };
    }
}
exports.default = SKitchenAddParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQU0sMEJBQTJCLFNBQVEscUJBQVk7SUFDakQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILFdBQVcsRUFBRTtnQkFDVCxXQUFXLEVBQ1AsbUVBQW1FO2dCQUN2RSxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQztpQkFDcEI7Z0JBQ0QsTUFBTSxFQUFFO29CQUNKLFdBQVc7b0JBQ1gsVUFBVTtvQkFDVixTQUFTO29CQUNULFNBQVM7b0JBQ1QsV0FBVztvQkFDWCxPQUFPO29CQUNQLFFBQVE7aUJBQ1g7Z0JBQ0QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDYjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFFRCxrQkFBZSwwQkFBMEIsQ0FBQyJ9