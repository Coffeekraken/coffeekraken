"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
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
SDocMapSettingsInterface.definition = {
    cache: {
        type: 'Boolean',
        default: s_sugar_config_1.default('docMap.cache'),
        level: 1
    },
    'build.globs': {
        type: 'Array<String>',
        alias: 'i',
        description: 'Input files glob pattern',
        default: s_sugar_config_1.default('docMap.build.globs'),
        level: 1
    },
    'build.exclude': {
        type: 'Object',
        description: 'Specify some regexp used to exclude files from resulting docMap',
        default: s_sugar_config_1.default('docMap.build.exclude'),
        level: 1
    },
    'find.globs': {
        type: 'Array<String>',
        alias: 'i',
        description: 'docMap.json files glob pattern',
        default: s_sugar_config_1.default('docMap.find.globs'),
        level: 1
    },
    'find.exclude': {
        type: 'Object',
        description: 'Specify some regexp used to exclude files from searching docMaps',
        default: s_sugar_config_1.default('docMap.find.exclude'),
        level: 1
    },
    'save.path': {
        type: 'String',
        alias: 'p',
        description: 'Output file path',
        default: s_sugar_config_1.default('docMap.save.path'),
        level: 1
    }
};
exports.default = SDocMapSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcFNldHRpbmdzSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0RvY01hcFNldHRpbmdzSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtGQUF5RDtBQUN6RCw0RUFBcUQ7QUFFckQ7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLHdCQUF5QixTQUFRLHFCQUFZOztBQUMxQyxtQ0FBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLHdCQUFhLENBQUMsY0FBYyxDQUFDO1FBQ3RDLEtBQUssRUFBRSxDQUFDO0tBQ1Q7SUFDRCxhQUFhLEVBQUU7UUFDYixJQUFJLEVBQUUsZUFBZTtRQUNyQixLQUFLLEVBQUUsR0FBRztRQUNWLFdBQVcsRUFBRSwwQkFBMEI7UUFDdkMsT0FBTyxFQUFFLHdCQUFhLENBQUMsb0JBQW9CLENBQUM7UUFDNUMsS0FBSyxFQUFFLENBQUM7S0FDVDtJQUNELGVBQWUsRUFBRTtRQUNmLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUNULGlFQUFpRTtRQUNuRSxPQUFPLEVBQUUsd0JBQWEsQ0FBQyxzQkFBc0IsQ0FBQztRQUM5QyxLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsWUFBWSxFQUFFO1FBQ1osSUFBSSxFQUFFLGVBQWU7UUFDckIsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQUUsZ0NBQWdDO1FBQzdDLE9BQU8sRUFBRSx3QkFBYSxDQUFDLG1CQUFtQixDQUFDO1FBQzNDLEtBQUssRUFBRSxDQUFDO0tBQ1Q7SUFDRCxjQUFjLEVBQUU7UUFDZCxJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFDVCxrRUFBa0U7UUFDcEUsT0FBTyxFQUFFLHdCQUFhLENBQUMscUJBQXFCLENBQUM7UUFDN0MsS0FBSyxFQUFFLENBQUM7S0FDVDtJQUNELFdBQVcsRUFBRTtRQUNYLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQUUsa0JBQWtCO1FBQy9CLE9BQU8sRUFBRSx3QkFBYSxDQUFDLGtCQUFrQixDQUFDO1FBQzFDLEtBQUssRUFBRSxDQUFDO0tBQ1Q7Q0FDRixDQUFDO0FBRUosa0JBQWUsd0JBQXdCLENBQUMifQ==