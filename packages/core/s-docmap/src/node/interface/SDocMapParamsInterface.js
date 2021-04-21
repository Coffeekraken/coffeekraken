"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name                SDocMapParamsInterface
 * @namespace           node.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed to build the docMap.json file
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SDocMapParamsInterface extends s_interface_1.default {
}
SDocMapParamsInterface.definition = {
    cache: {
        type: 'Boolean',
        default: s_sugar_config_1.default('docmap.cache'),
        level: 1
    }
};
exports.default = SDocMapParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcFBhcmFtc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNEb2NNYXBQYXJhbXNJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsa0ZBQXlEO0FBQ3pELDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sc0JBQXVCLFNBQVEscUJBQVk7O0FBQ3hDLGlDQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsd0JBQWEsQ0FBQyxjQUFjLENBQUM7UUFDdEMsS0FBSyxFQUFFLENBQUM7S0FDVDtDQUNGLENBQUM7QUFFSixrQkFBZSxzQkFBc0IsQ0FBQyJ9