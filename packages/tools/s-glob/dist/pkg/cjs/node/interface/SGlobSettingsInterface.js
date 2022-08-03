"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SGlobSettingsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface represent the SGlob settings.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SGlobSettingsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            cwd: {
                description: 'Specify the working directory to run the command in.',
                type: 'String',
                default: process.cwd(),
            },
            symlinks: {
                description: 'Specify if you want to follow symlinks or not',
                type: 'Boolean',
                default: true,
            },
            nodir: {
                description: 'Specify if you want to ignore directories or not',
                type: 'Boolean',
                default: false,
            },
            contentRegExp: {
                description: 'Specify a regex to use on the file content to filter resolved files',
                type: 'RegExp',
            },
            SFile: {
                description: 'Specify if you want back some SFile instances or simple string path',
                type: 'Boolean',
                default: true,
            },
            exclude: {
                description: 'Specify some paths or patterns you want to exclude from your resolve process',
                type: 'Array<String>',
                default: [],
            },
            defaultExcludes: {
                description: 'Specfy if you want to use the default excludes globs setted under the config.storage.exclude configuration',
                type: 'Boolean',
                default: true,
            },
        };
    }
}
exports.default = SGlobSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsTUFBcUIsc0JBQXVCLFNBQVEscUJBQVk7SUFDNUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQ1Asc0RBQXNEO2dCQUMxRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRTthQUN6QjtZQUNELFFBQVEsRUFBRTtnQkFDTixXQUFXLEVBQUUsK0NBQStDO2dCQUM1RCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQUUsa0RBQWtEO2dCQUMvRCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELGFBQWEsRUFBRTtnQkFDWCxXQUFXLEVBQ1AscUVBQXFFO2dCQUN6RSxJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNELEtBQUssRUFBRTtnQkFDSCxXQUFXLEVBQ1AscUVBQXFFO2dCQUN6RSxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtZQUNELE9BQU8sRUFBRTtnQkFDTCxXQUFXLEVBQ1AsOEVBQThFO2dCQUNsRixJQUFJLEVBQUUsZUFBZTtnQkFDckIsT0FBTyxFQUFFLEVBQUU7YUFDZDtZQUNELGVBQWUsRUFBRTtnQkFDYixXQUFXLEVBQ1AsNEdBQTRHO2dCQUNoSCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsSUFBSTthQUNoQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUE1Q0QseUNBNENDIn0=