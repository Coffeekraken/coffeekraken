"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const packageRoot_1 = __importDefault(require("../../path/packageRoot"));
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
class ResolveSettingsInterface extends s_interface_1.default {
}
ResolveSettingsInterface.definition = {
    dirs: {
        type: 'Array<String>',
        default: s_sugar_config_1.default('module.resolve.dirs')
    },
    extensions: {
        type: 'Array<String>',
        default: s_sugar_config_1.default('module.resolve.extensions')
    },
    fields: {
        type: 'Array<String>',
        default: s_sugar_config_1.default('module.resolve.fields')
    },
    buildInModules: {
        type: 'Boolean',
        default: s_sugar_config_1.default('module.resolve.builtInModules')
    },
    preferExports: {
        type: 'Boolean',
        default: s_sugar_config_1.default('module.resolve.preferExports')
    },
    method: {
        type: 'String',
        values: ['import', 'require'],
        default: s_sugar_config_1.default('module.resolve.method')
    },
    target: {
        type: 'String',
        values: ['node', 'default'],
        default: s_sugar_config_1.default('module.resolve.target')
    },
    rootDir: {
        type: 'String',
        default: packageRoot_1.default()
    }
};
exports.default = ResolveSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzb2x2ZVNldHRpbmdzSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUmVzb2x2ZVNldHRpbmdzSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsa0ZBQXlEO0FBQ3pELDRFQUFxRDtBQUNyRCx5RUFBbUQ7QUFFbkQ7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sd0JBQXlCLFNBQVEscUJBQVk7O0FBQzFDLG1DQUFVLEdBQUc7SUFDbEIsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLGVBQWU7UUFDckIsT0FBTyxFQUFFLHdCQUFhLENBQUMscUJBQXFCLENBQUM7S0FDOUM7SUFDRCxVQUFVLEVBQUU7UUFDVixJQUFJLEVBQUUsZUFBZTtRQUNyQixPQUFPLEVBQUUsd0JBQWEsQ0FBQywyQkFBMkIsQ0FBQztLQUNwRDtJQUNELE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxlQUFlO1FBQ3JCLE9BQU8sRUFBRSx3QkFBYSxDQUFDLHVCQUF1QixDQUFDO0tBQ2hEO0lBQ0QsY0FBYyxFQUFFO1FBQ2QsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsd0JBQWEsQ0FBQywrQkFBK0IsQ0FBQztLQUN4RDtJQUNELGFBQWEsRUFBRTtRQUNiLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLHdCQUFhLENBQUMsOEJBQThCLENBQUM7S0FDdkQ7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUM7UUFDN0IsT0FBTyxFQUFFLHdCQUFhLENBQUMsdUJBQXVCLENBQUM7S0FDaEQ7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUM7UUFDM0IsT0FBTyxFQUFFLHdCQUFhLENBQUMsdUJBQXVCLENBQUM7S0FDaEQ7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxxQkFBYSxFQUFFO0tBQ3pCO0NBQ0YsQ0FBQztBQUVKLGtCQUFlLHdCQUF3QixDQUFDIn0=