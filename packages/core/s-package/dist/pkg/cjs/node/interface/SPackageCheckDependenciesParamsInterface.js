"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name                SPackageCheckDependenciesParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar package.checkDependencies` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SPackageCheckDependenciesParamsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            dirs: {
                description: 'Specify the directories in which to check for dependencies issues, etc...',
                type: 'String[]',
                default: s_sugar_config_1.default.get('package.checkDependencies.dirs'),
                alias: 'd',
            },
            installMissing: {
                description: 'Specify if you would like to install missing dependencies.',
                type: 'Boolean',
                default: undefined,
                alias: 'i',
            },
            packagesMap: {
                description: 'Specify some package name patterns to add in package.json without installin them. Usefull for monorepo with packages that are not published yet.',
                type: 'Object',
                default: s_sugar_config_1.default.get('package.checkDependencies.packagesMap'),
            },
        };
    }
}
exports.default = SPackageCheckDependenciesParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRFQUFxRDtBQUNyRCxrRkFBMEQ7QUFFMUQ7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE1BQXFCLHdDQUF5QyxTQUFRLHFCQUFZO0lBQzlFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsV0FBVyxFQUNQLDJFQUEyRTtnQkFDL0UsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQztnQkFDN0QsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELGNBQWMsRUFBRTtnQkFDWixXQUFXLEVBQ1AsNERBQTREO2dCQUNoRSxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsU0FBUztnQkFDbEIsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELFdBQVcsRUFBRTtnQkFDVCxXQUFXLEVBQ1Asa0pBQWtKO2dCQUN0SixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQ3ZCLHVDQUF1QyxDQUMxQzthQUNKO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQTNCRCwyREEyQkMifQ==