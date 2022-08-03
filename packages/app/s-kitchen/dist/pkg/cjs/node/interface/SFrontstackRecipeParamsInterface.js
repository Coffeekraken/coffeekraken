"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SFrontstackRecipeParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe parameters of the SFrontstack.action method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SFrontstackRecipeParamsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            stack: {
                description: 'Specify the stack you want to execute like "dev", "build", etc...',
                type: 'String',
                alias: 's',
            },
            recipe: {
                description: 'Specify the recipe you want to execute the stack from',
                type: 'String',
                alias: 'r',
            },
            runInParallel: {
                description: 'Specify if you want the recipe actions to run in parallel of not',
                type: 'Boolean',
                alias: 'p'
            },
            env: {
                description: 'Specify the environment in which to execute your recipe',
                type: 'String',
            },
        };
    }
}
exports.default = SFrontstackRecipeParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNILE1BQU0sZ0NBQWlDLFNBQVEscUJBQVk7SUFDdkQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQ1AsbUVBQW1FO2dCQUN2RSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFDUCx1REFBdUQ7Z0JBQzNELElBQUksRUFBRSxRQUFRO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxhQUFhLEVBQUU7Z0JBQ1gsV0FBVyxFQUFFLGtFQUFrRTtnQkFDL0UsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQ1AseURBQXlEO2dCQUM3RCxJQUFJLEVBQUUsUUFBUTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFFRCxrQkFBZSxnQ0FBZ0MsQ0FBQyJ9