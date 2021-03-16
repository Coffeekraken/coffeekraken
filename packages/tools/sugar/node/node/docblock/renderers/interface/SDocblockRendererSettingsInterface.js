"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sugar_1 = __importDefault(require("../../../config/sugar"));
const SInterface_1 = __importDefault(require("../../../interface/SInterface"));
const path_1 = __importDefault(require("path"));
/**
 * @name            SDocblockRendererSettingsInterface
 * @namespace       sugar.node.docblock.renderers.interface
 * @type            Class
 * @extends         SInterface
 * @status          beta
 *
 * Represent the SDocblockRenderer settings
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SDocblockRendererSettingsInterface extends SInterface_1.default {
}
exports.default = SDocblockRendererSettingsInterface;
SDocblockRendererSettingsInterface.definition = {
    scope: {
        type: 'String',
        default: sugar_1.default('docblock.scope')
    },
    rootDir: {
        type: 'String',
        default: `${path_1.default.resolve(__dirname, '..')}`
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrUmVuZGVyZXJTZXR0aW5nc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9ub2RlL2RvY2Jsb2NrL3JlbmRlcmVycy9pbnRlcmZhY2UvU0RvY2Jsb2NrUmVuZGVyZXJTZXR0aW5nc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtFQUFrRDtBQUNsRCwrRUFBeUQ7QUFDekQsZ0RBQTBCO0FBRTFCOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBcUIsa0NBQW1DLFNBQVEsb0JBQVk7O0FBQTVFLHFEQVdDO0FBVlEsNkNBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxlQUFhLENBQUMsZ0JBQWdCLENBQUM7S0FDekM7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxFQUFFO0tBQzlDO0NBQ0YsQ0FBQyJ9