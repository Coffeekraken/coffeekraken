"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name                SMonorepoUpgradeParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar monorepo.upgrade` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SMonorepoUpgradeParamsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            packagesGlob: {
                description: 'Specify some globs to search for packages relative to the monorepo root directory',
                type: 'String',
                default: s_sugar_config_1.default.get('monorepo.packagesGlob'),
            },
            files: {
                description: 'Specify the files to upgrade when doing a monorepo.upgrade call.',
                type: 'String[]',
                default: s_sugar_config_1.default.get('monorepo.upgrade.files'),
            },
            fields: {
                description: 'Specify the fields to upgrade when doing a monorepo.upgrade call.',
                type: 'String[]',
                default: s_sugar_config_1.default.get('monorepo.upgrade.fields'),
            },
        };
    }
}
exports.default = SMonorepoUpgradeParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRFQUFxRDtBQUNyRCxrRkFBMEQ7QUFFMUQ7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE1BQXFCLCtCQUFnQyxTQUFRLHFCQUFZO0lBQ3JFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxZQUFZLEVBQUU7Z0JBQ1YsV0FBVyxFQUNQLG1GQUFtRjtnQkFDdkYsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDO2FBQ3ZEO1lBQ0QsS0FBSyxFQUFFO2dCQUNILFdBQVcsRUFDUCxrRUFBa0U7Z0JBQ3RFLElBQUksRUFBRSxVQUFVO2dCQUNoQixPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUM7YUFDeEQ7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osV0FBVyxFQUNQLG1FQUFtRTtnQkFDdkUsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQzthQUN6RDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUF2QkQsa0RBdUJDIn0=