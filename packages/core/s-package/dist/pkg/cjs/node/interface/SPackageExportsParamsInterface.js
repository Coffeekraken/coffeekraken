"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name                SPackageExportsParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar package.exports` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SPackageExportsParamsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            glob: {
                description: 'Sppecify some globs relative to the inDir to find the files you want to exports',
                type: 'Array<String>',
                default: s_sugar_config_1.default.get('package.exports.glob'),
                alias: 'g',
            },
            buildInitial: {
                description: 'Specify if you want to process to the export at start even with the "watch" parameter to true',
                type: 'Boolean',
                default: false,
                alias: 'b',
            },
            folderModuleMap: {
                description: 'Specify some folders you want to map to a specific package type like "module" or "commonjs"',
                type: 'Object',
                default: s_sugar_config_1.default.get('package.exports.folderModuleMap'),
                alias: 'f',
            },
            folderPlatformMap: {
                description: 'Specify some folders you want to map to a specific platform like "node" or "browser", etc...',
                type: 'Object',
                default: s_sugar_config_1.default.get('package.exports.folderPlatformMap'),
                alias: 'p',
            },
        };
    }
}
exports.default = SPackageExportsParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRFQUFxRDtBQUNyRCxrRkFBMEQ7QUFFMUQ7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE1BQXFCLDhCQUErQixTQUFRLHFCQUFZO0lBQ3BFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLGlGQUFpRjtnQkFDckYsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQztnQkFDbkQsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELFlBQVksRUFBRTtnQkFDVixXQUFXLEVBQ1AsK0ZBQStGO2dCQUNuRyxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsS0FBSztnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsZUFBZSxFQUFFO2dCQUNiLFdBQVcsRUFDUCw2RkFBNkY7Z0JBQ2pHLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQztnQkFDOUQsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELGlCQUFpQixFQUFFO2dCQUNmLFdBQVcsRUFDUCw4RkFBOEY7Z0JBQ2xHLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FDdkIsbUNBQW1DLENBQ3RDO2dCQUNELEtBQUssRUFBRSxHQUFHO2FBQ2I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBbkNELGlEQW1DQyJ9