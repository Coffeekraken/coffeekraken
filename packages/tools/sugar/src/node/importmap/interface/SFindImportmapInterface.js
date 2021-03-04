"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../interface/SInterface"));
const sugar_1 = __importDefault(require("../../config/sugar"));
/**
 * @name            SFindImportmapInterface
 * @namespace       sugar.node.importmap.interface
 * @type            Class
 * @extends         SInterface
 *
 * Represent the importmap interface settings like directories where to search for, file names, etc...
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// @ts-ignore
class SFindImportmapInterface extends SInterface_1.default {
}
exports.default = SFindImportmapInterface;
SFindImportmapInterface.definition = {
    SFile: {
        type: 'Boolean',
        alias: 'f',
        description: 'Specify if you want to have back some SFile instances, or just some file pathes',
        default: false
    },
    names: {
        type: 'Array<String>',
        alias: 'n',
        description: 'Specify some file names to search',
        default: sugar_1.default('importmap.file.names')
    },
    dirs: {
        type: 'Array<String>',
        alias: 'd',
        description: 'SPecify some directories in which to search for specified files',
        default: sugar_1.default('importmap.file.dirs')
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZpbmRJbXBvcnRtYXBJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRmluZEltcG9ydG1hcEludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDRFQUFzRDtBQUN0RCwrREFBK0M7QUFFL0M7Ozs7Ozs7Ozs7R0FVRztBQUNILGFBQWE7QUFDYixNQUFxQix1QkFBd0IsU0FBUSxvQkFBWTs7QUFBakUsMENBdUJDO0FBdEJRLGtDQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFNBQVM7UUFDZixLQUFLLEVBQUUsR0FBRztRQUNWLFdBQVcsRUFDVCxpRkFBaUY7UUFDbkYsT0FBTyxFQUFFLEtBQUs7S0FDZjtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxlQUFlO1FBQ3JCLEtBQUssRUFBRSxHQUFHO1FBQ1YsV0FBVyxFQUFFLG1DQUFtQztRQUNoRCxPQUFPLEVBQUUsZUFBYSxDQUFDLHNCQUFzQixDQUFDO0tBQy9DO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLGVBQWU7UUFDckIsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQ1QsaUVBQWlFO1FBQ25FLE9BQU8sRUFBRSxlQUFhLENBQUMscUJBQXFCLENBQUM7S0FDOUM7Q0FDRixDQUFDIn0=