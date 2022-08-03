"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SFrontspecReadParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This class represent the interface that describe the minimum requirement
 * needed to build the docMap.json file
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SFrontspecReadParamsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            env: {
                description: 'Specify the environment for which to read the frontspec for',
                type: 'String',
                default: undefined,
            },
        };
    }
}
exports.default = SFrontspecReadParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUdkLDRFQUFxRDtBQUdyRDs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILE1BQU0sNkJBQThCLFNBQVEscUJBQVk7SUFDcEQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQ1AsNkRBQTZEO2dCQUNqRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsU0FBUzthQUNyQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDRCxrQkFBZSw2QkFBNkIsQ0FBQyJ9