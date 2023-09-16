"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_package_1 = require("@coffeekraken/s-package");
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
/**
 * @name                SMonorepoCheckDependenciesParamsInterface
 * @namespace           node.interface
 * @type                      Class
 * @extends             SInterface
 * @interface
 * @status              beta
 * @platform             node
 *
 * This interface specify the parameters needed to the `sugar monorepo.checkDependencies` command.
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SMonorepoCheckDependenciesParamsInterface extends s_interface_1.default {
    static get _definition() {
        return Object.assign({ packagesGlob: {
                description: 'Specify some globs to search for packages relative to the monorepo root directory',
                type: 'String',
                default: s_sugar_config_1.default.get('monorepo.packagesGlob'),
            } }, s_package_1.__SPackageCheckDependenciesParamsInterface.definition);
    }
}
exports.default = SMonorepoCheckDependenciesParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDRFQUFxRDtBQUNyRCx1REFBcUY7QUFDckYsa0ZBQTBEO0FBRTFEOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFDSCxNQUFxQix5Q0FBMEMsU0FBUSxxQkFBWTtJQUMvRSxNQUFNLEtBQUssV0FBVztRQUNsQix1QkFDSSxZQUFZLEVBQUU7Z0JBQ1YsV0FBVyxFQUNQLG1GQUFtRjtnQkFDdkYsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDO2FBQ3ZELElBQ0Usc0RBQTBDLENBQUMsVUFBVSxFQUMxRDtJQUNOLENBQUM7Q0FDSjtBQVpELDREQVlDIn0=