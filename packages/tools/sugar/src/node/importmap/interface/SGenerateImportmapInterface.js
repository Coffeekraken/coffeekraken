"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../interface/SInterface"));
/**
 * @name            SGenerateImportmapInterface
 * @namespace       sugar.node.importmap.interface
 * @type            Class
 * @extends         SInterface
 *
 * Represent the generate importmap interface settings
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// @ts-ignore
class SGenerateImportmapInterface extends SInterface_1.default {
}
exports.default = SGenerateImportmapInterface;
SGenerateImportmapInterface.definition = {
    SFile: {
        type: 'Boolean',
        alias: 'f',
        description: 'Specify if you want to have back some SFile instances, or just some file pathes',
        default: false
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0dlbmVyYXRlSW1wb3J0bWFwSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0dlbmVyYXRlSW1wb3J0bWFwSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNEVBQXNEO0FBR3REOzs7Ozs7Ozs7O0dBVUc7QUFDSCxhQUFhO0FBQ2IsTUFBcUIsMkJBQTRCLFNBQVEsb0JBQVk7O0FBQXJFLDhDQVVDO0FBVFEsc0NBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxHQUFHO1FBQ1YsV0FBVyxFQUNULGlGQUFpRjtRQUNuRixPQUFPLEVBQUUsS0FBSztLQUNmO0NBQ0YsQ0FBQyJ9