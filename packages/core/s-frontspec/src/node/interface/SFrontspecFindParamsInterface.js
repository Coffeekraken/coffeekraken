"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const SFrontspecParamsInterface_1 = __importDefault(require("./SFrontspecParamsInterface"));
/**
 * @name                SFrontspecFindParamsInterface
 * @namespace           node.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed to search for fronspec.json file(s)
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SFrontspecFindParamsInterface extends s_interface_1.default {
}
SFrontspecFindParamsInterface.definition = Object.assign(Object.assign({}, SFrontspecParamsInterface_1.default.definition), { globs: {
        type: 'Array<String>',
        alias: 'i',
        description: 'frontspec.json files glob pattern',
        default: s_sugar_config_1.default('frontspec.find.globs'),
        level: 1
    }, exclude: {
        type: 'Object',
        description: 'Specify some regexp used to exclude files from searching frontspecs',
        default: s_sugar_config_1.default('frontspec.find.exclude'),
        level: 1
    } });
exports.default = SFrontspecFindParamsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3BlY0ZpbmRQYXJhbXNJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRnJvbnRzcGVjRmluZFBhcmFtc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxrRkFBeUQ7QUFDekQsNEVBQXFEO0FBQ3JELDRGQUFzRTtBQUV0RTs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sNkJBQThCLFNBQVEscUJBQVk7O0FBQy9DLHdDQUFVLG1DQUNaLG1DQUEyQixDQUFDLFVBQVUsS0FDekMsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLGVBQWU7UUFDckIsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQUUsbUNBQW1DO1FBQ2hELE9BQU8sRUFBRSx3QkFBYSxDQUFDLHNCQUFzQixDQUFDO1FBQzlDLEtBQUssRUFBRSxDQUFDO0tBQ1QsRUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFDVCxxRUFBcUU7UUFDdkUsT0FBTyxFQUFFLHdCQUFhLENBQUMsd0JBQXdCLENBQUM7UUFDaEQsS0FBSyxFQUFFLENBQUM7S0FDVCxJQUNEO0FBRUosa0JBQWUsNkJBQTZCLENBQUMifQ==