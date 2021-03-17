"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SInterface_1 = __importDefault(require("../../../shared/interface/SInterface"));
const packageRoot_1 = __importDefault(require("../../path/packageRoot"));
const sugar_1 = __importDefault(require("../../config/sugar"));
/**
 * @name            ResolveSettingsInterface
 * @namespace       sugar.node.module.interface
 * @type            Class
 * @extends         SInterface
 *
 * This represent the resolve settings interface
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class ResolveSettingsInterface extends SInterface_1.default {
}
ResolveSettingsInterface.definition = {
    dirs: {
        type: 'Array<String>',
        default: sugar_1.default('module.resolve.dirs')
    },
    extensions: {
        type: 'Array<String>',
        default: sugar_1.default('module.resolve.extensions')
    },
    fields: {
        type: 'Array<String>',
        default: sugar_1.default('module.resolve.fields')
    },
    buildInModules: {
        type: 'Boolean',
        default: sugar_1.default('module.resolve.builtInModules')
    },
    preferExports: {
        type: 'Boolean',
        default: sugar_1.default('module.resolve.preferExports')
    },
    method: {
        type: 'String',
        values: ['import', 'require'],
        default: sugar_1.default('module.resolve.method')
    },
    target: {
        type: 'String',
        values: ['node', 'default'],
        default: sugar_1.default('module.resolve.target')
    },
    rootDir: {
        type: 'String',
        default: packageRoot_1.default()
    }
};
exports.default = ResolveSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzb2x2ZVNldHRpbmdzSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUmVzb2x2ZVNldHRpbmdzSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0ZBQWdFO0FBQ2hFLHlFQUFtRDtBQUNuRCwrREFBK0M7QUFFL0M7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sd0JBQXlCLFNBQVEsb0JBQVk7O0FBQzFDLG1DQUFVLEdBQUc7SUFDbEIsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLGVBQWU7UUFDckIsT0FBTyxFQUFFLGVBQWEsQ0FBQyxxQkFBcUIsQ0FBQztLQUM5QztJQUNELFVBQVUsRUFBRTtRQUNWLElBQUksRUFBRSxlQUFlO1FBQ3JCLE9BQU8sRUFBRSxlQUFhLENBQUMsMkJBQTJCLENBQUM7S0FDcEQ7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsZUFBZTtRQUNyQixPQUFPLEVBQUUsZUFBYSxDQUFDLHVCQUF1QixDQUFDO0tBQ2hEO0lBQ0QsY0FBYyxFQUFFO1FBQ2QsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsZUFBYSxDQUFDLCtCQUErQixDQUFDO0tBQ3hEO0lBQ0QsYUFBYSxFQUFFO1FBQ2IsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsZUFBYSxDQUFDLDhCQUE4QixDQUFDO0tBQ3ZEO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDO1FBQzdCLE9BQU8sRUFBRSxlQUFhLENBQUMsdUJBQXVCLENBQUM7S0FDaEQ7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUM7UUFDM0IsT0FBTyxFQUFFLGVBQWEsQ0FBQyx1QkFBdUIsQ0FBQztLQUNoRDtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLHFCQUFhLEVBQUU7S0FDekI7Q0FDRixDQUFDO0FBRUosa0JBQWUsd0JBQXdCLENBQUMifQ==