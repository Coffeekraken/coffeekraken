"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
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
class SDocblockRendererSettingsInterface extends s_interface_1.default {
}
exports.default = SDocblockRendererSettingsInterface;
SDocblockRendererSettingsInterface.definition = {
    scope: {
        type: 'String',
        default: s_sugar_config_1.default('docblock.scope')
    },
    rootDir: {
        type: 'String',
        default: `${path_1.default.resolve(__dirname, '..')}`
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY2Jsb2NrUmVuZGVyZXJTZXR0aW5nc0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNEb2NibG9ja1JlbmRlcmVyU2V0dGluZ3NJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxnREFBMEI7QUFDMUIsa0ZBQXlEO0FBQ3pELDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQXFCLGtDQUFtQyxTQUFRLHFCQUFZOztBQUE1RSxxREFXQztBQVZRLDZDQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsd0JBQWEsQ0FBQyxnQkFBZ0IsQ0FBQztLQUN6QztJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLEdBQUcsY0FBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEVBQUU7S0FDOUM7Q0FDRixDQUFDIn0=