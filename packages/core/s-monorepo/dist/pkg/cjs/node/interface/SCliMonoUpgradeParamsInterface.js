"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name                SCliMonoUpgradeParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar mono.upgrade` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SCliMonoUpgradeParamsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            packagesGlobs: {
                description: 'Specify some globs to search for packages relative to the monorepo root directory',
                type: 'Array<String>',
                default: s_sugar_config_1.default.get('monorepo.packagesGlobs'),
            },
            filesToUpgrade: {
                description: 'Specify some files to upgrade in each packages when doing a monorepo.upgrade call',
                type: 'Array<String>',
                default: s_sugar_config_1.default.get('monorepo.filesToUpgrade'),
            },
        };
    }
}
exports.default = SCliMonoUpgradeParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRFQUFxRDtBQUNyRCxrRkFBMEQ7QUFFMUQ7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE1BQXFCLDhCQUErQixTQUFRLHFCQUFZO0lBQ3BFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxhQUFhLEVBQUU7Z0JBQ1gsV0FBVyxFQUNQLG1GQUFtRjtnQkFDdkYsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQzthQUN4RDtZQUNELGNBQWMsRUFBRTtnQkFDWixXQUFXLEVBQ1AsbUZBQW1GO2dCQUN2RixJQUFJLEVBQUUsZUFBZTtnQkFDckIsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDO2FBQ3pEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQWpCRCxpREFpQkMifQ==