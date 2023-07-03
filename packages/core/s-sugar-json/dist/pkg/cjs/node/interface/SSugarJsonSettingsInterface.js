"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SSugarJsonSettingsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             js
 *
 * This class represent the interface that describe SSugarJson settings
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarJsonSettingsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            packages: {
                description: 'Specify an array of packages names in which to search for sugar.json file',
                type: 'Array<String>',
            },
            includePackage: {
                description: 'Specify if the current package has to be included in the search',
                type: 'Boolean',
                default: true,
            },
            includeModules: {
                description: 'Specify if the current package "node_modules" folder has to be included in the search',
                type: 'Boolean',
                default: true,
            },
            includeGlobal: {
                description: 'Specify if the global "node_modules" folder has to be included in the search',
                type: 'Boolean',
                default: true,
            },
            includeTop: {
                description: 'Specify if the root package folder in case of a mono-repo has to be included in the search',
                type: 'Boolean',
                default: true,
            },
        };
    }
}
exports.default = SSugarJsonSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXFEO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQXFCLDJCQUE0QixTQUFRLHFCQUFZO0lBQ2pFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxRQUFRLEVBQUU7Z0JBQ04sV0FBVyxFQUNQLDJFQUEyRTtnQkFDL0UsSUFBSSxFQUFFLGVBQWU7YUFDeEI7WUFDRCxjQUFjLEVBQUU7Z0JBQ1osV0FBVyxFQUNQLGlFQUFpRTtnQkFDckUsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxjQUFjLEVBQUU7Z0JBQ1osV0FBVyxFQUNQLHVGQUF1RjtnQkFDM0YsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxhQUFhLEVBQUU7Z0JBQ1gsV0FBVyxFQUNQLDhFQUE4RTtnQkFDbEYsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsV0FBVyxFQUNQLDRGQUE0RjtnQkFDaEcsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLElBQUk7YUFDaEI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBbENELDhDQWtDQyJ9