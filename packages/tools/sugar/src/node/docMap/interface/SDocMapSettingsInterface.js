"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sugar_1 = __importDefault(require("../../config/sugar"));
const SInterface_1 = __importDefault(require("../../interface/SInterface"));
/**
 * @name                SDocMapSettingsInterface
 * @namespace           sugar.node.build.docMap.interface
 * @type                Class
 * @extends             SInterface
 *
 * This class represent the interface that describe the minimum requirement
 * needed to build the docMap.json file
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SDocMapSettingsInterface extends SInterface_1.default {
}
SDocMapSettingsInterface.definition = {
    cache: {
        type: 'Boolean',
        default: sugar_1.default('docMap.cache'),
        level: 1
    },
    'build.globs': {
        type: 'Array<String>',
        alias: 'i',
        description: 'Input files glob pattern',
        default: sugar_1.default('docMap.build.globs'),
        level: 1
    },
    'build.exclude': {
        type: 'Object',
        description: 'Specify some regexp used to exclude files from resulting docMap',
        default: sugar_1.default('docMap.build.exclude'),
        level: 1
    },
    'find.globs': {
        type: 'Array<String>',
        alias: 'i',
        description: 'docMap.json files glob pattern',
        default: sugar_1.default('docMap.find.globs'),
        level: 1
    },
    'find.exclude': {
        type: 'Object',
        description: 'Specify some regexp used to exclude files from searching docMaps',
        default: sugar_1.default('docMap.find.exclude'),
        level: 1
    },
    'save.path': {
        type: 'String',
        alias: 'p',
        description: 'Output file path',
        default: sugar_1.default('docMap.save.path'),
        level: 1
    }
};
exports.default = SDocMapSettingsInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcFNldHRpbmdzSW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0RvY01hcFNldHRpbmdzSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLCtEQUErQztBQUMvQyw0RUFBc0Q7QUFFdEQ7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLHdCQUF5QixTQUFRLG9CQUFZOztBQUMxQyxtQ0FBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLGVBQWEsQ0FBQyxjQUFjLENBQUM7UUFDdEMsS0FBSyxFQUFFLENBQUM7S0FDVDtJQUNELGFBQWEsRUFBRTtRQUNiLElBQUksRUFBRSxlQUFlO1FBQ3JCLEtBQUssRUFBRSxHQUFHO1FBQ1YsV0FBVyxFQUFFLDBCQUEwQjtRQUN2QyxPQUFPLEVBQUUsZUFBYSxDQUFDLG9CQUFvQixDQUFDO1FBQzVDLEtBQUssRUFBRSxDQUFDO0tBQ1Q7SUFDRCxlQUFlLEVBQUU7UUFDZixJQUFJLEVBQUUsUUFBUTtRQUNkLFdBQVcsRUFDVCxpRUFBaUU7UUFDbkUsT0FBTyxFQUFFLGVBQWEsQ0FBQyxzQkFBc0IsQ0FBQztRQUM5QyxLQUFLLEVBQUUsQ0FBQztLQUNUO0lBQ0QsWUFBWSxFQUFFO1FBQ1osSUFBSSxFQUFFLGVBQWU7UUFDckIsS0FBSyxFQUFFLEdBQUc7UUFDVixXQUFXLEVBQUUsZ0NBQWdDO1FBQzdDLE9BQU8sRUFBRSxlQUFhLENBQUMsbUJBQW1CLENBQUM7UUFDM0MsS0FBSyxFQUFFLENBQUM7S0FDVDtJQUNELGNBQWMsRUFBRTtRQUNkLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUNULGtFQUFrRTtRQUNwRSxPQUFPLEVBQUUsZUFBYSxDQUFDLHFCQUFxQixDQUFDO1FBQzdDLEtBQUssRUFBRSxDQUFDO0tBQ1Q7SUFDRCxXQUFXLEVBQUU7UUFDWCxJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxHQUFHO1FBQ1YsV0FBVyxFQUFFLGtCQUFrQjtRQUMvQixPQUFPLEVBQUUsZUFBYSxDQUFDLGtCQUFrQixDQUFDO1FBQzFDLEtBQUssRUFBRSxDQUFDO0tBQ1Q7Q0FDRixDQUFDO0FBRUosa0JBQWUsd0JBQXdCLENBQUMifQ==