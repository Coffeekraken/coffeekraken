"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const SDocMapParamsInterface_1 = __importDefault(require("./SDocMapParamsInterface"));
/**
 * @name                SDocMapSettingsInterface
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
class SDocMapSettingsInterface extends s_interface_1.default {
}
SDocMapSettingsInterface.definition = Object.assign(Object.assign({}, SDocMapParamsInterface_1.default.definition), { globs: {
        type: 'Array<String>',
        alias: 'i',
        description: 'docMap.json files glob pattern',
        default: s_sugar_config_1.default('docmap.find.globs'),
        level: 1
    }, exclude: {
        type: 'Object',
        description: 'Specify some regexp used to exclude files from searching docMaps',
        default: s_sugar_config_1.default('docmap.find.exclude'),
        level: 1
    } });
exports.default = SDocMapSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcEZpbmRQYXJhbXNJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRG9jTWFwRmluZFBhcmFtc0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYzs7Ozs7QUFFZCxrRkFBeUQ7QUFDekQsNEVBQXFEO0FBQ3JELHNGQUFnRTtBQUVoRTs7Ozs7Ozs7Ozs7R0FXRztBQUNILE1BQU0sd0JBQXlCLFNBQVEscUJBQVk7O0FBQzFDLG1DQUFVLG1DQUNaLGdDQUF3QixDQUFDLFVBQVUsS0FDdEMsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLGVBQWU7UUFDckIsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQUUsZ0NBQWdDO1FBQzdDLE9BQU8sRUFBRSx3QkFBYSxDQUFDLG1CQUFtQixDQUFDO1FBQzNDLEtBQUssRUFBRSxDQUFDO0tBQ1QsRUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFDVCxrRUFBa0U7UUFDcEUsT0FBTyxFQUFFLHdCQUFhLENBQUMscUJBQXFCLENBQUM7UUFDN0MsS0FBSyxFQUFFLENBQUM7S0FDVCxJQUNEO0FBRUosa0JBQWUsd0JBQXdCLENBQUMifQ==