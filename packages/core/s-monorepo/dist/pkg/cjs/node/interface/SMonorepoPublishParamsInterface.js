"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name                SMonorepoPublishParamsInterface
 * @namespace           node.interface
 * @type.                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar mono.publish` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SMonorepoPublishParamsInterface extends s_interface_1.default {
    static get _definition() {
        return {
            packagesGlob: {
                description: 'Specify some globs to search for packages relative to the monorepo root directory',
                type: 'String',
                default: s_sugar_config_1.default.get('monorepo.packagesGlob'),
                alias: 'g',
            },
            yes: {
                description: 'Specify if you want to answer yes to all the questions of the process',
                type: 'Boolean',
                default: false,
                alias: 'y',
            },
        };
    }
}
exports.default = SMonorepoPublishParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRFQUFxRDtBQUNyRCxrRkFBMEQ7QUFFMUQ7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILE1BQXFCLCtCQUFnQyxTQUFRLHFCQUFZO0lBQ3JFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxZQUFZLEVBQUU7Z0JBQ1YsV0FBVyxFQUNQLG1GQUFtRjtnQkFDdkYsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDO2dCQUNwRCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsR0FBRyxFQUFFO2dCQUNELFdBQVcsRUFDUCx1RUFBdUU7Z0JBQzNFLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBbkJELGtEQW1CQyJ9