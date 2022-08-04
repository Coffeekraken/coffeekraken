"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SCliFsCopyParamsInterface
 * @namespace           node.fs.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar fs.copy` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SCliFsCopyParamsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            src: {
                description: 'Specify the file/folder to copy',
                type: 'String',
                required: true
            },
            glob: {
                description: 'Specify a glob pattern to search for files inside the specified src"',
                type: 'String',
            },
            dest: {
                description: 'Specify the destination file/folder',
                type: 'String',
                required: true
            },
            chdir: {
                description: 'Specify if you want the process to change directory inside the destination one or not',
                type: 'Boolean',
                default: false
            }
        };
    }
}
exports.default = SCliFsCopyParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBcUIseUJBQTBCLFNBQVEscUJBQVk7SUFDL0QsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQUUsaUNBQWlDO2dCQUM5QyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELElBQUksRUFBRTtnQkFDRixXQUFXLEVBQUUsc0VBQXNFO2dCQUNuRixJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELElBQUksRUFBRTtnQkFDRixXQUFXLEVBQUUscUNBQXFDO2dCQUNsRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQUUsdUZBQXVGO2dCQUNwRyxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUF4QkQsNENBd0JDIn0=